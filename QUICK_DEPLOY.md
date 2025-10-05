# ⚡ 快速部署指南

5 分钟内完成 Vercel 部署！

---

## 🚀 一键部署命令

### 准备工作（仅需一次）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login
```

### 部署到生产环境

```bash
# 进入前端目录
cd frontend

# 部署到生产环境
vercel --prod
```

就这么简单！🎉

---

## 📝 详细步骤

### 1️⃣ 首次部署

```bash
cd frontend
vercel
```

**配置提示回答**：
```
? Set up and deploy? [Y/n] y
? Which scope? 选择你的账号
? Link to existing project? [y/N] n
? Project name? ecommerce-frontend
? In which directory is your code located? ./
? Want to override settings? [y/N] y
? Build Command: npm run build
? Output Directory: dist
? Development Command: npm run dev
```

### 2️⃣ 配置环境变量

**在 Vercel Dashboard 添加**：

1. 访问 https://vercel.com
2. 选择项目 → Settings → Environment Variables
3. 添加以下变量：

```bash
VITE_API_URL=https://api.你的域名.com
VITE_APP_TITLE=电商平台
VITE_NODE_ENV=production
VITE_DEBUG=false
```

**或通过 CLI 添加**：

```bash
vercel env add VITE_API_URL production
# 输入: https://api.your-domain.com

vercel env add VITE_APP_TITLE production
# 输入: 电商平台

vercel env add VITE_NODE_ENV production
# 输入: production

vercel env add VITE_DEBUG production
# 输入: false
```

### 3️⃣ 重新部署以应用环境变量

```bash
vercel --prod
```

---

## 🌐 配置自定义域名

### 通过 CLI

```bash
# 添加域名
vercel domains add yourdomain.com

# 添加 www 子域名
vercel domains add www.yourdomain.com
```

### DNS 配置

在域名提供商（阿里云/腾讯云/Cloudflare）添加：

**方式 1: A 记录**
```
类型: A
主机记录: @
记录值: 76.76.21.21
```

**方式 2: CNAME（推荐）**
```
类型: CNAME
主机记录: www
记录值: cname.vercel-dns.com
```

等待 DNS 生效（通常 5-30 分钟）

---

## ✅ 验证部署

### 1. 检查部署状态

```bash
vercel ls
```

### 2. 访问网站

```
https://ecommerce-frontend.vercel.app
或
https://yourdomain.com
```

### 3. 测试功能

- [ ] 页面正常加载
- [ ] 商品列表显示
- [ ] 购物车功能
- [ ] 用户登录/注册
- [ ] API 调用正常

---

## 🔄 后续更新

每次代码更新后：

```bash
cd frontend
vercel --prod
```

或推送到 GitHub（如果已连接）：

```bash
git add .
git commit -m "update"
git push
```

Vercel 会自动部署！

---

## 🛠️ 常用命令

```bash
# 查看部署列表
vercel ls

# 查看项目信息
vercel inspect

# 查看日志
vercel logs

# 查看域名
vercel domains ls

# 删除部署
vercel remove [部署ID]

# 切换项目
vercel switch

# 查看环境变量
vercel env ls
```

---

## 🚨 快速故障排查

### 构建失败

```bash
# 本地测试构建
npm run build

# 查看 Vercel 日志
vercel logs
```

### 路由 404

检查 `vercel.json` 存在且包含：
```json
{
  "rewrites": [
    {"source": "/(.*)", "destination": "/index.html"}
  ]
}
```

### API 无法访问

1. 检查 `VITE_API_URL` 环境变量
2. 确认后端 CORS 允许你的域名
3. 检查后端服务器是否运行

### 环境变量不生效

```bash
# 强制重新部署
vercel --prod --force
```

---

## 💡 提示

- ✅ 免费版支持自定义域名和 SSL
- ✅ 每次 `git push` 自动部署（连接 GitHub 后）
- ✅ 支持预览部署（每个分支独立 URL）
- ✅ 全球 CDN 加速
- ⚠️ 环境变量改动需重新部署

---

## 📞 需要帮助？

- 详细指南: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- Vercel 文档: https://vercel.com/docs
- 问题反馈: 查看 Vercel Dashboard 的 Logs 标签页

---

## 🎯 下一步

部署成功后，考虑：

1. **部署后端 API**
   - 推荐使用 Railway、Render 或 VPS
   - 配置环境变量和 CORS

2. **配置监控**
   - 使用 Vercel Analytics（免费）
   - 设置错误追踪（Sentry）

3. **性能优化**
   - 启用图片优化
   - 配置缓存策略
   - 使用 CDN 加速

---

**祝部署顺利！** 🚀
