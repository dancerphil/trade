from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时执行
    print("🚀 Starting Trade API Server...")
    yield
    # 关闭时执行
    print("👋 Shutting down Trade API Server...")

app = FastAPI(
    title="Trade API",
    description="Trading Platform Backend API",
    version="1.0.0",
    lifespan=lifespan
)

# 获取允许的源地址
allowed_origins = [
    "https://tradingagents.zeabur.app",  # Zeabur 公网域名
    "http://tradingagents.zeabur.app",   # HTTP 版本
    "https://tradingagents.zeabur.app:8080",  # 带端口
    "http://localhost:3000",  # 本地开发
    "http://localhost:8080",  # 本地测试
    "http://trade.zeabur.internal:8080",  # 内网访问
]

# 从环境变量获取额外的允许源
env_origins = os.getenv("ALLOWED_ORIGINS", "")
if env_origins:
    allowed_origins.extend(env_origins.split(","))

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# 根路由
@app.get("/")
async def root():
    return {"message": "Trade Platform API", "status": "running"}

# 健康检查
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "trade-api"}

# API 路由组
@app.get("/api/status")
async def api_status():
    return {"api_version": "1.0.0", "status": "active"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=False
    )
