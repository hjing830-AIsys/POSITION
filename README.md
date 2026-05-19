# POSTITON OL

`POSTITON OL` 是由 `position_manager_app.py` 重新整理而来的线上网页端版本，面向 iPhone 15 屏幕和 Vercel 部署。

## 技术栈

- Next.js
- React
- TypeScript
- 原生 CSS
- 浏览器 LocalStorage

## 本地运行

### 方式一：直接打开 HTML 主页

可以直接双击打开：

```text
F:\My_AI_Agent\POSTITON_OL\index.html
```

这是一个独立静态 HTML 版本，不需要 Node.js。

### 方式二：运行 Next.js 网页端

```powershell
cd F:\My_AI_Agent\POSTITON_OL
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

静态入口页也可以访问：

```text
http://localhost:3000/index.html
```

## 部署到 Vercel

1. 将 `POSTITON_OL` 目录推送到 GitHub。
2. 在 Vercel 新建 Project，选择该仓库。
3. Framework Preset 选择 `Next.js`。
4. Build Command 使用默认值：`npm run build`。
5. Output Directory 保持默认。
6. 点击 Deploy。

## 数据说明

当前版本为纯前端应用，数据默认保存在浏览器 LocalStorage 中。页面提供：

- 保存：写入当前浏览器本地存储
- 导出：导出 JSON 数据文件
- 导入：从 JSON 文件恢复数据
- 重置：清空当前页面数据

如果后续需要多设备同步，可以增加数据库或云端 API。

## 文档

产品需求文档（PRD）见：

```text
docs/PRD.md
```
