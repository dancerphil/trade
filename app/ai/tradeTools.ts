// import {tool} from 'ai';
// import {z} from 'zod';
// import {finnhubQuote, FinnhubQuote, ParamsFinnhubQuote} from '../../../dancerphil.github.com/src/api/finnhub';

// const marketData = tool<ParamsFinnhubQuote, FinnhubQuote>({
//     description: '获取股票的市场数据，输入股票代码，返回对应的市场数据',
//     inputSchema: z.object({
//         symbol: z.string().describe('股票代码，例如 AAPL。上海证券交易所: 添加 .SS 或 .SH 后缀。深圳证券交易所: 添加 .SZ 后缀'),
//     }),
//     execute: finnhubQuote,
// });

export const tradeTools = {
    // weather,
    // marketData,
};
