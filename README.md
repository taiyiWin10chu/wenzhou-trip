# 温州 2 天 1 夜 · 旅行手册

单 HTML 文件，离线可看；部署到 Cloudflare Workers，公开可访问。

下面是从零开始的完整步骤，每一步都点到位。**所有"在电脑上"做的事，都用 GUI 不碰命令行。**

---

## 准备工作：先把代码文件夹搬到桌面

代码现在在 WorkBuddy 的 workspace 里：
```
/Users/regan/WorkBuddy/2026-09-08-20-47-34/wenzhou-trip
```

里面是 7 项：
- 📁 `public`（里面有 `index.html`，这是页面本体）
- 📁 `src`（里面有 `index.js`）
- 📁 `.github`（里面有 `workflows/deploy.yml`，**带点的隐藏文件夹**）
- 📄 `.gitignore`（**带点的隐藏文件**）
- 📄 `wrangler.toml`
- 📄 `package.json`
- 📄 `README.md`（你正在看的这个文件）

**先把这个 `wenzhou-trip` 文件夹整个复制到桌面**，方便后面操作：
1. Finder 左侧栏 → 找到 `/Users/regan/WorkBuddy/2026-09-08-20-47-34/`
2. 看到 `wenzhou-trip` 文件夹，拖到桌面（或者右键 → 拷贝，然后粘贴到桌面）

---

## 第 1 步：把代码传到 GitHub（用 GitHub Desktop，零命令行）

### 1.1 注册 GitHub 账号（已有就跳到 1.2）

- 浏览器打开 https://github.com
- 右上角 **Sign up** → 按提示填邮箱、密码、用户名
- 去邮箱点验证链接激活

### 1.2 下载并安装 GitHub Desktop

- 浏览器打开 https://desktop.github.com
- 点 **Download for macOS**
- 下载完是个 .zip，解压得到 `GitHub Desktop.app`
- 把它拖进 **Applications** 文件夹
- 从启动台打开 GitHub Desktop

### 1.3 登录 GitHub

- 第一次打开会要求登录
- 点 **Sign in to GitHub.com**
- 浏览器自动弹出，让你授权 GitHub Desktop → 点绿色 **Authorize** 按钮

### 1.4 创建仓库

- 顶部菜单 **File** → **New Repository**（或按 Cmd+N）
- 弹出窗口填：
  - **Name**: `wenzhou-trip`
  - **Local path**: 点 "Choose..." → 选 **Documents** 文件夹
  - **取消勾选** ✅ "Initialize this repository with a README"
- 点 **Create Repository**

→ 它会在 `~/Documents/wenzhou-trip/` 创建空文件夹

### 1.5 把代码文件复制进去

1. 打开 Finder，地址栏按 **Cmd+Shift+G**，输入 `~/Documents/wenzhou-trip`，回车
2. 打开 Finder，地址栏按 **Cmd+Shift+G**，输入 `/Users/regan/Desktop/wenzhou-trip`，回车（桌面那个 wenzhou-trip）
3. 从右侧桌面那个文件夹，**全选**（Cmd+A），**拖到**左侧 Documents 那个文件夹
4. ⚠️ **关键**：`.github` 和 `.gitignore` 是隐藏文件/文件夹，Finder 默认不显示
   - 在 Finder 里按 **Cmd+Shift+.**（点号键），就会显示/隐藏
5. 等所有文件复制完

应该复制了 7 项：
- 📁 public
- 📁 src
- 📁 .github
- 📄 .gitignore
- 📄 wrangler.toml
- 📄 package.json
- 📄 README.md

### 1.6 提交并发布

- 回到 GitHub Desktop
- 左栏会显示这 7 项，每个文件名左边有蓝色 **A**（新增）
- 左下角 **Summary** 框填：`init`
- 点 **Commit to main**
- 顶部出现 **Publish repository** 按钮，点
- 弹窗里：
  - **Name**: wenzhou-trip
  - 选 **Public**（公开，公开链接才打得开）
  - **取消勾选** "Keep this code private"
- 点 **Publish Repository**

✅ **第 1 步完成！**

现在浏览器打开 `https://github.com/你的用户名/wenzhou-trip` 应该能看到所有文件。

> 💡 **如果 GitHub Desktop 装不上**：用纯网页上传
> - 浏览器登录 https://github.com
> - 右上角 **+** → **New repository** → Name 填 `wenzhou-trip` → **Public** → 不要勾任何选项 → Create
> - 进到新页面，点 **uploading an existing file** 链接
> - 把桌面 wenzhou-trip 文件夹里**全部 7 项**（先按 Cmd+Shift+. 显示隐藏）拖到浏览器
> - 点底部 **Commit changes**
> - 这条路径也 OK，只是以后改内容要在网页上一个个点

---

## 第 2 步：注册 Cloudflare + 拿 API Token

> **Token 是啥？** 一串密码，让 GitHub 代替你去 Cloudflare 部署代码，不用每次都输密码。

### 2.1 注册 Cloudflare

- 浏览器打开 https://dash.cloudflare.com/sign-up
- 填邮箱 + 密码 → 注册
- **去邮箱点验证链接**
- 登录

### 2.2 创建 API Token

1. 登录后，右上角**头像** → **My Profile**
2. 左侧栏点 **API Tokens**
3. 点 **Create Token** 按钮
4. 在模板列表里找 **"Edit Cloudflare Workers"** → 点右边的 **Use template**
5. 页面下方 **Account Resources**：
   - **Account**: 选你的账号（一般只有一个）
   - **Zone Resources**: **保持默认，不要动**
6. 拉到底点 **Continue to summary**
7. 看到摘要 → 点 **Create Token**
8. 🚨 **关键页面**：会显示一长串字符，类似：
   ```
   aB1c2D3e4F5g6H7i8J9k0L1mN2oP3qR4sT5uV6
   ```
9. **立刻点右边 📋 复制按钮**
10. **粘到你的备忘录保存！** 关掉这个页面就再也看不到了（丢了重新生成）

✅ **第 2 步完成！**

---

## 第 3 步：拿 Account ID

> **Account ID 是啥？** 你的 Cloudflare 账号唯一编号，告诉系统往哪儿部署。

1. 浏览器新标签打开 https://dash.cloudflare.com/
2. 左侧栏点 **Workers** → **Workers & Pages**
3. 进到页面后，**看最右侧栏**
4. 找到 **"Account ID"** 标签，下面跟着一串 hex 字符（类似 `a1b2c3d4e5f6...`）
5. 点右边 📋 复制按钮
6. 也粘到备忘录（跟 Token 放一起，分清楚哪个是哪个）

✅ **第 3 步完成！**

---

## 第 4 步：在 GitHub 加两个秘密（Secret）

> **Secret 是啥？** GitHub 的密码保险箱，存的密码对外不可见，仓库代码里也看不到。

1. 浏览器打开你的仓库：`https://github.com/你的用户名/wenzhou-trip`
2. 顶部标签栏点 **Settings**（⚠️ 不是 "Code"）
3. 左侧栏点 **Secrets and variables** → **Actions**
4. 点右上 **New repository secret**

### 加第一个

- **Name**: `CLOUDFLARE_API_TOKEN`（**完全一致**，区分大小写，不要有空格）
- **Secret**: 粘贴第 2 步拿的 Token
- 点 **Add secret**

### 加第二个

- 再点 **New repository secret**
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Secret**: 粘贴第 3 步拿的 Account ID
- 点 **Add secret**

页面应该显示两个 secret 项（名字能看到，值会显示为 `***`）

✅ **第 4 步完成！**

---

## 第 5 步：触发首次部署

1. 在仓库主页（`https://github.com/你的用户名/wenzhou-trip`）
2. 找到 `README.md` 文件 → 点进去
3. 右上角 ✏️ 铅笔图标 **Edit this file**
4. 拉到底部，加个空格或随便改一行
5. 顶部点 **Commit changes...**
6. 弹窗确认 → 再点 **Commit changes**
7. 跳到顶部 **Actions** 标签
8. 能看到刚触发的工作流在跑（黄色转圈 ⏳）
9. 等 1-2 分钟
   - **绿勾 ✓** = 成功
   - **红叉 ✗** = 失败 → 点进去看日志 → 把错误截图发给我

✅ **第 5 步完成！**

---

## 第 6 步：拿公开链接

1. 浏览器回 https://dash.cloudflare.com/
2. 左侧栏 **Workers** → **Workers & Pages**
3. 列表里能看到 **wenzhou-trip** 这一项
4. 点进去
5. 顶部有链接，形如：
   ```
   https://wenzhou-trip.你的子域.workers.dev
   ```
6. **点开看看**，应该能看到旅行手册页面
7. 把链接发给妈妈

🎉 **完成！**

---

## 以后怎么改内容

所有内容都在 `public/index.html` 里。

**手机也能改**（最简单）：

1. 手机浏览器打开 `https://github.com/你的用户名/wenzhou-trip`
2. 点 `public` → 点 `index.html` → 右上 ✏️ 编辑
3. 改完点 **Commit changes**
4. 1 分钟内公开链接自动更新

---

## 卡住了怎么办

| 现象 | 怎么办 |
|------|-------|
| GitHub Desktop 装不上/打不开 | 用网页上传法（看第 1 步的💡） |
| Cloudflare Token 页面找不到 | 右上角头像 → My Profile → API Tokens，必须先登录 |
| Actions 红叉了 | 点进失败的 workflow → 点红色步骤 → 把日志截图发我 |
| 部署成功但打不开链接 | 看 Workers & Pages 列表里有没有 wenzhou-trip，有的话等 30 秒再访问（DNS 生效） |
| 链接 404 | 看看是不是 Workers 列表里没这个 worker，第 5 步可能没真跑成功 | 

---

## 附：手机离线看页面（不用部署也能用）

把 `public/index.html` 微信发到「文件传输助手」 → 浏览器打开 → Safari/Chrome 菜单 → 添加到主屏幕。以后离线也能点开。  
