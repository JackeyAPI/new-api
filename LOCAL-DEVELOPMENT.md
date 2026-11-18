# New API 本地开发与测试

源码基线：官方 `v1.0.0-rc.51`（`c9c6da2786b6a0912215127e78e28fbc6650c85f`），开发分支 `jackey/local-dev`。
`upstream` 指向 QuantumNous/new-api；`origin` 指向 https://github.com/JackeyAPI/new-api 。
本地开发配置由 AI 辅助编写；保留上游主分支，日常修改在开发分支提交。

## 启动

需要 Docker Desktop。Go 与 Bun 在容器内运行，无需宿主机安装。

```sh
sh init-local.sh
docker compose -f compose.local.yaml up -d --build
docker compose -f compose.local.yaml ps
```

打开 http://127.0.0.1:3000 ，按官方初始化向导创建管理员。
初始环境不配置真实上游、不自动发送付费测试请求。
`.env` 含随机生成的本地密钥，已由上游 .gitignore 排除。
PostgreSQL 和 Redis 不映射宿主机端口；HTTP 配置仅供本机使用。

## 开发循环

前端热更新：

```sh
docker compose -f compose.local.yaml --profile dev up -d web
```

打开 http://127.0.0.1:5173 ，编辑 `web/src` 后热更新。开发服务器的 API 代理连接 gateway。

Go 后端修改或验证完整前端构建：

```sh
docker compose -f compose.local.yaml up -d --build gateway
docker compose -f compose.local.yaml logs --tail 100 gateway
```

构建使用官方多阶段 Dockerfile，编译的是本目录源码，不是拉取预编译网关镜像。

前端检查（启动 dev profile 后）：

```sh
docker compose -f compose.local.yaml exec web bun run typecheck
docker compose -f compose.local.yaml exec web bun run test
```

后端修改应按仓库 AGENTS.md 执行受影响包测试；Go 工具链版本见 go.mod。
relaykit、tokenkit 为独立模块，修改后分别构建与测试。
数据库行为变更须执行仓库要求的三数据库验证，本地 PostgreSQL 启动不代表完整兼容性验收。

## 功能验收顺序

1. 初始化、管理员登录、创建测试用户和令牌。
2. 配置本地 mock 上游，验证模型映射、鉴权、额度和日志。
3. 两个同模型渠道验证权重、优先级、失败切换；禁止跨模型静默替换。
4. 使用现有 upstream-check 工具测试流式、工具调用、缓存与用量。
5. 真实上游仅在明确预算后测试；Coding 客户端单独验收。

## 停止与数据

```sh
docker compose -f compose.local.yaml --profile dev down
```

这会保留数据卷。`down -v` 会删除本项目数据库等数据，仅在明确重置时使用。
日志查看使用 `logs --tail 100`，不要提交密钥、真实请求正文或数据库备份。
后续接入 GitHub 后先核对 `git remote -v`，origin 必须归属 JackeyAPI。
发布前保留并遵守上游 LICENSE、NOTICE 及第三方声明；本流程没有修改业务逻辑或品牌。
