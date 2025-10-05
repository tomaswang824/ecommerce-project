
# 📝 Git 初始化命令清单

按顺序执行以下命令来完成 Git 配置和首次提交。

---

## 1️⃣ 配置 Git 用户信息（必须）

```bash
# 设置全局用户名和邮箱（替换成你的信息）
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"

# 验证配置
git config --global --list
```

**示例**：
```bash
git config --global user.name "Zhang San"
git config --global user.email "zhangsan@gmail.com"
```

---

## 2️⃣ 创建首次提交

```bash
# 进入项目目录
cd ecommerce-project

# 查看暂存区文件
git status

# 创建首次提交
git commit -m "🎉 Initial commit: Full-stack E-commerce Platform

- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express + MongoDB
- Features: User auth, Shopping cart, Admin panel, API testing
- Deployment ready: Vercel config included
- Documentation: Complete setup and deployment guides"
```

---

## 3️⃣ 在 GitHub 创建仓库

### 方式 A: 通过网页

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `ecommerce-project`
   - **Description**: `全栈电商平台 - React + TypeScript + Node.js + MongoDB`
   - **Visibility**: Public 或 Private
   - ⚠️ **不要勾选**任何初始化选项
3. 点击 **Create repository**

### 方式 B: 使用 GitHub CLI（推荐）

```bash
# 安装 GitHub CLI（如果还没有）
# Windows: winget install --id GitHub.cli
# macOS: brew install gh

# 登录 GitHub
gh auth login

# 创建仓库并推送
gh repo create ecommerce-project --public --source=. --remote=origin --push
```

---

## 4️⃣ 关联远程仓库（方式 A 需要）

```bash
# 添加远程仓库（替换成你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/ecommerce-project.git

# 验证远程仓库
git remote -v
```

---

## 5️⃣ 推送代码到 GitHub

```bash
# 推送到 main 分支
git push -u origin main

# 查看推送结果
git log --oneline
```

---

## 6️⃣ 连接 Vercel 自动部署

1. 访问 https://vercel.com
2. 使用 GitHub 登录
3. 点击 **New Project**
4. 选择 `ecommerce-project` 仓库
5. 配置项目：
   ```
   Framework: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
6. 添加环境变量：
   ```
   VITE_API_URL=https://api.your-domain.com
   VITE_APP_TITLE=电商平台
   VITE_NODE_ENV=production
   VITE_DEBUG=false
   ```
7. 点击 **Deploy**

---

## ✅ 验证清单

完成后检查：

- [ ] Git 用户信息已配置
- [ ] 本地提交成功
- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] Vercel 已连接仓库
- [ ] 环境变量已配置
- [ ] Vercel 部署成功

---

## 🚀 后续更新流程

每次修改代码后：

```bash
# 1. 查看修改
git status

# 2. 添加修改
git add .

# 3. 提交
git commit -m "feat: 添加新功能"

# 4. 推送
git push

# ✨ Vercel 会自动部署！
```

---

## 📞 遇到问题？

### 问题 1: 推送失败（需要认证）

**使用 Personal Access Token（推荐）**：

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 勾选 `repo` 权限
4. 生成并复制 token
5. 推送时使用 token 作为密码

### 问题 2: 忘记配置用户信息

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 问题 3: 已存在的远程仓库

```bash
# 查看现有远程
git remote -v

# 删除旧的
git remote remove origin

# 添加新的
git remote add origin https://github.com/你的用户名/ecommerce-project.git
```

---

## 💡 提示

- 首次推送可能需要输入 GitHub 用户名和密码/token
- 使用 SSH 方式可以避免每次输入密码
- GitHub CLI (`gh`) 可以简化很多操作
- 推荐使用 VS Code 内置的 Git 功能

---

## 🔗 下一步

完成 Git 设置后：

1. [配置自定义域名](./VERCEL_DEPLOYMENT.md#-配置自定义域名)
2. [设置 GitHub Actions](./GITHUB_SETUP.md#-github-actions可选)
3. [部署后端 API](./DEPLOYMENT.md#-后端部署)

**准备好开始了吗？** 🚀

---

## 📋 完整命令速查

```bash
# Git 配置
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 提交代码
cd ecommerce-project
git commit -m "🎉 Initial commit"

# 创建 GitHub 仓库（方式一：CLI）
gh auth login
gh repo create ecommerce-project --public --source=. --remote=origin --push

# 创建 GitHub 仓库（方式二：手动）
git remote add origin https://github.com/username/ecommerce-project.git
git push -u origin main
```

复制粘贴，一键完成！✨
