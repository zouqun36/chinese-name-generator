# Chinese Name Generator - 开发进度

## 2026-03-27 已完成

### 1. Bug 修复 ✅
- 生肖计算：按农历春节正确计算（1900-2050年）
- 名字性别区分：优化 PHONEME_MAP，女性名字更柔美
- 日期格式：改为 YYYY/MM/DD

### 2. 产品策略设计 ✅
**权限体系：**
- 免费用户（未登录）：3次/天，无保存
- 注册用户：10次/天，30天历史，5个收藏
- 付费用户（Pro）：50次/天，1年历史，50个收藏，发音+导出

**定价：**
- 月付：$2.99/月
- 年付：$19.99/年

**到期策略：**
- 保留只读访问
- 提前7天邮件提醒
- 降级为注册用户权限

### 3. 基础架构 ✅
- ✅ 数据库 Schema (`schema.sql`)
- ✅ 类型定义 (`lib/types.ts`)
- ✅ 权限工具 (`lib/permissions.ts`)
- ✅ 定价页面 (`app/pricing/page.tsx`)

## 2026-03-28 已完成

### 4. 认证系统 ✅
- ✅ NextAuth v5 配置 (`auth.ts`)
- ✅ Google OAuth Provider
- ✅ API Route (`app/api/auth/[...nextauth]/route.ts`)
- ✅ 登录页面 (`app/login/page.tsx`) — 精美 Google 登录界面

### 5. 使用限制系统 ✅
- ✅ 使用次数 API (`app/api/usage/route.ts`)
  - GET：查询今日用量
  - POST：记录一次使用（超限返回 429）
  - 按用户 email 或 IP 区分
  - 注：当前用内存存储，生产环境替换为 D1

### 6. 个人中心 ✅
- ✅ `/profile` 页面（服务端鉴权，未登录跳转 `/login`）
- ✅ `ProfileClient` 组件：
  - 用户头像 + 邮箱 + 套餐 badge
  - 今日用量进度条
  - Pro 升级入口
  - Overview / History / Favorites 三 tab

### 7. 主页更新 ✅
- ✅ `NavBar` 组件：Sign in 按钮 / 头像 + 名字 + Sign out
- ✅ 主页集成导航栏（服务端读取 session）
- ✅ 去掉 `output: export`，支持动态 API route

### 8. 构建验证 ✅
```
Route (app)
├ ƒ /                  (Dynamic)
├ ƒ /api/auth/[...]    (Dynamic)
├ ƒ /api/usage         (Dynamic)
├ ○ /login             (Static)
├ ○ /pricing           (Static)
└ ƒ /profile           (Dynamic)
```

## 下一步待办

### 1. 配置 Google OAuth
- [ ] 在 Google Cloud Console 创建 OAuth 应用
- [ ] 填写 `.env.local`（参考 `.env.local.example`）
- [ ] 添加授权回调 URL：`https://chinanam.online/api/auth/callback/google`

### 2. 数据库接入
- [ ] 创建 Cloudflare D1 数据库
- [ ] 运行 `schema.sql` 初始化
- [ ] 配置 `wrangler.toml`
- [ ] 将 `/api/usage` 内存存储替换为 D1 查询

### 3. 支付集成（Stripe）
- [ ] 创建 Stripe 账号 + 产品配置
- [ ] `/api/checkout` — 创建订阅 Checkout Session
- [ ] `/api/webhook` — 处理 Stripe webhook，更新 user.subscription_tier
- [ ] 在 `/pricing` 页加入"Buy"按钮

### 4. 生成时的限制联动
- [ ] `InputForm` 生成前调用 `/api/usage` POST
- [ ] 超限时显示升级提示弹窗
- [ ] 显示剩余次数 badge

### 5. 历史记录 & 收藏（需 D1）
- [ ] 生成时写入 name_history 表
- [ ] NameCard 加"收藏"按钮，写入 favorites 表
- [ ] Profile History / Favorites tab 从 D1 读取展示

## 技术栈
- Next.js 15 + TypeScript
- Cloudflare Pages + D1
- NextAuth.js v5 (Google OAuth)
- Stripe (支付)
- Tailwind CSS v4

## 部署信息
- GitHub: zouqun36/chinese-name-generator
- Cloudflare Project: chinese-name-generator
- 域名: chinanam.online
