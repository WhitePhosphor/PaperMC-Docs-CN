---
slug: /reference/system-properties
description: Paper 可能会检查的系统属性和环境变量的文档。
---

# Paper 系统属性

这些系统属性和环境变量可以在启动服务器时设置，允许配置各种设置。

:::danger[前方危险]

为 JVM 设置标志可以改变其运行方式，Paper 服务器也是如此。
如果您不确定某个标志的作用，建议您**不要使用它**。

:::

## 它们如何工作

系统属性在启动服务器时设置。例如，如果您使用 `.bat` 或 `.sh` 文件启动服务器，您可以将系统属性添加到文件中。例如：

```bash
java -Dpaper.log-level=FINE -jar paper.jar
```

:::info

Paper 的一些系统属性名称中包含 `.` 字符。在使用 PowerShell 时，这些属性需要用引号括起来。
例如：`"-Dpaper.log-level=FINE"`

:::

其中 `-D` 用于设置系统属性，系统属性是 `paper.log-level`，值为 `FINE`。否则，只需将它们添加到启动命令中即可。

:::note

当系统属性被标记为 `unset` 时，将其设置为 `true` 即可启用它。

:::

[环境变量](https://en.wikipedia.org/wiki/Environment_variable)是另一种向 Paper 传递值的方式。
根据您的操作系统和启动 Paper 的方式，可以通过各种方式设置它们。

在大多数情况下，您不需要使用这些，除非您在（Docker）容器或类似环境中运行 Paper。

## 系统属性列表

#### paper.playerconnection.keepalive

- **默认值**: `30`
- **描述**: 控制在未收到任何保活包时玩家连接等待关闭的时间（以秒为单位）。

#### timings.bypassMax

- **默认值**: `unset`
- **描述**: 允许绕过发送到 Aikar 的 Timings API 的数据量上限。除非 API 配置为允许，否则设置此项不会允许绕过限制。

#### LetMeReload

- **默认值**: `unset`
- **描述**: 使用 `/reload` 命令时禁用重载确认消息。

#### paper.disableChannelLimit

- **默认值**: `unset`
- **描述**: 禁用服务器的插件通道限制。这将禁用每个玩家 128 个插件通道的限制。

#### net.kyori.adventure.text.warnWhenLegacyFormattingDetected

- **默认值**: `false`
- **描述**: 启用或禁用在聊天组件中检测到旧版格式时的警告。

#### Paper.DisableClassPrioritization

- **默认值**: `unset`
- **描述**: 禁用类优先级系统 - 主要在无法正确重定位或遮蔽时出现问题。

#### Paper.disableFlushConsolidate

- **默认值**: `unset`
- **描述**: 禁用 netty 刷新合并系统。

#### Paper.debugDynamicMissingKeys

- **默认值**: `unset`
- **描述**: 启用 NBT 对象中缺失键的调试日志记录。

#### disable.watchdog

- **默认值**: `unset`
- **描述**: 禁用看门狗警告系统。

#### paper.explicit-flush

- **默认值**: `unset`
- **描述**: 启用网络通道的显式刷新。

#### Paper.enable-sync-chunk-writes

- **默认值**: `unset`
- **描述**: 在每次写入调用时同步写入。这会影响性能，特别是在硬盘驱动器上。

#### paper.debug-sync-loads

- **默认值**: `unset`
- **描述**: 启用同步区块加载的调试日志记录。

#### Paper.ignoreWorldDataVersion

- **默认值**: `unset`
- **描述**: 加载世界时忽略世界数据版本。不建议这样做，可能会导致问题。

#### Paper.bypassHostCheck

- **默认值**: `unset`
- **描述**: 在客户端连接到服务器时绕过主机模式匹配尝试。

#### paper.ticklist-warn-on-excessive-delay

- **默认值**: `unset`
- **描述**: 当计划的刻度列表延迟过长时启用警告。

#### debug.rewriteForIde

- **默认值**: `unset`
- **描述**: 从堆栈跟踪中删除 NMS 修订版，以便在 IDE 中更容易调试。
它还会重新映射插件的 CB 调用以删除版本信息。

#### convertLegacySigns

- **默认值**: `unset`
- **描述**: 将旧版告示牌转换为新格式。

#### paper.maxCustomChannelName

- **默认值**: `64`
- **描述**: 设置插件通道名称可以使用的最大大小。

#### Paper.maxSignLength

- **默认值**: `80`
- **描述**: 设置告示牌的最大行长度。

#### Paper.minPrecachedDatafixVersion

- **默认值**: `Minecraft 世界版本 + 1`
- **描述**: 如果您预计要转换大量区块，您可能会考虑将其设置为仅从某个点开始转换。

#### Paper.WorkerThreadCount

- **默认值**: 可用物理（**不是逻辑**）核心数的一半，如果有 3 个或更少的核心则为 `1`
- **描述**: 设置用于区块加载的工作线程数。更多信息请参见[这里](./configuration/global-configuration.mdx#chunk_system_worker_threads)。

#### Paper.excessiveTELimit

- **默认值**: `750`
- **描述**: 如果实体数量超过此数量，则将实体分成多个数据包。

#### io.papermc.paper.suppress.sout.nags

- **默认值**: `unset`
- **描述**: 禁止插件使用 `System.out`/`System.err` 时的提示消息。

#### paper.strict-thread-checks

- **默认值**: `unset`
- **描述**: 设置 AsyncCatcher 的状态，使其在代码不在主线程上运行时始终记录错误。

#### Paper.skipServerPropertiesComments

- **默认值**: `unset`
- **描述**: 跳过 `server.properties` 文件中的注释。

#### Paper.debugInvalidSkullProfiles

- **默认值**: `unset`
- **描述**: 启用无效头颅配置文件的调试日志记录。这会记录世界中任何无效头颅的位置信息。

#### paper.alwaysPrintWarningState

- **默认值**: `unset`
- **描述**: 始终打印特定级别的警告状态。

#### Paper.parseYamlCommentsByDefault

- **默认值**: `true`
- **描述**: 设置是否默认解析 YAML 文件中的注释。

#### paperclip.patchonly

- **默认值**: `false`
- **描述**: 如果服务器通过 Paperclip 补丁工具（下载页面上的默认分发版本）启动，则此设置决定是否仅修补原版服务器并下载库而不启动服务器。

#### Paper.IgnoreJavaVersion

- **默认值**: `false`
- **描述**: 允许您绕过 Java 版本检查。更多信息请参见[这里](/paper/faq#unsupported-java-detected-what-do-i-do)。

#### paper.useLegacyPluginLoading

- **默认值**: `false`
- **描述**: 允许循环插件加载。更多信息请参见[这里](paper-plugins.md#cyclic-plugin-loading)。

#### Paper.DisableCommandConverter

- **默认值**: `false`
- **描述**: 禁用 Paper 自动将命令升级到 1.20.5 版本中引入的新组件格式，包括命令方块和其他可能包含命令的地方中定义的带有自定义数据的物品。

#### paper.disableOldApiSupport

- **默认值**: `false`
- **描述**: 禁用可能导致类加载显著延迟的插件兼容性措施（也称为 "Commodore" 插件重写）。这通常需要您的所有插件都针对最新的 API 版本进行编译。

#### paper.disablePluginRemapping

- **默认值**: `false`
- **描述**: 禁用在 1.20.5 中引入的插件重映射。更多信息请参见[用户开发](../../dev/getting-started/userdev.mdx#1205-and-beyond)文档和官方[公告](https://discord.com/channels/289587909051416579/976631292747735080/1232740079097876570)。

#### paper.preferSparkPlugin

- **默认值**: `false`
- **描述**: 是否应该禁用捆绑的 spark 分析器以支持独立插件。如果找不到 spark 插件，则无论设置如何，都会加载捆绑版本，除非它被[显式禁用](/paper/reference/global-configuration#spark_enabled)。

#### paper.disableWorldSymlinkValidation

- **默认值**: `false`
- **描述**: 在加载世界时禁用文件夹遍历和符号链接验证。显著提高大型世界（>1TB）的加载速度。这不会禁用数据包的符号链接验证。

#### minecraft.api.session.host

- **默认值**: `https://sessionserver.mojang.com`
- **描述**: 允许指定自定义会话服务器 URL，例如用于缓存。需要同时设置 [`minecraft.api.services.host`](#minecraftapiserviceshost) 才能生效。

#### minecraft.api.services.host

- **默认值**: `https://api.minecraftservices.com`
- **描述**: 允许指定自定义服务 API URL，例如用于缓存。需要同时设置 [`minecraft.api.session.host`](#minecraftapisessionhost) 才能生效。

## 环境变量列表

#### PAPER_VELOCITY_SECRET

- **默认值**: `unset`
- **描述**: 覆盖 [`proxies.velocity.secret`](./configuration/global-configuration.mdx#proxies_velocity_secret) 全局配置选项。
