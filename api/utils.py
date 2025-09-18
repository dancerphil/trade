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
    limit: int = 100,
    offset: int = 0
) -> Dict[str, Any]:
    """
    获取股票日线数据

    Args:
        ts_code: 股票代码
        trade_date: 交易日期
        start_date: 开始日期
        end_date: 结束日期
        limit: 数据条数限制
        offset: 数据偏移量

    Returns:
        包含股票日线数据的字典
    """
    try:
        # 拉取数据
        df = pro.daily(**{
            "ts_code": ts_code,
            "trade_date": trade_date,
            "start_date": start_date,
            "end_date": end_date,
            "limit": str(limit) if limit else "",
            "offset": str(offset) if offset else ""
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

        # 将 DataFrame 转换为字典格式
        if not df.empty:
            return {
                "success": True,
                "data": df.to_dict('records'),
                "count": len(df)
            }
        else:
            return {
                "success": True,
                "data": [],
                "count": 0,
                "message": "No data found"
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "data": []
        }
