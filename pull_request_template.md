## 变更说明
- [ ] 无损（不改变线上行为）
- [ ] 新增 CI/测试/文档
- [ ] 仅 Worker 微修（头部/观测/日志）

## 检查清单
- [ ] 本地通过 `npm run test` 与 `npm run test:contract`
- [ ] 如涉及 `/codegen`，已验证 headers: X-Model-Used / X-Code-Continue-Rounds
- [ ] 如涉及 `/chat`，已验证 NDJSON 与 X-Schema-Version
