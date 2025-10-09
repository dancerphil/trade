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

export const main = async () => {
    setScene('金融分析', {
        agents: [],
        promptSegments,
        promptInterpolate: '{{}}',
    });
    setProcess(process => ({...process, status: 'RUNNING'}));
    const {topic} = getProcess();
    const fundamentalAgent = createFundamentalAgent();
    const marketAgent = createMarketAgent();
    const aggressiveDebater = createAggressiveDebater();
    const conservativeDebater = createConservativeDebater();
    const neutralDebater = createNeutralDebater();
    const riskManager = createRiskManager();

    hostSpeak(`此次会议主要分析${topic}交易策略。分为三个阶段：产出分析报告、交易策略讨论、总结。`);
    hostSpeak(`现在请基本面分析师分析${topic}过去一周的基本面信息，并撰写一份全面的公司基本面信息报告。`);
    await fundamentalAgent.speak({type: '分析'});
    hostSpeak(`现在请技术分析师分析${topic}过去一周的市场数据，并撰写一份全面的技术分析报告。`);
    await marketAgent.speak({type: '分析'});
    hostSpeak('现在请激进分析师基于报告内容提出交易观点。');
    await aggressiveDebater.speak({type: '立论'});
    hostSpeak('现在请保守分析师基于报告内容提出交易观点。');
    await conservativeDebater.speak({type: '立论'});
    hostSpeak('现在请中立分析师基于报告内容提出交易观点。');
    await neutralDebater.speak({type: '立论'});
    hostSpeak('现在请激进分析师反驳论点。');
    await aggressiveDebater.speak({type: '辩论'});
    hostSpeak('现在请保守分析师反驳论点。');
    await conservativeDebater.speak({type: '辩论'});
    hostSpeak('现在请中立分析师反驳论点。');
    await neutralDebater.speak({type: '辩论'});
    hostSpeak('现在请交易经理总结各方论点，并提出最终的交易策略。');
    await riskManager.speak({type: '总结'});
    setProcess(process => ({...process, status: 'SUCCESS'}));
};
