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

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境中应该配置具体的域名
    allow_credentials=True,
    allow_methods=["*"],
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
