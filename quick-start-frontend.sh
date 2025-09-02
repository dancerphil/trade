#!/bin/bash

echo "🚀 快速启动前端开发服务器..."

cd frontend

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装前端依赖..."
    npm install
fi

echo "🌐 启动 Next.js 开发服务器..."
npm run dev
