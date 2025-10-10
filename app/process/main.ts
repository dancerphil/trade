import {
    createAggressiveDebater,
    createConservativeDebater,
    createFundamentalAgent,
    createMarketAgent,
    createNeutralDebater,
    createRiskManager,
} from './agents';
import {hostSpeak} from './conversation';
import {getProcess, setProcess} from '@/regions/process';
import {setScene} from '@/regions/scene';
import {promptSegments} from '@/constants/promptSegments';
import {Message} from '@/types/types';

const getDebateMessage = (debateMemories: Message[]) => {
    return debateMemories.map((message, index) => `第${index + 1}轮：${message.role}说：${message.content}`).join('\n');
};

export const main = async () => {
    setScene('金融分析', {
        agents: [],
        promptSegments,
        promptInterpolate: '{{}}',
    });
    setProcess(process => ({...process, status: 'RUNNING'}));
    const {topic} = getProcess();
    const memories: Record<string, string> = {};
    const debateMemories: Message[] = [];
    const fundamentalAgent = createFundamentalAgent();
    const marketAgent = createMarketAgent();
    const aggressiveDebater = createAggressiveDebater();
    const conservativeDebater = createConservativeDebater();
    const neutralDebater = createNeutralDebater();
    const riskManager = createRiskManager();

    memories['主题'] = topic;
    hostSpeak(`此次会议主要分析${topic}交易策略。分为三个阶段：产出分析报告、交易策略讨论、总结。`);
    memories['基本面报告'] = (await fundamentalAgent.speak({type: '分析', memories})).content;
    memories['技术面报告'] = (await marketAgent.speak({type: '分析', memories})).content;
    debateMemories.push(await aggressiveDebater.speak({type: '立论', memories}));
    debateMemories.push(await conservativeDebater.speak({type: '立论', memories}));
    debateMemories.push(await neutralDebater.speak({type: '立论', memories}));
    debateMemories.push(await aggressiveDebater.speak({type: '辩论', memories: {...memories, 辩论过程: getDebateMessage(debateMemories)}}));
    debateMemories.push(await conservativeDebater.speak({type: '辩论', memories: {...memories, 辩论过程: getDebateMessage(debateMemories)}}));
    debateMemories.push(await neutralDebater.speak({type: '辩论', memories: {...memories, 辩论过程: getDebateMessage(debateMemories)}}));
    await riskManager.speak({type: '总结', memories: {...memories, 辩论过程: getDebateMessage(debateMemories)}});
    setProcess(process => ({...process, status: 'SUCCESS'}));
};
