# JacKey 演示站部署

当前部署：阿里云 Linux x86_64，Docker + Docker Compose。
服务器目录：`/opt/jackey-newapi`；访问端口：80。
镜像：`jackey-newapi:4749572-amd64`，源码提交：`4749572`。

仅用于功能演示：SQLite 数据持久化到 `./data`，未接入真实模型。
正式流量应另行配置 PostgreSQL、Redis、HTTPS、备份与监控。

## 部署

1. 在可信构建环境从指定提交构建 linux/amd64 镜像。
2. 使用 `docker save` 导出镜像，通过 SSH 上传并用 `docker load -i` 导入。
3. 复制 compose.yaml，按 .env.example 生成 demo.env（不提交密钥）。
4. 首次部署先绑定回环端口完成管理员初始化，然后开放端口。
5. 运行 `docker-compose -p jackey-newapi -f compose.yaml up -d`。

## 运维

```sh
cd /opt/jackey-newapi
docker-compose -p jackey-newapi -f compose.yaml ps
docker-compose -p jackey-newapi -f compose.yaml logs --tail=100 gateway
docker-compose -p jackey-newapi -f compose.yaml restart gateway
```

更新：备份 data 和 demo.env，导入新版本镜像，修改 compose.yaml 中镜像标签，执行 up -d。
回滚：恢复之前的镜像标签并执行 up -d；涉及数据库迁移时需同时恢复对应备份。
备份 SQLite 时先停止 gateway，复制整个 data 目录后启动，避免遗漏 WAL 数据。
不要删除 data；容器重建不会清空该目录。日志轮转上限为 3 × 10MB。

演示站已关闭新用户注册。管理员密码通过单独渠道交付，不记录在仓库中。
