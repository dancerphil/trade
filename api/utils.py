# 导入tushare
import tushare as ts
import pandas as pd
from typing import Optional, Dict, Any

# 初始化pro接口
pro = ts.pro_api('f38aca0a7a767214233ae6d421ac4988cae7d9c2520c23731932cba9')

def daily(
    ts_code: str = "",
    trade_date: str = "",
    start_date: str = "",
    end_date: str = "",
) -> Dict[str, Any]:
    """
    获取股票日线数据

    Args:
        ts_code: 股票代码
        trade_date: 交易日期
        start_date: 开始日期
        end_date: 结束日期

    Returns:
        包含股票日线数据的字典
    """
    return pro.daily(**{
            "ts_code": ts_code,
            "trade_date": trade_date,
            "start_date": start_date,
            "end_date": end_date,
            "limit": "",
            "offset": ""
        }, fields=[
            "ts_code",
            "trade_date",
            "open",
            "high",
            "low",
            "close",
            "pre_close",
            "change",
            "pct_chg",
            "vol",
            "amount"
        ])
