#!/bin/bash

echo "Checking service status..."
echo ""

# 检查端口占用情况
echo "Port status:"
netstat -tulpn 2>/dev/null | grep -E ':(3000|9090)' || echo "No services found on ports 3000 or 9090"

echo ""
echo "Node.js processes:"
ps aux | grep -E '(vite|node.*index\.js)' | grep -v grep | grep -v cursor || echo "No project-related Node.js processes found"

echo ""
echo "If services are running:"
echo "  Frontend: http://localhost:3000"
echo "  Backend: http://localhost:9090" 