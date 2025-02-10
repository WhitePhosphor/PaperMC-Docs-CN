---
slug: /reference/paper-plugins
title: Paper Plugins (paper-plugins.yml)
description: paper-plugins.yml 配置文件参考。
---

# Paper 插件 (paper-plugins.yml)

`paper-plugins.yml` 文件是 Paper 服务器特有的配置文件，用于控制 Paper 插件的加载和行为。

**文件位置:**

`paper-plugins.yml` 文件位于服务器根目录下的 `config` 文件夹中，完整路径为 `config/paper-plugins.yml`。

**文件结构:**

`paper-plugins.yml` 文件使用 YAML 格式编写，基本结构如下：

```yaml
# Paper 插件配置文件
# 此文件用于配置 Paper 插件的加载和行为

# 插件配置
plugins:
  # 插件名称 (必须与插件 jar 文件名相同，不包括 .jar 后缀)
  <plugin-name>:
    # 插件是否启用，默认为 true (启用)
    enabled: true
    # 插件加载阶段，可选值为:
    # - POST_WORLD: 在世界加载后加载 (默认)
    # - STARTUP: 在服务器启动时加载
    load: POST_WORLD
    # 插件依赖关系配置
    dependencies:
      # 插件硬性依赖 (必须加载才能运行)
      hard:
        - <dependency-plugin-name-1>
        - <dependency-plugin-name-2>
      # 插件软性依赖 (可选加载，加载后提供额外功能)
      soft:
        - <soft-dependency-plugin-name-1>
        - <soft-dependency-plugin-2>
    # 插件隔离配置 (用于隔离插件的类加载器，防止类冲突)
    isolation:
      # 是否启用插件隔离，默认为 false (禁用)
      enabled: false
      # 隔离模式，可选值为:
      # - PLUGIN: 插件级别隔离 (每个插件一个独立的类加载器)
      # - SHARED: 共享隔离 (多个插件共享一个隔离的类加载器)
      mode: PLUGIN
      # 隔离的类加载器实现，可选值为:
      # - ISOLATED: 隔离类加载器 (默认)
      # - SHARED: 共享类加载器
      impl: ISOLATED
    # 插件命令白名单配置 (限制插件可以注册的命令)
    command-whitelist:
      - <command-name-1>
      - <command-name-2>
    # 插件权限白名单配置 (限制插件可以注册的权限)
    permission-whitelist:
      - <permission-name-1>
      - <permission-name-2>
    # 插件配置值覆盖 (覆盖插件 plugin.yml 中定义的配置值)
    config-overrides:
      # <config-key-1>: <config-value-1>
      # <config-key-2>: <config-value-2>
      ...
```

**配置项说明:**

*   **plugins**: 根节点，包含所有插件的配置信息。
*   **\<plugin-name>**: 插件名称，必须与插件 jar 文件名相同，不包括 `.jar` 后缀。例如，如果插件 jar 文件名为 `MyPlugin.jar`，则插件名称应为 `MyPlugin`。
*   **enabled**:  插件是否启用，布尔值，默认为 `true` (启用)。设置为 `false` 可以禁用插件，即使插件 jar 文件存在于 `plugins` 文件夹中也不会被加载。
*   **load**: 插件加载阶段，字符串，可选值为 `POST_WORLD` 和 `STARTUP`。
    *   `POST_WORLD`: 在世界加载后加载，这是默认值。大多数插件应使用此加载阶段。
    *   `STARTUP`: 在服务器启动时加载，在世界加载之前加载。某些需要在服务器启动早期阶段执行操作的插件可以使用此加载阶段。
*   **dependencies**: 插件依赖关系配置节点。
    *   **hard**: 硬性依赖配置节点，列表类型，列出插件的硬性依赖插件名称。硬性依赖插件必须先于当前插件加载，否则当前插件将加载失败。
    *   **soft**: 软性依赖配置节点，列表类型，列出插件的软性依赖插件名称。软性依赖插件是可选的，如果软性依赖插件存在，则当前插件可以使用其提供的功能，否则当前插件仍然可以正常加载和运行，但功能可能会有所减少。
*   **isolation**: 插件隔离配置节点。
    *   **enabled**: 是否启用插件隔离，布尔值，默认为 `false` (禁用)。启用插件隔离可以提高服务器的稳定性和安全性，但会增加服务器的内存消耗。
    *   **mode**: 隔离模式，字符串，可选值为 `PLUGIN` 和 `SHARED`。
        *   `PLUGIN`: 插件级别隔离，每个插件使用一个独立的类加载器进行隔离。这是最严格的隔离模式，可以最大程度地防止插件之间的类冲突，但内存消耗也最高。
        *   `SHARED`: 共享隔离，多个插件共享一个隔离的类加载器。内存消耗相对较低，但隔离性也相对较弱。
    *   **impl**: 隔离的类加载器实现，字符串，可选值为 `ISOLATED` 和 `SHARED`。通常情况下使用默认值 `ISOLATED` 即可。
*   **command-whitelist**: 插件命令白名单配置节点，列表类型，列出允许插件注册的命令名称。如果插件尝试注册不在白名单中的命令，则会注册失败。此配置项可以用于限制插件可以注册的命令，提高服务器的安全性。
*   **permission-whitelist**: 插件权限白名单配置节点，列表类型，列出允许插件注册的权限名称。如果插件尝试注册不在白名单中的权限，则会注册失败。此配置项可以用于限制插件可以注册的权限，提高服务器的安全性。
*   **config-overrides**: 插件配置值覆盖节点，映射类型，用于覆盖插件 `plugin.yml` 文件中定义的配置值。键为配置项的键名，值为要覆盖的配置值。此配置项可以用于在不修改插件 `plugin.yml` 文件的情况下，修改插件的配置值。

**示例配置:**

```yaml
plugins:
  ExamplePlugin:
    enabled: true
    load: POST_WORLD
    dependencies:
      hard:
        - Vault
      soft:
        - PlaceholderAPI
    isolation:
      enabled: false
    command-whitelist:
      - example
      - exampleadmin
    permission-whitelist:
      - example.use
      - example.admin
    config-overrides:
      debug-mode: false
      message-prefix: "[ExamplePlugin] "
```

**注意:**

*   修改 `paper-plugins.yml` 文件后，需要重启服务器才能生效。
*   `paper-plugins.yml` 文件是可选的，如果不存在，则 Paper 服务器将使用默认配置加载插件。
*   建议谨慎使用插件隔离和白名单配置，不当的配置可能会导致插件功能异常。
*   插件名称必须与插件 jar 文件名完全一致 (不区分大小写)，否则配置将不会生效。

如果您在使用 `paper-plugins.yml` 文件过程中遇到任何问题，请随时在 [PaperMC Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求帮助。
