from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from tushareApi import get_daily_data

app = FastAPI()

# 添加 CORS 中间件以支持前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js 开发服务器地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"success": True}

@app.get("/api/daily")
async def get_daily(
    ts_code: str = Query(..., description="股票代码，如：000001.SZ"),
    trade_date: str = Query("", description="交易日期，格式：YYYYMMDD"),
    start_date: str = Query("", description="开始日期，格式：YYYYMMDD"),
    end_date: str = Query("", description="结束日期，格式：YYYYMMDD"),
    limit: int = Query(100, description="数据条数限制")
):
    """
    获取股票日线数据
    """
    result = get_daily_data(
        ts_code=ts_code,
        trade_date=trade_date,
        start_date=start_date,
        end_date=end_date,
        limit=limit
    )
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
