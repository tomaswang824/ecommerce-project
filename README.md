# 电商平台项目

这是一个使用 React + TypeScript（前端）和 Node.js + Express + MongoDB（后端）搭建的全栈电商平台。

## 项目结构

```
ecommerce-project/
├── frontend/          # React + TypeScript 前端
│   ├── src/
│   │   ├── components/    # 组件
│   │   ├── pages/         # 页面
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/           # Node.js + Express 后端
│   ├── config/        # 配置文件
│   ├── models/        # 数据模型
│   ├── routes/        # API 路由
│   ├── middleware/    # 中间件
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 功能特性

### 前端功能
- 🏠 首页展示热门商品
- 📦 商品列表和搜索
- 🔍 商品详情页
- 🛒 购物车（开发中）
- 👤 用户注册和登录
- 📱 响应式设计

### 后端功能
- ✅ RESTful API
- 🔐 JWT 身份验证
- 👥 用户管理（注册、登录）
- 📦 商品管理（CRUD）
- 🛡️ 管理员权限控制
- 💾 MongoDB 数据持久化

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- React Router
- Axios

### 后端
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## 快速开始

### 前置条件
- Node.js (v16+)
- MongoDB (本地或云端)
- npm 或 yarn

### 安装步骤

#### 1. 安装后端依赖
```bash
cd backend
npm install
```

#### 2. 配置环境变量
在 `backend/.env` 文件中配置：
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### 3. 导入示例数据（可选）
```bash
cd backend
node seedData.js
```

#### 4. 启动后端服务器
```bash
cd backend
npm run dev
```

#### 5. 安装前端依赖
```bash
cd frontend
npm install
```

#### 6. 启动前端开发服务器
```bash
cd frontend
npm run dev
```

#### 7. 访问应用
- 前端: http://localhost:3000
- 后端 API: http://localhost:5000

## API 端点

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 商品
- `GET /api/products` - 获取所有商品
- `GET /api/products/:id` - 获取单个商品
- `POST /api/products` - 创建商品（需要管理员权限）
- `PUT /api/products/:id` - 更新商品（需要管理员权限）
- `DELETE /api/products/:id` - 删除商品（需要管理员权限）

## 默认管理员账户
导入示例数据后，可以使用以下账户登录：
- 邮箱: admin@example.com
- 密码: admin123

## 开发说明

### 前端开发
- 使用 Vite 作为构建工具
- TypeScript 严格模式
- 组件化开发
- CSS 模块化

### 后端开发
- ES6+ 模块化
- 异步/等待模式
- 错误处理中间件
- JWT 认证保护

## 待完成功能
- [ ] 购物车功能实现
- [ ] 订单管理系统
- [ ] 支付集成
- [ ] 用户个人中心
- [ ] 商品评论系统
- [ ] 图片上传功能
- [ ] 邮件通知

## 部署

### 前端部署
```bash
cd frontend
npm run build
# 将 dist 目录部署到静态服务器
```

### 后端部署
- 配置生产环境的 MongoDB URI
- 设置安全的 JWT_SECRET
- 使用 PM2 或类似工具管理进程

## 许可证
MIT
