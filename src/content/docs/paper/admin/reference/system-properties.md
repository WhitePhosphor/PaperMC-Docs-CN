---
title: 系统属性
description: 关于 Paper 可能会检查的系统属性和环境变量的文档
slug: paper/reference/system-properties
---

在启动服务器时可以设置这些系统属性和环境变量，从而配置各种设置。

:::danger[前方危险]

为 JVM 设置标志可以改变其运行方式，Paper 服务器也是如此。
如果你不确定某个标志的作用，建议你**不要使用它**。

:::

## 它们的工作原理

系统属性在启动服务器时设置。例如，如果你使用 `.bat` 或 `.sh` 文件启动服务器，可以将系统属性添加到该文件中。例如：

```bash
java -Dpaper.log-level=FINE -jar paper.jar
```

:::note

Paper 的一些系统属性名称中包含 `.` 字符。在使用 PowerShell 时，这些需要使用引号包裹，
例如 `"-Dpaper.log-level=FINE"`。

:::

其中 `-D` 用于设置系统属性，系统属性是 `paper.log-level`，值为 `FINE`。否则，只需将它们添加到启动命令中。

:::note

如果系统属性被标记为 `unset`，将其设置为 `true` 可以启用它。

:::

[环境变量](https://en.wikipedia.org/wiki/Environment_variable)是传递值给 Paper 的另一种方式。
根据您的操作系统以及启动 Paper 的方式，它们可以以多种方式设置。

在大多数情况下，您不需要使用这些，除非您在（Docker）容器中运行 Paper 或类似情况。

## 系统属性列表

#### paper.playerconnection.keepalive

- **默认**: `30`
- **描述**: 控制玩家连接在未收到任何心跳包时等待关闭的时间，单位为秒。

#### timings.bypassMax

- **默认**: `unset`
- **描述**: 允许绕过发送到 Aikar 的 Timings API 的最大数据量限制。除非 API 配置允许，否则设置此选项不会允许绕过限制。

#### LetMeReload

- **默认**: `unset`
- **描述**: 使用 `/reload` 命令时，此选项会禁用重新加载确认消息。

#### paper.disableChannelLimit

- **默认**: `unset`
- **描述**: 禁用服务器的插件通道限制。这将禁用每个玩家最多 128 个插件通道的限制。

#### net.kyori.adventure.text.warnWhenLegacyFormattingDetected

- **默认**: `false`
- **描述**: 启用或禁用在聊天组件中检测到旧版格式化时的警告。

#### Paper.DisableClassPrioritization

- **默认**: `unset`
- **描述**: 禁用类优先级系统——这通常是在未能正确重定位或遮蔽时的一个问题。

#### Paper.disableFlushConsolidate

- **默认**: `unset`
- **描述**: 禁用 Netty 冲刷整合系统.

#### Paper.debugDynamicMissingKeys

- **默认**: `unset`
- **描述**: 启用对 NBT 对象中缺失键的调试日志记录。

#### disable.watchdog

- **默认**: `unset`
- **描述**: 禁用看门狗（watchdog）警告系统。

#### paper.explicit-flush

- **默认**: `unset`
- **描述**: 启用网络通道的显式刷新。

#### Paper.enable-sync-chunk-writes

- **默认**: `unset`
- **描述**: 在每次写入调用时同步写入。这会对性能产生影响，尤其是在硬盘驱动器上。

#### paper.debug-sync-loads

- **默认**: `unset`
- **描述**: 启用同步区块加载的调试日志记录。

#### Paper.ignoreWorldDataVersion

- **默认**: `unset`
- **描述**: 加载世界时忽略世界数据版本。不建议这样做，可能会导致问题。

#### Paper.bypassHostCheck

- **默认**: `unset`
- **描述**: 在客户端连接到服务器时绕过主机模式匹配尝试。

#### paper.ticklist-warn-on-excessive-delay

- **默认**: `unset`
- **描述**: Enables the warning when a tick list is scheduled with an excessive delay.

#### debug.rewriteForIde

- **默认**: `unset`
- **描述**: Removes the NMS revision from the stack trace to allow for easier debugging in IDEs.
It also remaps plugin CB calls to remove the version information.

#### convertLegacySigns

- **默认**: `unset`
- **描述**: Converts legacy signs to the new format.

#### paper.maxCustomChannelName

- **默认**: `64`
- **描述**: Sets the largest size that a plugin channel name can take.

#### Paper.maxSignLength

- **默认**: `80`
- **描述**: Sets the maximum line length for signs.

#### Paper.minPrecachedDatafixVersion

- **默认**: `Minecraft world version + 1`
- **描述**: If you are expecting to convert a large number of chunks you might consider setting this to only convert from a point onwards.

#### Paper.WorkerThreadCount

- **默认**: half of available physical (**not logical**) cores or `1` if 3 or fewer cores are available
- **描述**: Sets the number of worker threads to use for chunk loading. See [here](/paper/reference/global-configuration#chunk_system_worker_threads) for more info.

#### Paper.excessiveTELimit

- **默认**: `750`
- **描述**: Splits tile entities into multiple packets if there are more than this many.

#### io.papermc.paper.suppress.sout.nags

- **默认**: `unset`
- **描述**: Suppresses the nag message about using `System.out`/`System.err` in a plugin.

#### paper.strict-thread-checks

- **默认**: `unset`
- **描述**: This sets the status of the AsyncCatcher so that it will always log an error if code is not run on the main thread.

#### Paper.skipServerPropertiesComments

- **默认**: `unset`
- **描述**: Skips the comments in the `server.properties` file.

#### Paper.debugInvalidSkullProfiles

- **默认**: `unset`
- **描述**: Enables debug logging for invalid skull profiles. This logs any invalid skulls in the world with the appropriate location information.

#### paper.alwaysPrintWarningState

- **默认**: `unset`
- **描述**: Always prints the warning state for the particular level.

#### Paper.parseYamlCommentsByDefault

- **默认**: `true`
- **描述**: Sets whether to parse comments in YAML files by default.

#### paperclip.patchonly:

- **默认**: `false`
- **描述**: If the server is started via the Paperclip patch utility (the default distribution on the downloads page) then this sets whether it should only patch the Vanilla server and download libraries without starting the server.

#### Paper.IgnoreJavaVersion

- **默认**: `false`
- **描述**: Allows you to bypass the Java version check. See [here](/paper/faq#unsupported-java-detected-what-do-i-do) for more info.

#### paper.useLegacyPluginLoading

- **默认**: `false`
- **描述**: Allows cyclic plugin loading. See [here](/paper/reference/paper-plugins#cyclic-plugin-loading) for more info.

#### Paper.DisableCommandConverter

- **默认**: `false`
- **描述**: Disables Paper's automatic upgrading of commands, including items with custom data defined in command blocks and other places that may contain commands, to the new component format introduced in version 1.20.5.

#### paper.disableOldApiSupport

- **默认**: `false`
- **描述**: Disables plugin compatibility measures that can otherwise result in a considerable delay of class loading (also known as "Commodore" plugin rewriting). This generally requires all of your plugins to be compiled against a recent API version.

#### paper.disablePluginRemapping

- **默认**: `false`
- **描述**: Disables plugin remapping introduced in 1.20.5. For more information see the [userdev](/paper/dev/userdev#1205-and-beyond) documentation and the official [announcement](https://discord.com/channels/289587909051416579/976631292747735080/1232740079097876570).

#### paper.preferSparkPlugin

- **默认**: `false`
- **描述**: Whether the bundled spark profiler should be disabled in favor of a standalone plugin. If the spark plugin is not found, the bundled version will be loaded regardless of the setting, unless it is [explicitly disabled](/paper/reference/global-configuration#spark_enabled).

#### paper.disableWorldSymlinkValidation

- **默认**: `false`
- **描述**: Disables the folder walk and symlink validation when loading a world. Significantly improves world loading speed on massive worlds (>1TB). This does not disable symlink verification of datapacks.

#### paper.disableGameRuleLimits

- **默认**: `false`
- **描述**: Disables limits on certain game rule values, e.g. `minecartMaxSpeed` and `spawnChunkRadius`.

#### minecraft.api.session.host

- **默认**: `https://sessionserver.mojang.com`
- **描述**: Allows specifying of a custom session server URL e.g. for caching. [`minecraft.api.services.host`](#minecraftapiserviceshost) needs to be set too for this to apply.

#### minecraft.api.services.host

- **默认**: `https://api.minecraftservices.com`
- **描述**: Allows specifying of a custom services API URL e.g. for caching. [`minecraft.api.session.host`](#minecraftapisessionhost) needs to be set too for this to apply.

#### com.mojang.eula.agree

- **默认**: `false`
- **描述**: Setting this to true indicates that you have agreed with [Mojang's EULA](https://aka.ms/MinecraftEULA), skipping `eula.txt` checks.

## List of environment variables

#### PAPER_VELOCITY_SECRET

- **默认**: `unset`
- **描述**: Overrides the [`proxies.velocity.secret`](/paper/reference/global-configuration#proxies_velocity_secret) global configuration option.
