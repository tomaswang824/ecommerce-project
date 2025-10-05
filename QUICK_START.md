# 🚀 快速启动指南

## 当前状态

✅ 项目已搭建完成
✅ 前端运行在 http://localhost:3000
✅ 后端运行在 http://localhost:5000
⚠️ 目前使用模拟数据（未连接真实数据库）

## 🔧 配置 MongoDB Atlas（获取真实数据库）

### 快速步骤：

1. **注册并创建集群**（5分钟）
   - 访问：https://www.mongodb.com/cloud/atlas/register
   - 选择免费 M0 套餐
   - 区域选择：Singapore (ap-southeast-1)

2. **配置访问权限**
   - 创建数据库用户（记住密码！）
   - IP 白名单添加：`0.0.0.0/0`

3. **获取连接字符串**
   - Connect → Drivers → Node.js
   - 复制连接字符串

4. **更新项目配置**

   打开 `backend/.env`，将这一行：
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

   替换为你的真实连接字符串（记得添加 `/ecommerce` 数据库名）

5. **重启后端并导入数据**
   ```bash
   # 重启后端（Ctrl+C 停止，然后）
   cd backend
   npm run dev

   # 新开终端，导入示例数据
   cd backend
   node seedData.js
   ```

6. **访问应用**
   - 前端：http://localhost:3000
   - 使用管理员登录：`admin@example.com` / `admin123`

📖 **详细步骤**请查看：[SETUP_MONGODB.md](./SETUP_MONGODB.md)

---

## 📂 项目结构

```
ecommerce-project/
├── frontend/              # React + TypeScript 前端
│   ├── src/
│   │   ├── components/    # 组件 (Navbar, ProductCard)
│   │   ├── pages/         # 页面 (Home, Products, Cart等)
│   │   └── App.tsx
│   └── package.json
│
├── backend/               # Node.js + Express 后端
│   ├── config/           # 数据库配置
│   ├── models/           # Mongoose 模型
│   ├── routes/           # API 路由
│   ├── middleware/       # JWT 认证
│   └── server.js
│
└── README.md
```

---

## 🛠️ 常用命令

### 启动开发服务器
```bash
# 后端
cd backend
npm run dev

# 前端
cd frontend
npm run dev
```

### 停止服务
按 `Ctrl + C`

### 导入示例数据
```bash
cd backend
node seedData.js
```

---

## 🎯 核心功能

### 已实现
- ✅ 商品展示和搜索
- ✅ 商品详情页
- ✅ 用户注册/登录
- ✅ JWT 身份验证
- ✅ 管理员权限控制
- ✅ 响应式设计

### 待开发
- ⏳ 购物车完整功能
- ⏳ 订单管理系统
- ⏳ 支付集成
- ⏳ 用户个人中心
- ⏳ 商品评论

---

## 📡 API 端点

### 商品
- `GET /api/products` - 获取所有商品
- `GET /api/products/:id` - 获取单个商品
- `POST /api/products` - 创建商品（需管理员）
- `PUT /api/products/:id` - 更新商品（需管理员）
- `DELETE /api/products/:id` - 删除商品（需管理员）

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

---

## ⚡ 下一步

1. **现在**: 按照上述步骤配置 MongoDB Atlas
2. **然后**: 导入示例数据
3. **最后**: 访问 http://localhost:3000 查看完整功能！

祝你开发愉快！🎉
