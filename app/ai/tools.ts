import {tool, ToolSet} from 'ai';
import {z} from 'zod';
import {
    apiGetNearestDailyOfWeek,
    apiGetNearestDailyOfMonth,
    apiGetNearestDailyBasicOfWeek,
    apiGetNearestDailyBasicOfMonth,
} from './api';
import {R, ParamsTsCode, Daily, DailyBasic} from './apiTypes';
import {dailyBasicSchema, dailySchema} from './schema';

const ts_code = z.string().describe('股票代码，例如 AAPL。上海证券交易所: 添加 .SS 或 .SH 后缀。深圳证券交易所: 添加 .SZ 后缀');

const marketDailyOfWeek = tool<ParamsTsCode, R<Daily[]>>({
    description: '获取股票的市场数据，输入股票代码，按天返回该股票过去一周的市场数据',
    inputSchema: z.object({ts_code}),
    outputSchema: dailySchema,
    execute: apiGetNearestDailyOfWeek,
});

const marketDailyOfMonth = tool<ParamsTsCode, R<Daily[]>>({
    description: '获取股票的市场数据，输入股票代码，按天返回该股票过去一个月的市场数据',
    inputSchema: z.object({ts_code}),
    outputSchema: dailySchema,
    execute: apiGetNearestDailyOfMonth,
});

const fundamentalDailyOfWeek = tool<ParamsTsCode, R<DailyBasic[]>>({
    description: '获取股票的基本面数据，输入股票代码，按天返回该股票过去一周的基本面数据',
    inputSchema: z.object({ts_code}),
    outputSchema: dailyBasicSchema,
    execute: apiGetNearestDailyBasicOfWeek,
});

const fundamentalDailyOfMonth = tool<ParamsTsCode, R<DailyBasic[]>>({
    description: '获取股票的基本面数据，输入股票代码，按天返回该股票过去一周的基本面数据',
    inputSchema: z.object({ts_code}),
    outputSchema: dailyBasicSchema,
    execute: apiGetNearestDailyBasicOfMonth,
});

export const tools: ToolSet = {
    marketDailyOfWeek,
    marketDailyOfMonth,
    fundamentalDailyOfWeek,
    fundamentalDailyOfMonth,
};
