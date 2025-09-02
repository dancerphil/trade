#!/bin/bash

echo "🚀 启动开发环境..."

# 检查参数
if [ "$1" = "local" ]; then
    echo "📦 本地开发模式 - 不使用 Docker"

    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装，请先安装 Node.js"
        exit 1
    fi

    # 检查 Python
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python3 未安装，请先安装 Python3"
        exit 1
    fi

    echo "🔧 安装前端依赖..."
    cd frontend && npm install

    echo "🔧 安装后端依赖..."
    cd ../backend && pip install -r requirements.txt

    echo "🚀 启动后端服务..."
    cd ../backend
    python3 main.py &
    BACKEND_PID=$!

    echo "🚀 启动前端服务..."
    cd ../frontend
    npm run dev &
    FRONTEND_PID=$!

    echo "✅ 服务已启动："
    echo "   前端: http://localhost:3000"
    echo "   后端: http://localhost:8000"
    echo "   后端文档: http://localhost:8000/docs"
    echo ""
    echo "💡 按 Ctrl+C 停止所有服务"

    # 等待用户中断
    trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
    wait

else
    # 检查是否安装了 Docker 和 Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose 未安装，请先安装 Docker"
        echo "💡 或者使用本地开发模式: ./start-dev.sh local"
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
fi
