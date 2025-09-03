// import {TfIdf} from 'natural';
import {createFundamentalAgent, createMarketAgent} from './agents';
import {hostSpeak} from './conversation';

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
    hostSpeak('此次会议主要分析贵州茅台交易策略。分为三个阶段：产出分析报告、交易策略讨论、总结。');
    hostSpeak('现在请基本面分析师用一句话聊一聊贵州茅台的基本面。');
    const fundamentalAgent = createFundamentalAgent();
    await fundamentalAgent.speak({type: '闲聊'});
    hostSpeak('现在请基本面分析师分析贵州茅台过去一周的基本面信息，并撰写一份全面的公司基本面信息报告。');
    await fundamentalAgent.speak({type: '分析'});
    hostSpeak('现在请技术分析师用一句话聊一聊贵州茅台的技术面。');
    const marketAgent = createMarketAgent();
    await marketAgent.speak({type: '闲聊'});
    hostSpeak('现在请技术分析师分析贵州茅台过去一周的市场数据，并撰写一份全面的技术分析报告。');
    await marketAgent.speak({type: '分析'});
};
