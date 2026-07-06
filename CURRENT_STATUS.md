# 当前状态

## 已确认

- 已按 `vibe-coding` 重新创建并通过 review 的 spec：`.trae/specs/rebuild-case-tracking-demo-with-vibe-coding/`。
- 最新 PRD 来源为飞书文档 `UCsMdfTwho0D4FxCOWjmUlOxyGg`，规划时读取到 revision `815`。
- 当前 demo 必须以原 Case Tracking URL 中的目标 seller `7494637214381212924` 为主叙事。
- 原 Case Tracking 可见结构包括 Search、Seller basic info、Comments、Onboarding process、Seller actions、TTS reviews、Detail 入口。

## 实现范围

- React + TypeScript + Vite 单页静态 demo。
- 使用安全 mock 数据展示 seller onboarding case tracking 改造方案。
- 不接入 Pearl、QA Tool、Thunder、Lark 或任何真实内部接口。
- 不写入 token、cookie、API key、GitHub token 或真实证件图片/文件 URL。

## 本轮已完成实现

- 默认 seller 已改为 `ShopCrazee / 7494637214381212924`，搜索框和主页面叙事均围绕目标 seller。
- 一页式诊断摘要改为 `Blocked Stage`、`Blocked time`、`Blocking Reason`，当前 blocker 为 `PIPO`。
- 摘要主内容不再展示“商家下一步动作”，只聚焦卡点三要素和业务原因。
- 新增 `Seller actions` 模块，恢复原 Case Tracking 页面中的 Seller actions、allowlist 和 Detail 语义。
- 统一节点视图补齐 `PIPO Unknown`、`KYB/KYC EA empty`、`LLM Fake ID/Doc Premoderation repeated content`、`Pay Onboard No Detail` 等新需求展示场景。
- Detail 抽屉支持 PIPO Unknown 解释、LLM 重复内容按 attempt/time/source 拆分、证据预览失败原因和替代方式。
- 批量查询默认输入已以目标 seller 开头，目标 seller 结果显示 `Pending / PIPO / Unknown with no returned time`。

## 验证结果

- 已通过 `npm run lint`。
- 已通过 `npm run check`。
- 已通过 `npm run build`。
- 已通过本地生产预览 `http://127.0.0.1:4175/Debug-tool/` 浏览器验证：
  - 页面默认搜索框显示 `7494637214381212924`。
  - 页面显示 `ShopCrazee · current blocker: PIPO`。
  - 点击诊断摘要按钮后，Detail 抽屉显示 PIPO Unknown 和 Start/End time 缺失解释。
  - 点击 LLM 节点后，Detail 抽屉展示 Person Information 与 Submitted Files 两条拆分记录。
  - 点击 Preview failed 后，页面展示失败原因和替代方式。
  - 点击 Export CSV 后，页面展示导出预览反馈。

## 注意事项

- 当前环境没有全局 `npm`，验证时使用本机 Node/npm 绝对路径，并临时把 Node 目录加入 PATH。
- `npm install` 触发 `package-lock.json` 中 Rollup optional entries 的规范化删除；`package.json` 未改，构建验证通过。

## 下一步

- 将本地改动发布到 GitHub Pages。
- 发布后必须打开带 cache-busting query 的 GitHub Pages URL，确认页面包含 `7494637214381212924` 且不再与 `?v=264ebcf` 版本相同。
