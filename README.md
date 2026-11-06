# Jiayu (Joey) Shi — ePortfolio

纯静态网站（HTML + CSS + 原生 JS，无需构建），可直接部署到 GitHub Pages / Netlify / Vercel。

## 文件结构
- `index.html` — 全部页面内容（8 个板块）
- `assets/css/style.css` — 样式（GT 海军蓝 #003057 + 金色 #B3A369）
- `js/main.js` — 移动端菜单、导航高亮、滚动动画、图片灯箱
- `assets/img/` — 已压缩的网页图片；`assets/media/` — 跳跃视频；`assets/JiayuShi_Resume.pdf` — 简历

## 本地预览
python -m http.server 8765  →  打开 http://localhost:8765

## 部署到 GitHub Pages
1. 新建公开仓库（如 `<用户名>.github.io`），上传 index.html、js/、assets/、.gitignore
2. Settings → Pages → Source: Deploy from a branch → main / root
3. `.gitignore` 已排除 `个人资料/` 和 `eportfolio.md`，避免私人文件被公开

## 添加新项目
复制 `index.html` 中任意一个 `<article class="project-card">` 块，修改标题、图片和 Problem / Process / Outcome 文字即可。

## 更新简历
用新 PDF 覆盖 `assets/JiayuShi_Resume.pdf`（文件名保持不变）。
