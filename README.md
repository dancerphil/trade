# Trade Platform

一个包含 Next.js 前端和 Python API 后端的交易平台项目，可部署在 Zeabur 上。

## 快速开始

### 方式1：最简单的本地开发（推荐）

```bash
# 启动前端（在第一个终端窗口）
chmod +x quick-start-frontend.sh
./quick-start-frontend.sh

# 启动后端（在第二个终端窗口）
chmod +x quick-start-backend.sh
./quick-start-backend.sh
```

### 方式2：一键启动本地开发环境

```bash
chmod +x start-dev.sh
./start-dev.sh local
```

### 方式3：使用 Docker（如果已安装）

```bash
./start-dev.sh
```

## 访问地址
- 前端：http://localhost:3000
- 后端：http://localhost:8000
- API 文档：http://localhost:8000/docs

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
