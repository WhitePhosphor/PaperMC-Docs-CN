---
slug: /migration
title: Migration
description: 从其他服务器软件迁移到 Paper 的指南。
---

# 迁移到 Paper

本指南将帮助您从其他 Minecraft 服务器软件 (例如 Vanilla, CraftBukkit, Spigot, Fabric, Forge) 迁移到 Paper。迁移到 Paper 可以为您带来更好的性能、更多的功能和更稳定的服务器体验。

:::caution[备份您的数据！]

在开始迁移之前，请务必备份您的现有服务器数据，包括世界存档、配置文件、插件等。以防止迁移过程中出现意外情况导致数据丢失。

:::

## 从 Vanilla 迁移

从 Vanilla 迁移到 Paper 是最简单的迁移方式，因为 Paper 兼容 Vanilla 的世界存档和插件 API。

**迁移步骤:**

1.  **备份 Vanilla 服务器数据。**  备份您的 Vanilla 服务器的所有文件和文件夹，特别是 `world` 文件夹。
2.  **下载 Paper 服务器 JAR 文件。**  访问 [PaperMC 官网下载页面](https://papermc.io/downloads)，下载最新版本的 Paper 服务器 JAR 文件。请确保下载的版本与您当前的 Minecraft 版本对应。
3.  **替换服务器 JAR 文件。**  将您下载的 Paper 服务器 JAR 文件替换您 Vanilla 服务器的 JAR 文件 (通常是 `server.jar`)。
4.  **启动 Paper 服务器。**  使用您原先启动 Vanilla 服务器的启动脚本启动 Paper 服务器。

**完成！** 您的 Vanilla 服务器已成功迁移到 Paper 服务器。Paper 服务器将自动加载您的 Vanilla 世界存档和配置文件。

**注意事项:**

*   Paper 服务器默认配置文件为 `paper.yml`，与 Vanilla 服务器的 `server.properties` 不同。Paper 会自动读取 `server.properties` 中的部分配置项，您也可以根据需要修改 `paper.yml` 进行更详细的配置。
*   Vanilla 服务器无法使用 Bukkit/Spigot 插件。如果您想使用插件，请参考 [安装插件指南](/paper/admin/next-steps#安装插件)。

## 从 CraftBukkit/Spigot 迁移

从 CraftBukkit 或 Spigot 迁移到 Paper 非常简单，因为 Paper 兼容 CraftBukkit 和 Spigot 的插件 API 和世界存档格式。

**迁移步骤:**

1.  **备份 CraftBukkit/Spigot 服务器数据。**  备份您的 CraftBukkit 或 Spigot 服务器的所有文件和文件夹，特别是 `world` 文件夹和 `plugins` 文件夹。
2.  **下载 Paper 服务器 JAR 文件。**  访问 [PaperMC 官网下载页面](https://papermc.io/downloads)，下载最新版本的 Paper 服务器 JAR 文件。请确保下载的版本与您当前的 CraftBukkit/Spigot 服务器版本对应。
3.  **替换服务器 JAR 文件。**  将您下载的 Paper 服务器 JAR 文件替换您 CraftBukkit 或 Spigot 服务器的 JAR 文件 (通常是 `craftbukkit.jar` 或 `spigot.jar`)。
4.  **启动 Paper 服务器。**  使用您原先启动 CraftBukkit 或 Spigot 服务器的启动脚本启动 Paper 服务器。

**完成！** 您的 CraftBukkit/Spigot 服务器已成功迁移到 Paper 服务器。Paper 服务器将自动加载您的 CraftBukkit/Spigot 世界存档、配置文件和插件。

**注意事项:**

*   Paper 服务器的配置文件结构与 CraftBukkit/Spigot 略有不同。Paper 使用 `paper.yml`, `config/paper-global.yml`, `config/paper-world-defaults.yml` 等配置文件，而 CraftBukkit/Spigot 主要使用 `bukkit.yml` 和 `spigot.yml`。Paper 会自动迁移部分配置项，您可能需要手动调整部分配置。
*   Paper 提供了更多的性能优化选项和功能，建议您仔细阅读 Paper 官方文档，了解 Paper 的配置选项，并根据您的需求进行优化配置。

## 从 Fabric/Forge 迁移

从 Fabric 或 Forge 迁移到 Paper 相对复杂，因为 Fabric 和 Forge 使用不同的 Mod API，与 Bukkit/Spigot 插件 API 不兼容。

**迁移步骤:**

1.  **备份 Fabric/Forge 服务器数据。**  备份您的 Fabric 或 Forge 服务器的所有文件和文件夹，特别是 `world` 文件夹和 `mods` 文件夹 (Forge) 或 `mods` 和 `config` 文件夹 (Fabric)。
2.  **卸载 Fabric/Forge Mod。**  由于 Fabric/Forge Mod 与 Paper 不兼容，您需要移除 Fabric/Forge 服务器的 Mod。请将 `mods` 文件夹中的所有 Mod 文件删除。如果您使用了 Fabric 的配置文件，也需要移除 Fabric 的配置文件。
3.  **下载 Paper 服务器 JAR 文件。**  访问 [PaperMC 官网下载页面](https://papermc.io/downloads)，下载最新版本的 Paper 服务器 JAR 文件。请确保下载的版本与您当前的 Minecraft 版本对应。
4.  **替换服务器 JAR 文件。**  将您下载的 Paper 服务器 JAR 文件替换您 Fabric 或 Forge 服务器的 JAR 文件 (通常是 `fabric-server-launch.jar` 或 `forge-xxx-universal.jar`)。
5.  **调整世界维度文件夹结构 (重要！)。**  Fabric/Forge 和 Paper 在世界维度文件夹结构上存在差异。您需要手动调整世界维度文件夹结构，使其与 Paper 兼容。

    **世界目录结构差异:**

    | 服务器软件   | 主世界    | 下界                  | 末地                  |
    | ---------- | --------- | --------------------- | --------------------- |
    | Fabric/Forge | `/world`  | `/world/DIM-1`        | `/world/DIM1`         |
    | Paper      | `/world`  | `/world_nether/DIM-1` | `/world_the_end/DIM1` |

    **调整步骤:**

    *   **创建下界和末地维度文件夹。**  在您的服务器根目录下创建 `world_nether` 和 `world_the_end` 文件夹。
    *   **移动维度文件夹。**  将 Fabric/Forge 服务器 `world` 文件夹下的 `DIM-1` 文件夹移动到 `world_nether` 文件夹中，并将 `DIM1` 文件夹移动到 `world_the_end` 文件夹中。
    *   **删除 Fabric/Forge 维度文件夹。**  删除 Fabric/Forge 服务器 `world` 文件夹下的 `DIM-1` 和 `DIM1` 文件夹。

6.  **安装 Bukkit/Spigot 插件 (可选)。**  如果您想使用插件扩展服务器功能，可以下载 Bukkit/Spigot 插件，并将插件 JAR 文件复制到服务器目录下的 `plugins` 文件夹中。
7.  **启动 Paper 服务器。**  使用您原先启动 Fabric 或 Forge 服务器的启动脚本启动 Paper 服务器。

**完成！** 您的 Fabric/Forge 服务器已成功迁移到 Paper 服务器。Paper 服务器将加载您的 Fabric/Forge 世界存档，并可以使用 Bukkit/Spigot 插件 (如果安装)。

**注意事项:**

*   **Mod 不兼容。**  Fabric/Forge Mod 与 Paper 不兼容。迁移到 Paper 后，您将无法继续使用 Fabric/Forge Mod。您需要寻找功能类似的 Bukkit/Spigot 插件来替代 Mod 的功能。
*   **世界维度文件夹结构调整。**  请务必按照步骤调整世界维度文件夹结构，否则可能导致下界和末地数据丢失或错乱。
*   **配置文件差异。**  Fabric/Forge 和 Paper 的配置文件结构和配置项存在较大差异。Paper 不会自动迁移 Fabric/Forge 的配置文件。您需要手动配置 Paper 服务器的配置文件。

## 遇到问题？

如果您在迁移过程中遇到任何问题，例如服务器启动失败、世界数据错误、插件异常等，请不要慌张。

*   **查看服务器日志。**  服务器日志文件 (通常位于 `logs/latest.log`) 包含了服务器运行过程中的各种信息，包括错误和警告信息。查看服务器日志可以帮助您定位问题原因。
*   **回滚到旧版本。**  如果您在迁移后遇到严重问题，无法解决，可以回滚到迁移前的旧版本服务器。只需将您之前备份的旧版本服务器文件恢复回去即可。
*   **寻求社区帮助。**  如果自行排查问题困难，请随时在 [PaperMC Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求帮助。请详细描述您的问题，并提供服务器日志、Paper 版本、迁移前的服务器软件类型等信息，以便社区成员更好地帮助您。

---

**希望本指南能够帮助您顺利迁移到 Paper 服务器。祝您游戏愉快！**
