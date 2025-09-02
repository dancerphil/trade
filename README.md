# Trade Platform

一个包含 Next.js 前端和 Python API 后端的交易平台项目，可部署在 Zeabur 上。

## 项目结构

```
trade/
├── frontend/          # Next.js 前端应用
├── backend/           # Python FastAPI 后端服务  
├── docker-compose.yml # 本地开发环境
└── README.md
```

## 部署说明

### Zeabur 部署
1. 前端服务：自动检测 Next.js 项目，使用 `frontend` 目录
2. 后端服务：自动检测 Python 项目，使用 `backend` 目录

### 本地开发
```bash
# 启动所有服务
docker-compose up -d

# 或者分别启动
cd frontend && npm run dev
cd backend && uvicorn main:app --reload
```

## 端口配置
- 前端：3000
- 后端：8000
