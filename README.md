# Jiayu (Joey) Shi — ePortfolio

纯静态网站（HTML + CSS + 原生 JS，无需构建），可直接部署到 GitHub Pages / Netlify / Vercel。

## 文件结构
- `index.html` — 全部页面内容。每个 `class="page"` 的区块是一个独立页面，导航栏点击后只显示该页（网址 `#about`、`#projects` 等可直接分享）
- `assets/css/style.css` — 样式（GT 海军蓝 #003057 + 金色 #B3A369）
- `js/main.js` — 页面切换（按网址 # 显示对应页面，支持浏览器前进/后退）、移动端菜单、滚动动画、图片灯箱
- `assets/img/` — 已压缩的网页图片；`assets/media/` — 跳跃视频；`assets/JiayuShi_Resume.pdf` — 简历

## 本地预览
python -m http.server 8765  →  打开 http://localhost:8765

## 部署到 GitHub Pages
1. 新建公开仓库（如 `<用户名>.github.io`），上传 index.html、js/、assets/、.gitignore
2. Settings → Pages → Source: Deploy from a branch → main / root
3. `.gitignore` 已排除 `个人资料/` 和 `eportfolio.md`，避免私人文件被公开

## 添加新项目
1. 在 Projects 概览页的 `project-grid` 里复制一张 `<a class="project-card" href="#project-xxx">` 摘要卡片，改标题、一句话简介和图片。
2. 复制一个项目详情页 `<section id="project-xxx" class="page project-page alt" data-parent="projects" ...>`，改 id（与卡片的 href 对应）、Problem / Process / Outcome 文字和图片。
3. 更新上一个/下一个项目页底部的翻页按钮。

## 更新简历
用新 PDF 覆盖 `assets/JiayuShi_Resume.pdf`（文件名保持不变）。
