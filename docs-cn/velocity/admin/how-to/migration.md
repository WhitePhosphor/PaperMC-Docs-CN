---
slug: /migration
description: 如何在不同 Velocity 版本之间迁移你的代理服务器。
---

# 迁移指南

你是 Velocity 新手，或者正在升级到新版本的 Velocity？本页面将简要介绍成功迁移需要注意的事项。

## 从 Velocity 1.0.x 迁移到 Velocity 1.1.0

从 Velocity 1.0.x 迁移到 Velocity 1.1.0 应该很简单，只需替换 Velocity JAR 文件并重启代理服务器即可。
你可能需要备份你的 `velocity.toml`，然后删除当前的 `velocity.toml` 并让 Velocity 重新生成它，
以添加 Velocity 1.1.0 引入的新设置。
