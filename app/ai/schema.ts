import {z} from 'zod';

export const dailySchema = z.object({
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
