# 🔧 环境变量配置指南

## 📋 目录结构

```
ecommerce-project/
├── backend/
│   ├── .env                  # 开发环境配置（本地使用，不提交）
│   ├── .env.production      # 生产环境配置（不提交）
│   └── .env.example         # 配置示例（可提交）
└── frontend/
    ├── .env.development     # 前端开发环境配置
    ├── .env.production      # 前端生产环境配置
    └── .env.example         # 前端配置示例
```

---

## 🔐 后端环境变量配置

### 开发环境 (`.env`)

```bash
PORT=5000
MONGODB_URI=mongodb+srv://<用户名>:<密码>@<集群地址>/ecommerce?retryWrites=true&w=majority&appName=<应用名>
JWT_SECRET=your_development_jwt_secret
NODE_ENV=development
```

### 生产环境 (`.env.production`)

#### ⚠️ 必须修改的配置

1. **JWT_SECRET**
   ```bash
   # 生成强随机密钥
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   将生成的字符串替换 `.env.production` 中的 `JWT_SECRET`

2. **MONGODB_URI**
   - 使用独立的生产数据库
   - 建议数据库名改为 `ecommerce_prod`
   - 确保 MongoDB Atlas 白名单包含生产服务器 IP

3. **CORS_ORIGIN**
   ```bash
   CORS_ORIGIN=https://your-production-domain.com
   ```

4. **SESSION_SECRET**
   ```bash
   # 生成会话密钥
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

#### 可选配置

**邮件服务**（用于密码重置、订单通知等）
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
```

**支付网关**
```bash
PAYMENT_API_KEY=your_payment_api_key
PAYMENT_SECRET=your_payment_secret
```

**云存储**（用于商品图片上传）
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
```

**Redis 缓存**
```bash
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

---

## 🎨 前端环境变量配置

### 开发环境 (`.env.development`)

```bash
VITE_API_URL=
VITE_APP_TITLE=电商平台 [开发]
VITE_NODE_ENV=development
VITE_DEBUG=true
```

### 生产环境 (`.env.production`)

```bash
VITE_API_URL=https://api.your-production-domain.com
VITE_APP_TITLE=电商平台
VITE_NODE_ENV=production
VITE_DEBUG=false
```

#### ⚠️ 重要提示

- 所有前端环境变量必须以 `VITE_` 开头
- 前端环境变量会被打包到客户端代码，**不要存储敏感信息**
- 生产环境的 `VITE_API_URL` 需要指向实际的后端 API 地址

---

## 🚀 部署步骤

### 1. 本地开发环境设置

**后端**
```bash
cd backend
cp .env.example .env
# 编辑 .env 文件，填入实际配置
npm install
npm run dev
```

**前端**
```bash
cd frontend
npm install
npm run dev
```

### 2. 生产环境部署

#### 后端部署

```bash
cd backend

# 确保 .env.production 已正确配置
# 检查必需的环境变量
cat .env.production

# 安装依赖
npm install --production

# 启动生产服务器
NODE_ENV=production node server.js

# 或使用 PM2 进程管理器
pm2 start server.js --name ecommerce-api --env production
```

#### 前端部署

```bash
cd frontend

# 构建生产版本
npm run build

# 构建后的文件在 dist/ 目录
# 将 dist/ 目录部署到 Nginx、Vercel 或其他静态托管服务
```

---

## 🔒 安全最佳实践

### 1. 环境变量文件安全

- ✅ 将 `.env*` 添加到 `.gitignore`（除了 `.env.example`）
- ✅ 使用强随机密钥
- ✅ 生产环境和开发环境使用不同的密钥
- ✅ 定期更换密钥
- ❌ 不要在代码中硬编码敏感信息
- ❌ 不要将 `.env` 文件提交到 Git

### 2. MongoDB 安全

- ✅ 使用强密码
- ✅ 配置 IP 白名单
- ✅ 启用数据库加密
- ✅ 定期备份数据
- ✅ 生产和开发使用不同的数据库

### 3. JWT 安全

- ✅ 使用至少 32 字符的随机密钥
- ✅ 设置合理的过期时间（7-30天）
- ✅ 在生产环境使用 HTTPS
- ✅ 定期更换密钥

---

## 📝 环境变量参考

### 后端必需变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `PORT` | 服务器端口 | `5000` |
| `MONGODB_URI` | MongoDB 连接字符串 | `mongodb+srv://...` |
| `JWT_SECRET` | JWT 签名密钥 | `random_64_char_string` |
| `NODE_ENV` | 环境标识 | `production` / `development` |

### 后端可选变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `JWT_EXPIRES_IN` | JWT 过期时间 | `7d` |
| `CORS_ORIGIN` | 允许的前端域名 | `*` |
| `RATE_LIMIT_MAX_REQUESTS` | API 限流次数 | `100` |
| `LOG_LEVEL` | 日志级别 | `info` |
| `DB_POOL_SIZE` | 数据库连接池大小 | `10` |

### 前端变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_API_URL` | 后端 API 地址 | `https://api.example.com` |
| `VITE_APP_TITLE` | 应用标题 | `电商平台` |
| `VITE_DEBUG` | 调试模式 | `false` |

---

## 🛠️ 故障排查

### 问题 1: MongoDB 连接失败

**检查清单**
- [ ] MongoDB URI 格式正确
- [ ] 用户名和密码正确
- [ ] IP 地址在白名单中
- [ ] 网络连接正常

### 问题 2: JWT 验证失败

**检查清单**
- [ ] JWT_SECRET 一致（前后端）
- [ ] Token 未过期
- [ ] Authorization header 格式正确

### 问题 3: CORS 错误

**检查清单**
- [ ] CORS_ORIGIN 配置正确
- [ ] 前端请求地址正确
- [ ] 后端 CORS 中间件已启用

---

## 📞 获取帮助

遇到问题？检查以下资源：

1. 查看项目 [README.md](./README.md)
2. 查看 [故障排查指南](./TROUBLESHOOTING.md)
3. 查看 [MongoDB 设置指南](./SETUP_MONGODB.md)

---

## 🔄 配置更新记录

| 日期 | 变更内容 | 版本 |
|------|----------|------|
| 2025-10-05 | 初始配置创建 | 1.0.0 |

