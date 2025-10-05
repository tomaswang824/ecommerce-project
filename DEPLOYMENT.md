# 🚀 生产环境部署指南

本指南将帮助你将电商平台部署到生产环境。

---

## 📋 部署前检查清单

### 必须完成的配置

- [ ] 生成强随机 JWT 密钥
- [ ] 配置生产数据库（独立的 MongoDB 数据库）
- [ ] 设置环境变量文件
- [ ] 配置 CORS 允许的域名
- [ ] 修改默认管理员密码
- [ ] 测试所有 API 端点

---

## 🔐 安全配置

### 1. 生成安全密钥

**JWT 密钥**
```bash
# 在终端运行
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

将输出的字符串复制到 `backend/.env.production` 的 `JWT_SECRET`

**Session 密钥**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

将输出的字符串复制到 `backend/.env.production` 的 `SESSION_SECRET`

### 2. MongoDB 生产数据库

1. 在 MongoDB Atlas 创建新的数据库 `ecommerce_prod`
2. 配置 IP 白名单（添加生产服务器 IP）
3. 创建新的数据库用户（强密码）
4. 更新 `MONGODB_URI` 到 `.env.production`

```bash
MONGODB_URI=mongodb+srv://<用户名>:<密码>@<集群>.mongodb.net/ecommerce_prod?retryWrites=true&w=majority
```

---

## 🖥️ 后端部署

### 方式 1: 使用 PM2（推荐）

#### 安装 PM2
```bash
npm install -g pm2
```

#### 部署步骤

```bash
# 1. 进入后端目录
cd backend

# 2. 安装生产依赖
npm install --production

# 3. 使用 PM2 启动应用
NODE_ENV=production pm2 start server.js --name ecommerce-api

# 4. 设置开机自启动
pm2 startup
pm2 save

# 5. 查看运行状态
pm2 status
pm2 logs ecommerce-api
```

#### PM2 常用命令

```bash
# 重启应用
pm2 restart ecommerce-api

# 停止应用
pm2 stop ecommerce-api

# 查看日志
pm2 logs ecommerce-api

# 查看监控
pm2 monit

# 删除应用
pm2 delete ecommerce-api
```

### 方式 2: 使用 Systemd

创建服务文件 `/etc/systemd/system/ecommerce-api.service`:

```ini
[Unit]
Description=Ecommerce API Server
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/ecommerce-project/backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务：
```bash
sudo systemctl start ecommerce-api
sudo systemctl enable ecommerce-api
sudo systemctl status ecommerce-api
```

### 方式 3: Docker 部署

创建 `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    env_file:
      - ./backend/.env.production
    restart: always
```

运行：
```bash
docker-compose up -d
```

---

## 🌐 前端部署

### 构建生产版本

```bash
cd frontend
npm run build
```

构建后的文件在 `frontend/dist/` 目录

### 部署选项

#### 选项 1: Nginx（推荐）

**安装 Nginx**
```bash
sudo apt install nginx
```

**Nginx 配置** (`/etc/nginx/sites-available/ecommerce`):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/ecommerce-project/frontend/dist;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_comp_level 6;

    # 缓存静态资源
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**启用配置**
```bash
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 选项 2: Vercel（免费）

1. 安装 Vercel CLI
```bash
npm install -g vercel
```

2. 部署
```bash
cd frontend
vercel --prod
```

3. 在 Vercel 控制台配置环境变量

#### 选项 3: Netlify（免费）

1. 在项目根目录创建 `netlify.toml`:

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. 连接 GitHub 仓库并自动部署

---

## 🔒 HTTPS 配置

### 使用 Let's Encrypt (免费 SSL)

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

Certbot 会自动修改 Nginx 配置以支持 HTTPS。

---

## 📊 监控和日志

### 后端日志

**使用 PM2**
```bash
pm2 logs ecommerce-api
pm2 logs ecommerce-api --lines 100
```

**使用 Systemd**
```bash
sudo journalctl -u ecommerce-api -f
```

### 性能监控

**PM2 监控**
```bash
pm2 monit
```

**安装 PM2 Plus（可选）**
```bash
pm2 plus
```

提供更详细的性能监控和错误追踪。

---

## 🔄 更新和维护

### 更新后端代码

```bash
# 1. 拉取最新代码
cd backend
git pull

# 2. 安装依赖
npm install --production

# 3. 重启服务
pm2 restart ecommerce-api
```

### 更新前端代码

```bash
# 1. 拉取最新代码
cd frontend
git pull

# 2. 构建
npm install
npm run build

# 3. 复制到部署目录
sudo cp -r dist/* /path/to/nginx/html/
```

---

## 🧪 部署验证

部署完成后，验证以下功能：

### API 测试
```bash
# 检查服务器状态
curl https://api.your-domain.com/api/products

# 检查管理员登录
curl -X POST https://api.your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### 前端测试

访问 https://your-domain.com 并测试：

- [ ] 页面正常加载
- [ ] 商品列表显示
- [ ] 用户注册/登录
- [ ] 购物车功能
- [ ] 管理员后台
- [ ] API 测试模块

---

## 🚨 故障排查

### 后端无法启动

**检查日志**
```bash
pm2 logs ecommerce-api --lines 50
```

**常见问题**
- MongoDB 连接失败 → 检查 MONGODB_URI 和网络
- 端口被占用 → 修改 PORT 配置
- 环境变量未加载 → 检查 .env.production 文件

### 前端 404 错误

- 检查 Nginx 配置中的 `try_files` 指令
- 确认 `historyApiFallback: true` 在 vite.config.ts

### API 跨域错误

- 检查 `CORS_ORIGIN` 配置
- 确认前端域名正确
- 验证 HTTPS 配置

---

## 📈 性能优化建议

### 后端优化

1. **启用 Redis 缓存**
   - 缓存频繁查询的商品数据
   - 缓存用户会话

2. **数据库索引**
   ```javascript
   // 在 Product model 添加
   productSchema.index({ category: 1, price: 1 })
   productSchema.index({ name: 'text', description: 'text' })
   ```

3. **启用压缩**
   ```javascript
   import compression from 'compression'
   app.use(compression())
   ```

### 前端优化

1. **代码分割** - Vite 已自动处理
2. **图片优化** - 使用 WebP 格式
3. **CDN** - 静态资源使用 CDN
4. **懒加载** - 图片和路由懒加载

---

## 🔐 安全加固

### 必做项

1. **修改默认管理员密码**
   ```bash
   # 登录 MongoDB
   mongosh "mongodb+srv://..."
   use ecommerce_prod
   # 更新管理员密码
   db.users.updateOne(
     {email: "admin@example.com"},
     {$set: {password: "$2a$10$新的哈希密码"}}
   )
   ```

2. **配置防火墙**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **限流保护**（已在代码中配置）

4. **定期备份数据库**
   ```bash
   # 使用 MongoDB Atlas 自动备份
   # 或手动导出
   mongodump --uri="mongodb+srv://..." --out=/backup/
   ```

---

## 📞 支持

遇到问题？

1. 查看 [环境配置指南](./ENVIRONMENT_SETUP.md)
2. 查看 [故障排查指南](./TROUBLESHOOTING.md)
3. 查看项目 [README](./README.md)

---

## ✅ 部署完成检查表

- [ ] 后端 API 正常运行
- [ ] 前端页面可访问
- [ ] HTTPS 已配置
- [ ] 环境变量已设置
- [ ] MongoDB 连接正常
- [ ] JWT 密钥已更新
- [ ] 管理员密码已修改
- [ ] 日志系统工作正常
- [ ] 备份策略已配置
- [ ] 监控已启用

🎉 恭喜！你的电商平台已成功部署！
