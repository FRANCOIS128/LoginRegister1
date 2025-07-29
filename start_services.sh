#!/bin/bash

# 进入项目根目录
cd "$(dirname "$0")"

echo "Starting backend service..."
# 启动后端服务，使用 nohup 和 disown 确保进程完全分离
cd backend
nohup pnpm start > backend.log 2>&1 &
BACKEND_PID=$!
disown
echo "Backend started with PID: $BACKEND_PID (check backend/backend.log for logs)"

# 等待后端启动
sleep 3

cd ../frontend
echo "Starting frontend service..."
# 启动前端服务，使用 nohup 和 disown 确保进程完全分离
nohup pnpm dev:host > frontend.log 2>&1 &
FRONTEND_PID=$!
disown
echo "Frontend started with PID: $FRONTEND_PID (check frontend/frontend.log for logs)"

echo ""
echo "Services started successfully!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:9090"
echo ""
echo "To stop services, run: ./stop_services.sh"
echo "To check logs:"
echo "  Backend: tail -f backend/backend.log"
echo "  Frontend: tail -f frontend/frontend.log" 