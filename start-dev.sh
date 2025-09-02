#!/bin/bash

echo "🚀 启动开发环境..."

# 检查是否安装了 Docker 和 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker"
    exit 1
fi

# 启动服务
echo "📦 启动前后端服务..."
docker-compose up -d

echo "✅ 服务已启动："
echo "   前端: http://localhost:3000"
echo "   后端: http://localhost:8000"
echo "   后端文档: http://localhost:8000/docs"

echo ""
echo "💡 使用以下命令查看日志:"
echo "   docker-compose logs -f"
echo ""
echo "💡 停止服务:"
echo "   docker-compose down"
