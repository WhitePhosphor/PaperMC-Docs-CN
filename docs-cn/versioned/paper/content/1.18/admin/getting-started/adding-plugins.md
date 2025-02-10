---
toc_max_heading_level: 4
slug: /adding-plugins
---

# 添加插件

插件是在配置文件之外扩展Paper功能的最强大方式。插件添加的功能可以从让牛奶恢复饥饿度或让枯死的灌木生长,到添加全新的原创游戏模式或物品。

:::danger[恶意插件]

在安装任何插件之前,请确保你完全信任插件的来源。插件被赋予对你的服务器和运行它的机器的**完全且不受限制的**访问权限。因此,必须只从可信来源安装插件。请务必小心!

:::

## 寻找插件

在安装插件之前,你需要找到你想要安装的插件。大多数插件可以在[SpigotMC](https://www.spigotmc.org/resources/)、[BukkitDev](https://dev.bukkit.org/bukkit-plugins)或[PaperMC论坛](https://forums.papermc.io/forums/paper-plugin-releases/)上找到,而其他插件可能在[GitHub](https://github.com)上发布。找到插件的最好方法不是直接浏览这些网站,而是使用搜索引擎搜索插件。搜索你想要的功能后跟`Minecraft plugin`通常会得到不错的结果。

:::tip[Spigot和Bukkit插件]

Paper与Spigot和Bukkit插件都兼容。即使插件没有明确提到Paper兼容性也没关系。它仍然可以工作。

:::

## 安装插件

1. 一旦你找到想要安装的插件,下载它。确保你下载的文件以`.jar`结尾。一些插件也以`.zip`文件分发,在这种情况下你需要解压文件并找到适合你平台的`.jar`文件,通常标记为`bukkit`或`paper`。
2. 一旦你在本地下载了插件,从你的Paper服务器的根目录找到`plugins`文件夹。
3. 将插件文件(`.jar`)拖放到`plugins`文件夹中。如果你使用共享主机服务,你可能需要使用他们的网页面板或SFTP上传插件;但是,程序将是相同的。
4. 重启你的服务器。插件应该会加载。
5. 检查你的工作。一旦服务器完成加载,在游戏中运行`/plugins`命令或在控制台中输入`plugins`。你应该看到你刚安装的插件以绿色列出。如果它没有列出或显示为红色,继续[故障排除](#troubleshooting)。显示为红色的插件表示它当前未启用。对于刚安装的插件,这通常意味着插件加载失败。

## 故障排除

### 检查你的日志

故障排除安装插件的第一步是检查服务器的日志。你的服务器最近的日志将存储在`logs/latest.log`文件中。你可能需要滚动到这个文件的开头附近才能看到插件加载时的内容。

#### 缺少依赖

如果你看到类似这样的内容:

```log
Could not load 'plugins/MyAwesomePlugin-1.0.0.jar' in folder 'plugins'
org.bukkit.plugin.UnknownDependencyException: Unknown/missing dependency plugins: [Vault]. Please download and install these plugins to run 'MyAwesomePlugin'.
```

这意味着你试图安装的插件缺少依赖。在这种情况下,依赖是另一个插件,你必须先安装它才能让第一个插件运行。虽然你会得到一个很大的可怕错误,但要看的重要行是

```log
Unknown/missing dependency plugins: [Vault]. Please download and install these plugins to run 'MyAwesomePlugin'.
```

这告诉你为了加载`MyAwesomePlugin`,你必须先安装`Vault`。

#### 无效的plugin.yml

如果你看到更接近这样的内容:

```log
Could not load 'plugins/MyAwesomePlugin-1.0.0.jar' in folder 'plugins'
org.bukkit.plugin.InvalidDescriptionException: Invalid plugin.yml
```

这意味着你下载的不是有效的Paper插件。这通常由以下原因之一造成:

1. 你下载的插件根本不是插件,而是Forge、Fabric或类似的模组。这些不能在Paper上运行。
2. 插件没有完全下载。特别是在使用`curl`或`wget`等工具时,你很容易下载错误页面而不是你想要的插件。这也可能由网络问题引起。尝试重新下载插件。如果你使用FTP(不是SFTP或网页面板)将插件上传到共享主机服务,确保你的FTP客户端处于`binary`模式而不是`ASCII`模式。有关详细信息,请查阅你的FTP客户端的文档。

#### 模糊的插件名称

如果你看到类似这样的内容:

```log
Ambiguous plugin name `Essentials' for files `plugins/EssentialsX-2.19.4.jar' and `plugins/Essentialsx-2.20.0-dev.jar' in `plugins'
```

这意味着你有两个同名的插件,这是不支持的。在这种情况下,安装了两个版本的EssentialsX。发布版本`2.19.4`和`2.20.0`的开发版本。确保同一时间只安装一个版本的每个插件。删除重复插件的旧版本,然后重启你的服务器。

[//]: # "为了防止在更新时意外安装同一个插件的两个版本,你可以使用"
[//]: # "`update`文件夹,如[更新指南](/paper/how-to/update)中所述。"

#### 其他情况

如果你看到一个错误,但它与上述任何一个都不相似,尝试自己阅读它。虽然完整的错误可能很大且可怕,但你可能只需要阅读前一两行就能理解发生了什么。如果你不确定,不要犹豫,在我们的[Discord](https://discord.gg/papermc)的`#paper-help`频道寻求支持。

### 如果没有记录任何内容

如果没有记录任何内容,你的服务器可能根本没有尝试加载任何插件。服务器加载插件需要满足以下条件:

1. 文件位于`plugins`文件夹的根目录,相对于其工作目录。这通常与服务器JAR文件在同一个文件夹中。**不会检查`plugins`文件夹的子目录。**所有插件必须在根文件夹中。
2. 文件以`.jar`结尾。如果你的插件不以`.jar`结尾,你下载的可能不是插件。注意一些插件以`.zip`文件的形式分发多个jar。如果是这种情况,你必须在安装插件之前解压它们。

如果这两个条件都满足但你仍然看不到任何日志,请在我们的[Discord](https://discord.gg/papermc)服务器的`#paper-help`频道寻求支持。我们很乐意帮助你。
