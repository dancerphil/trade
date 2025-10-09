import {ModelMessage, streamText} from 'ai';
import {Agent, AgentConfig, Task} from '@/types/types';
import {appendStream, getConversation} from './conversation';
import {model} from '@/ai/models';
import {tradeTools} from '@/ai/tradeTools';
import {getScene} from '@/regions/scene';
import {template} from '@/utils/template';

export const createAgent = (config: AgentConfig): Agent => {
    const {name, system, taskSystem} = config;
    // system 是带标签的，需要递归解包
    // 在创建的时候解包，还可以用于显示
    // 因为没有类型检查，所以要优化运行时检查
    const work = (task?: Task) => {
        const {promptSegments} = getScene('金融分析');
        const prompts: Record<string, string> = Object.fromEntries(promptSegments.map(({name, value}) => [name, value]));
        const taskPrompt = taskSystem?.[task?.type];
        const taskMessage: ModelMessage[] = taskPrompt ? [{role: 'system', content: template(taskPrompt, prompts)}] : [];
        return streamText({
            model,
            tools: tradeTools,
            stopWhen: [],
            messages: [
                {role: 'system', content: template(system, prompts)},
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
