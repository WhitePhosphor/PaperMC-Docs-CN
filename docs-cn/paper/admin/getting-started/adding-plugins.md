---
toc_max_heading_level: 4
slug: /adding-plugins
description: 插件是在配置文件之外扩展 Paper 功能的最强大方式。
---

# 添加插件

插件是在配置文件之外扩展 Paper 功能的最强大方式。插件添加的功能可以从让牛奶恢复饥饿值
或枯死的灌木重新生长，到添加全新的原创游戏模式或物品。

:::danger[恶意插件]

在安装任何插件之前，请确保您完全信任插件的来源。插件被授予对您的服务器和运行它的机器的
**完全且不受限制的**访问权限。因此，必须只从可信来源安装插件。请务必小心！

:::

## 寻找插件

在安装插件之前，您需要找到想要安装的插件。找到插件的最佳地点是 [Hangar](https://hangar.papermc.io)，
Paper 的插件仓库，但您也可以在 [SpigotMC](https://www.spigotmc.org/resources/)、
[BukkitDev](https://dev.bukkit.org/bukkit-plugins) 或
[PaperMC 论坛](https://forums.papermc.io/forums/paper-plugin-releases/)上找到许多插件，
而其他插件可能在 [GitHub](https://github.com) 上发布。找到插件的最好方法之一不是直接浏览这些
网站，而是使用搜索引擎搜索插件。搜索您想要的功能，后面加上 `Minecraft plugin` 通常会得到不错的结果。

:::tip[Spigot 和 Bukkit 插件]

Paper 与 Spigot 和 Bukkit 插件都兼容。即使插件没有明确提到 Paper 兼容性，它仍然可以工作。

:::

## 安装插件

1. 一旦您找到想要安装的插件，请下载它。确保您下载的文件以 `.jar` 结尾。一些插件也会以
   `.zip` 文件分发，在这种情况下，您需要解压文件并找到适合您平台的 `.jar` 文件，通常标记为
   `bukkit` 或 `paper`。
2. 下载插件后，找到 Paper 服务器根目录中的 `plugins` 文件夹。
3. 将插件文件（`.jar`）拖放到 `plugins` 文件夹中。如果您使用的是共享主机服务，
   您可能需要使用他们的网页面板或 SFTP 上传插件；但是，程序将是相同的。
4. 重启您的服务器。插件应该会加载。
5. 检查您的工作。一旦服务器完成加载，在游戏中运行 `/plugins` 命令或在控制台中输入
   `plugins`。您应该看到您刚安装的插件以绿色列出。如果它没有列出或显示为红色，
   请继续[故障排除](#故障排除)。红色列出的插件表示它当前未启用。对于刚安装的插件，
   这通常意味着插件加载失败。

## 故障排除

### 检查您的日志

故障排除安装插件的第一步是检查服务器的日志。您的服务器最近的日志将存储在
`logs/latest.log` 文件中。您可能需要滚动到这个文件的开头附近才能看到插件加载时的记录。

#### 缺少依赖项

如果您看到类似这样的内容：

```log
[00:00:00] [Server thread/WARN] Could not load 'plugins/MyAwesomePlugin-1.0.0.jar' in folder 'plugins'
[00:00:00] [Server thread/WARN] org.bukkit.plugin.UnknownDependencyException: Unknown/missing dependency plugins: [Vault]. Please download and install these plugins to run 'MyAwesomePlugin'.
```

这意味着您尝试安装的插件缺少依赖项。在这种情况下，依赖项是您必须安装的另一个插件，
以使第一个插件能够运行。虽然您会看到一个很大的可怕错误，但需要关注的重要行是：

```log
[00:00:00] [Server thread/WARN] Unknown/missing dependency plugins: [Vault]. Please download and install these plugins to run 'MyAwesomePlugin'.
```

这告诉您要加载 `MyAwesomePlugin`，您必须先安装 `Vault`。

#### 无效的 `plugin.yml`

如果您看到更接近这样的内容：

```log
[00:00:00] [Server thread/WARN] Could not load 'plugins/MyAwesomePlugin-1.0.0.jar' in folder 'plugins'
[00:00:00] [Server thread/WARN] org.bukkit.plugin.InvalidDescriptionException: Invalid plugin.yml
```

这意味着您下载的不是有效的 Paper 插件。这通常由以下原因之一导致：

1. 您下载的插件根本不是插件，而是 Forge、Fabric 或类似的模组。
   这些不能在 Paper 上运行。
2. 插件没有完全下载。特别是在使用 `curl` 或 `wget` 等工具时，
   您很容易下载到错误页面而不是您想要的插件。这也可能是由网络问题引起的。
   尝试重新下载插件。如果您使用 FTP（不是 SFTP 或网页面板）将插件上传到共享主机服务，
   请确保您的 FTP 客户端处于 `binary` 模式而不是 `ASCII` 模式。有关详细信息，
   请查阅您的 FTP 客户端文档。

#### 模糊的插件名称

如果您看到类似这样的内容：

```log
[00:00:00] [Server thread/WARN] Ambiguous plugin name `Essentials' for files `plugins/EssentialsX-2.19.4.jar' and `plugins/Essentialsx-2.20.0-dev.jar' in `plugins'
```

这意味着您有两个同名的插件，这是不支持的。在这种情况下，安装了两个版本的 EssentialsX。
一个是发布版 `2.19.4`，另一个是 `2.20.0` 的开发版本。确保一次只安装一个版本的每个插件。
删除重复插件的旧版本，然后重启服务器。

为了防止在更新时意外安装同一插件的两个版本，您可以使用 `update` 文件夹，
如[更新指南](/paper/updating#step-2-update-plugins)中所述。

#### 其他情况

如果您看到错误，但它与上述情况都不相似，请尝试自己阅读它。虽然完整的错误可能很大且可怕，
但您可能只需要阅读前一两行就能理解发生了什么。如果您不确定，请不要犹豫，在我们的
[Discord](https://discord.gg/papermc) 的 `#paper-help` 频道寻求支持。

### 如果没有记录任何内容

如果没有记录任何内容，您的服务器可能没有尝试加载任何插件。服务器加载插件需要满足
以下条件：

1. 文件位于 `plugins` 文件夹的根目录，相对于其工作目录。这通常与服务器 JAR 文件
   所在的文件夹相同。**不会检查 `plugins` 文件夹的子目录。**所有插件必须在根文件夹中。
2. 文件以 `.jar` 结尾。如果您的插件不以 `.jar` 结尾，您下载的可能不是插件。
   请注意，一些插件会将多个 JAR 文件作为 `.zip` 文件分发。如果是这种情况，
   您必须在安装插件之前解压它们。

如果这两个条件都满足，但您仍然看不到任何日志，请在我们的 [Discord](https://discord.gg/papermc)
服务器的 `#paper-help` 频道寻求支持。我们很乐意帮助您。
