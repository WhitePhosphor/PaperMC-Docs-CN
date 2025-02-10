---
slug: /why-velocity
description: 为什么要使用Velocity的解释。
---

# Velocity能为我做什么?

我们相信Velocity是最好的_Minecraft_代理之一,没有什么能超越它。然而,我们确实在一些重要方面与更成熟的主流解决方案有所不同。这可能使Velocity有点难以推广。我们经常被问到"为什么?",这个页面就是我们对这个问题的回答。

## 丰富的经验

Velocity的创始人和主要开发者(Tux)自2013年以来一直活跃在_Minecraft: Java Edition_代理软件的开发中。他们创建了RedisBungee插件,从2014年到2017年为BungeeCord做出贡献,还创立了Waterfall项目并在2016年到2017年期间领导它。事实上,Waterfall的当前维护者帮助鼓励他们从头开始创建一个全新的代理!

## 领先的性能

Velocity为几个高人气的Minecraft网络提供支持,同时使用比竞争对手更少的资源。秘诀很简单。

### 无实体ID重写

当Minecraft客户端连接到另一个Minecraft服务器时,服务器会返回一个唯一标识特定玩家连接的ID。这个ID用于服务器可能发送的针对玩家的数据包中。但是,当他们实际上连接到一个可以改变玩家所连接服务器的代理时会发生什么?

其他代理解决方案试图通过重写引用当前玩家的实体ID来解决这个问题,将其从玩家当前连接的服务器分配的实体ID更改为玩家通过代理连接到第一个服务器时获得的实体ID。这种方法通常很复杂,会导致错误,降低性能,破坏模组,而且最终不可能是一个完整的解决方案。

然而,Minecraft客户端实际上支持使用特殊的数据包序列更改其实体ID。Velocity利用这一点并强制客户端更改其实体ID。这种方法提高了性能,改善了模组兼容性,并减少了不完整实体ID重写导致的问题。

### 深入优化

Velocity的优化不仅仅是优化Minecraft协议的处理。智能处理协议产生了令人难以置信的性能提升,但要获得更多性能,我们需要深入得多。

我们大幅提高性能和吞吐量的一种方式是提高发送到客户端的数据包的压缩速度。在支持的平台(Linux x86_64和aarch64)上,Velocity能够用[libdeflate](https://github.com/ebiggers/libdeflate)替换zlib库(它实现了Minecraft协议使用的压缩算法),libdeflate的速度是zlib的两倍,同时提供类似的压缩比。

Velocity还采用了几个技巧来让JIT(即时)编译器站在我们这边。这些技巧需要深入理解Java的工作原理,但我们付出努力应用这些技巧,这转化为更高的性能。

### 内部稳定性策略

最后,Velocity不试图在次要和主要版本之间维护稳定的内部API。这允许Velocity更加灵活,并且仍然能在每个版本中提供性能改进和新功能。例如,Velocity 1.1.0通过破坏部分内部API提供了巨大的性能改进并添加了许多重要的新功能,同时仍然保持与旧插件的完全兼容性。相比之下,BungeeCord对API破坏通常非常保守,当它这样做时,几乎不提供破坏的通知,即使在进行破坏时,也不会认真改进被破坏的API(例如,向`ChatColor`添加RGB支持)。

### 控制权在你手中

我们为调整Velocity成为最高性能的代理而感到自豪,但如果开箱即用的速度不够好,你可以轻松调整`velocity.toml`中的几个与性能相关的设置。

## 改进的安全性

Velocity还具有更多的安全功能,其中一些是Velocity独有的。我们主动尽快阻止尽可能多的拒绝服务攻击,并为Minecraft 1.13+提供了一个独特的玩家信息转发系统,该系统要求服务器和代理知道预先安排的密钥。

## 标准和模组支持

与某些平台不同,这些平台只对模组社区提供口头支持(有时甚至对他们怀有敌意),Velocity拥抱Minecraft提供的平台丰富性。仅举一个小例子,我们有一个Fabric模组[帮助弥合Velocity本身和扩展Minecraft协议的模组之间的差距](https://www.curseforge.com/minecraft/mc-mods/crossstitch),并为1.7到1.12.2和1.20.2或更高版本提供完整的Forge支持。Velocity还支持社区中新兴的标准库,如Kyori的[Adventure](https://github.com/KyoriPowered/adventure)库。我们与Minecraft模组社区合作。
