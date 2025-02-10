---
toc_max_heading_level: 4
slug: /adding-plugins
description: 插件是扩展 Paper 功能的最强大方式，超越了配置文件。
---

# 添加插件

插件是扩展 Paper 功能的最强大方式，超越了配置文件。插件添加的功能范围可以从使牛奶恢复饥饿值或使枯死的灌木丛生长，到添加全新的原创游戏模式或物品。

:::danger[恶意插件]

在安装任何插件之前，请确保您完全信任该插件的来源。插件被授予**完全且不受限制的**访问权限，不仅可以访问您的服务器，还可以访问运行该服务器的机器。因此，必须仅从受信任的来源安装插件。请务必小心！

:::

## 查找插件

在安装插件之前，您需要找到要安装的内容。查找插件的最佳位置是 [Hangar](https://hangar.papermc.io)，Paper 的插件仓库，但您也可以在 [SpigotMC](https://www.spigotmc.org/resources/)、[BukkitDev](https://dev.bukkit.org/bukkit-plugins) 或 [PaperMC 论坛](https://forums.papermc.io/forums/paper-plugin-releases/) 上找到许多插件，而其他插件可能会在 [GitHub](https://github.com) 上发布。查找插件的最佳方法之一不是直接浏览这些站点中的任何一个，而是使用搜索引擎搜索插件。搜索您想要的功能，后跟 `Minecraft plugin` 通常会产生良好的结果。

:::tip[Spigot 和 Bukkit 插件]

Paper 与 Spigot 和 Bukkit 插件都兼容。即使插件没有明确提及 Paper 兼容性也没关系。它仍然可以工作。

:::

## 安装插件

1. 找到您要安装的插件后，下载它。确保您下载的文件以 `.jar` 结尾。某些插件也以 `.zip` 文件形式分发，在这种情况下，您需要解压缩该文件并找到适用于您平台的 `.jar` 文件，通常标记为 `bukkit` 或 `paper`。
2. 下载插件后，从 Paper 服务器的根目录中找到 `plugins` 文件夹。
3. 将插件文件 (`.jar`) 拖放到 `plugins` 文件夹中。如果您使用的是共享托管服务，则可能需要使用其 Web 面板或 SFTP 上传插件；但是，步骤将相同。
4. 重启您的服务器。插件应该会加载。
5. 检查您的工作。服务器完成加载后，在游戏中运行 `/plugins` 命令或在控制台中键入 `plugins`。您应该看到您新安装的插件以绿色列出。如果未列出或颜色为红色，请继续[故障排除](#troubleshooting)。以红色列出的插件表示当前未启用。对于新安装的插件，这通常意味着插件加载失败。

## 故障排除

### 检查您的日志

故障排除安装插件的第一步是检查服务器的日志。您服务器的最新日志将存储在 `logs/latest.log` 文件中。您可能需要滚动到此文件开头附近，以查看插件何时加载。

#### 缺少依赖项

如果您看到类似这样的内容：

```log
[00:00:00] [Server thread/WARN] Could not load 'plugins/MyAwesomePlugin-1.0.0.jar' in folder 'plugins'
[00:00:00] [Server thread/WARN] org.bukkit.plugin.UnknownDependencyException: Unknown/missing dependency plugins: [Vault]. Please download and install these plugins to run 'MyAwesomePlugin'.
```

这意味着您尝试安装的插件缺少依赖项。在这种情况下，依赖项是您必须安装才能使第一个插件正常工作的另一个插件。虽然您会收到一个很大的可怕错误，但要查看的重要行是：

```log
[00:00:00] [Server thread/WARN] Unknown/missing dependency plugins: [Vault]. Please download and install these plugins to run 'MyAwesomePlugin'.
```

这告诉您，为了加载 `MyAwesomePlugin`，您必须首先安装 `Vault`。

#### 无效的 `plugin.yml`

如果您看到更接近于此的内容：

```log
[00:00:00] [Server thread/WARN] Could not load 'plugins/MyAwesomePlugin-1.0.0.jar' in folder 'plugins'
[00:00:00] [Server thread/WARN] org.bukkit.plugin.InvalidDescriptionException: Invalid plugin.yml
```

这意味着您下载的内容不是有效的 Paper 插件。这通常由以下原因之一引起：

1. 您下载的插件根本不是插件，而是 Forge、Fabric 或类似的模组。这些插件无法在 Paper 上运行。
2. 插件下载失败。尤其是在使用 `curl` 或 `wget` 等工具时，您很容易下载错误页面而不是您想要的插件。这也可能是由网络问题引起的。尝试再次下载插件。如果您使用 FTP（不是 SFTP 或 Web 面板）将插件上传到共享托管服务，请确保您的 FTP 客户端处于 `binary` 而不是 `ASCII` 模式。有关详细信息，请参阅 FTP 客户端的文档。

#### 歧义插件名称

如果您看到类似这样的内容：

```log
[00:00:00] [Server thread/WARN] Ambiguous plugin name `Essentials' for files `plugins/EssentialsX-2.19.4.jar' and `plugins/Essentialsx-2.20.0-dev.jar' in `plugins'
```

这意味着您有两个同名的插件，这是不支持的。在这种情况下，安装了两个版本的 EssentialsX。发布版本 `2.19.4` 和 `2.20.0` 的开发版本。确保您一次只安装每个插件的一个版本。删除重复插件的旧版本，然后重启服务器。

为了防止在更新时意外安装一个插件的两个版本，您可以使用 [更新指南](/paper/updating#step-2-update-plugins) 中描述的 `update` 文件夹。

#### 其他情况

如果您看到错误，但它与上述任何一种情况都不相似，请尝试自己阅读它。虽然完整的错误可能很大且可怕，但您可能只需要阅读前一两行即可了解发生了什么。如果您不确定，请随时在我们的 [Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求支持。

### 如果没有记录任何内容

如果没有记录任何内容，则您的服务器可能未尝试加载任何插件。服务器加载插件所需的条件如下：

1. 该文件位于 `plugins` 文件夹的根目录，相对于其工作目录。这通常与服务器 JAR 文件所在的文件夹相同。**不会检查 `plugins` 文件夹的子目录。** 所有插件都必须位于根文件夹中。
2. 该文件以 `.jar` 结尾。如果您的插件未以 `.jar` 结尾，则您下载的内容可能不是插件。请注意，某些插件以 `.zip` 文件形式分发多个 JAR。如果是这种情况，您必须先解压缩它们，然后再安装插件。

如果以上两点都为真，但您仍然看不到任何日志，请在我们的 [Discord](https://discord.gg/papermc) 服务器的 `#paper-help` 频道中寻求支持。我们将很乐意为您提供帮助。
