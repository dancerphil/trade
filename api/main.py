from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from tushare import pro_api
from pandas import DataFrame
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
from fastapi_cache.decorator import cache

# 初始化pro接口
pro = pro_api('f38aca0a7a767214233ae6d421ac4988cae7d9c2520c23731932cba9')

app = FastAPI()

def toData(df: DataFrame):
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

# 添加 CORS 中间件以支持前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js 开发服务器地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

expire = 600  # 缓存时间，单位秒

query_ts_code = Query(..., description="股票代码，如：000001.SZ")
query_trade_date = Query("", description="交易日期，格式：YYYYMMDD")
query_start_date = Query("", description="开始日期，格式：YYYYMMDD")
query_end_date = Query("", description="结束日期，格式：YYYYMMDD")

@app.on_event("startup")
async def startup():
    """初始化内存缓存"""
    FastAPICache.init(InMemoryBackend())

@app.get("/api/health")
async def health_check():
    return {"success": True}

@app.get("/api/stock")
@cache(expire=3600)
async def stock():
    """
    获取股票列表
    """
    result = pro.stock_basic(
        fields=["ts_code", "name", "cnspell"]
    )
    return toData(result)

@app.get("/api/daily")
@cache(expire=expire)
async def get_daily(
    ts_code: str = query_ts_code,
    trade_date: str = query_trade_date,
    start_date: str = query_start_date,
    end_date: str = query_end_date,
):
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
    result = pro.daily(
        ts_code=ts_code,
        trade_date=trade_date,
        start_date=start_date,
        end_date=end_date,
        fields=[
            "ts_code", "trade_date", "open", "high", "low", "close", "pre_close", "change", "pct_chg", "vol", "amount"
        ]
    )
    return toData(result)

@app.get("/api/daily_basic")
@cache(expire=expire)
def get_daily_basic(
    ts_code: str = query_ts_code,
    trade_date: str = query_trade_date,
    start_date: str = query_start_date,
    end_date: str = query_end_date,
):
    """
    获取每日指标数据（市盈率、市净率等）

    Args:
        ts_code: 股票代码
        trade_date: 交易日期
        start_date: 开始日期
        end_date: 结束日期
    """
    result = pro.daily_basic(
        ts_code=ts_code,
        trade_date=trade_date,
        start_date=start_date,
        end_date=end_date,
        fields=[
            "ts_code", "trade_date", "close", "turnover_rate", "turnover_rate_f",
            "volume_ratio", "pe", "pe_ttm", "pb", "ps", "ps_ttm",
            "dv_ratio", "dv_ttm", "total_share", "float_share", "free_share",
            "total_mv", "circ_mv"
        ]
    )
    return toData(result)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

