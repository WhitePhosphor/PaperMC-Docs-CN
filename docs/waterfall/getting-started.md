---
slug: /getting-started
description: 如何开始运行 Waterfall。
eol: true
eol_message: 我们建议你迁移到 [Velocity](https://papermc.io/software/velocity)。更多信息，请参见[公告](https://forums.papermc.io/threads/1088/)。
---

# 入门指南

## 什么是 Waterfall？

Waterfall 是 BungeeCord 的一个分支，BungeeCord 是一个主要用于在多个 Minecraft 服务器之间传送玩家的代理。

Waterfall 专注于三个主要领域：

- 稳定性：Waterfall 致力于保持稳定。我们将通过使代码库可测试并避免导致代理延迟的做法来实现这一目标。
- 功能：Waterfall 旨在包含比标准 BungeeCord 更多的功能。
- 可扩展性：只要有一个相当现代的 CPU、内存和良好的网络连接，Waterfall 就应该能够处理大量的并发玩家。

## 要求

Waterfall 需要 **Java 8** 或更新版本才能运行。Paper 团队建议你在 Java 11 或更高版本上运行。
通常我们以 LTS 版本的 Java 为目标，不过在更新的版本上你也可能会成功运行。

## 从 BungeeCord 迁移

Waterfall 是 BungeeCord 的直接替代品，你不需要对配置做任何更改。

## 获取代理 JAR

Paper 直接从我们的[下载页面](https://papermc.io/downloads/waterfall)提供可运行的代理 JAR。

点击构建号码即可下载文件。

## 运行代理

要运行代理，只需像运行任何其他 Java 应用程序一样启动它。

打开你的终端，导航到保存位置，然后运行

```bash
java -Xms512M -Xmx512M -jar waterfall-###.jar
```

Aikar 推荐的 Waterfall 启动参数如下：

```bash
java -Xms512M -Xmx512M -XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -jar waterfall-###.jar
```

可以通过更改 `-Xms` 和 `-Xmx` 参数中的数字来设置内存大小。

要配置你的代理，请参阅[配置](configuration.mdx)页面。

## 更新代理

要更新代理，首先通过执行 `end` 命令安全地停止它。然后用新的代理 JAR 替换旧的，并启动代理。就是这样。
