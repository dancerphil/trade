export interface R<T = any> {
    success: boolean;
    message?: string;
    data: T;
}

export interface ParamsDaily {
    ts_code: string; // 股票代码
    trade_date?: string; // 交易日期 (格式: YYYYMMDD)
    start_date?: string; // 开始日期 (格式: YYYYMMDD)
    end_date?: string; // 结束日期 (格式: YYYYMMDD)
}

export interface ParamsTsCode {
    ts_code: string; // 股票代码
}

export interface Daily {
    ts_code: string; // 股票代码
    trade_date: string; // 交易日期，格式为 YYYYMMDD
    open: number; // 开盘价
    high: number; // 最高价
    low: number; // 最低价
    close: number; // 收盘价
    pre_close: number; // 昨日收盘价
    change: number; // 涨跌额
    pct_chg: number; // 涨跌幅
    vol: number; // 成交量 (手)
    amount: number; // 成交额 (千元)
}

export interface DailyBasic {
    ts_code: string; // TS股票代码
    trade_date: string; // 交易日期
    close: number; // 当日收盘价
    turnover_rate: number; // 换手率（%）
    turnover_rate_f: number; // 换手率（自由流通股）
    volume_ratio: number; // 量比
    pe: number; // 市盈率（总市值/净利润， 亏损的PE为空）
    pe_ttm: number; // 市盈率（TTM，亏损的PE为空）
    pb: number; // 市净率（总市值/净资产）
    ps: number; // 市销率
    ps_ttm: number; // 市销率（TTM）
    dv_ratio: number; // 股息率 （%）
    dv_ttm: number; // 股息率（TTM）（%）
    total_share: number; // 总股本 （万股）
    float_share: number; // 流通股本 （万股）
    free_share: number; // 自由流通股本 （万）
    total_mv: number; // 总市值 （万元）
    circ_mv: number; // 流通市值（万元）
}
