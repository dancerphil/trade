import {ModelMessage, streamText} from 'ai';
import {Agent, AgentConfig, Task} from '../types';
import {appendStream, getConversation} from './conversation';
import {deepseek} from '../ai/models';
import {tradeTools} from '../ai/tradeTools';

const defaultSystem = {
    讨论背景: '你正参加一场股票交易团队的讨论。团队围绕某只股票的交易决策展开讨论。流程上分为生成报告、辩论和决策三个阶段。',
    团队背景: '团队由多位专家组成，成员包括基本面分析师、技术分析师、各种风格的交易分析师、以及负责决策的交易经理。每个成员都有自己的专长领域，并提供专业意见以帮助团队做出明智的交易决策。',
};

const toSystemString = (system: Record<string, string>) => {
    return Object.entries(system)
        .map(([key, value]) => `<${key}>\n${value}\n</${key}>`)
        .join('\n\n');
};

export const createAgent = (config: AgentConfig): Agent => {
    const {name, system, taskSystem} = config;
    const systemText = toSystemString({
        ...defaultSystem,
        ...system,
    });
    const work = (task?: Task) => {
        const taskPrompt = taskSystem?.[task?.type];
        const taskMessage: ModelMessage[] = taskPrompt ? [{role: 'system', content: taskPrompt}] : [];
        return streamText({
            model: deepseek,
            tools: tradeTools,
            stopWhen: [],
            messages: [
                {role: 'system', content: systemText},
                ...getConversation(name),
                ...taskMessage,
            ],
        });
    };
    const speak = async (task?: Task) => {
        const result = work(task);
        await appendStream(name, result);
    };
    return {
        name,
        speak,
    };
};
