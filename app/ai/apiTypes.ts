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
