import {streamText} from 'ai';
import {Agent, AgentConfig, Task} from '@/types/types';
import {appendStream} from './conversation';
import {model} from '@/ai/models';
import {tools} from '@/ai/tools';
import {getScene} from '@/regions/scene';
import {template} from '@/utils/template';
import {getProcess} from '@/regions/process';
import {getMessage} from '@/regions/message';

export const createAgent = (config: AgentConfig): Agent => {
    const {name, system} = config;

    const work = (task: Task) => {
        const {memories} = task;
        const {promptSegments} = getScene('金融分析');
        const prompts: Record<string, string> = Object.fromEntries(promptSegments.map(({name, value}) => [name, value]));
        const templateData = {...prompts, ...(memories ?? {})};
        return streamText({
            model,
            tools,
            stopWhen: [],
            messages: [
                {role: 'system', content: template(system, templateData)},
            ],
        });
    };
    const speak = async (task: Task) => {
        const result = work(task);
        await appendStream(name, result);

        const {round} = getProcess();
        return getMessage(round);
    };
    return {
        name,
        speak,
    };
};
