<!--
说明：
- 本模板配合 pr-autofill.yml 使用，AUTO 区块会被机器人填充/更新。
- 若机器人失败，请人工补充后提交；质量闸门会挡住“空描述”。
-->

## 变更动机（Why）
> 简述业务/技术动因与目标。

## 方案摘要（What / How）
> 核心实现、关键设计取舍、边界与假设。

---

## 🤖 自动摘要（由机器人填充）
<!-- AUTO-SUMMARY-START -->
_等待工作流写入…（首次触发大约几秒）_
<!-- AUTO-SUMMARY-END -->

## 🤖 风险评估与回滚建议（由机器人填充）
<!-- AUTO-RISK-START -->
_等待工作流写入…_
<!-- AUTO-RISK-END -->

---

## 影响面（打勾即代表你已确认）
- [ ] **后端 Worker** 路由/行为有变更  
  - 触达端点（勾选）：  
    - [ ] `POST /codegen`（代码守卫/补全：`X-Return-Form`、`X-Code-Only-Enforced`、`X-Code-Continue-Rounds`）  
    - [ ] `POST /chat`（搜索策略/纪元/视觉/幂等：`X-Model-Used`、`X-Session-Id`、`X-Search-*`、`X-Epoch-*`、`X-Usage-*`）  
    - [ ] `GET /admin-api/healthz|readyz|version|diag|clock|ping`  
    - [ ] `GET /uploads/*`、`/uploads-raw/*`（图像缩放/直出）  
  - [ ] KV / R2/ Durable Objects 绑定或键名有变（`STREAM_CACHE`、`HISTORY_KV`、`USER_PREFS_KV`、`UPLOAD_BUCKET`…）
- [ ] **接口协定**（Contract）未破坏：`test/contract/*.test.ts` 已更新并通过
- [ ] **前端/多端** 兼容已验证（Web/移动端/桌面端/Cloudflare Pages 预览）
- [ ] **性能预算**：冷启动/令牌成本/路由耗时未回退（见 Observability）
- [ ] **安全合规**：权限/速率/Secrets/PII 评估通过
- [ ] **i18n/可访问性**：文案、A11y（若涉及前端）

---

## 测试与质量（本地/CI 一致）
**本地命令**（与 CI 一致）：
```bash
npm ci
npm run lint
npm run typecheck
npm run test           # 单元
npm run test:contract  # 若你把 contract 单独暴露了脚本
