import {z, ZodRawShape} from 'zod';

export const createListResponseSchema = <T extends ZodRawShape>(schema: T, description: string) => {
    return z.object({
        success: z.boolean().describe('请求是否成功'),
        message: z.string().optional().describe('响应消息，通常在错误时提供详细信息'),
        data: z.array(z.object(schema)).describe(description),
    });
};

export const dailySchema = createListResponseSchema(
    {
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
    },
    '按天返回股票在指定时间段内的交易数据',
);

export const dailyBasicSchema = createListResponseSchema(
    {
        ts_code: z.string().describe('股票代码'),
        trade_date: z.string().describe('交易日期，格式为 YYYYMMDD'),
        close: z.number().describe('当日收盘价（元）'),
        turnover_rate: z.number().describe('换手率（%）'),
        turnover_rate_f: z.number().describe('换手率（自由流通股）（%）'),
        volume_ratio: z.number().describe('量比'),
        pe: z.number().describe('市盈率（总市值/净利润，亏损的PE为空）'),
        pe_ttm: z.number().describe('市盈率（TTM，亏损的PE为空）'),
        pb: z.number().describe('市净率（总市值/净资产）'),
        ps: z.number().describe('市销率'),
        ps_ttm: z.number().describe('市销率（TTM）'),
        dv_ratio: z.number().describe('股息率（%）'),
        dv_ttm: z.number().describe('股息率（TTM）（%）'),
        total_share: z.number().describe('总股本（万股）'),
        float_share: z.number().describe('流通股本（万股）'),
        free_share: z.number().describe('自由流通股本（万股）'),
        total_mv: z.number().describe('总市值（万元）'),
        circ_mv: z.number().describe('流通市值（万元）'),
    },
    '按天返回股票在指定时间段内的重要的基本面指标',
);
