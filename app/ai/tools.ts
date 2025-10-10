import {tool, ToolSet} from 'ai';
import {z} from 'zod';
import {
    apiGetNearestWeekDaily,
    apiGetNearestMonthDaily,
} from './api';
import {R, ParamsDaily, Daily} from './apiTypes';
import {dailySchema} from './schema';

const marketWeekDaily = tool<ParamsDaily, R<Daily[]>>({
    description: '获取股票的市场数据，输入股票代码，按天返回该股票过去一周的市场数据',
    inputSchema: z.object({
        ts_code: z.string().describe('股票代码，例如 AAPL。上海证券交易所: 添加 .SS 或 .SH 后缀。深圳证券交易所: 添加 .SZ 后缀'),
    }),
    outputSchema: dailySchema,
    execute: apiGetNearestWeekDaily,
});

const marketMonthDaily = tool<ParamsDaily, R<Daily[]>>({
    description: '获取股票的市场数据，输入股票代码，按天返回该股票过去一个月的市场数据',
    inputSchema: z.object({
        ts_code: z.string().describe('股票代码，例如 AAPL。上海证券交易所: 添加 .SS 或 .SH 后缀。深圳证券交易所: 添加 .SZ 后缀'),
    }),
    outputSchema: dailySchema,
    execute: apiGetNearestMonthDaily,
});

export const tools: ToolSet = {
    marketWeekDaily,
    marketMonthDaily,
};
