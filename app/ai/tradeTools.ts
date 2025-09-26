import {tool, ToolSet} from 'ai';
import {z} from 'zod';
import {
    apiGetHealth,
    apiGetNearestWeek,
    ParamsDaily,
    R,
    MarketDaily,
    marketSchema,
} from '../api/tushare';

type EmptyObject = Record<string, never>;

const health = tool<EmptyObject, R>({
    description: '检查系统健康状态，返回系统的健康信息',
    inputSchema: z.object({}),
    execute: () => apiGetHealth(),
});

const marketWeekly = tool<ParamsDaily, R<MarketDaily[]>>({
    description: '获取股票的市场数据，输入股票代码，返回该股票过去一周的市场数据',
    inputSchema: z.object({
        ts_code: z.string().describe('股票代码，例如 AAPL。上海证券交易所: 添加 .SS 或 .SH 后缀。深圳证券交易所: 添加 .SZ 后缀'),
    }),
    outputSchema: marketSchema,
    execute: apiGetNearestWeek,
});

export const tradeTools: ToolSet = {
    health,
    marketWeekly,
};
