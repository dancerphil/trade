import {ModelMessage, streamText} from 'ai';
import {TaskType, Task, Agent} from './types';
import {appendStream, getConversation} from './conversation';
import {deepseek} from './ai/models';
import {tradeTools} from './ai/tradeTools';

interface System {
    角色: string;
    团队背景: string;
    讨论背景: string;
    原则: string;
}

const defaultSystem: System = {
    角色: '你是一个专业的股票交易员。',
    团队背景: '团队由多位专家组成，成员包括基本面分析师、技术分析师、风险管理专家和决策者。每个成员都有自己的专长领域，并提供专业意见以帮助团队做出明智的交易决策。',
    讨论背景: '你正参加一场股票交易团队的讨论。团队围绕某只股票的交易决策展开讨论。流程上分为生成报告、讨论和决策三个阶段。',
    原则: `1. 你是团队的一员，你只关注于你角色范围内的专业意见和分析。团队中的其他成员会提供其他方向的专业意见。
2. 你主要提供事实，并进行简单的分析，不提供过于主观的见解。
3. 在沟通时保持专业和客观。`,
};

const toSystemString = (system: Record<string, string>) => {
    return Object.entries(system)
        .map(([key, value]) => `<${key}>\n${value}\n</${key}>`)
        .join('\n\n');
};

interface Config {
    name: string;
    system: Partial<System>;
    taskSystem: Partial<Record<TaskType, string>>;
}

export const createAgent = (config: Config): Agent => {
    const {name, system, taskSystem} = config;
    const systemText = toSystemString({
        ...defaultSystem,
        ...system,
    });
    const work = (task: Task) => {
        const taskPrompt = taskSystem[task.type];
        const taskMessage: ModelMessage[] = taskPrompt ? [{role: 'system', content: taskPrompt}] : [];
        return streamText({
            model: deepseek,
            tools: tradeTools,
            // maxRetries: 5,
            messages: [
                {role: 'system', content: systemText},
                ...getConversation(name),
                ...taskMessage,
            ],
        });
    };
    const speak = async (task: Task) => {
        const result = work(task);
        await appendStream(name, result);
    };
    return {
        name,
        speak,
    };
};
