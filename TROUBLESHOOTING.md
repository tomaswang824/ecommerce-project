# 登录问题排查指南

## 问题：管理员账户登录失败

### ✅ 已验证
- 后端 API 正常工作（curl 测试成功）
- 数据库中存在管理员账户
- 账户信息：
  - 邮箱: `admin@example.com`（注意是 example，不是 examle）
  - 密码: `admin123`
  - 角色: admin

### 🔍 排查步骤

#### 步骤 1: 检查邮箱拼写
**常见错误**:
- ❌ `admin@examle.com`（少了 p）
- ✅ `admin@example.com`（正确）

#### 步骤 2: 检查浏览器控制台
1. 打开浏览器开发者工具（F12）
2. 切换到 "Console" 标签
3. 尝试登录
4. 查看是否有错误信息

#### 步骤 3: 检查网络请求
1. 打开浏览器开发者工具（F12）
2. 切换到 "Network" 标签
3. 尝试登录
4. 查看 `/api/auth/login` 请求：
   - 状态码应该是 200
   - 响应应该包含 token 和用户信息

#### 步骤 4: 检查端口
- 前端当前运行在: **http://localhost:3001**（不是 3000）
- 后端运行在: http://localhost:5000

确保访问的是 http://localhost:3001

#### 步骤 5: 清除浏览器缓存
1. 打开开发者工具（F12）
2. 右键点击刷新按钮
3. 选择 "清空缓存并硬性重新加载"

### 🧪 测试登录 API

在浏览器开发者工具的 Console 中运行：

\`\`\`javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(data => console.log('登录成功:', data))
.catch(err => console.error('登录失败:', err))
\`\`\`

### ✅ 预期结果

登录成功后应该看到：
```json
{
  "_id": "...",
  "name": "管理员",
  "email": "admin@example.com",
  "role": "admin",
  "token": "eyJ..."
}
```

### 🐛 常见错误

#### 错误 1: CORS 错误
**症状**: 控制台显示 CORS 相关错误
**解决**: 确保后端服务正在运行

#### 错误 2: 网络错误
**症状**: Failed to fetch 或 Network Error
**解决**:
- 检查后端是否运行在 5000 端口
- 检查防火墙设置

#### 错误 3: 401 Unauthorized
**症状**: 登录返回 401 状态码
**原因**: 邮箱或密码错误
**解决**:
- 确认邮箱: `admin@example.com`
- 确认密码: `admin123`

#### 错误 4: 前端没有反应
**症状**: 点击登录按钮没有任何反应
**解决**:
- 打开浏览器控制台查看错误
- 检查是否访问了正确的端口 (3001)

### 📝 手动测试步骤

1. **访问**: http://localhost:3001/login

2. **输入**:
   - 邮箱: `admin@example.com`
   - 密码: `admin123`

3. **点击登录**

4. **预期结果**:
   - 弹出 "登录成功!" 提示
   - 自动跳转到首页
   - 导航栏显示 "👤 管理员"
   - 显示 "管理后台" 链接

### 🔄 如果还是不行

重新导入数据并重启服务：

\`\`\`bash
# 1. 重新导入数据
cd ecommerce-project/backend
node seedData.js

# 2. 重启后端（Ctrl+C 停止，然后）
npm run dev

# 3. 重启前端（Ctrl+C 停止，然后）
cd ../frontend
npm run dev
\`\`\`

### 📞 需要帮助？

如果以上步骤都无法解决，请提供：
1. 浏览器控制台的错误截图
2. Network 标签中 login 请求的详细信息
3. 你输入的具体账号密码

---

## 快速测试命令

\`\`\`bash
# 测试后端登录 API
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
\`\`\`

预期输出包含 token 和用户信息。
