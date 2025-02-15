---
slug: /player-information-forwarding
description: 如何在Velocity上配置信息转发。
---

# 配置玩家信息转发

Velocity支持将玩家的信息转发到你的服务器,如IP地址、UUID和皮肤。Velocity支持三种转发格式:

- **Velocity现代转发**是一种更安全的自定义转发格式(现代转发)。
- **BungeeCord转发**(也称为_传统转发_)具有更好的兼容性但安全性较低。
- **BungeeGuard**,与BungeeCord转发相同但包含一个密钥。它比单独的BungeeCord转发更好,但不如Velocity现代转发理想。

:::info

你只能选择这些转发格式中的一种。目前不可能"混合搭配"转发模式或同时使用所有转发格式。通常,如果你只支持Minecraft 1.13及更新版本的客户端,请使用Velocity现代转发,否则你必须使用BungeeCord转发。

:::

## 配置现代转发

`modern`转发是Velocity原生格式。它以高效的二进制格式转发所有玩家信息,并使用MAC码使服务器更难冒充你的Velocity代理。但是,它仅适用于Minecraft 1.13或更高版本。

:::caution

现代转发与Minecraft 1.13以下版本和ProtocolSupport插件不兼容。如果你使用这些,你需要改用传统的BungeeCord兼容转发。

:::

要在任何支持的服务器实现中使用现代转发,请将`velocity.toml`中的`player-info-forwarding-mode`设置为`modern`。然后,你需要确保你的服务器正确配置以使用Velocity转发。

### 为Paper配置现代转发

Paper 1.14+及以上版本,以及Paper 1.13.1/1.13.2 build 377及以上版本原生支持Velocity现代转发。

首先,你需要在[`server.properties`](/paper/reference/server-properties#online_mode)文件中禁用`online-mode`设置。这可以防止服务器验证玩家身份,代理将代替它进行验证。

如果你之前启用了BungeeCord转发,你也需要禁用它。确保在你的`spigot.yml`中将`settings.bungeecord`设置为`false`。

在`config/paper-global.yml`中,将`proxies.velocity.enabled`设置为true,并将`proxies.velocity.secret`设置为与你的`forwarding.secret`文件中的密钥匹配。你还必须将`proxies.velocity.online-mode`设置为与你的`velocity.toml`中的`online-mode`设置相同。完成编辑`paper-global.yml`后,重启你的服务器。

:::info

如果你使用的是Paper 1.18.2或更低版本,你会在`paper.yml`文件中找到这些选项,分别为`settings.velocity-support.enabled`、`settings.velocity-support.secret`和`settings.velocity-support.online-mode`。

:::

## 为Fabric配置现代转发

一个名为[FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)的模组允许你在使用Fabric的模组服务器上使用Velocity现代转发。

## 为Forge配置现代转发

一个名为[ProxyCompatibleForge](https://modrinth.com/mod/proxy-compatible-forge)的模组允许你在使用Forge 1.14或更高版本的模组服务器上使用Velocity现代转发。

## 配置传统BungeeCord兼容转发

:::danger

传统转发在**本质上是不安全的**。如果你必须使用它,你应该了解[如何正确保护你的服务器](../how-to/security.md)。该页面回顾了所有可能的选项,以确保除了代理之外没有其他东西可以连接到你的服务器。

:::

`legacy`转发是BungeeCord在启用IP转发时使用的玩家信息转发协议。由于这一点,它在大多数服务器实现中都得到了广泛支持。它具有出色的兼容性(支持早至2013年发布的1.7.2版本),如果你在模组服务器上安装SpongeForge/BungeeForge并正确配置,它也可以与Forge一起工作。但是,它不安全。

如果你必须使用BungeeCord兼容转发,只需将`velocity.toml`中的`player-info-forwarding-mode`设置为`legacy`。你还需要确保你的服务器可以接受Velocity发送的转发玩家数据。

为了增加一些安全性,特别是对于托管在共享主机上的代理,Velocity可选地支持[BungeeGuard](https://www.spigotmc.org/resources/bungeeguard.79601/)插件。要使用它,请将`velocity.toml`中的`player-info-forwarding-mode`设置为`bungeeguard`,然后将`forwarding.secret`文件中的值添加到BungeeGuard配置的token部分。

### 为Spigot / Paper配置传统转发

要使Spigot或Paper理解从Velocity转发的数据,请在你的`spigot.yml`中将`settings.bungeecord`设置为`true`,然后重启你的服务器。

### 为Sponge配置传统转发

要配置Sponge以理解从Velocity转发的数据,你需要先停止服务器,在你的`config/sponge/global.conf`文件中将`modules.bungeecord`设置为`true`并将`bungeecord.ip-forwarding`设置为`true`,然后重启你的Sponge服务器。

### 为Forge配置传统转发

要配置Forge以理解从Velocity转发的数据,你需要先停止服务器,下载正确版本的[BungeeForge](https://github.com/caunt/BungeeForge/releases)并将模组放入mods文件夹,然后重启你的Forge服务器。

### 为Fabric配置传统转发

:::caution

目前没有任何活跃支持传统转发的模组。请改用Velocity现代转发。

:::
