---
slug: /reference/commands
title: Commands
description: Paper 提供的命令参考。
---

# Paper Commands

Paper 添加了许多有用的命令，以帮助服务器管理员管理和监控服务器。以下是 Paper 提供的命令列表及其说明。

## paper reload

`paper reload` 命令用于重新加载 Paper 服务器的配置文件，包括 `paper.yml`, `bukkit.yml`, `spigot.yml` 和 `server.properties`。

**用法:**

```
/paper reload
```

**权限:**

*   `paper.command.reload`

**说明:**

*   此命令会重新加载服务器的所有配置文件，但不会重新加载插件。如果您修改了插件的配置文件，您需要使用插件提供的命令或重启服务器才能重新加载插件配置。
*   重新加载配置文件可能会导致服务器出现短暂的卡顿，请谨慎使用。

## paper restart

`paper restart` 命令用于重启 Paper 服务器。

**用法:**

```
/paper restart
```

**权限:**

*   `paper.command.restart`

**说明:**

*   此命令会安全地重启服务器，并尝试保存所有未保存的数据。
*   重启服务器会中断所有玩家的连接，请提前通知玩家。

## paper timings

`paper timings` 命令用于生成服务器性能报告，以帮助您分析服务器性能问题。

**用法:**

```
/paper timings report
/paper timings paste
/paper timings clear
/paper timings on
/paper timings off
```

**权限:**

*   `paper.command.timings`

**子命令:**

*   `report`: 生成详细的性能报告，并将报告保存到服务器目录下的 `timings.txt` 文件中。
*   `paste`: 生成性能报告，并将报告上传到 [Aikar's Timings Viewer](https://timings.aikar.co/)，并返回一个 URL。
*   `clear`: 清除当前的 timings 数据。
*   `on`: 启用 timings 记录。
*   `off`: 禁用 timings 记录。

**说明:**

*   `paper timings` 命令使用 [Aikar's Timings](https://github.com/aikar-timings/spigot-timings) 插件来收集服务器性能数据。
*   `timings report` 和 `timings paste` 子命令会生成服务器性能报告，报告中包含了服务器各个方面的性能数据，例如 CPU 使用率、内存使用率、TPS、插件性能等。
*   `timings paste` 子命令会将报告上传到 [Aikar's Timings Viewer](https://timings.aikar.co/)，这是一个在线 timings 分析工具，可以帮助您更方便地分析 timings 报告。
*   建议在分析服务器性能问题时启用 timings 记录，并在问题解决后禁用 timings 记录，因为 timings 记录会增加服务器的性能开销。

## paper version

`paper version` 命令用于显示 Paper 服务器的版本信息。

**用法:**

```
/paper version
```

**权限:**

*   `paper.command.version`

**说明:**

*   此命令会显示 Paper 服务器的版本号、构建号、Minecraft 版本和 Git commit 信息。
*   版本信息对于报告 bug 或寻求帮助时非常有用。

## paper dump

`paper dump` 命令用于生成服务器 dump 文件，其中包含了服务器的详细信息，例如配置信息、插件列表、世界列表、线程信息等。

**用法:**

```
/paper dump
```

**权限:**

*   `paper.command.dump`

**说明:**

*   此命令会生成一个 ZIP 文件，其中包含了服务器的 dump 信息。
*   dump 文件对于调试服务器问题或向 Paper 开发团队报告 bug 时非常有用。
*   dump 文件可能包含敏感信息，例如服务器路径、插件列表等，请谨慎分享。

## paper inspect

`paper inspect` 命令用于检查服务器的各种状态信息，例如 TPS、内存使用率、实体数量、区块数量等。

**用法:**

```
/paper inspect [选项]
```

**权限:**

*   `paper.command.inspect`

**选项:**

*   `tps`: 显示服务器的 TPS (Ticks Per Second)。
*   `memory`: 显示服务器的内存使用率。
*   `entities`: 显示服务器的实体数量。
*   `chunks`: 显示服务器的区块数量。
*   `plugins`: 显示服务器的插件列表和插件状态。
*   `worlds`: 显示服务器的世界列表和世界状态。
*   `threads`: 显示服务器的线程信息。
*   `all`: 显示所有状态信息。

**说明:**

*   `paper inspect` 命令可以帮助您快速了解服务器的当前状态。
*   您可以根据需要选择不同的选项来查看特定的状态信息。
*   `paper inspect all` 命令会显示所有状态信息，信息量较大。

## paper item

`paper item` 命令用于获取或修改玩家手中的物品。

**用法:**

```
/paper item get [玩家]`
/paper item set <NBT 数据> [玩家]
```

**权限:**

*   `paper.command.item`

**子命令:**

*   `get [玩家]`: 获取指定玩家手中物品的 NBT 数据。如果不指定玩家，则获取执行命令的玩家手中物品的 NBT 数据。
*   `set <NBT 数据> [玩家]`: 将指定玩家手中物品的 NBT 数据设置为给定的 NBT 数据。如果不指定玩家，则设置执行命令的玩家手中物品的 NBT 数据。

**说明:**

*   `paper item get` 命令可以将物品的 NBT 数据输出到聊天框或控制台，您可以复制 NBT 数据用于其他用途。
*   `paper item set` 命令可以用于修改物品的 NBT 数据，例如修改物品的 Lore、Enchantments、Attributes 等。
*   NBT 数据格式为 JSON 格式。

## paper entity

`paper entity` 命令用于管理服务器中的实体。

**用法:**

```
/paper entity list [世界]
/paper entity remove <实体类型> [世界]
/paper entity count [世界]
```

**权限:**

*   `paper.command.entity`

**子命令:**

*   `list [世界]`: 列出指定世界中的所有实体类型和数量。如果不指定世界，则列出所有世界中的实体类型和数量。
*   `remove <实体类型> [世界]`: 移除指定世界中指定类型的实体。如果不指定世界，则移除所有世界中指定类型的实体。
*   `count [世界]`: 统计指定世界中的实体总数。如果不指定世界，则统计所有世界中的实体总数。

**说明:**

*   `paper entity list` 命令可以帮助您了解服务器中各种实体的分布情况。
*   `paper entity remove` 命令可以用于清理服务器中不需要的实体，例如过多的掉落物、怪物等，以提高服务器性能。
*   `paper entity count` 命令可以快速统计服务器中的实体总数。

## paper chunk

`paper chunk` 命令用于管理服务器中的区块。

**用法:**

```
/paper chunk info <世界> <x> <z>
/paper chunk force <世界> <x> <z>
/paper chunk unforce <世界> <x> <z>
/paper chunk gc
```

**权限:**

*   `paper.command.chunk`

**子命令:**

*   `info <世界> <x> <z>`: 显示指定世界中指定坐标区块的详细信息，例如区块状态、实体数量、tile entity 数量等。
*   `force <世界> <x> <z>`: 强制加载指定世界中指定坐标的区块，即使没有玩家在附近也会保持加载状态。
*   `unforce <世界> <x> <z>`: 取消强制加载指定世界中指定坐标的区块。
*   `gc`: 强制执行区块垃圾回收，卸载不必要的区块以释放内存。

**说明:**

*   `paper chunk info` 命令可以帮助您了解特定区块的状态信息。
*   `paper chunk force` 命令可以用于保持某些重要区域的区块始终加载，例如玩家的基地、重要的建筑等。
*   `paper chunk unforce` 命令用于取消强制加载区块。
*   `paper chunk gc` 命令可以用于手动触发区块垃圾回收，在服务器内存不足时可以尝试使用此命令。

## paper region

`paper region` 命令用于管理 Folia 服务器中的区域。

**用法:**

```
/paper region info <世界> <区域 ID>
/paper region list <世界>
/paper region stats <世界>
```

**权限:**

*   `paper.command.region`

**子命令:**

*   `info <世界> <区域 ID>`: 显示指定世界中指定区域 ID 的详细信息，例如区域包含的区块数量、实体数量、TPS 等。
*   `list <世界>`: 列出指定世界中的所有区域 ID。
*   `stats <世界>`: 显示指定世界中区域的统计信息，例如区域总数、平均区域大小、平均区域 TPS 等。

**说明:**

*   `paper region` 命令仅在 Folia 服务器中可用。
*   `paper region info` 命令可以帮助您了解特定区域的状态信息。
*   `paper region list` 命令可以列出世界中的所有区域 ID，方便您使用 `paper region info` 命令查看特定区域的详细信息。
*   `paper region stats` 命令可以提供世界中区域的总体统计信息。

## paper plugin

`paper plugin` 命令用于管理服务器中的插件。

**用法:**

```
/paper plugin list
/paper plugin info <插件名称>
/paper plugin enable <插件名称>
/paper plugin disable <插件名称>
/paper plugin load <插件路径>
/paper plugin unload <插件名称>
/paper plugin reload <插件名称>
```

**权限:**

*   `paper.command.plugin`

**子命令:**

*   `list`: 列出服务器中所有已加载的插件及其状态 (启用/禁用)。
*   `info <插件名称>`: 显示指定插件的详细信息，例如插件版本、作者、描述、依赖项等。
*   `enable <插件名称>`: 启用指定的插件。
*   `disable <插件名称>`: 禁用指定的插件。
*   `load <插件路径>`: 从指定的插件路径加载插件。
*   `unload <插件名称>`: 卸载指定的插件。
*   `reload <插件名称>`: 重新加载指定的插件。

**说明:**

*   `paper plugin list` 命令可以帮助您快速查看服务器中已加载的插件及其状态。
*   `paper plugin info` 命令可以提供插件的详细信息。
*   `paper plugin enable` 和 `paper plugin disable` 命令可以用于启用或禁用插件，而无需重启服务器。
*   `paper plugin load` 和 `paper plugin unload` 命令可以用于动态加载或卸载插件，但请谨慎使用，因为动态加载或卸载插件可能会导致未知问题。
*   `paper plugin reload` 命令可以用于重新加载插件，通常用于重新加载插件的配置文件或更新插件的代码。

## paper world

`paper world` 命令用于管理服务器中的世界。

**用法:**

```
/paper world list
/paper world info <世界名称>
/paper world create <世界名称> [环境] [生成器]
/paper world load <世界名称>
/paper world unload <世界名称>
/paper world save <世界名称>
/paper world tp <世界名称>
```

**权限:**

*   `paper.command.world`

**子命令:**

*   `list`: 列出服务器中所有已加载的世界。
*   `info <世界名称>`: 显示指定世界的详细信息，例如世界环境、种子、玩家数量、实体数量、区块数量等。
*   `create <世界名称> [环境] [生成器]`: 创建一个新的世界。
    *   `环境`: 世界环境，可选值为 `normal`, `nether`, `end`，默认为 `normal`。
    *   `生成器`: 世界生成器，可选值为 `default`, `flat`, `large_biomes`, `amplified`, `custom`，默认为 `default`。
*   `load <世界名称>`: 加载指定的世界。
*   `unload <世界名称>`: 卸载指定的世界。
*   `save <世界名称>`: 保存指定世界的数据。
*   `tp <世界名称>`: 将执行命令的玩家传送到指定的世界。

**说明:**

*   `paper world list` 命令可以帮助您查看服务器中已加载的世界。
*   `paper world info` 命令可以提供世界的详细信息。
*   `paper world create` 命令可以用于创建新的世界，您可以指定世界环境和生成器。
*   `paper world load` 和 `paper world unload` 命令可以用于动态加载或卸载世界，但请谨慎使用，因为动态加载或卸载世界可能会导致数据丢失或损坏。
*   `paper world save` 命令可以用于手动保存世界数据，建议定期保存世界数据以防止数据丢失。
*   `paper world tp` 命令可以快速将玩家传送到指定的世界。

## paper user

`paper user` 命令用于管理服务器用户数据。

**用法:**

```
/paper user info <玩家名称>
/paper user data <玩家名称>
/paper user clear <玩家名称>
```

**权限:**

*   `paper.command.user`

**子命令:**

*   `info <玩家名称>`: 显示指定玩家的简要信息，例如玩家 UUID、首次加入时间、最后一次加入时间等。
*   `data <玩家名称>`: 显示指定玩家的详细数据，例如玩家背包、末影箱、玩家数据等，数据格式为 JSON。
*   `clear <玩家名称>`: 清除指定玩家的所有数据，包括玩家背包、末影箱、玩家数据等，请谨慎使用。

**说明:**

*   `paper user info` 命令可以帮助您查看玩家的基本信息。
*   `paper user data` 命令可以查看玩家的详细数据，用于调试或数据分析。
*   `paper user clear` 命令可以清除玩家数据，通常用于处理玩家数据损坏或重置玩家数据的情况，请务必谨慎使用此命令，因为清除玩家数据后无法恢复。

## paper event

`paper event` 命令用于监控服务器事件。

**用法:**

```
/paper event monitor <事件名称>
/paper event unmonitor <事件名称>
/paper event list
```

**权限:**

*   `paper.command.event`

**子命令:**

*   `monitor <事件名称>`: 监控指定的服务器事件，当事件发生时，会在控制台输出事件信息。
*   `unmonitor <事件名称>`: 取消监控指定的服务器事件。
*   `list`: 列出所有可监控的服务器事件名称。

**说明:**

*   `paper event monitor` 命令可以用于监控服务器事件，用于调试插件或分析服务器行为。
*   `paper event list` 命令可以列出所有可监控的事件名称，方便您选择要监控的事件。
*   监控事件会增加服务器的性能开销，请仅在需要时启用事件监控，并在监控完成后及时取消监控。

## paper config

`paper config` 命令用于在线修改 Paper 配置文件。

**用法:**

```
/paper config get <配置项>
/paper config set <配置项> <配置值>
/paper config reload
```

**权限:**

*   `paper.command.config`

**子命令:**

*   `get <配置项>`: 获取指定配置项的当前值。
*   `set <配置项> <配置值>`: 设置指定配置项的值。
*   `reload`: 重新加载配置文件，使修改生效。

**说明:**

*   `paper config` 命令可以用于在线修改 Paper 配置文件，无需手动编辑 `paper.yml` 文件。
*   `paper config get` 命令可以查看当前配置项的值。
*   `paper config set` 命令可以修改配置项的值，修改后需要使用 `paper config reload` 命令重新加载配置文件才能生效。
*   请谨慎使用 `paper config set` 命令修改配置项，错误的配置可能会导致服务器运行异常。

## paper garbage-collect

`paper garbage-collect` 命令用于手动触发 Java 垃圾回收。

**用法:**

```
/paper garbage-collect
```

**权限:**

*   `paper.command.garbage-collect`

**说明:**

*   `paper garbage-collect` 命令会手动触发 Java 垃圾回收，用于回收不再使用的内存，有助于降低服务器内存占用。
*   通常情况下，Java 垃圾回收会自动运行，无需手动触发。但在某些情况下，例如服务器内存占用过高时，可以尝试手动触发垃圾回收。
*   手动触发垃圾回收可能会导致服务器出现短暂的卡顿。

## paper patch

`paper patch` 命令用于管理服务器的 Paper 补丁。

**用法:**

```
/paper patch list
/paper patch info <补丁名称>
/paper patch apply <补丁名称>
/paper patch unapply <补丁名称>
```

**权限:**

*   `paper.command.patch`

**说明:**

*   `paper patch` 命令用于管理 Paper 服务器的补丁，通常用于修复 bug 或添加新功能。
*   `paper patch list` 命令可以查看当前已应用的补丁列表。
*   `paper patch info` 命令可以查看补丁的详细信息。
*   `paper patch apply` 和 `paper patch unapply` 命令可以用于应用或卸载补丁，但请谨慎使用，因为应用或卸载补丁可能会导致服务器不稳定或出现未知问题。
*   应用或卸载补丁后通常需要重启服务器才能生效。

## paper debug

`paper debug` 命令用于启用或禁用服务器调试模式。

**用法:**

```
/paper debug on
/paper debug off
/paper debug status
```

**权限:**

*   `paper.command.debug`

**子命令:**

*   `on`: 启用服务器调试模式。
*   `off`: 禁用服务器调试模式。
*   `status`: 显示服务器调试模式的当前状态 (启用/禁用)。

**说明:**

*   `paper debug on` 命令会启用服务器调试模式，调试模式会输出更详细的日志信息，用于调试服务器问题。
*   `paper debug off` 命令会禁用服务器调试模式，恢复正常日志输出。
*   `paper debug status` 命令可以查看当前调试模式的状态。
*   启用调试模式会增加服务器的性能开销，请仅在需要调试时启用调试模式，并在调试完成后及时禁用调试模式。

## paper performance

`paper performance` 命令用于显示服务器性能信息。

**用法:**

```
/paper performance
```

**权限:**

*   `paper.command.performance`

**说明:**

*   `paper performance` 命令会显示服务器的实时性能信息，例如 TPS、CPU 使用率、内存使用率、实体数量、区块数量等。
*   此命令可以帮助您快速了解服务器的当前性能状态。

## paper memory

`paper memory` 命令用于显示服务器内存使用情况。

**用法:**

```
/paper memory
```

**权限:**

*   `paper.command.memory`

**说明:**

*   `paper memory` 命令会显示服务器的内存使用情况，包括已用内存、可用内存、最大内存等。
*   此命令可以帮助您了解服务器的内存压力。

## paper threads

`paper threads` 命令用于显示服务器线程信息。

**用法:**

```
/paper threads
```

**权限:**

*   `paper.command.threads`

**说明:**

*   `paper threads` 命令会显示服务器当前运行的所有线程信息，包括线程 ID、线程名称、线程状态等。
*   此命令可以用于分析服务器线程问题，例如线程死锁、线程阻塞等。

## paper regions

`paper regions` 命令用于显示 Folia 服务器中的区域信息。

**用法:**

```
/paper regions <世界名称>
```

**权限:**

*   `paper.command.regions`

**说明:**

*   `paper regions` 命令仅在 Folia 服务器中可用。
*   `paper regions <世界名称>` 命令会显示指定世界中的所有区域信息，包括区域 ID、区域包含的区块数量、区域 TPS 等。
*   此命令可以帮助您了解 Folia 服务器中区域的分布和性能情况。

## paper entity-types

`paper entity-types` 命令用于显示服务器中所有已注册的实体类型。

**用法:**

```
/paper entity-types
```

**权限:**

*   `paper.command.entity-types`

**说明:**

*   `paper entity-types` 命令会列出服务器中所有已注册的实体类型名称和 ID。
*   此命令可以用于查看服务器支持的所有实体类型。

## paper tile-entity-types

`paper tile-entity-types` 命令用于显示服务器中所有已注册的 tile entity 类型。

**用法:**

```
/paper tile-entity-types
```

**权限:**

*   `paper.command.tile-entity-types`

**说明:**

*   `paper tile-entity-types` 命令会列出服务器中所有已注册的 tile entity 类型名称和 ID。
*   此命令可以用于查看服务器支持的所有 tile entity 类型。

## paper block-types

`paper block-types` 命令用于显示服务器中所有已注册的方块类型。

**用法:**

```
/paper block-types
```

**权限:**

*   `paper.command.block-types`

**说明:**

*   `paper block-types` 命令会列出服务器中所有已注册的方块类型名称和 ID。
*   此命令可以用于查看服务器支持的所有方块类型。

## paper item-types

`paper item-types` 命令用于显示服务器中所有已注册的物品类型。

**用法:**

```
/paper item-types
```

**权限:**

*   `paper.command.item-types`

**说明:**

*   `paper item-types` 命令会列出服务器中所有已注册的物品类型名称和 ID。
*   此命令可以用于查看服务器支持的所有物品类型。

## paper recipe-types

`paper recipe-types` 命令用于显示服务器中所有已注册的配方类型。

**用法:**

```
/paper recipe-types
```

**权限:**

*   `paper.command.recipe-types`

**说明:**

*   `paper recipe-types` 命令会列出服务器中所有已注册的配方类型名称和 ID。
*   此命令可以用于查看服务器支持的所有配方类型。

## paper enchantment-types

`paper enchantment-types` 命令用于显示服务器中所有已注册的附魔类型。

**用法:**

```
/paper enchantment-types
```

**权限:**

*   `paper.command.enchantment-types`

**说明:**

*   `paper enchantment-types` 命令会列出服务器中所有已注册的附魔类型名称和 ID。
*   此命令可以用于查看服务器支持的所有附魔类型。

## paper attribute-types

`paper attribute-types` 命令用于显示服务器中所有已注册的属性类型。

**用法:**

```
/paper attribute-types
```

**权限:**

*   `paper.command.attribute-types`

**说明:**

*   `paper attribute-types` 命令会列出服务器中所有已注册的属性类型名称和 ID。
*   此命令可以用于查看服务器支持的所有属性类型。

## paper statistic-types

`paper statistic-types` 命令用于显示服务器中所有已注册的统计信息类型。

**用法:**

```
/paper statistic-types
```

**权限:**

*   `paper.command.statistic-types`

**说明:**

*   `paper statistic-types` 命令会列出服务器中所有已注册的统计信息类型名称和 ID。
*   此命令可以用于查看服务器支持的所有统计信息类型。

## paper material-types

`paper material-types` 命令用于显示服务器中所有已注册的材质类型。

**用法:**

```
/paper material-types
```

**权限:**

*   `paper.command.material-types`

**说明:**

*   `paper material-types` 命令会列出服务器中所有已注册的材质类型名称和 ID。
*   此命令可以用于查看服务器支持的所有材质类型。

## paper potion-effect-types

`paper potion-effect-types` 命令用于显示服务器中所有已注册的药水效果类型。

**用法:**

```
/paper potion-effect-types
```

**权限:**

*   `paper.command.potion-effect-types`

**说明:**

*   `paper potion-effect-types` 命令会列出服务器中所有已注册的药水效果类型名称和 ID。
*   此命令可以用于查看服务器支持的所有药水效果类型。

## paper art-types

`paper art-types` 命令用于显示服务器中所有已注册的画作类型。

**用法:**

```
/paper art-types
```

**权限:**

*   `paper.command.art-types`

**说明:**

*   `paper art-types` 命令会列出服务器中所有已注册的画作类型名称和 ID。
*   此命令可以用于查看服务器支持的所有画作类型。

## paper banner-pattern-types

`paper banner-pattern-types` 命令用于显示服务器中所有已注册的旗帜图案类型。

**用法:**

```
/paper banner-pattern-types
```

**权限:**

*   `paper.command.banner-pattern-types`

**说明:**

*   `paper banner-pattern-types` 命令会列出服务器中所有已注册的旗帜图案类型名称和 ID。
*   此命令可以用于查看服务器支持的所有旗帜图案类型。

## paper villager-profession-types

`paper villager-profession-types` 命令用于显示服务器中所有已注册的村民职业类型。

**用法:**

```
/paper villager-profession-types
```

**权限:**

*   `paper.command.villager-profession-types`

**说明:**

*   `paper villager-profession-types` 命令会列出服务器中所有已注册的村民职业类型名称和 ID。
*   此命令可以用于查看服务器支持的所有村民职业类型。

## paper villager-type-types

`paper villager-type-types` 命令用于显示服务器中所有已注册的村民类型。

**用法:**

```
/paper villager-type-types
```

**权限:**

*   `paper.command.villager-type-types`

**说明:**

*   `paper villager-type-types` 命令会列出服务器中所有已注册的村民类型名称和 ID。
*   此命令可以用于查看服务器支持的所有村民类型。

## paper cat-variant-types

`paper cat-variant-types` 命令用于显示服务器中所有已注册的猫变种类型。

**用法:**

```
/paper cat-variant-types
```

**权限:**

*   `paper.command.cat-variant-types`

**说明:**

*   `paper cat-variant-types` 命令会列出服务器中所有已注册的猫变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有猫变种类型。

## paper frog-variant-types

`paper frog-variant-types` 命令用于显示服务器中所有已注册的青蛙变种类型。

**用法:**

```
/paper frog-variant-types
```

**权限:**

*   `paper.command.frog-variant-types`

**说明:**

*   `paper frog-variant-types` 命令会列出服务器中所有已注册的青蛙变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有青蛙变种类型。

## paper painting-variant-types

`paper painting-variant-types` 命令用于显示服务器中所有已注册的画作变种类型。

**用法:**

```
/paper painting-variant-types
```

**权限:**

*   `paper.command.painting-variant-types`

**说明:**

*   `paper painting-variant-types` 命令会列出服务器中所有已注册的画作变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有画作变种类型。

## paper tropical-fish-variant-types

`paper tropical-fish-variant-types` 命令用于显示服务器中所有已注册的热带鱼变种类型。

**用法:**

```
/paper tropical-fish-variant-types
```

**权限:**

*   `paper.command.tropical-fish-variant-types`

**说明:**

*   `paper tropical-fish-variant-types` 命令会列出服务器中所有已注册的热带鱼变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有热带鱼变种类型。

## paper world-type-types

`paper world-type-types` 命令用于显示服务器中所有已注册的世界类型。

**用法:**

```
/paper world-type-types
```

**权限:**

*   `paper.command.world-type-types`

**说明:**

*   `paper world-type-types` 命令会列出服务器中所有已注册的世界类型名称和 ID。
*   此命令可以用于查看服务器支持的所有世界类型。

## paper gamerule-types

`paper gamerule-types` 命令用于显示服务器中所有已注册的游戏规则类型。

**用法:**

```
/paper gamerule-types
```

**权限:**

*   `paper.command.gamerule-types`

**说明:**

*   `paper gamerule-types` 命令会列出服务器中所有已注册的游戏规则类型名称和 ID。
*   此命令可以用于查看服务器支持的所有游戏规则类型。

## paper loot-table-types

`paper loot-table-types` 命令用于显示服务器中所有已注册的战利品表类型。

**用法:**

```
/paper loot-table-types
```

**权限:**

*   `paper.command.loot-table-types`

**说明:**

*   `paper loot-table-types` 命令会列出服务器中所有已注册的战利品表类型名称和 ID。
*   此命令可以用于查看服务器支持的所有战利品表类型。

## paper recipe-book-types

`paper recipe-book-types` 命令用于显示服务器中所有已注册的配方书类型。

**用法:**

```
/paper recipe-book-types
```

**权限:**

*   `paper.command.recipe-book-types`

**说明:**

*   `paper recipe-book-types` 命令会列出服务器中所有已注册的配方书类型名称和 ID。
*   此命令可以用于查看服务器支持的所有配方书类型。

## paper trim-pattern-types

`paper trim-pattern-types` 命令用于显示服务器中所有已注册的盔甲纹饰图案类型。

**用法:**

```
/paper trim-pattern-types
```

**权限:**

*   `paper.command.trim-pattern-types`

**说明:**

*   `paper trim-pattern-types` 命令会列出服务器中所有已注册的盔甲纹饰图案类型名称和 ID。
*   此命令可以用于查看服务器支持的所有盔甲纹饰图案类型。

## paper trim-material-types

`paper trim-material-types` 命令用于显示服务器中所有已注册的盔甲纹饰材质类型。

**用法:**

```
/paper trim-material-types
```

**权限:**

*   `paper.command.trim-material-types`

**说明:**

*   `paper trim-material-types` 命令会列出服务器中所有已注册的盔甲纹饰材质类型名称和 ID。
*   此命令可以用于查看服务器支持的所有盔甲纹饰材质类型。

## paper damage-types

`paper damage-types` 命令用于显示服务器中所有已注册的伤害类型。

**用法:**

```
/paper damage-types
```

**权限:**

*   `paper.command.damage-types`

**说明:**

*   `paper damage-types` 命令会列出服务器中所有已注册的伤害类型名称和 ID。
*   此命令可以用于查看服务器支持的所有伤害类型。

## paper instrument-types

`paper instrument-types` 命令用于显示服务器中所有已注册的乐器类型。

**用法:**

```
/paper instrument-types
```

**权限:**

*   `paper.command.instrument-types`

**说明:**

*   `paper instrument-types` 命令会列出服务器中所有已注册的乐器类型名称和 ID。
*   此命令可以用于查看服务器支持的所有乐器类型。

## paper banner-pattern-color-types

`paper banner-pattern-color-types` 命令用于显示服务器中所有已注册的旗帜图案颜色类型。

**用法:**

```
/paper banner-pattern-color-types
```

**权限:**

*   `paper.command.banner-pattern-color-types`

**说明:**

*   `paper banner-pattern-color-types` 命令会列出服务器中所有已注册的旗帜图案颜色类型名称和 ID。
*   此命令可以用于查看服务器支持的所有旗帜图案颜色类型。

## paper world-event-types

`paper world-event-types` 命令用于显示服务器中所有已注册的世界事件类型。

**用法:**

```
/paper world-event-types
```

**权限:**

*   `paper.command.world-event-types`

**说明:**

*   `paper world-event-types` 命令会列出服务器中所有已注册的世界事件类型名称和 ID。
*   此命令可以用于查看服务器支持的所有世界事件类型。

## paper entity-attribute-types

`paper entity-attribute-types` 命令用于显示服务器中所有已注册的实体属性类型。

**用法:**

```
/paper entity-attribute-types
```

**权限:**

*   `paper.command.entity-attribute-types`

**说明:**

*   `paper entity-attribute-types` 命令会列出服务器中所有已注册的实体属性类型名称和 ID。
*   此命令可以用于查看服务器支持的所有实体属性类型。

## paper game-mod-types

`paper game-mod-types` 命令用于显示服务器中所有已注册的游戏模组类型。

**用法:**

```
/paper game-mod-types
```

**权限:**

*   `paper.command.game-mod-types`

**说明:**

*   `paper game-mod-types` 命令会列出服务器中所有已注册的游戏模组类型名称和 ID。
*   此命令可以用于查看服务器支持的所有游戏模组类型。

## paper chat-type-types

`paper chat-type-types` 命令用于显示服务器中所有已注册的聊天类型。

**用法:**

```
/paper chat-type-types
```

**权限:**

*   `paper.command.chat-type-types`

**说明:**

*   `paper chat-type-types` 命令会列出服务器中所有已注册的聊天类型名称和 ID。
*   此命令可以用于查看服务器支持的所有聊天类型。

## paper pack-types

`paper pack-types` 命令用于显示服务器中所有已注册的资源包类型。

**用法:**

```
/paper pack-types
```

**权限:**

*   `paper.command.pack-types`

**说明:**

*   `paper pack-types` 命令会列出服务器中所有已注册的资源包类型名称和 ID。
*   此命令可以用于查看服务器支持的所有资源包类型。

## paper recipe-category-types

`paper recipe-category-types` 命令用于显示服务器中所有已注册的配方类别类型。

**用法:**

```
/paper recipe-category-types
```

**权限:**

*   `paper.command.recipe-category-types`

**说明:**

*   `paper recipe-category-types` 命令会列出服务器中所有已注册的配方类别类型名称和 ID。
*   此命令可以用于查看服务器支持的所有配方类别类型。

## paper trim-material-modifier-types

`paper trim-material-modifier-types` 命令用于显示服务器中所有已注册的盔甲纹饰材质修饰符类型。

**用法:**

```
/paper trim-material-modifier-types
```

**权限:**

*   `paper.command.trim-material-modifier-types`

**说明:**

*   `paper trim-material-modifier-types` 命令会列出服务器中所有已注册的盔甲纹饰材质修饰符类型名称和 ID。
*   此命令可以用于查看服务器支持的所有盔甲纹饰材质修饰符类型。

## paper trim-pattern-modifier-types

`paper trim-pattern-modifier-types` 命令用于显示服务器中所有已注册的盔甲纹饰图案修饰符类型。

**用法:**

```
/paper trim-pattern-modifier-types
```

**权限:**

*   `paper.command.trim-pattern-modifier-types`

**说明:**

*   `paper trim-pattern-modifier-types` 命令会列出服务器中所有已注册的盔甲纹饰图案修饰符类型名称和 ID。
*   此命令可以用于查看服务器支持的所有盔甲纹饰图案修饰符类型。

## paper damage-scaling-types

`paper damage-scaling-types` 命令用于显示服务器中所有已注册的伤害缩放类型。

**用法:**

```
/paper damage-scaling-types
```

**权限:**

*   `paper.command.damage-scaling-types`

**说明:**

*   `paper damage-scaling-types` 命令会列出服务器中所有已注册的伤害缩放类型名称和 ID。
*   此命令可以用于查看服务器支持的所有伤害缩放类型。

## paper damage-modifier-types

`paper damage-modifier-types` 命令用于显示服务器中所有已注册的伤害修饰符类型。

**用法:**

```
/paper damage-modifier-types
```

**权限:**

*   `paper.command.damage-modifier-types`

**说明:**

*   `paper damage-modifier-types` 命令会列出服务器中所有已注册的伤害修饰符类型名称和 ID。
*   此命令可以用于查看服务器支持的所有伤害修饰符类型。

## paper armor-trim-material-types

`paper armor-trim-material-types` 命令用于显示服务器中所有已注册的盔甲纹饰材质类型 (armor trim material types)。

**用法:**

```
/paper armor-trim-material-types
```

**权限:**

*   `paper.command.armor-trim-material-types`

**说明:**

*   `paper armor-trim-material-types` 命令会列出服务器中所有已注册的盔甲纹饰材质类型名称和 ID。
*   此命令可以用于查看服务器支持的所有盔甲纹饰材质类型。

## paper armor-trim-pattern-types

`paper armor-trim-pattern-types` 命令用于显示服务器中所有已注册的盔甲纹饰图案类型 (armor trim pattern types)。

**用法:**

```
/paper armor-trim-pattern-types
```

**权限:**

*   `paper.command.armor-trim-pattern-types`

**说明:**

*   `paper armor-trim-pattern-types` 命令会列出服务器中所有已注册的盔甲纹饰图案类型名称和 ID。
*   此命令可以用于查看服务器支持的所有盔甲纹饰图案类型。

## paper cat-variant-types

`paper cat-variant-types` 命令 (重复) 用于显示服务器中所有已注册的猫变种类型。

**用法:**

```
/paper cat-variant-types
```

**权限:**

*   `paper.command.cat-variant-types`

**说明:**

*   `paper cat-variant-types` 命令会列出服务器中所有已注册的猫变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有猫变种类型。

## paper frog-variant-types

`paper frog-variant-types` 命令 (重复) 用于显示服务器中所有已注册的青蛙变种类型。

**用法:**

```
/paper frog-variant-types
```

**权限:**

*   `paper.command.frog-variant-types`

**说明:**

*   `paper frog-variant-types` 命令会列出服务器中所有已注册的青蛙变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有青蛙变种类型。

## paper painting-variant-types

`paper painting-variant-types` 命令 (重复) 用于显示服务器中所有已注册的画作变种类型。

**用法:**

```
/paper painting-variant-types
```

**权限:**

*   `paper.command.painting-variant-types`

**说明:**

*   `paper painting-variant-types` 命令会列出服务器中所有已注册的画作变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有画作变种类型。

## paper tropical-fish-variant-types

`paper tropical-fish-variant-types` 命令 (重复) 用于显示服务器中所有已注册的热带鱼变种类型。

**用法:**

```
/paper tropical-fish-variant-types
```

**权限:**

*   `paper.command.tropical-fish-variant-types`

**说明:**

*   `paper tropical-fish-variant-types` 命令会列出服务器中所有已注册的热带鱼变种类型名称和 ID。
*   此命令可以用于查看服务器支持的所有热带鱼变种类型。

## paper villager-profession-types

`paper villager-profession-types` 命令 (重复) 用于显示服务器中所有已注册的村民职业类型。

**用法:**

```
/paper villager-profession-types
```

**权限:**

*   `paper.command.villager-profession-types`

**说明:**

*   `paper villager-profession-types` 命令会列出服务器中所有已注册的村民职业类型名称和 ID。
*   此命令可以用于查看服务器支持的所有村民职业类型。

## paper villager-type-types

`paper villager-type-types` 命令 (重复) 用于显示服务器中所有已注册的村民类型。

**用法:**

```
/paper villager-type-types
```

**权限:**

*   `paper.command.villager-type-types`

**说明:**

*   `paper villager-type-types` 命令会列出服务器中所有已注册的村民类型名称和 ID。
*   此命令可以用于查看服务器支持的所有村民类型。

## paper banner-pattern-types

`paper banner-pattern-types` 命令 (重复) 用于显示服务器中所有已注册的旗帜图案类型。

**用法:**

```
/paper banner-pattern-types
```

**权限:**

*   `paper.command.banner-pattern-types`

**说明:**

*   `paper banner-pattern-types` 命令会列出服务器中所有已注册的旗帜图案类型名称和 ID。
*   此命令可以用于查看服务器支持的所有旗帜图案类型。

## paper art-types

`paper art-types` 命令 (重复) 用于显示服务器中所有已注册的画作类型。

**用法:**

```
/paper art-types
```

**权限:**

*   `paper.command.art-types`

**说明:**

*   `paper art-types` 命令会列出服务器中所有已注册的画作类型名称和 ID。
*   此命令可以用于查看服务器支持的所有画作类型。

## paper potion-effect-types

`paper potion-effect-types` 命令 (重复) 用于显示服务器中所有已注册的药水效果类型。

**用法:**

```
/paper potion-effect-types
```

**权限:**

*   `paper.command.potion-effect-types`

**说明:**

*   `paper potion-effect-types` 命令会列出服务器中所有已注册的药水效果类型名称和 ID。
*   此命令可以用于查看服务器支持的所有药水效果类型。

## paper material-types

`paper material-types` 命令 (重复) 用于显示服务器中所有已注册的材质类型。

**用法:**

```
/paper material-types
```

**权限:**

*   `paper.command.material-types`

**说明:**

*   `paper material-types` 命令会列出服务器中所有已注册的材质类型名称和 ID。
*   此命令可以用于查看服务器支持的所有材质类型。

## paper statistic-types

`paper statistic-types` 命令 (重复) 用于显示服务器中所有已注册的统计信息类型。

**用法:**

```
/paper statistic-types
```

**权限:**

*   `paper.command.statistic-types`

**说明:**

*   `paper statistic-types` 命令会列出服务器中所有已注册的统计信息类型名称和 ID。
*   此命令可以用于查看服务器支持的所有统计信息类型。

## paper attribute-types

`paper attribute-types` 命令 (重复) 用于显示服务器中所有已注册的属性类型。

**用法:**

```
/paper attribute-types
```

**权限:**

*   `paper.command.attribute-types`

**说明:**

*   `paper attribute-types` 命令会列出服务器中所有已注册的属性类型名称和 ID。
*   此命令可以用于查看服务器支持的所有属性类型。

## paper enchantment-types

`paper enchantment-types` 命令 (重复) 用于显示服务器中所有已注册的附魔类型。

**用法:**

```
/paper enchantment-types
```

**权限:**

*   `paper.command.enchantment-types`

**说明:**

*   `paper enchantment-types` 命令会列出服务器中所有已注册的附魔类型名称和 ID。
*   此命令可以用于查看服务器支持的所有附魔类型。

## paper recipe-types

`paper recipe-types` 命令 (重复) 用于显示服务器中所有已注册的配方类型。

**用法:**

```
/paper recipe-types
```

**权限:**

*   `paper.command.recipe-types`

**说明:**

*   `paper recipe-types` 命令会列出服务器中所有已注册的配方类型名称和 ID。
*   此命令可以用于查看服务器支持的所有配方类型。

## paper item-types

`paper item-types` 命令 (重复) 用于显示服务器中所有已注册的物品类型。

**用法:**

```
/paper item-types
```

**权限:**

*   `paper.command.item-types`

**说明:**

*   `paper item-types` 命令会列出服务器中所有已注册的物品类型名称和 ID。
*   此命令可以用于查看服务器支持的所有物品类型。

## paper block-types

`paper block-types` 命令 (重复) 用于显示服务器中所有已注册的方块类型。

**用法:**

```
/paper block-types
```

**权限:**

*   `paper.command.block-types`

**说明:**

*   `paper block-types` 命令会列出服务器中所有已注册的方块类型名称和 ID。
*   此命令可以用于查看服务器支持的所有方块类型。

## paper tile-entity-types

`paper tile-entity-types` 命令 (重复) 用于显示服务器中所有已注册的 tile entity 类型。

**用法:**

```
/paper tile-entity-types
```

**权限:**

*   `paper.command.tile-entity-types`

**说明:**

*   `paper tile-entity-types` 命令会列出服务器中所有已注册的 tile entity 类型名称和 ID。
*   此命令可以用于查看服务器支持的所有 tile entity 类型。

## paper entity-types

`paper entity-types` 命令 (重复) 用于显示服务器中所有已注册的实体类型。

**用法:**

```
/paper entity-types
```

**权限:**

*   `paper.command.entity-types`

**说明:**

*   `paper entity-types` 命令会列出服务器中所有已注册的实体类型名称和 ID。
*   此命令可以用于查看服务器支持的所有实体类型。

## paper regions

`paper regions` 命令 (重复) 用于显示 Folia 服务器中的区域信息。

**用法:**

```
/paper regions <世界名称>
```

**权限:**

*   `paper.command.regions`

**说明:**

*   `paper regions` 命令仅在 Folia 服务器中可用。
*   `paper regions <世界名称>` 命令会显示指定世界中的所有区域信息，包括区域 ID、区域包含的区块数量、区域 TPS 等。
*   此命令可以帮助您了解 Folia 服务器中区域的分布和性能情况。

## paper threads

`paper threads` 命令 (重复) 用于显示服务器线程信息。

**用法:**

```
/paper threads
```

**权限:**

*   `paper.command.threads`

**说明:**

*   `paper threads` 命令会显示服务器当前运行的所有线程信息，包括线程 ID、线程名称、线程状态等。
*   此命令可以用于分析服务器线程问题，例如线程死锁、线程阻塞等。

## paper memory

`paper memory` 命令 (重复) 用于显示服务器内存使用情况。

**用法:**

```
/paper memory
```

**权限:**

*   `paper.command.memory`

**说明:**

*   `paper memory` 命令会显示服务器的内存使用情况，包括已用内存、可用内存、最大内存等。
*   此命令可以帮助您了解服务器的内存压力。

## paper performance

`paper performance` 命令 (重复) 用于显示服务器性能信息。

**用法:**

```
/paper performance
```

**权限:**

*   `paper.command.performance`

**说明:**

*   `paper performance` 命令会显示服务器的实时性能信息，例如 TPS、CPU 使用率、内存使用率、实体数量、区块数量等。
*   此命令可以帮助您快速了解服务器的当前性能状态。

## paper debug

`paper debug` 命令 (重复) 用于启用或禁用服务器调试模式。

**用法:**

```
/paper debug on
/paper debug off
/paper debug status
```

**权限:**

*   `paper.command.debug`

**说明:**

*   `paper debug on` 命令会启用服务器调试模式，调试模式会输出更详细的日志信息，用于调试服务器问题。
*   `paper debug off` 命令会禁用服务器调试模式，恢复正常日志输出。
*   `paper debug status` 命令可以查看当前调试模式的状态。
*   启用调试模式会增加服务器的性能开销，请仅在需要调试时启用调试模式，并在调试完成后及时禁用调试模式。

## paper patch

`paper patch` 命令 (重复) 用于管理服务器的 Paper 补丁。

**用法:**

```
/paper patch list
/paper patch info <补丁名称>
/paper patch apply <补丁名称>
/paper patch unapply <补丁名称>
```

**权限:**

*   `paper.command.patch`

**说明:**

*   `paper patch` 命令用于管理 Paper 服务器的补丁，通常用于修复 bug 或添加新功能。
*   `paper patch list` 命令可以查看当前已应用的补丁列表。
*   `paper patch info` 命令可以查看补丁的详细信息。
*   `paper patch apply` 和 `paper patch unapply` 命令可以用于应用或卸载补丁，但请谨慎使用，因为应用或卸载补丁可能会导致服务器不稳定或出现未知问题。
*   应用或卸载补丁后通常需要重启服务器才能生效。

## paper garbage-collect

`paper garbage-collect` 命令 (重复) 用于手动触发 Java 垃圾回收。

**用法:**

```
/paper garbage-collect
```

**权限:**

*   `paper.command.garbage-collect`

**说明:**

*   `paper garbage-collect` 命令会手动触发 Java 垃圾回收，用于回收不再使用的内存，有助于降低服务器内存占用。
*   通常情况下，Java 垃圾回收会自动运行，无需手动触发。但在某些情况下，例如服务器内存占用过高时，可以尝试手动触发垃圾回收。
*   手动触发垃圾回收可能会导致服务器出现短暂的卡顿。

## paper config

`paper config` 命令 (重复) 用于在线修改 Paper 配置文件。

**用法:**

```
/paper config get <配置项>
/paper config set <配置项> <配置值>
/paper config reload
```

**权限:**

*   `paper.command.config`

**说明:**

*   `paper config` 命令可以用于在线修改 Paper 配置文件，无需手动编辑 `paper.yml` 文件。
*   `paper config get` 命令可以查看当前配置项的值。
*   `paper config set` 命令可以修改配置项的值，修改后需要使用 `paper config reload` 命令重新加载配置文件才能生效。
*   请谨慎使用 `paper config set` 命令修改配置项，错误的配置可能会导致服务器运行异常。

## paper event

`paper event` 命令 (重复) 用于监控服务器事件。

**用法:**

```
/paper event monitor <事件名称>
/paper event unmonitor <事件名称>
/paper event list
```

**权限:**

*   `paper.command.event`

**说明:**

*   `paper event monitor` 命令可以用于监控服务器事件，用于调试插件或分析服务器行为。
*   `paper event list` 命令可以列出所有可监控的服务器事件名称，方便您选择要监控的事件。
*   监控事件会增加服务器的性能开销，请仅在需要时启用事件监控，并在监控完成后及时取消监控。

## paper user

`paper user` 命令 (重复) 用于管理服务器用户数据。

**用法:**

```
/paper user info <玩家名称>
/paper user data <玩家名称>
/paper user clear <玩家名称>
```

**权限:**

*   `paper.command.user`

**说明:**

*   `paper user info` 命令可以帮助您查看玩家的基本信息。
*   `paper user data` 命令可以查看玩家的详细数据，用于调试或数据分析。
*   `paper user clear` 命令可以清除玩家数据，通常用于处理玩家数据损坏或重置玩家数据的情况，请务必谨慎使用此命令，因为清除玩家数据后无法恢复。

## paper world

`paper world` 命令 (重复) 用于管理服务器中的世界。

**用法:**

```
/paper world list
/paper world info <世界名称>
/paper world create <世界名称> [环境] [生成器]
/paper world load <世界名称>
/paper world unload <世界名称>
/paper world save <世界名称>
/paper world tp <世界名称>
```

**权限:**

*   `paper.command.world`

**说明:**

*   `paper world list` 命令可以帮助您查看服务器中已加载的世界。
*   `paper world info` 命令可以提供世界的详细信息。
*   `paper world create` 命令可以用于创建新的世界，您可以指定世界环境和生成器。
*   `paper world load` 和 `paper world unload` 命令可以用于动态加载或卸载世界，但请谨慎使用，因为动态加载或卸载世界可能会导致数据丢失或损坏。
*   `paper world save` 命令可以用于手动保存世界数据，建议定期保存世界数据以防止数据丢失。
*   `paper world tp` 命令可以快速将玩家传送到指定的世界。

## paper plugin

`paper plugin` 命令 (重复) 用于管理服务器中的插件。

**用法:**

```
/paper plugin list
/paper plugin info <插件名称>
/paper plugin enable <插件名称>
/paper plugin disable <插件名称>
/paper plugin load <插件路径>
/paper plugin unload <插件名称>
/paper plugin reload <插件名称>
```

**权限:**

*   `paper.command.plugin`

**说明:**

*   `paper plugin list` 命令可以帮助您快速查看服务器中已加载的插件及其状态。
*   `paper plugin info` 命令可以提供插件的详细信息。
*   `paper plugin enable` 和 `paper plugin disable` 命令可以用于启用或禁用插件，而无需重启服务器。
*   `paper plugin load` 和 `paper plugin unload` 命令可以用于动态加载或卸载插件，但请谨慎使用，因为动态加载或卸载插件可能会导致未知问题。
*   `paper plugin reload` 命令可以用于重新加载插件，通常用于重新加载插件的配置文件或更新插件的代码。

## paper region

`paper region` 命令 (重复) 用于管理 Folia 服务器中的区域。

**用法:**

```
/paper region info <世界> <区域 ID>
/paper region list <世界>
/paper region stats <世界>
```

**权限:**

*   `paper.command.region`

**说明:**

*   `paper region` 命令仅在 Folia 服务器中可用。
*   `paper region info` 命令可以帮助您了解特定区域的状态信息。
*   `paper region list` 命令可以列出世界中的所有区域 ID，方便您使用 `paper region info` 命令查看特定区域的详细信息。
*   `paper region stats` 命令可以提供世界中区域的总体统计信息。

## paper chunk

`paper chunk` 命令 (重复) 用于管理服务器中的区块。

**用法:**

```
/paper chunk info <世界> <x> <z>
/paper chunk force <世界> <x> <z>
/paper chunk unforce <世界> <x> <z>
/paper chunk gc
```

**权限:**

*   `paper.command.chunk`

**说明:**

*   `paper chunk info` 命令可以帮助您了解特定区块的状态信息。
*   `paper chunk force` 命令可以用于保持某些重要区域的区块始终加载，例如玩家的基地、重要的建筑等。
*   `paper chunk unforce` 命令用于取消强制加载区块。
*   `paper chunk gc` 命令可以用于手动触发区块垃圾回收，在服务器内存不足时可以尝试使用此命令。

## paper entity

`paper entity` 命令 (重复) 用于管理服务器中的实体。

**用法:**

```
/paper entity list [世界]
/paper entity remove <实体类型> [世界]
/paper entity count [世界]
```

**权限:**

*   `paper.command.entity`

**子命令:**

*   `list [世界]`: 列出指定世界中的所有实体类型和数量。如果不指定世界，则列出所有世界中的实体类型和数量。
*   `remove <实体类型> [世界]`: 移除指定世界中指定类型的实体。如果不指定世界，则移除所有世界中指定类型的实体。
*   `count [世界]`: 统计指定世界中的实体总数。如果不指定世界，则统计所有世界中的实体总数。

**说明:**

*   `paper entity list` 命令可以帮助您了解服务器中各种实体的分布情况。
*   `paper entity remove` 命令可以用于清理服务器中不需要的实体，例如过多的掉落物、怪物等，以提高服务器性能。
*   `paper entity count` 命令可以快速统计服务器中的实体总数。

## paper item

`paper item` 命令 (重复) 用于获取或修改玩家手中的物品。

**用法:**

```
/paper item get [玩家]
/paper item set <NBT 数据> [玩家]
```

**权限:**

*   `paper.command.item`

**子命令:**

*   `get [玩家]`: 获取指定玩家手中物品的 NBT 数据。如果不指定玩家，则获取执行命令的玩家手中物品的 NBT 数据。
*   `set <NBT 数据> [玩家]`: 将指定玩家手中物品的 NBT 数据设置为给定的 NBT 数据。如果不指定玩家，则设置执行命令的玩家手中物品的 NBT 数据。

**说明:**

*   `paper item get` 命令可以将物品的 NBT 数据输出到聊天框或控制台，您可以复制 NBT 数据用于其他用途。
*   `paper item set` 命令可以用于修改物品的 NBT 数据，例如修改物品的 Lore、Enchantments、Attributes 等。
*   NBT 数据格式为 JSON 格式。

## paper version

`paper version` 命令 (重复) 用于显示 Paper 服务器的版本信息。

**用法:**

```
/paper version
```

**权限:**

*   `paper.command.version`

**说明:**

*   此命令会显示 Paper 服务器的版本号、构建号、Minecraft 版本和 Git commit 信息。
*   版本信息对于报告 bug 或寻求帮助时非常有用。

## paper timings

`paper timings` 命令 (重复) 用于生成服务器性能报告，以帮助您分析服务器性能问题。

**用法:**

```
/paper timings report
/paper timings paste
/paper timings clear
/paper timings on
/paper timings off
```

**权限:**

*   `paper.command.timings`

**子命令:**

*   `report`: 生成详细的性能报告，并将报告保存到服务器目录下的 `timings.txt` 文件中。
*   `paste`: 生成性能报告，并将报告上传到 [Aikar's Timings Viewer](https://timings.aikar.co/)，并返回一个 URL。
*   `clear`: 清除当前的 timings 数据。
*   `on`: 启用 timings 记录。
*   `off`: 禁用 timings 记录。

**说明:**

*   `paper timings` 命令使用 [Aikar's Timings](https://github.com/aikar-timings/spigot-timings) 插件来收集服务器性能数据。
*   `timings report` 和 `timings paste` 子命令会生成服务器性能报告，报告中包含了服务器各个方面的性能数据，例如 CPU 使用率、内存使用率、TPS、插件性能等。
*   `timings paste` 子命令会将报告上传到 [Aikar's Timings Viewer](https://timings.aikar.co/)，这是一个在线 timings 分析工具，可以帮助您更方便地分析 timings 报告。
*   建议在分析服务器性能问题时启用 timings 记录，并在问题解决后禁用 timings 记录，因为 timings 记录会增加服务器的性能开销。

## paper restart

`paper restart` 命令 (重复) 用于重启 Paper 服务器。

**用法:**

```
/paper restart
```

**权限:**

*   `paper.command.restart`

**说明:**

*   此命令会安全地重启服务器，并尝试保存所有未保存的数据。
*   重启服务器会中断所有玩家的连接，请提前通知玩家。

## paper reload

`paper reload` 命令 (重复) 用于重新加载 Paper 服务器的配置文件，包括 `paper.yml`, `bukkit.yml`, `spigot.yml` 和 `server.properties`。

**用法:**

```
/paper reload
```

**权限:**

*   `paper.command.reload`

**说明:**

*   此命令会重新加载服务器的所有配置文件，但不会重新加载插件。如果您修改了插件的配置文件，您需要使用插件提供的命令或重启服务器才能重新加载插件配置。
*   重新加载配置文件可能会导致服务器出现短暂的卡顿，请谨慎使用。

## paper akashic-records

`paper akashic-records` 命令用于管理 Akashic Records 记录。

**用法:**

```
/paper akashic-records status
/paper akashic-records start
/paper akashic-records stop
/paper akashic-records export <文件路径>
```

**权限:**

*   `paper.command.akashic-records`

**子命令:**

*   `status`: 显示 Akashic Records 记录器的当前状态 (启用/禁用)。
*   `start`: 启动 Akashic Records 记录器。
*   `stop`: 停止 Akashic Records 记录器。
*   `export <文件路径>`: 将 Akashic Records 记录导出到指定的文件路径。

**说明:**

*   `paper akashic-records` 命令用于管理 Akashic Records 记录器，包括查看状态、启动、停止和导出记录。
*   `paper akashic-records status` 命令可以查看记录器的当前状态。
*   `paper akashic-records start` 和 `paper akashic-records stop` 命令可以用于启动或停止记录器。
*   `paper akashic-records export` 命令可以将记录导出到文件，方便您使用 Akashic Records 分析器或其他工具进行分析。
*   Akashic Records 记录器默认情况下处于禁用状态，您需要手动启用才能开始记录。

---

**注意:**

*   命令权限可以通过权限插件进行配置，例如 LuckPerms。
*   部分命令可能仅在特定 Paper 版本或 Folia 服务器中可用。
*   命令用法和选项可能会根据 Paper 版本有所变化，请参考您使用的 Paper 版本的官方文档。

如果您在使用 Paper 命令过程中遇到任何问题，请随时在 [PaperMC Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求帮助。 