---
slug: /reference/system-properties
title: System Properties
description: Paper 提供的系统属性参考。
---

# Paper System Properties

Paper 提供了许多系统属性，可以通过 JVM 参数 `-D<属性名>=<属性值>` 在服务器启动时进行设置，以控制服务器的各种行为和设置。以下是 Paper 提供的系统属性列表及其说明。

## paper.debug

`paper.debug` 系统属性用于启用 Paper 服务器的调试模式。

**用法:**

```
-Dpaper.debug=true
```

**默认值:** `false` (禁用)

**说明:**

*   启用调试模式后，Paper 服务器将输出更多的调试信息，例如更详细的日志、性能分析数据等。
*   调试模式会增加服务器的性能开销，建议仅在调试服务器问题时启用。

## paper.dev-bundle

`paper.dev-bundle` 系统属性用于指定 Paper 开发包的路径。

**用法:**

```
-Dpaper.dev-bundle=<开发包路径>
```

**默认值:** 无

**说明:**

*   Paper 开发包是一个包含 Paper 服务器开发所需资源的 ZIP 文件，例如 NMS 源码、 mappings 文件等。
*   指定开发包路径后，Paper 服务器将从开发包中加载开发资源，用于插件开发和调试。
*   通常情况下，您无需手动设置此属性，Paper 服务器会自动检测开发包。

## paper.disable-telemetry

`paper.disable-telemetry` 系统属性用于禁用 Paper 服务器的遥测数据收集。

**用法:**

```
-Dpaper.disable-telemetry=true
```

**默认值:** `false` (启用遥测数据收集)

**说明:**

*   Paper 服务器会收集一些匿名遥测数据，用于改进 Paper 服务器的性能和稳定性。
*   如果您不希望 Paper 服务器收集遥测数据，可以将此属性设置为 `true`。
*   禁用遥测数据收集不会影响服务器的正常运行。

## paper.dump-heap

`paper.dump-heap` 系统属性用于在服务器崩溃时自动生成 Heap Dump 文件。

**用法:**

```
-Dpaper.dump-heap=true
```

**默认值:** `false` (禁用)

**说明:**

*   启用此属性后，当服务器发生 OutOfMemoryError 崩溃时，Paper 服务器会自动生成 Heap Dump 文件 (`.hprof` 文件) 到服务器根目录。
*   Heap Dump 文件包含了服务器崩溃时的内存快照，可以用于分析内存泄漏或内存溢出问题。
*   生成 Heap Dump 文件会增加服务器崩溃时的处理时间。

## paper.dump-threads

`paper.dump-threads` 系统属性用于在服务器崩溃时自动生成线程 Dump 文件。

**用法:**

```
-Dpaper.dump-threads=true
```

**默认值:** `false` (禁用)

**说明:**

*   启用此属性后，当服务器崩溃时，Paper 服务器会自动生成线程 Dump 文件 (文本文件) 到服务器根目录。
*   线程 Dump 文件包含了服务器崩溃时所有线程的堆栈信息，可以用于分析线程死锁或线程阻塞问题。

## paper.environment

`paper.environment` 系统属性用于指定 Paper 服务器的运行环境。

**用法:**

```
-Dpaper.environment=<环境名称>
```

**默认值:** `production`

**可选值:**

*   `production`: 生产环境 (默认值)，Paper 服务器将以生产模式运行，性能最佳。
*   `development`: 开发环境，Paper 服务器将以开发模式运行，输出更多的调试信息，方便开发和调试。

**说明:**

*   您可以根据需要选择不同的运行环境。
*   通常情况下，生产服务器应使用 `production` 环境，开发服务器可以使用 `development` 环境。

## paper.invalidate-player-advancements

`paper.invalidate-player-advancements` 系统属性用于在玩家数据损坏时，是否自动重置玩家进度 (Advancements)。

**用法:**

```
-Dpaper.invalidate-player-advancements=true
```

**默认值:** `false` (不自动重置)

**说明:**

*   当玩家数据损坏时，可能会导致玩家进度 (Advancements) 丢失或异常。
*   启用此属性后，Paper 服务器会在检测到玩家数据损坏时，自动重置玩家进度，以避免数据异常。
*   重置玩家进度可能会导致玩家已完成的进度丢失，请谨慎使用。

## paper.max-auto-save-chunks-per-tick

`paper.max-auto-save-chunks-per-tick` 系统属性用于限制每个 tick 自动保存的区块数量，以防止服务器卡顿。

**用法:**

```
-Dpaper.max-auto-save-chunks-per-tick=<区块数量>
```

**默认值:** `64`

**说明:**

*   Paper 服务器会自动保存世界数据，以防止数据丢失。
*   如果服务器需要保存的区块数量过多，可能会导致服务器卡顿。
*   通过此属性，您可以限制每个 tick 自动保存的区块数量，以平衡数据安全性和服务器性能。
*   建议根据服务器的性能和负载情况调整此属性值。

## paper.player-chunk-loading-async

`paper.player-chunk-loading-async` 系统属性用于控制玩家区块加载是否异步执行。

**用法:**

```
-Dpaper.player-chunk-loading-async=true
```

**默认值:** `true` (异步执行)

**说明:**

*   启用异步区块加载后，玩家区块加载操作将在异步线程中执行，不会阻塞主线程，可以提高服务器的响应速度和 TPS。
*   禁用异步区块加载后，玩家区块加载操作将在主线程中执行，可能会导致服务器卡顿，尤其是在玩家快速移动或传送时。
*   通常情况下，建议保持默认值 `true` (启用异步区块加载)。

## paper.player-settings-sync-async

`paper.player-settings-sync-async` 系统属性用于控制玩家设置同步是否异步执行。

**用法:**

```
-Dpaper.player-settings-sync-async=true
```

**默认值:** `true` (异步执行)

**说明:**

*   启用异步玩家设置同步后，玩家设置同步操作将在异步线程中执行，不会阻塞主线程，可以提高服务器的响应速度和 TPS。
*   禁用异步玩家设置同步后，玩家设置同步操作将在主线程中执行，可能会导致服务器卡顿。
*   通常情况下，建议保持默认值 `true` (启用异步玩家设置同步)。

## paper.plugin-cache-directory

`paper.plugin-cache-directory` 系统属性用于指定插件缓存目录的路径。

**用法:**

```
-Dpaper.plugin-cache-directory=<缓存目录路径>
```

**默认值:** `plugins/cache`

**说明:**

*   Paper 服务器会缓存一些插件数据，例如插件的类文件、依赖库等，以加快插件加载速度。
*   通过此属性，您可以自定义插件缓存目录的路径。
*   通常情况下，使用默认值即可。

## paper.plugin-dependency-cache-directory

`paper.plugin-dependency-cache-directory` 系统属性用于指定插件依赖库缓存目录的路径。

**用法:**

```
-Dpaper.plugin-dependency-cache-directory=<缓存目录路径>
```

**默认值:** `plugins/libraries`

**说明:**

*   Paper 服务器会缓存插件的依赖库 (例如 Maven 依赖)，以加快插件加载速度和减少网络下载。
*   通过此属性，您可以自定义插件依赖库缓存目录的路径。
*   通常情况下，使用默认值即可。

## paper.plugin-jvm-args-file

`paper.plugin-jvm-args-file` 系统属性用于指定插件 JVM 参数文件的路径。

**用法:**

```
-Dpaper.plugin-jvm-args-file=<JVM 参数文件路径>
```

**默认值:** 无

**说明:**

*   通过此属性，您可以指定一个 JVM 参数文件，Paper 服务器会在加载插件时，读取该文件中的 JVM 参数并应用到插件的类加载器中。
*   此功能主要用于插件开发者，可以用于为插件单独配置 JVM 参数，例如内存大小、GC 策略等。
*   通常情况下，服务器管理员无需使用此属性。

## paper.require-exact-plugin-dependencies

`paper.require-exact-plugin-dependencies` 系统属性用于控制是否严格检查插件依赖关系版本。

**用法:**

```
-Dpaper.require-exact-plugin-dependencies=true
```

**默认值:** `false` (不严格检查)

**说明:**

*   当插件声明了依赖关系时，Paper 服务器会检查依赖插件是否存在。
*   如果启用此属性，Paper 服务器还会严格检查依赖插件的版本是否与声明的版本完全一致。
*   如果禁用此属性，Paper 服务器只会检查依赖插件是否存在，而不会严格检查版本是否一致。
*   通常情况下，建议保持默认值 `false` (不严格检查)，以提高插件兼容性。

## paper.shutdown-threads-on-stop

`paper.shutdown-threads-on-stop` 系统属性用于控制服务器停止时是否强制关闭所有线程。

**用法:**

```
-Dpaper.shutdown-threads-on-stop=true
```

**默认值:** `false` (不强制关闭)

**说明:**

*   启用此属性后，当服务器停止时，Paper 服务器会强制关闭所有线程，包括插件创建的线程。
*   强制关闭线程可能会导致某些插件数据丢失或异常，请谨慎使用。
*   通常情况下，建议保持默认值 `false` (不强制关闭)，让插件自行清理线程资源。

## paper.use-legacy-plugin-loading

`paper.use-legacy-plugin-loading` 系统属性用于启用旧版插件加载器。

**用法:**

```
-Dpaper.use-legacy-plugin-loading=true
```

**默认值:** `false` (使用新版插件加载器)

**说明:**

*   Paper 服务器默认使用新版插件加载器，新版加载器修复了一些旧版加载器的问题，并提高了插件加载性能和稳定性。
*   在极少数情况下，某些旧插件可能与新版加载器不兼容，此时可以尝试启用旧版加载器。
*   启用旧版加载器可能会导致一些已知问题重新出现，不建议长期使用。

## paper.watchdog-delay

`paper.watchdog-delay` 系统属性用于设置看门狗线程的延迟时间 (秒)。

**用法:**

```
-Dpaper.watchdog-delay=<延迟时间>
```

**默认值:** `5` (秒)

**说明:**

*   Paper 服务器包含一个看门狗线程，用于监控服务器主线程的运行状态。
*   如果主线程在指定延迟时间内没有响应，看门狗线程会触发服务器崩溃报告，以帮助您诊断服务器卡顿或无响应问题。
*   您可以根据需要调整看门狗线程的延迟时间。
*   不建议将延迟时间设置过小，以免误报。

## paper.ignore-java-version

`paper.ignore-java-version=true` 系统属性用于忽略 Java 版本检查。

**用法:**

```
-Dpaper.ignore-java-version=true
```

**默认值:** `false` (不忽略 Java 版本检查)

**说明:**

*   Paper 服务器会检查运行环境的 Java 版本，如果 Java 版本过低或过高，会发出警告或拒绝启动。
*   在极少数情况下，您可能需要忽略 Java 版本检查，例如在测试环境中使用不受支持的 Java 版本。
*   忽略 Java 版本检查可能会导致服务器运行不稳定或出现未知问题，请谨慎使用。
*   **强烈建议使用 Paper 官方推荐的 Java 版本。**

---

**注意:**

*   系统属性名称不区分大小写。
*   系统属性值通常为布尔值 (`true` 或 `false`) 或数值。
*   系统属性需要在服务器启动命令中使用 `-D` 参数进行设置。
*   系统属性的优先级高于配置文件，例如 `paper.yml` 中的配置项。
*   部分系统属性可能仅在特定 Paper 版本或 Folia 服务器中可用。
*   系统属性的用法和选项可能会根据 Paper 版本有所变化，请参考您使用的 Paper 版本的官方文档。

如果您在使用 Paper 系统属性过程中遇到任何问题，请随时在 [PaperMC Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求帮助。
