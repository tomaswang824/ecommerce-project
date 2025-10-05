# 电商平台 - 前端

基于 React + TypeScript + Vite 构建的现代化电商平台前端。

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📁 项目结构

```
frontend/
├── public/              # 静态资源
├── src/
│   ├── components/      # 可复用组件
│   │   └── Navbar.tsx
│   ├── context/         # React Context
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── pages/           # 页面组件
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Admin.tsx
│   │   └── ApiTest.tsx
│   ├── App.tsx          # 根组件
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式
├── .env.development     # 开发环境变量
├── .env.production      # 生产环境变量
├── vercel.json          # Vercel 配置
├── vite.config.ts       # Vite 配置
└── package.json
```

## 🔧 环境变量

### 开发环境 (`.env.development`)

```bash
VITE_API_URL=
VITE_APP_TITLE=电商平台 [开发]
VITE_DEBUG=true
```

### 生产环境 (`.env.production`)

```bash
VITE_API_URL=https://api.your-domain.com
VITE_APP_TITLE=电商平台
VITE_DEBUG=false
```

## 📦 主要功能

- ✅ 用户注册/登录
- ✅ 商品浏览
- ✅ 商品详情
- ✅ 购物车管理
- ✅ 管理员后台（商品 CRUD）
- ✅ API 测试模块
- ✅ 响应式设计

## 🛠️ 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **路由**: React Router v6
- **HTTP 客户端**: Axios
- **状态管理**: Context API
- **样式**: CSS

## 🚀 部署

### Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署到生产环境
vercel --prod
```

详细步骤查看 [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md)

### Nginx 部署

```bash
# 构建
npm run build

# 复制 dist 目录到 Nginx
sudo cp -r dist/* /var/www/html/
```

## 🔗 相关文档

- [环境配置指南](../ENVIRONMENT_SETUP.md)
- [Vercel 部署指南](../VERCEL_DEPLOYMENT.md)
- [快速部署指南](../QUICK_DEPLOY.md)
- [项目总览](../README.md)

## 📝 开发规范

### 组件命名

- 使用 PascalCase: `ProductCard.tsx`
- 样式文件同名: `ProductCard.css`

### 代码风格

- 使用函数组件 + Hooks
- TypeScript 类型定义
- 使用 Context 管理全局状态

### Git 提交

```bash
git commit -m "feat: 添加购物车功能"
git commit -m "fix: 修复登录问题"
git commit -m "docs: 更新文档"
```

## 🐛 问题排查

### 构建失败

```bash
# 清理缓存
rm -rf node_modules dist
npm install
npm run build
```

### API 调用失败

1. 检查 `VITE_API_URL` 环境变量
2. 确认后端服务运行正常
3. 检查浏览器控制台网络请求

### 路由 404

确保 `vite.config.ts` 包含：
```typescript
server: {
  historyApiFallback: true
}
```

## 📄 许可证

MIT
