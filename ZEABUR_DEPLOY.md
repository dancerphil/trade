# Zeabur 配置

本项目已配置为可在 Zeabur 平台上部署的微服务架构。

## 部署说明

### 前端服务 (Next.js)
- **服务名称**: trade-frontend
- **根目录**: `/frontend`
- **构建命令**: `npm run build`
- **启动命令**: `npm start`
- **端口**: 3000

### 后端服务 (Python FastAPI)
- **服务名称**: trade-backend  
- **根目录**: `/backend`
- **构建命令**: `pip install -r requirements.txt`
- **启动命令**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **端口**: 8000 (或 Zeabur 自动分配)

## 环境变量配置

### 前端环境变量
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.zeabur.app
```

### 后端环境变量
```
PORT=8000
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_ORIGINS=https://your-frontend-domain.zeabur.app
```

## 部署步骤

1. 推送代码到 GitHub 仓库
2. 在 Zeabur 中连接 GitHub 仓库
3. 分别创建两个服务：
   - 前端服务：选择 `/frontend` 目录
   - 后端服务：选择 `/backend` 目录
4. 配置环境变量
5. 部署完成后，前端会自动连接到后端 API
