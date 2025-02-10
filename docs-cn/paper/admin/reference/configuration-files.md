---
slug: /reference/configuration-files
title: 配置文件
description: Paper 和 Minecraft 服务器的配置文件参考。
---

# 配置文件

Paper 和 Minecraft 服务器使用多个配置文件来控制服务器的各种行为和设置。以下是 Paper 和 Minecraft 服务器常用的配置文件及其说明。

## server.properties

`server.properties` 文件是 Minecraft 服务器的核心配置文件，包含了服务器的基本设置，例如服务器端口、最大玩家数量、游戏模式、世界种子等。

**常用配置项:**

*   `server-port`: 服务器端口，默认为 `25565`。
*   `max-players`: 最大玩家数量，默认为 `20`。
*   `gamemode`: 游戏模式，可选值为 `survival`, `creative`, `adventure`, `spectator`，默认为 `survival`。
*   `level-seed`: 世界种子，用于生成世界。
*   `level-name`: 世界名称，默认为 `world`。
*   `allow-nether`: 是否允许进入下界，默认为 `true`。
*   `allow-flight`: 是否允许飞行，默认为 `false`。
*   `difficulty`: 游戏难度，可选值为 `peaceful`, `easy`, `normal`, `hard`，默认为 `easy`。
*   `online-mode`: 是否开启正版验证，`true` 为开启，`false` 为关闭，默认为 `true`。
*   `white-list`: 是否开启白名单，`true` 为开启，`false` 为关闭，默认为 `false`。
*   `pvp`: 是否开启 PvP (玩家对玩家) 战斗，`true` 为开启，`false` 为关闭，默认为 `true`。
*   `spawn-animals`: 是否生成动物，`true` 为生成，`false` 为不生成，默认为 `true`。
*   `spawn-monsters`: 是否生成怪物，`true` 为生成，`false` 为不生成，默认为 `true`。
*   `view-distance`: 客户端视野距离，数值越大视野越远，但会增加服务器负载，默认为 `10`。
*   `simulation-distance`: 模拟距离，数值越大模拟范围越大，但会增加服务器负载，默认为 `10`。
*   `player-idle-timeout`: 玩家空闲超时时间 (分钟)，超过时间未活动的玩家将被踢出服务器，默认为 `0` (永不超时)。
*   `motd`: 服务器 MOTD (Message of the Day)，显示在服务器列表中的服务器描述信息。

**注意:**

*   修改 `server.properties` 文件后需要重启服务器才能生效。
*   完整的 `server.properties` 配置项列表请参考 [Minecraft Wiki](https://minecraft.wiki/w/Server.properties)。

## bukkit.yml

`bukkit.yml` 文件是 Bukkit API 的配置文件，包含了 Bukkit API 的相关设置，例如插件加载顺序、世界设置、性能优化等。

**常用配置项:**

*   `settings.allow-end`: 是否允许进入末地，默认为 `true`。
*   `settings.shutdown-message`: 服务器关闭时的广播消息。
*   `settings.connection-throttle`: 连接节流设置，用于防止 DDoS 攻击。
*   `worlds.<世界名称>.seed`: 指定世界的种子，优先级高于 `server.properties` 中的 `level-seed`。
*   `worlds.<世界名称>.generator`: 指定世界的生成器，例如 `DEFAULT`, `FLAT`, `VOID` 等。
*   `worlds.<世界名称>.max-build-height`: 世界最大建造高度，默认为 `256`。
*   `worlds.<世界名称>.spawn-limits.monsters`: 世界怪物生成数量限制，默认为 `-1` (无限制)。
*   `worlds.<世界名称>.spawn-limits.animals`: 世界动物生成数量限制，默认为 `-1` (无限制)。
*   `worlds.<世界名称>.ticks-per.animal-spawns`: 动物生成间隔 (ticks)，数值越大生成频率越低，默认为 `400`。
*   `worlds.<世界名称>.ticks-per.monster-spawns`: 怪物生成间隔 (ticks)，数值越大生成频率越低，默认为 `1`。
*   `worlds.<世界名称>.auto-save-interval`: 世界自动保存间隔 (ticks)，数值越小保存频率越高，但会增加服务器负载，默认为 `6000` (5 分钟)。

**注意:**

*   修改 `bukkit.yml` 文件后需要重启服务器才能生效。
*   完整的 `bukkit.yml` 配置项列表请参考 [Bukkit 官方文档](https://bukkit.fandom.com/wiki/Bukkit.yml)。

## spigot.yml

`spigot.yml` 文件是 Spigot API 的配置文件，包含了 Spigot API 的相关设置，例如性能优化、反作弊、实体跟踪等。

**常用配置项:**

*   `settings.debug`: 是否开启调试模式，`true` 为开启，`false` 为关闭，默认为 `false`。
*   `settings.bungeecord`: 是否启用 BungeeCord 支持，`true` 为启用，`false` 为禁用，默认为 `false`。
*   `settings.netty-threads`: Netty 网络线程数，用于处理网络连接，默认为 `-1` (自动)。
*   `settings.player-shuffle-threshold`: 玩家洗牌阈值，用于优化玩家连接时的性能，默认为 `512`。
*   `world-settings.default.mob-spawn-range`: 怪物生成范围 (区块)，默认为 `8`。
*   `world-settings.default.animal-spawn-range`: 动物生成范围 (区块)，默认为 `4`。
*   `world-settings.default.ticks-per.hopper-transfer`: 漏斗物品传输间隔 (ticks)，数值越大传输速度越慢，默认为 `8`。 