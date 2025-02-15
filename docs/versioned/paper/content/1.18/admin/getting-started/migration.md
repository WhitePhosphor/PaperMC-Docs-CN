---
slug: /migration
title: 迁移到Paper或从Paper迁移
---

迁移你的服务器到Paper或从Paper迁移很简单。下面的步骤将帮助你开始。

:::caution[开始前请备份你的数据!]

在开始之前,请确保你对服务器进行了完整备份。

[//]: # "查看我们的[备份指南](/backup)了解更多信息。"

:::

## 迁移到Paper

### 从CraftBukkit或Spigot

从CraftBukkit或Spigot迁移到Paper很容易。按照以下步骤操作。

1. 如果服务器正在运行,停止它,并创建完整备份。
2. 从[我们的下载页面](https://papermc.io/downloads)下载Paper。
3. 用你刚下载的Paper jar替换你现有的服务器jar。
4. 启动你的新服务器。

Paper保持与所有Spigot插件的完全兼容性,允许无缝过渡。

:::info

你的新Paper服务器仍将使用`bukkit.yml`和`spigot.yml`,只是在`paper.yml`中添加新的配置选项。

:::

如果你在从CraftBukkit或Spigot迁移时遇到任何问题,不要犹豫,在[我们的Discord服务器](https://discord.gg/papermc)(`#paper-help`频道)寻求支持。

### 从原版

当从原版迁移到Paper时,世界的存储方式将自动更改。如果你想要回到原版,请仔细按照[原版迁移指南](#to-vanilla)操作,因为需要手动更改。

1. 如果你的原版服务器正在运行,停止它,并创建完整备份。
2. 从[我们的下载页面](https://papermc.io/downloads)下载Paper,并用你刚下载的Paper jar替换你的原版服务器jar。
3. 启动你的新Paper服务器。

你现在已经成功迁移到Paper。如果你遇到任何问题,不要犹豫,在[我们的Discord服务器](https://discord.gg/papermc)(`#paper-help`频道)寻求支持。

### 从Fabric/Forge

因为Fabric和Forge都使用原版的世界目录结构,所以可以使用与[原版迁移指南](#from-vanilla)相同的步骤,但有一个注意事项。如果你的Fabric或Forge服务器使用了添加新方块、物品或其他数据到游戏的模组,Paper将无法加载这些功能。

另外,请注意Paper不支持Fabric或Forge模组。你需要找到插件替代品。任何试图同时支持模组和插件的混合方案从根本上都是有缺陷的,不建议使用。

## 从Paper迁移

### 到原版

因为Paper存储世界的方式与原版略有不同,所以需要手动工作来迁移。如果不采取这些步骤,你的下界和末地看起来就像被重置了。别担心!即使发生了这种情况,你也没有丢失任何数据。原版服务器只是不知道在哪里找到它。

这里有一个图表显示了原版和Paper存储世界的差异。

| 服务器软件 | 主世界 | 下界                | 末地                   |
| --------------- | --------- | --------------------- | --------------------- |
| 原版         | `/world`  | `/world/DIM-1`        | `/world/DIM1`         |
| Paper           | `/world`  | `/world_nether/DIM-1` | `/world_the_end/DIM1` |

按照这些步骤从Paper迁移到原版:

:::note

这些步骤假设`level-name`(在`server.properties`中设置)为`world`。如果你的情况不是这样,请在以下所有步骤中将`world`替换为你的`level-name`。

:::

1. 如果你的Paper服务器正在运行,停止它。
2. 如果你已经用原版启动了服务器,进入`world`文件夹并删除`DIM-1`和`DIM1`文件夹。只有在你已经用原版启动了服务器时才需要这一步。
3. 将`/world_nether/DIM-1`文件夹复制到`/world`文件夹中。
4. 将`/world_the_end/DIM1`文件夹复制到`/world`文件夹中。
5. 删除`/world_nether`和`/world_the_end`文件夹。
6. 用原版服务器jar替换你的Paper jar。
7. 启动你的原版服务器。

### 到CraftBukkit或Spigot

Paper**不**支持迁移到CraftBukkit或Spigot!虽然你可能会成功(CraftBukkit和Spigot使用与Paper相同的目录结构),但**不要**寻求遇到问题时的支持,并注意可能会丢失数据。

### 到Fabric/Forge

因为Fabric和Forge使用与原版相同的世界存储目录结构,所以按照[原版迁移指南](#to-vanilla)进行此过程。注意Fabric和Forge都不支持Paper插件!你需要找到替代的模组。
