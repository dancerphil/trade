from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from utils import daily
import pandas

app = FastAPI()

def toData(df: pandas.DataFrame):
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

@app.get("/api/health")
async def health_check():
    return {"success": True}

@app.get("/api/daily")
async def get_daily(
    ts_code: str = Query(..., description="股票代码，如：000001.SZ"),
    trade_date: str = Query("", description="交易日期，格式：YYYYMMDD"),
    start_date: str = Query("", description="开始日期，格式：YYYYMMDD"),
    end_date: str = Query("", description="结束日期，格式：YYYYMMDD"),
):
    """
    获取股票日线数据
    """
    result = daily(
        ts_code=ts_code,
        trade_date=trade_date,
        start_date=start_date,
        end_date=end_date,
    )
    return toData(result)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
