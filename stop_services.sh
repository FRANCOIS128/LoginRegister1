#!/bin/bash

echo "Stopping services..."

# 停止所有 node 和 vite 相关进程（排除 Cursor 进程）
pkill -f "vite" 
pkill -f "node.*index.js"
pkill -f "node --watch index.js"

echo "Services stopped."

# 清理日志文件（可选）
read -p "Do you want to clear log files? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    rm -f backend/backend.log frontend/frontend.log
    echo "Log files cleared."
fi 