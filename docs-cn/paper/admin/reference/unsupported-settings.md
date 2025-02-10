---
slug: /reference/unsupported-settings
title: 不支持的配置
description: Paper 中不建议或不支持的配置项参考。
---

# 不支持的配置

Paper 致力于提供高性能、稳定和安全的 Minecraft 服务器体验。为了实现这一目标，Paper 可能会移除或限制某些 Minecraft 原版或 Spigot API 中的配置项，因为这些配置项可能会导致性能问题、安全漏洞或与其他 Paper 功能冲突。

以下是 Paper 中不建议或不支持的配置项列表及其说明。

## `allow-flight` in `server.properties`

`allow-flight` 配置项用于控制是否允许玩家在生存模式下飞行。

**状态:** **不支持**

**说明:**

*   在原版 Minecraft 中，`allow-flight` 配置项允许玩家在生存模式下使用作弊手段 (例如修改客户端) 飞行。
*   Paper 认为允许生存模式飞行会破坏游戏平衡性，并且可能被用于作弊或恶意行为。
*   因此，Paper **不支持** `allow-flight` 配置项，无论您将其设置为 `true` 还是 `false`，服务器都会忽略此配置项，默认禁止生存模式飞行。
*   如果您需要允许玩家在生存模式下飞行，可以使用插件来实现，例如 [LuckPerms](https://luckperms.net/) 或 [PermissionsEx](https://github.com/PEXPlugins/PermissionsEx)。

## `spawn-protection-size` in `server.properties`

`spawn-protection-size` 配置项用于设置出生点保护区的大小。

**状态:** **不建议使用**

**说明:**

*   在原版 Minecraft 中，`spawn-protection-size` 配置项用于保护出生点区域免受玩家破坏。
*   当服务器开启 PvP 时，出生点保护区可能会被用于恶意行为，例如玩家在保护区内躲避 PvP 战斗。
*   此外，出生点保护区也会增加服务器的负载，尤其是在大型服务器中。
*   因此，Paper **不建议使用** `spawn-protection-size` 配置项，建议将其设置为 `0` (禁用出生点保护)。
*   如果您需要保护出生点区域，可以使用插件来实现，例如 [WorldGuard](https://enginehub.org/worldguard)。

## `max-tick-time` in `spigot.yml`

`max-tick-time` 配置项用于设置服务器最大 Tick 时间 (毫秒)，如果服务器 Tick 时间超过此值，则会强制停止服务器。

**状态:** **不支持**

**说明:**

*   `max-tick-time` 配置项在 Spigot 中用于防止服务器因 Tick 耗时过长而卡死。
*   Paper 认为 `max-tick-time` 配置项可能会导致服务器在正常负载下被误判为卡死而强制停止，影响服务器的稳定性。
*   因此，Paper **不支持** `max-tick-time` 配置项，服务器会忽略此配置项。
*   Paper 提供了更完善的服务器卡顿检测和处理机制，例如看门狗线程和异步区块加载，可以更好地保证服务器的稳定性。

## `entity-activation-range` in `spigot.yml`

`entity-activation-range` 配置项用于设置实体激活范围，控制实体在一定范围内才会进行逻辑运算，以优化服务器性能。

**状态:** **不建议使用**

**说明:**

*   `entity-activation-range` 配置项在 Spigot 中用于优化实体性能，但其效果有限，并且可能会导致一些游戏逻辑异常。
*   Paper 提供了更高效的实体优化方案，例如异步实体 ticking 和区域化多线程，可以更好地提升实体性能。
*   因此，Paper **不建议使用** `entity-activation-range` 配置项，建议使用 Paper 提供的实体优化功能。
*   如果您仍然希望使用 `entity-activation-range` 配置项，请谨慎调整其值，并注意可能出现的游戏逻辑异常。

## `mob-spawn-range` and `animal-spawn-range` in `spigot.yml`

`mob-spawn-range` 和 `animal-spawn-range` 配置项用于设置怪物和动物的生成范围 (区块)。

**状态:** **不建议使用**

**说明:**

*   `mob-spawn-range` 和 `animal-spawn-range` 配置项在 Spigot 中用于控制怪物和动物的生成范围，但其效果有限，并且可能会导致一些生成问题。
*   Paper 提供了更完善的生物生成控制方案，例如 [配置化生物生成](paper.yml#配置化生物生成) 和 [限制器](paper.yml#限制器)，可以更精细地控制生物生成。
*   因此，Paper **不建议使用** `mob-spawn-range` 和 `animal-spawn-range` 配置项，建议使用 Paper 提供的生物生成控制功能。

## `ticks-per` in `bukkit.yml` and `spigot.yml`

`ticks-per` 配置项 (例如 `ticks-per.animal-spawns`, `ticks-per.monster-spawns`, `ticks-per.autosave`) 用于设置各种游戏事件的执行频率 (ticks)。

**状态:** **不建议使用**

**说明:**

*   `ticks-per` 配置项在 Bukkit 和 Spigot 中用于控制游戏事件的执行频率，但其效果有限，并且可能会导致一些游戏逻辑异常。
*   Paper 认为游戏事件的执行频率应由服务器自动控制，以保证游戏的正常运行和服务器的性能。
*   因此，Paper **不建议使用** `ticks-per` 配置项，建议使用 Paper 提供的性能优化功能来提升服务器性能。
*   如果您仍然希望使用 `ticks-per` 配置项，请谨慎调整其值，并注意可能出现的游戏逻辑异常。

## `view-distance` and `simulation-distance` in `server.properties`

`view-distance` 和 `simulation-distance` 配置项用于设置客户端视野距离和服务器模拟距离。

**状态:** **不建议过度调整**

**说明:**

*   `view-distance` 和 `simulation-distance` 配置项用于控制客户端视野范围和服务器模拟范围，数值越大，客户端可以看到的范围越大，服务器需要模拟的范围也越大，服务器负载也会增加。
*   过度增加 `view-distance` 和 `simulation-distance` 的值会显著增加服务器负载，导致服务器 TPS 下降和卡顿。
*   Paper 建议根据服务器的性能和负载情况，适 