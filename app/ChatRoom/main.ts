// import {TfIdf} from 'natural';
import {
    createFundamentalAgent,
    createMarketAgent,
    createAggressiveDebater,
    createConservativeDebater,
    createNeutralDebater,
    createRiskManager,
} from './agents';
import {hostSpeak, getTopic} from './conversation';

// const tfidf = new TfIdf();
//
// // 添加文档
// tfidf.addDocument('I want to book a flight to Beijing tomorrow');
// tfidf.addDocument('Can you help me cancel my hotel reservation');
// tfidf.addDocument('Show me the weather forecast for Shanghai');
//
// // 计算特定词的 TF-IDF 值
// console.log('TF-IDF for "book":', tfidf.tfidf('book', 0));
// console.log('TF-IDF for "flight":', tfidf.tfidf('flight', 0));
//
// // 获取文档的前N个重要词
// tfidf.listTerms(0).slice(0, 5).forEach((item) => {
//     console.log(item.term + ': ' + item.tfidf);
// });

export const main = async () => {
    const topic = getTopic() || '贵州茅台';
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
    hostSpeak('现在请激进辩论者基于报告内容提出交易观点。');
    await aggressiveDebater.speak({type: '立论'});
    hostSpeak('现在请保守辩论者基于报告内容提出交易观点。');
    await conservativeDebater.speak({type: '立论'});
    hostSpeak('现在请中立辩论者基于报告内容提出交易观点。');
    await neutralDebater.speak({type: '立论'});
    hostSpeak('现在请激进辩论者反驳保守和中立方的论点。');
    await aggressiveDebater.speak({type: '辩论'});
    hostSpeak('现在请保守辩论者反驳激进和中立方的论点。');
    await conservativeDebater.speak({type: '辩论'});
    hostSpeak('现在请中立辩论者反驳激进和保守方的论点。');
    await neutralDebater.speak({type: '辩论'});
    hostSpeak('现在请交易经理总结各方论点，并提出最终的交易策略。');
    await riskManager.speak({type: '总结'});
};
