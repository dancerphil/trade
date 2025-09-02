#!/bin/bash

echo "🚀 快速启动后端服务器..."

cd backend

# 检查是否已安装依赖
if [ ! -d "venv" ]; then
    echo "🐍 创建 Python 虚拟环境..."
    python3 -m venv venv
fi

echo "🔧 激活虚拟环境并安装依赖..."
source venv/bin/activate
pip install -r requirements.txt

echo "🌐 启动 FastAPI 服务器..."
python3 main.py
