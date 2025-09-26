import {createFactory} from 'axios-interface';
import {z} from 'zod';
import {format, subDays} from 'date-fns';

const {createInterface} = createFactory();

export interface R<T = any> {
    success: boolean;
    message?: string;
    data: T;
}

export const apiGetHealth = createInterface<void, R>(
    'GET',
    '/api/health',
);

export interface ParamsDaily {
    ts_code: string; // 股票代码
    trade_date?: string; // 交易日期 (格式: YYYYMMDD)
    start_date?: string; // 开始日期 (格式: YYYYMMDD)
    end_date?: string; // 结束日期 (格式: YYYYMMDD)
}

export interface MarketDaily {
    ts_code: string; // 股票代码
    trade_date: string; // 交易日期 (格式: YYYYMMDD)
    open: number; // 开盘价
    high: number; // 最高价
    low: number; // 最低价
    close: number; // 收盘价
    pre_close: number; // 昨收价
    change: number; // 涨跌额
    pct_chg: number; // 涨跌幅
    vol: number; // 成交量 (手)
    amount: number; // 成交额 (千元)
}

export const marketSchema = z.object({
    success: z.boolean().describe('请求是否成功'),
    message: z.string().optional().describe('响应消息，通常在错误时提供详细信息'),
    data: z.array(z.object({
        ts_code: z.string().describe('股票代码'),
        trade_date: z.string().describe('交易日期，格式为 YYYYMMDD'),
        open: z.number().describe('开盘价（元）'),
        high: z.number().describe('最高价（元）'),
        low: z.number().describe('最低价（元）'),
        close: z.number().describe('收盘价（元）'),
        pre_close: z.number().describe('昨日收盘价（元）'),
        change: z.number().describe('涨跌额（元），正数表示上涨，负数表示下跌'),
        pct_chg: z.number().describe('涨跌幅（%），正数表示上涨百分比，负数表示下跌百分比'),
        vol: z.number().describe('成交量（手），1手=100股'),
        amount: z.number().describe('成交额（千元）'),
    })).describe('股票日线数据数组，包含指定时间段内的每日交易数据'),
});

export const apiGetDaily = createInterface<ParamsDaily, R<MarketDaily[]>>(
    'GET',
    '/api/daily',
);

interface ParamsTsCode {
    ts_code: string; // 股票代码
}

export const apiGetNearestWeek = (params: ParamsTsCode) => {
    const now = new Date();
    // 股票数据通常滞后一天，所以结束日期设为昨天
    const endDate = subDays(now, 1);
    // 开始日期为结束日期往前推7天
    const startDate = subDays(endDate, 6);

    return apiGetDaily({
        ts_code: params.ts_code,
        start_date: format(startDate, 'yyyyMMdd'),
        end_date: format(endDate, 'yyyyMMdd'),
    });
};
