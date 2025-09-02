# Zeabur 部署配置

本项目已配置为可在 Zeabur 平台上部署的微服务架构。

## 🚀 快速部署（修复版本）

### 前端服务 (Next.js)
- **服务名称**: trade-frontend
- **根目录**: `/frontend`
- **自动构建**: Zeabur 会自动检测 Next.js 项目
- **端口**: 3000 (自动分配)

### 后端服务 (Python FastAPI)
- **服务名称**: trade-backend  
- **根目录**: `/backend`
- **Python 版本**: 3.11 (通过 runtime.txt 指定)
- **启动命令**: `uvicorn main:app --host 0.0.0.0 --port $PORT` (通过 Procfile 指定)
- **端口**: 8000 (或 Zeabur 自动分配)

## 📋 部署前检查清单

✅ **后端必需文件**:
- `main.py` - FastAPI 应用主文件 ✅
- `requirements.txt` - Python 依赖文件 ✅  
- `Procfile` - 启动命令配置 ✅
- `runtime.txt` - Python 版本指定 ✅

✅ **前端必需文件**:
- `package.json` - Node.js 项目配置 ✅
- `next.config.js` - Next.js 配置 ✅
- `src/app/` - 应用页面文件 ✅

## 🔧 环境变量配置

### 前端环境变量
在 Zeabur 前端服务中设置：
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend-domain.zeabur.app
NEXT_TELEMETRY_DISABLED=1
```

### 后端环境变量
在 Zeabur 后端服务中设置：
```
DEBUG=False
PORT=8000
ALLOWED_ORIGINS=https://your-frontend-domain.zeabur.app
SECRET_KEY=your-production-secret-key-please-change-this
```

## 📝 详细部署步骤

1. **推送代码到 GitHub 仓库**
   ```bash
   git add .
   git commit -m "Fix: 修复 Zeabur 部署配置"
   git push origin main
   ```

2. **在 Zeabur 中创建项目**
   - 登录 Zeabur 控制台
   - 点击 "New Project"
   - 连接您的 GitHub 仓库

3. **部署后端服务**
   - 点击 "Add Service" -> "Git"
   - 选择仓库和 `backend` 目录
   - Zeabur 会自动检测到 Python 项目并使用 Procfile 启动
   - 等待构建完成并获取后端域名

4. **部署前端服务**
   - 点击 "Add Service" -> "Git"  
   - 选择仓库和 `frontend` 目录
   - 在环境变量中设置 `NEXT_PUBLIC_API_URL` 为后端域名
   - 等待构建完成

5. **配置跨域**
   - 在后端服务环境变量中设置 `ALLOWED_ORIGINS` 为前端域名
   - 重启部署后端服务

## ⚠️ 常见问题解决

**Q: 部署失败，没有运行时日志？**
A: 通常是构建阶段失败，检查：
- `requirements.txt` 是否包含所有依赖 ✅ 已修复
- `main.py` 是否存在且包含 FastAPI 应用 ✅ 已修复  
- `Procfile` 启动命令是否正确 ✅ 已修复

**Q: 前后端无法通信？**
A: 检查跨域配置：
- 前端 `NEXT_PUBLIC_API_URL` 是否指向正确的后端域名
- 后端 `ALLOWED_ORIGINS` 是否包含前端域名

## 🎯 测试部署

部署完成后访问：
- 前端: https://your-frontend-domain.zeabur.app
- 后端: https://your-backend-domain.zeabur.app  
- API 文档: https://your-backend-domain.zeabur.app/docs
