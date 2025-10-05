# 🚀 Vercel 部署指南

本指南将帮助你将电商平台前端部署到 Vercel，并配置自定义域名。

> **注意**: 本项目使用 **Vite + React**，完全兼容 Vercel 部署。

---

## 📋 前置要求

- [x] GitHub 账号
- [x] Vercel 账号（可使用 GitHub 登录）
- [x] 自定义域名（可选）
- [x] 项目已推送到 GitHub

---

## 🎯 方式一：通过 Vercel 网站部署（推荐新手）

### 1. 准备 GitHub 仓库

```bash
# 1. 初始化 Git（如果还没有）
cd ecommerce-project
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit for Vercel deployment"

# 4. 在 GitHub 创建新仓库，然后推送
git remote add origin https://github.com/你的用户名/ecommerce-project.git
git branch -M main
git push -u origin main
```

### 2. 连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 **"Add New Project"**
4. 选择你的 GitHub 仓库 `ecommerce-project`

### 3. 配置项目设置

在 Vercel 导入界面配置：

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. 配置环境变量

在 **Environment Variables** 部分添加：

```bash
VITE_API_URL=https://api.你的域名.com
VITE_APP_TITLE=电商平台
VITE_NODE_ENV=production
VITE_DEBUG=false
```

> ⚠️ 记住：Vercel 环境变量必须以 `VITE_` 开头才能在客户端访问

### 5. 部署

点击 **"Deploy"** 按钮，Vercel 会自动：
1. 克隆仓库
2. 安装依赖
3. 运行构建
4. 部署到 CDN

部署完成后，你会得到一个 `.vercel.app` 域名。

---

## 🎯 方式二：使用 Vercel CLI（推荐开发者）

### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

### 2. 登录 Vercel

```bash
vercel login
```

选择登录方式（Email 或 GitHub）

### 3. 部署项目

```bash
# 进入前端目录
cd frontend

# 首次部署（会提示配置）
vercel

# 生产环境部署
vercel --prod
```

### 4. 配置提示说明

```bash
? Set up and deploy "~/frontend"? [Y/n] y
? Which scope do you want to deploy to? 选择你的账号
? Link to existing project? [y/N] n
? What's your project's name? ecommerce-frontend
? In which directory is your code located? ./
? Want to override the settings? [y/N] y

# 构建设置
? Build Command: npm run build
? Output Directory: dist
? Development Command: npm run dev
```

### 5. 添加环境变量

```bash
# 方式一：通过 CLI
vercel env add VITE_API_URL production
# 输入值: https://api.your-domain.com

# 方式二：通过 vercel.json 配置（见下文）
```

---

## 📝 创建 Vercel 配置文件

在 `frontend/` 目录创建 `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "regions": ["hkg1"],
  "env": {
    "VITE_API_URL": "https://api.your-domain.com",
    "VITE_APP_TITLE": "电商平台",
    "VITE_NODE_ENV": "production",
    "VITE_DEBUG": "false"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🌐 配置自定义域名

### 方式一：通过 Vercel 控制台

1. 进入项目 Dashboard
2. 点击 **"Settings"** → **"Domains"**
3. 点击 **"Add Domain"**
4. 输入你的域名（例如：`www.yourdomain.com`）
5. 按照提示配置 DNS

### 方式二：通过 CLI

```bash
vercel domains add yourdomain.com
```

### DNS 配置

在你的域名提供商（阿里云、腾讯云、Cloudflare 等）添加以下记录：

#### A 记录方式
```
Type: A
Name: @ (或 www)
Value: 76.76.21.21
TTL: 自动
```

#### CNAME 记录方式（推荐）
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 自动
```

#### 同时支持根域名和 www
```
# 根域名
Type: A
Name: @
Value: 76.76.21.21

# www 子域名
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL/HTTPS

Vercel 会自动为你的域名配置 **免费的 SSL 证书**（Let's Encrypt），无需额外配置。

---

## 🔧 高级配置

### 1. 自动部署

连接 GitHub 后，每次推送代码都会自动部署：

```bash
# 开发分支 → 预览部署
git push origin develop

# 主分支 → 生产部署
git push origin main
```

### 2. 环境变量管理

在 Vercel Dashboard → Settings → Environment Variables:

| 变量名 | 值 | 环境 |
|--------|---|------|
| `VITE_API_URL` | `https://api.yourdomain.com` | Production |
| `VITE_API_URL` | `http://localhost:5000` | Development |
| `VITE_DEBUG` | `false` | Production |
| `VITE_DEBUG` | `true` | Development |

### 3. 预览部署

每个 Pull Request 都会自动创建预览部署：

```bash
# 创建新分支
git checkout -b feature/new-feature

# 推送并创建 PR
git push origin feature/new-feature

# Vercel 会自动创建预览链接
```

### 4. 重定向配置

在 `vercel.json` 中配置：

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

---

## 📊 性能优化

### 1. 边缘网络配置

Vercel 自动使用全球 CDN，优化国内访问可选择香港节点：

```json
{
  "regions": ["hkg1"]
}
```

### 2. 缓存配置

在 `vercel.json` 中：

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. 图片优化

使用 Vercel Image Optimization (需要付费计划):

```jsx
import Image from 'next/image'  // 如果迁移到 Next.js

// 或使用外部图片服务
<img src="https://cdn.yourdomain.com/image.jpg" />
```

---

## 🔍 故障排查

### 问题 1: 构建失败

**检查构建日志**
```bash
vercel logs
```

**常见原因**：
- Node 版本不兼容 → 在 `package.json` 指定版本
  ```json
  {
    "engines": {
      "node": "18.x"
    }
  }
  ```
- 依赖安装失败 → 清理 `node_modules` 重新安装
- 环境变量缺失 → 检查 Vercel Dashboard

### 问题 2: 路由 404 错误

确保 `vercel.json` 中有 SPA 重写规则：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 问题 3: API 调用失败

- 检查 `VITE_API_URL` 是否正确
- 检查后端 CORS 配置是否允许 Vercel 域名
- 确认后端服务器正常运行

### 问题 4: 环境变量不生效

- 确保变量名以 `VITE_` 开头
- 重新部署项目（环境变量更改需要重新构建）
  ```bash
  vercel --prod --force
  ```

---

## 📱 部署后端 API

Vercel 也可以部署 Node.js 后端（Serverless Functions）：

### 创建 `api/` 目录结构

```
backend/
├── api/
│   ├── products.js
│   ├── auth.js
│   └── orders.js
└── vercel.json
```

### 配置 `backend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

> ⚠️ 注意：Vercel Serverless 有执行时间限制（免费版 10 秒），不适合长时间运行的任务。

**推荐方案**：
- 前端：Vercel（免费）
- 后端：VPS、Railway、Render 等（支持持久化连接）

---

## 💰 定价参考

| 功能 | Hobby (免费) | Pro |
|------|--------------|-----|
| 带宽 | 100GB/月 | 1TB/月 |
| 构建时间 | 6000 分钟/月 | 无限 |
| 并发构建 | 1 | 12 |
| 自定义域名 | ✅ | ✅ |
| SSL | ✅ | ✅ |
| 环境变量 | ✅ | ✅ |
| 图片优化 | ❌ | ✅ |
| 密码保护 | ❌ | ✅ |

个人项目使用免费版足够！

---

## ✅ 部署检查清单

部署前确认：

- [ ] 代码已推送到 GitHub
- [ ] `.gitignore` 包含 `.env` 文件
- [ ] `vercel.json` 配置正确
- [ ] 环境变量已设置
- [ ] 后端 API 已部署并可访问
- [ ] CORS 配置允许 Vercel 域名

部署后验证：

- [ ] 网站可正常访问
- [ ] 路由跳转正常
- [ ] API 调用成功
- [ ] 用户登录/注册功能正常
- [ ] 购物车功能正常
- [ ] 自定义域名已生效（如果配置）
- [ ] HTTPS 证书已激活

---

## 🚀 快速开始命令

```bash
# 1. 安装 CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 进入前端目录
cd frontend

# 4. 部署到生产环境
vercel --prod

# 5. 添加自定义域名
vercel domains add yourdomain.com
```

---

## 📚 相关资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#vercel)
- [自定义域名配置](https://vercel.com/docs/concepts/projects/domains)
- [环境变量管理](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🎉 完成！

你的电商平台前端现已部署到 Vercel，享受：

✨ 全球 CDN 加速
✨ 自动 HTTPS
✨ 持续部署
✨ 预览链接
✨ 零配置优化

有问题随时查看 [故障排查](#-故障排查) 部分！
