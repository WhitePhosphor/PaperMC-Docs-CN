---
slug: /built-in-commands
description: 内置命令列表及其说明。
---

# 内置命令

Velocity在代理核心中默认包含了一些命令。这些命令是根据它们对大多数用户的实用性来选择的。

当然,如果你想要添加更多命令,你可以随时安装插件。

## `/velocity`

`/velocity`命令包含了一些用于管理代理的子命令。

### `/velocity plugins`

如果用户拥有`velocity.command.plugins`权限,他们可以使用`/velocity plugins`查看当前在代理上活跃的所有插件,包括名称、作者和版本。

### `/velocity version`

如果用户拥有`velocity.command.info`权限(默认情况下,所有用户都有此权限),他们可以查看代理上运行的Velocity版本。

### `/velocity reload`

如果用户拥有`velocity.command.reload`权限,代理将从磁盘上的`velocity.toml`重新读取并重新配置自己。如果解析文件时出现问题,将不会应用任何更改。

### `/velocity dump`

如果用户拥有`velocity.command.dump`权限,他们可以使用此命令获取代理的匿名详细信息转储。这可以发送到PaperMC Discord以帮助我们提供支持。

### `/velocity heap`

:::caution

此命令生成的堆转储包含有关你的Velocity实例的详细信息,这些信息可能非常敏感,请非常小心你与谁共享生成的堆转储。

:::

如果用户拥有`velocity.command.heap`权限,他们将能够从正在运行的Velocity实例生成堆转储,这将允许对内存消耗进行详细分析。

生成的堆转储将位于`dumps`文件夹中。

## `/server`

如果用户拥有`velocity.command.server`权限(默认情况下,所有用户都有此权限),玩家可以使用此命令查看和切换到另一个服务器。

仅执行`/server`将向用户发送他们当前所在服务器的名称,以及在代理上配置的其他可移动到的服务器选项。

如果提供了服务器名称,Velocity将尝试连接到该服务器。

## `/shutdown`

:::info

此命令只能从控制台执行。

:::

执行时,这将优雅地关闭Velocity代理。所有玩家将从代理断开连接,插件将有机会在代理关闭前完成。可以提供可选的原因,可以是JSON格式或[MiniMessage格式](https://docs.advntr.dev/minimessage/format.html)。

如果提供的消息以`"`、`[`或`{`开头,则尝试将消息解析为JSON。如果此解析失败,或消息以其他任何内容开头,消息将被解析为MiniMessage格式。

## `/glist`

如果用户拥有`velocity.command.glist`权限(默认情况下,没有人拥有此权限),玩家可以使用此命令查看当前在代理上的玩家数量,并使用`/glist all`获取每个服务器的玩家列表。

## `/send`

如果用户拥有`velocity.command.send`权限,他们可以将其他玩家(或代理上的所有玩家)发送到另一个服务器。
