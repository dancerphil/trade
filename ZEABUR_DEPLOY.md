# Zeabur 部署配置

本项目已配置为可在 Zeabur 平台上部署的微服务架构。

## 🚀 部署成功 - 域名配置

### 实际部署信息
- **公网访问域名**: `tradingagents.zeabur.app`
- **内网访问端口**: `trade.zeabur.internal:8080`
- **端口**: 8080

### 前端服务 (Next.js)
- **服务名称**: trade-frontend
- **根目录**: `/frontend`
- **访问地址**: https://tradingagents.zeabur.app

### 后端服务 (Python FastAPI)
- **服务名称**: trade-backend  
- **根目录**: `/backend`
- **访问地址**: https://tradingagents.zeabur.app
- **API 文档**: https://tradingagents.zeabur.app/docs

## 🔧 已更新的配置

### 后端 CORS 配置 ✅
已更新 `backend/main.py`，允许来自以下源的请求：
- `https://tradingagents.zeabur.app`
- `http://tradingagents.zeabur.app` 
- `http://trade.zeabur.internal:8080`
- 本地开发环境

### 前端 API 配置 ✅
已更新 `frontend/next.config.js` 和 `frontend/src/lib/api.ts`：
- 默认 API 地址：`https://tradingagents.zeabur.app`
- 支持通过环境变量 `NEXT_PUBLIC_API_URL` 覆盖

### 前端测试功能 ✅
已添加 API 连接测试按钮，可以直接在页面上验证前后端通信状态

## 📝 重新部署步骤

1. **推送更新的代码**
   ```bash
   git add .
   git commit -m "Fix: 配置 Zeabur 实际域名和端口"
   git push origin main
   ```

2. **重新部署服务**
   - 在 Zeabur 控制台触发重新部署
   - 或者等待自动部署完成

3. **测试连接**
   - 访问：https://tradingagents.zeabur.app
   - 点击页面上的 "测试 API 连接" 按钮
   - 查看连接状态

## 🎯 验证部署

访问以下地址验证部署：
- **前端页面**: https://tradingagents.zeabur.app
- **后端健康检查**: https://tradingagents.zeabur.app/health
- **API 状态**: https://tradingagents.zeabur.app/api/status
- **API 文档**: https://tradingagents.zeabur.app/docs

## ⚠️ 如果仍然无法访问

1. **检查 Zeabur 服务状态**
   - 确认两个服务都已成功部署并运行
   - 查看部署日志是否有错误

2. **检查域名解析**
   - 确认 `tradingagents.zeabur.app` 可以正常解析
   - 尝试访问 https://tradingagents.zeabur.app/health

3. **检查端口配置**
   - 确认 Zeabur 中的端口设置为 8080
   - 检查防火墙或网络限制
