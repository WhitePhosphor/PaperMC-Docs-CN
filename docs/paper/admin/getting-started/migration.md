---
slug: /migration
title: 迁移到或从 Paper 迁移
description: 将您的服务器迁移到或从 Paper 迁移很简单。本页面将帮助您入门。
---

将您的服务器迁移到或从 Paper 迁移很简单。以下步骤将帮助您入门。

:::caution[开始之前请备份您的数据！]

在开始之前，请确保您已对服务器进行了完整备份。

有关更多信息，请参阅我们的[备份指南](/paper/updating#step-1-backup)。

:::

## 迁移到 Paper

### 从 CraftBukkit 或 Spigot 迁移

从 CraftBukkit 或 Spigot 迁移到 Paper 很容易。按照以下步骤操作。

1. 如果服务器正在运行，请停止它，并创建完整备份。
2. 从[我们的下载页面](https://papermc.io/downloads)下载 Paper。
3. 将下载的文件重命名为与[启动命令](getting-started.mdx#running-the-server)中指定的名称相匹配。
4. 用您刚下载的 Paper JAR 替换现有的 JAR 文件。
5. 启动您的新服务器。

Paper 保持与所有 Spigot 插件的完全兼容性，允许无缝过渡。

:::info

您的新 Paper 服务器仍将使用 [`bukkit.yml`](../reference/configuration/bukkit-configuration.mdx)
和 [`spigot.yml`](../reference/configuration/spigot-configuration.mdx)。
新的配置选项可以在 [`config/paper-global.yml`](../reference/configuration/global-configuration.mdx)
和 [`config/paper-world-defaults.yml`](../reference/configuration/world-configuration.mdx) 中找到。

:::

如果您在从 CraftBukkit 或 Spigot 迁移时遇到任何问题，请不要犹豫，在
[我们的 Discord 服务器](https://discord.gg/papermc)（`#paper-help` 频道）寻求支持。

### 从原版迁移

从原版迁移到 Paper 时，世界的存储方式将自动更改。
如果您想要回到原版，请仔细按照[原版迁移指南](#to-vanilla)
操作，因为需要手动更改。

1. 如果原版服务器正在运行，请停止它，并创建完整备份。
2. 从[我们的下载页面](https://papermc.io/downloads)下载 Paper，并用您刚下载的 Paper JAR
   替换您的原版服务器 JAR。
3. 将下载的文件重命名为与[启动命令](getting-started.mdx#running-the-server)中指定的名称相匹配。
4. 启动您的新 Paper 服务器。

您现在已成功迁移到 Paper。如果您遇到任何问题，请不要犹豫，在
[我们的 Discord 服务器](https://discord.gg/papermc)（`#paper-help` 频道）寻求支持。

### 从 Fabric/Forge 迁移

因为 Fabric 和 Forge 都使用原版的世界目录结构，所以可以使用与
[原版迁移指南](#from-vanilla)相同的步骤，但有一点需要注意。如果您的 Fabric 或 Forge
服务器使用了添加新方块、物品或其他游戏数据的模组，Paper 将无法加载这些功能。

此外，请注意 Paper 不支持 Fabric 或 Forge 模组。您需要找到插件替代品。
任何试图同时支持模组和插件的混合方案都存在根本性缺陷，不建议使用。

## 从 Paper 迁移

### 迁移到原版

因为 Paper 存储世界的方式与原版略有不同，所以需要手动操作。
如果不执行这些步骤，您的下界和末地看起来就像被重置了。别担心！
即使发生了这种情况，您也没有丢失任何数据。原版服务器只是不知道在哪里
找到它。

这里有一个图表显示了原版和 Paper 存储世界的方式的区别。

| 服务器软件 | 主世界   | 下界                  | 末地                   |
| ---------- | -------- | --------------------- | --------------------- |
| 原版       | `/world` | `/world/DIM-1`        | `/world/DIM1`         |
| Paper      | `/world` | `/world_nether/DIM-1` | `/world_the_end/DIM1` |

按照以下步骤从 Paper 迁移到原版：

:::note

这些步骤假设 `level-name`（在 `server.properties` 中设置）为 `world`。如果您的
情况不是这样，请在以下所有步骤中将 `world` 替换为您的 `level-name`。

:::

1. 如果 Paper 服务器正在运行，请停止它。
2. 如果您已经用原版启动了服务器，进入 `world` 文件夹并删除
   `DIM-1` 和 `DIM1` 文件夹。只有在您已经用原版启动了服务器的情况下才需要这一步。
3. 将 `/world_nether/DIM-1` 文件夹复制到 `/world` 文件夹中。
4. 将 `/world_the_end/DIM1` 文件夹复制到 `/world` 文件夹中。
5. 删除 `/world_nether` 和 `/world_the_end` 文件夹。
6. 用原版服务器 JAR 替换您的 Paper JAR。
7. 启动您的原版服务器。

### 迁移到 CraftBukkit 或 Spigot

Paper **不**支持迁移到 CraftBukkit 或 Spigot！虽然您可能会成功
（CraftBukkit 和 Spigot 都使用与 Paper 相同的目录结构），但遇到问题时**不要**寻求
支持，并注意可能会丢失数据。

### 迁移到 Fabric/Forge

因为 Fabric 和 Forge 都使用与原版相同的世界存储目录结构，所以请按照
[原版迁移指南](#to-vanilla)进行操作。请注意，Fabric 和 Forge 都不会支持 Paper 插件！
您需要找到替代的模组。
