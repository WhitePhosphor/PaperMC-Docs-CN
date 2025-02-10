---
slug: /reference/system-properties
description: Velocity可能检查的系统属性的文档。
---

# Velocity系统属性

这些系统属性可以在启动服务器时设置,允许配置各种设置。

:::danger[前方危险]

为JVM设置标志可以改变其运行方式,Velocity服务器也是如此。
如果你不确定某个标志的作用,建议你**不要使用它**。

:::

## 它们如何工作

系统属性在启动服务器时设置。例如,如果你使用`.bat`或`.sh`文件启动服务器,你可以将系统属性添加到文件中。例如:

```bash
java -Dvelocity.packet-decode-logging=true -jar velocity.jar
```

:::info

一些Velocity的系统属性在其名称中包含`.`字符。在使用PowerShell时,这些将需要用引号包裹。
即`"-Dvelocity.packet-decode-logging=true"`

:::

其中`-D`用于设置系统属性,系统属性是`velocity.packet-decode-logging`,值为`true`。
否则,只需将它们添加到启动命令中。

:::note

显示的默认值可能未为该属性设置,但如果未明确设置,Velocity将仅使用该值。

:::

## 系统属性列表

#### auth.forceSecureProfiles

- **默认值**: `true`
- **描述**: 覆盖配置中的`force-key-authentication`。如果未设置,它将自动设置为当前配置值。

#### velocity.natives-tmpdir

- **默认值**: `未设置`
- **描述**: Velocity原生文件的临时目录。(如果设置,它也将定义`io.netty.native.workdir`)

#### velocity.max-known-packs

- **默认值**: `64`
- **描述**: 将已知包限制为原版默认值以防止Velocity崩溃。

#### velocity.max-packets-per-flush

- **默认值**: `8192`
- **描述**: 队列自动刷新前的最大数据包数量。

#### velocity.log-server-backpressure

- **默认值**: `false`
- **描述**: Velocity是否应该记录服务器连接是否可写,从而玩家连接是否将自动读取。

#### velocity.packet-decode-logging

- **默认值**: `false`
- **描述**: 是否应该广泛记录数据包解码错误。

#### velocity.increased-compression-cap

- **默认值**: `false`
- **描述**: 未压缩数据包的最大大小是否应该设置为其最大支持限制(128 MiB)而不是原版限制(8 MiB)。

#### velocity.disable-native-transport

- **默认值**: `false`
- **描述**: 是否禁用Netty的原生传输方法如Epoll。如果设置为true,Velocity将使用Java的NIO传输。

#### velocity.natives-disabled

- **默认值**: `false`
- **描述**: 是否应该禁用特定操作系统的原生功能。

#### velocity.strictErrorHandling

- **默认值**: `true`
- **描述**: 客户端在数据包错误时是否应该断开连接。在MC 1.20.5中临时添加并在1.21.2中移除,以帮助模组服务器过渡到这个变化。
