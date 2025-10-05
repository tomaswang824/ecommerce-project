# MongoDB Atlas 配置指南

## 📝 配置步骤

### 步骤 1: 注册 MongoDB Atlas 账户

1. 访问 https://www.mongodb.com/cloud/atlas/register
2. 使用 Google/GitHub 账号或邮箱注册（免费）

### 步骤 2: 创建免费集群

1. 登录后点击 **"Build a Database"**
2. 选择 **FREE (M0 Sandbox)** - 512MB 存储，永久免费
3. 选择云服务商：推荐 **AWS**
4. 选择区域：推荐 **Singapore (ap-southeast-1)** 或其他亚洲区域（速度更快）
5. 集群名称：保持默认 `Cluster0` 或改为 `ecommerce`
6. 点击 **"Create"**

### 步骤 3: 配置安全设置

#### 3.1 创建数据库用户

1. 在 "Security Quickstart" 页面
2. 设置用户名和密码：
   - **用户名**: 例如 `admin` 或 `ecommerceUser`
   - **密码**: 点击 "Autogenerate Secure Password" 或自定义
   - ⚠️ **重要**：务必记住或保存密码！
3. 点击 **"Create User"**

#### 3.2 配置网络访问

1. 向下滚动到 "Where would you like to connect from?"
2. 选择 **"My Local Environment"**
3. 点击 **"Add My Current IP Address"** 或
4. 手动添加 IP：`0.0.0.0/0` (允许所有 IP 访问，仅用于开发)
5. 点击 **"Add Entry"**
6. 点击 **"Finish and Close"**

### 步骤 4: 获取连接字符串

1. 返回 Database 页面，等待集群创建完成（约 1-3 分钟）
2. 点击 **"Connect"** 按钮
3. 选择 **"Drivers"**
4. Driver 选择：**Node.js**
5. Version 选择：**5.5 or later**
6. 复制连接字符串，格式类似：
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 步骤 5: 更新项目配置

1. 打开项目中的 `backend/.env` 文件
2. 找到这一行：
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
3. 替换为你的真实连接字符串：
   - 将 `<username>` 替换为你的用户名
   - 将 `<password>` 替换为你的密码
   - 在末尾的 `/?` 前添加数据库名 `/ecommerce`

   **示例**：
   ```
   MONGODB_URI=mongodb+srv://admin:mySecurePassword123@cluster0.abc123.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

4. 保存文件

### 步骤 6: 重启后端服务

1. 停止当前运行的后端服务（Ctrl+C）
2. 重新启动：
   ```bash
   cd backend
   npm run dev
   ```

3. 查看输出，应该看到：
   ```
   MongoDB 连接成功: cluster0-shard-00-00.xxxxx.mongodb.net
   服务器运行在端口 5000
   ```

### 步骤 7: 导入示例数据

运行以下命令导入商品和管理员账户：

```bash
cd backend
node seedData.js
```

成功后会显示：
```
MongoDB 连接成功
数据导入成功!
```

**默认管理员账户**：
- 邮箱: `admin@example.com`
- 密码: `admin123`

---

## ⚠️ 常见问题

### Q1: 连接超时或无法连接

**原因**: IP 白名单未配置
**解决**:
1. 进入 Atlas -> Network Access
2. 添加 `0.0.0.0/0` 允许所有 IP（开发环境）

### Q2: 认证失败 (Authentication failed)

**原因**: 用户名或密码错误
**解决**:
1. 检查 `.env` 文件中的用户名密码是否正确
2. 密码中的特殊字符需要 URL 编码：
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`

### Q3: 数据库连接字符串格式错误

**正确格式**:
```
mongodb+srv://用户名:密码@cluster地址/数据库名?参数
```

**检查要点**:
- 是否包含 `/ecommerce` 数据库名
- 密码是否正确转义
- 是否使用了正确的集群地址

---

## 🔒 生产环境建议

1. **不要使用** `0.0.0.0/0` 作为 IP 白名单
2. 仅添加服务器的公网 IP
3. 使用强密码
4. 定期更换 JWT_SECRET
5. 启用 MongoDB 审计日志

---

## 📚 更多资源

- [MongoDB Atlas 文档](https://www.mongodb.com/docs/atlas/)
- [Mongoose 文档](https://mongoosejs.com/docs/)
- [连接字符串格式](https://www.mongodb.com/docs/manual/reference/connection-string/)
