# 🐙 GitHub 仓库设置指南

将项目推送到 GitHub 并连接 Vercel 自动部署。

---

## 📋 前置准备

- [x] GitHub 账号
- [x] Git 已安装
- [x] 项目代码准备就绪

---

## 🚀 快速开始

### 方式一：命令行创建（推荐）

#### 1. 初始化 Git 仓库

```bash
# 进入项目根目录
cd ecommerce-project

# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "🎉 Initial commit: E-commerce platform with React + Node.js"
```

#### 2. 创建 GitHub 仓库

访问 https://github.com/new 创建新仓库：

**仓库设置**：
- **Repository name**: `ecommerce-project`
- **Description**: `全栈电商平台 - React + TypeScript + Node.js + MongoDB`
- **Visibility**: 选择 Public 或 Private
- **不要**勾选 "Add a README file"
- **不要**勾选 "Add .gitignore"
- **不要**选择 License（已有文件）

点击 **Create repository**

#### 3. 关联远程仓库并推送

```bash
# 关联远程仓库（替换成你的用户名）
git remote add origin https://github.com/你的用户名/ecommerce-project.git

# 设置主分支
git branch -M main

# 推送代码
git push -u origin main
```

### 方式二：使用 GitHub CLI

#### 1. 安装 GitHub CLI

```bash
# Windows (使用 winget)
winget install --id GitHub.cli

# macOS
brew install gh

# Linux
sudo apt install gh
```

#### 2. 登录 GitHub

```bash
gh auth login
```

#### 3. 创建并推送仓库

```bash
# 进入项目目录
cd ecommerce-project

# 初始化 Git
git init
git add .
git commit -m "🎉 Initial commit"

# 创建 GitHub 仓库并推送
gh repo create ecommerce-project --public --source=. --remote=origin --push
```

就这么简单！✨

---

## 🔐 配置 Git 忽略敏感文件

确保 `.gitignore` 包含以下内容（已配置）：

```gitignore
# 环境变量 - 重要！
**/.env
**/.env.local
**/.env.production
**/.env.development

# 但保留示例文件
!**/.env.example

# 依赖
node_modules/

# 构建输出
dist/
build/
```

---

## 🔗 连接 Vercel 自动部署

### 1. 访问 Vercel

1. 打开 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 **"Add New Project"**

### 2. 导入 GitHub 仓库

1. 在 **Import Git Repository** 中找到 `ecommerce-project`
2. 点击 **Import**

### 3. 配置项目设置

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. 添加环境变量

在 **Environment Variables** 添加：

```bash
VITE_API_URL=https://api.your-domain.com
VITE_APP_TITLE=电商平台
VITE_NODE_ENV=production
VITE_DEBUG=false
```

### 5. 部署

点击 **Deploy** 按钮

---

## 🔄 自动部署工作流

配置完成后：

```bash
# 修改代码
vim src/pages/Home.tsx

# 提交更改
git add .
git commit -m "feat: 更新首页设计"

# 推送到 GitHub
git push

# ✨ Vercel 自动检测并部署！
```

**部署状态**：
- 推送到 `main` 分支 → 生产环境部署
- 推送到其他分支 → 预览环境部署
- 创建 Pull Request → 自动生成预览链接

---

## 📝 提交规范

使用语义化提交信息：

```bash
# 新功能
git commit -m "feat: 添加用户收藏功能"

# 修复 Bug
git commit -m "fix: 修复购物车数量显示问题"

# 文档更新
git commit -m "docs: 更新 API 文档"

# 样式修改
git commit -m "style: 优化商品卡片样式"

# 重构
git commit -m "refactor: 重构用户认证逻辑"

# 性能优化
git commit -m "perf: 优化图片加载性能"

# 测试
git commit -m "test: 添加购物车单元测试"

# 构建/部署
git commit -m "build: 更新 Vite 配置"
git commit -m "ci: 配置 GitHub Actions"
```

---

## 🌿 分支管理策略

### 推荐工作流：

```bash
# 主分支（生产环境）
main

# 开发分支
develop

# 功能分支
feature/user-profile
feature/payment-integration

# 修复分支
fix/cart-bug
hotfix/security-patch
```

### 创建功能分支

```bash
# 从 main 创建新分支
git checkout -b feature/new-feature

# 开发完成后推送
git push -u origin feature/new-feature

# 在 GitHub 创建 Pull Request
# Vercel 会自动创建预览部署
```

---

## 🛡️ 保护主分支

### 在 GitHub 设置分支保护规则：

1. 进入仓库 → **Settings** → **Branches**
2. 点击 **Add rule**
3. Branch name pattern: `main`
4. 勾选：
   - ✅ Require a pull request before merging
   - ✅ Require approvals
   - ✅ Require status checks to pass
   - ✅ Require conversation resolution before merging

---

## 📊 添加项目徽章

在 `README.md` 顶部添加：

```markdown
# 电商平台

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-success)](https://your-project.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

全栈电商平台 - React + TypeScript + Node.js + MongoDB
```

---

## 🔧 GitHub Actions（可选）

创建 `.github/workflows/ci.yml` 实现自动化测试：

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies (Frontend)
      working-directory: ./frontend
      run: npm install

    - name: Build Frontend
      working-directory: ./frontend
      run: npm run build

    - name: Install dependencies (Backend)
      working-directory: ./backend
      run: npm install
```

---

## 📁 完整的项目结构

```
ecommerce-project/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── .gitignore
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   ├── .env.production
│   ├── .gitignore
│   ├── vercel.json
│   └── package.json
├── .gitignore                  # 根目录 Git 忽略
├── README.md                   # 项目说明
├── ENVIRONMENT_SETUP.md        # 环境配置
├── VERCEL_DEPLOYMENT.md        # Vercel 部署
├── GITHUB_SETUP.md            # 本文件
└── LICENSE
```

---

## ✅ 检查清单

部署前确认：

- [ ] `.env` 文件已添加到 `.gitignore`
- [ ] 敏感信息未硬编码在代码中
- [ ] `.env.example` 文件已创建
- [ ] README.md 已完善
- [ ] 提交信息清晰有意义
- [ ] 代码已经过本地测试

推送后确认：

- [ ] GitHub 仓库创建成功
- [ ] 代码成功推送
- [ ] Vercel 已连接仓库
- [ ] 自动部署已触发
- [ ] 环境变量已配置
- [ ] 部署成功

---

## 🚨 常见问题

### 问题 1: 推送被拒绝

```bash
error: failed to push some refs
```

**解决方案**：
```bash
# 先拉取远程更改
git pull origin main --rebase

# 再推送
git push origin main
```

### 问题 2: .env 文件被误提交

```bash
# 从 Git 历史中删除
git rm --cached .env
git commit -m "Remove .env from repository"
git push

# 确保 .gitignore 包含 .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Update .gitignore"
git push
```

### 问题 3: Vercel 部署失败

1. 检查构建日志
2. 验证环境变量配置
3. 确认 `vercel.json` 配置正确
4. 本地运行 `npm run build` 测试

---

## 🔗 相关资源

- [GitHub 文档](https://docs.github.com)
- [Git 基础教程](https://git-scm.com/book/zh/v2)
- [Vercel Git 集成](https://vercel.com/docs/git)
- [GitHub Actions](https://docs.github.com/actions)

---

## 🎯 下一步

1. ✅ 创建 GitHub 仓库
2. ✅ 推送代码
3. ✅ 连接 Vercel
4. ⏭️ 配置自定义域名
5. ⏭️ 设置 GitHub Actions
6. ⏭️ 添加项目文档

**准备好开始了吗？** 🚀
