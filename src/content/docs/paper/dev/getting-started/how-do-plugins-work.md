---
title: 插件原理
description: Paper 中插件的工作方式
slug: paper/dev/how-do-plugins-work
---

插件是扩展 Minecraft 服务器功能的一种方式。
它们使用基于 JVM 的语言编写，例如 Java、Kotlin、Groovy 或 Scala。插件从服务器目录中的 `plugins` 文件夹加载。
插件将从一个 `.jar` 文件加载。
每个插件都有一个主类，该类在插件的 `plugin.yml` 文件中指定。
这个类必须继承自 `JavaPlugin`，并且是插件的入口点，也是定义插件生命周期方法的地方。

:::caution

我们不推荐在主类的构造函数中编写代码，因为此时无法保证哪些 API 是可用的。
相反，你应该使用 `onLoad` 方法来初始化你的插件。
此外，不要直接调用你的插件的构造函数。这将导致插件出现问题。

:::

## 插件生命周期

插件在运行时加载和卸载。当插件被加载时，它被初始化并启用。
当插件被卸载时，它被禁用并完成。

### 初始化

当插件被加载时，它被初始化。这意味着插件被加载到内存中，并且它的 `onLoad` 方法被调用。
这个方法用于初始化插件并设置它需要的任何资源。
此时大部分 Bukkit API 是不可用的，因此与它交互是不安全的。

### 启用

当插件被启用时，会调用它的 `onEnable` 方法。
这个方法用于设置插件运行所需的任何资源。
这个方法在插件初始化后但在服务器开始计时之前被调用，因此注册事件监听器和其他插件运行所需资源是安全的，但通常不建议与很多 API 进行交互。

这也是你可以打开数据库连接、启动线程以及执行其他在 `onLoad` 方法中不安全的操作的时候。

### 禁用

当插件被禁用时，它的 `onDisable` 方法被调用。 这个方法用于清理插件分配的任何资源。
这个方法在所有插件被卸载之前被调用，用于在插件被卸载之前需要完成的任何清理工作。
这可能包括将数据保存到磁盘或关闭与数据库的连接。

## 事件监听器

事件是插件监听服务器中发生的事情并在它们被触发时运行代码的一种方式。
例如，当玩家加入服务器时会触发 [`PlayerJoinEvent`](jd:paper:org.bukkit.event.player.PlayerJoinEvent) 。
这是一种更高效的运行代码的方式，而不是不断地进行检查。
更多信息请参阅我们的 [事件监听器页面](/paper/dev/event-listeners)。

有些事件是可以取消的。这意味着当事件被触发时，它可以被取消，从而否定或停止事件的效果。
例如， [`PlayerMoveEvent`](jd:paper:org.bukkit.event.player.PlayerMoveEvent) 是可以取消的。
这意味着当它被取消时，玩家不会移动。
这对于反作弊等事情很有用，例如如果玩家移动得太快，你可以取消该事件。

在编写事件监听器时，考虑事件的触发频率很重要。
“热”事件是指频繁触发的事件。例如，`PlayerMoveEvent` 每次玩家移动时都会触发。
这意味着如果你的事件监听器中有大量复杂的代码，它将在每次玩家移动时运行。
这可能会导致大量延迟。 保持事件监听器尽可能轻量级是很重要的。
一种可能的方法是快速检查事件是否应该被处理，如果不应该，则直接返回。
例如，如果你只想在玩家从一个方块移动到另一个方块时处理事件，你可以检查玩家的位置是否改变了方块。如果没有，你可以从监听器中返回。

## 命令

命令是玩家、控制台、RCON 和命令方块在服务器上运行代码的一种方式。命令由插件注册，并可由命令发送者运行。
例如，`/help` 命令由服务器注册，并可由玩家运行。
玩家可以通过在聊天中输入命令或从命令方块运行来执行命令。

命令可以有参数。例如，`/give` 命令接受一个参数，指定要给予物品的玩家，以及一个参数，指定要给予的物品。参数由空格分隔。
例如，命令 `/give Notch diamond` 将给予名为 Notch 的玩家一个钻石。
注意这里的参数是 `["Notch", "diamond"]`。

### 权限

Permissions are a way to control who can run commands and who can listen to events. Permissions
are registered by plugins and can be checked by other plugins. Permissions can be granted to players and groups.
Permissions can have a hierarchical nature, if defined so by the plugin in their `plugin.yml`. For example, a
plugin can define `example.command.help` as a sub-permission of `example.command`. This means that if a player
has the `example.command` permission, they will also have the `example.command.help` permission.

:::note

Permission plugins can allow the usage of wildcard permissions using the `*` character to grant any permission
or sub-permission available, allowing hierarchical permissions even if not set by the plugin itself. For example,
granting `example.command.*` through a permission plugin with wildcard support will grant access to all permissions
starting with `example.command.` itself.

It is **not** recommended to use wildcard permissions, especially `*` (All permissions), as it can be a huge
security risk, as well as potentially causing unwanted side effects to a player. Use with caution.

:::

## 配置

Plugins can have configuration files. These files are used to store data that the plugin needs to run. For example, a
plugin that adds a new block to the game might have a configuration file that stores the block's ID. Configuration files
should be stored in the plugin's data folder, within the `plugins` folder. The server offers a YAML configuration API
that can be used to read and write configuration files. See [here](/paper/dev/plugin-configurations) for more information.

## 安排任务

Plugins can schedule tasks to run at a later time. This is useful for things like running code after a certain amount
of time has passed. For example, a plugin might want to run code after 5 seconds. This can be done by scheduling a task
to run after 100 ticks - one second is 20 ticks during normal operation. It is important to note that tasks might be
delayed if the server is lagging. For example, if the server is only running at 10 ticks per second, a task that is
scheduled to run after 100 ticks will take 10 seconds.

In Java, typically you could use [`Thread#sleep()`](jd:java:java.lang.Thread#sleep(long)) to delay
the execution of code. However, if the code is running on the main thread, this will cause the server to pause for the
delay. Instead, you should use the `Scheduler` API to schedule tasks to run later.
Learn more about the `Scheduler` API [here](/paper/dev/scheduler).

## 组件

Since Minecraft 1.7 and the introduction of "components", plugins can now send messages to players that contain
rich text. This means that plugins can send messages that contain things like colors, bold text, and clickable links.
Colors were always possible, but only through the use of legacy color codes.

Paper implements a library called `Adventure` that makes it easy to create and send messages to players. Learn more
about the `Adventure` API [here](https://docs.advntr.dev/) from their docs or our docs
[here](/paper/dev/component-api/introduction).
