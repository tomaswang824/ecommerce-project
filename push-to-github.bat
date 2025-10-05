@echo off
echo ========================================
echo 推送代码到 GitHub
echo ========================================
echo.

echo 正在添加远程仓库...
git remote add origin https://github.com/tomaswang824/ecommerce-project.git

echo.
echo 正在推送到 GitHub...
git push -u origin main

echo.
echo ========================================
echo 推送完成！
echo ========================================
echo.
echo 访问你的仓库: https://github.com/tomaswang824/ecommerce-project
echo.
pause
