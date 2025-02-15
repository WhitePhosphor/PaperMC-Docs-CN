---
slug: /aikars-flags
description: Aikar 的 JVM 参数是一组旨在提高 Paper 服务器性能的 JVM 参数。
---

# Aikar 的 JVM 参数

## 推荐的 JVM 启动参数

:::warning[脚本生成器]

**本页面仅作为说明页面。** 如果您想生成启动脚本，请访问我们的
**[脚本生成器](/misc/tools/start-script-gen)**。

:::

```bash
java -Xms10G -Xmx10G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar paper.jar --nogui
```

:::danger[在共享主机上不要分配所有可用内存！]

当设置 `Xms` 和 `Xmx` 值时，如果您的主机说您有 8GB 内存，**不要使用全部 8GB**！

Minecraft（和 Java）需要在 `Xmx` 参数之外的额外内存。建议**将您的 `Xmx` 和 `Xms` 减少约 1000-1500MB**，
以避免内存不足或被 `OOMKiller` 终止您的服务器。这也为操作系统留出了使用内存的空间。

您有 8GB 内存？为了安全起见使用 6500MB。
_但您也可以询问您的主机是否会为您覆盖这个开销并给您 9500M。有些主机会这样做！只需询问。_

:::

## 推荐内存

**我们建议至少使用 6-10GB**，无论玩家数量多少！如果您负担不起 10GB 内存，尽可能多给，
但确保也为操作系统留一些内存。G1GC 在有更多内存时运行得更好。

然而，超过某个点后，更多内存并不意味着更好的性能。最终您会达到收益递减的点。
为服务器配置 32GB RAM 只会浪费您的钱，收益很小。

## Java GC 日志记录

使用这些参数时遇到老年代问题？根据您的 Java 版本添加以下参数来启用 GC 日志记录：

**Java 8-10**

```bash
-Xloggc:gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps
-XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=1M
```

**Java 11+**

```bash
-Xlog:gc*:logs/gc.log:time,uptime:filecount=5,filesize=1M
```

GC 日志记录不会影响性能，可以一直开启。这些文件不会占用太多空间（5MB）。

## 参数的技术说明

1.  **-Xms 与 -Xmx 相同 - 原因：** 您永远不应该在 `Xmx` 可能完全耗尽系统内存的情况下运行服务器。
    您的服务器应该始终被期望使用整个 `Xmx`！然后您应该确保操作系统在该 `Xmx` 之外有额外的内存用于
    非 Minecraft/操作系统级别的事务。因此，您永远不应该使用无法支持的 `Xmx` 设置来运行 Minecraft。
    现在，这意味着**如果 `Xms` 低于 `Xmx`，您就有未使用的内存**！未使用的内存就是浪费的内存。
    G1 在给予更多内存时运行得更好。G1 会自适应地选择给每个区域多少内存以优化暂停时间。如果您有
    超过达到最佳暂停时间所需的内存，G1 会简单地将多余的内存推入老年代，这不会伤害您。改善 GC 行为的
    基本思想是确保短期对象及早死亡而不被提升。G1 拥有的内存越多，就越能确保对象不会过早地被提升到
    老年代。G1 的运行方式与以前的收集器不同，能够更有效地处理更大的堆。

    如果它不需要给予的内存，就不会使用它。整个引擎的运作方式不同，不会受到堆太大的影响，
    这在行业内普遍接受，在 G1 下保持 Xms 和 Xmx 相同！

2.  **UnlockExperimentalVMOptions：** 需要用于一些下面的选项

3.  **G1NewSizePercent：** 这些是重要的参数。您现在可以为新生代指定总体期望范围的百分比。
    使用这些设置，我们告诉 G1 不要使用其默认的 5% 新生代，而是给它 40%！**Minecraft 有极高的
    内存分配率**，在 30 个玩家的服务器上至少达到每秒 800MB！而这主要是短期对象（方块位置）。

    现在，这意味着 Minecraft **真的** 需要更多关注新生代才能支持这种分配率。如果您的新生代太小，
    您将每秒运行 1-2+ 次新生代收集，这太糟糕了。您将有如此多的暂停，TPS 有遭受影响的风险，
    服务器将无法跟上 GC 的成本。然后再加上对象现在会更快提升的事实，导致您的老年代增长更快。
    给予更多新生代，我们能够减慢年轻代收集的间隔，使短期对象有更多时间在年轻时死亡，
    总体上 GC 行为更有效率。

4.  **G1MixedGCLiveThresholdPercent：** 控制何时在年轻代 GC 收集中包含混合 GC 中的区域，
    在不进行正常老年代 GC 收集的情况下保持老年代整洁。当您的内存少于此百分比时，老年代甚至
    不会包含在"混合"收集中。混合收集不如完整的老年代收集重，所以对老年代进行小的增量清理
    可以保持内存使用轻量。

    默认值根据 Java 版本在 65 到 85 之间，我们将其设置为 90，以确保尽快回收老年代中的垃圾，
    以保留尽可能多的空闲区域。

5.  **G1ReservePercent=20：** 最新版本中 Minecraft 的内存分配率真的很疯狂。我们面临着
    可怕的"to-space 耗尽"风险，没有足够的空闲内存来移动数据。这确保有更多内存等待用于此操作。
    默认值是 10，所以我们又给了它 10。

6.  **MaxTenuringThreshold=1：** Minecraft 有非常高的内存分配率。在这些内存中，大部分在
    eden 代中被回收。然而，瞬态数据会溢出到 survivor。最初尝试完全移除 survivor 并取得了不错的
    结果，但确实导致瞬态数据进入老年代，这不好。Max Tenuring 1 确保我们不会将瞬态数据提升到
    老年代，但任何在 2 次 GC 中存活的数据都将被假定为较长寿命。

    这大大减少了年轻收集中的暂停时间，因为在 survivor 空间中复制数据最多 15 次对于实际的
    老内存来说确实需要很长时间。理想情况下，GC 引擎会跟踪对象的平均年龄，而不是更快地
    让数据进入老年代，但这不是它的工作方式。

    考虑到平均 GC 率是每次年轻收集 10 秒到几分钟，这不会导致任何"垃圾"被提升，只是延迟
    较长寿命的内存在混合 GC 中被收集。

7.  **SurvivorRatio=32：** 因为我们大幅降低了 MaxTenuringThreshold，我们将大幅减少
    survivor 空间的使用。这释放了更多区域供 eden 使用。

8.  **AlwaysPreTouch：** AlwaysPreTouch 在进程启动时设置和保留内存，确保它是连续的，
    提高其效率。这提高了操作系统的内存访问速度。使用透明大页面时必须使用。

9.  **+DisableExplicitGC：** 许多插件认为它们知道如何控制内存，并试图调用垃圾收集。
    这样做的插件会触发完整的垃圾收集，引发巨大的延迟峰值。此标志禁用插件尝试这样做，
    保护您免受其糟糕代码的影响。

10. **MaxGCPauseMillis=200：** 此设置控制在为新生代指定的最小和最大范围之间使用多少内存。
    这是您希望服务器暂停收集的时间的"目标"。200 的目标是最多损失 4 个刻。这将导致短暂的 TPS
    下降，但服务器可以立即弥补这个下降，这意味着它不会对您的 TPS 产生有意义的影响。200ms
    低于玩家可以识别的程度。在测试中，将此值限制在更低的数字会导致 G1 无法足够快地重新收集
    内存，可能耗尽老年代触发完整收集。仅仅因为这个数字是 200 并不意味着每次收集都会是 200。
    这意味着如果它真的需要，它可以使用最多 200，我们需要让它在有内存要收集时完成工作。

11. **+ParallelRefProcEnabled：** 优化 GC 过程以使用多个线程进行弱引用检查。不知道为什么
    这不是默认设置...

12. **G1RSetUpdatingPauseTimePercent=5：** 默认在暂停期间花费 10% 的时间更新 RSets，
    将其减少到 5% 以使更多操作并发，减少暂停时间。

13. **G1MixedGCCountTarget=4：** 默认是 8。因为我们的目标是收集得更慢，老年代使用更少，
    所以尝试更快地回收老年代内存以避免耗尽老年代。

14. **G1HeapRegionSize=8M+：** 默认是自动计算。对 Minecraft 特别重要，尤其是 1.15，
    因为在低内存情况下，默认计算在大多数情况下会太低。任何这个大小一半（4MB）的内存分配
    都将被视为"巨大"并直接提升到老年代，更难释放。如果您允许 Java 使用默认值，您的大量
    内存将被视为巨大对象而被摧毁。

15. **+PerfDisableSharedMem：** 导致 GC 写入文件系统，如果磁盘 IO 很高可能导致主要延迟 -
    参见 https://www.evanjones.ca/jvm-mmap-pause.html

### 透明大页面

这是一个有争议的功能，但如果您无法为真正的 HugeTLBFS 配置主机，可能可以使用。尝试添加
`-XX:+UseTransparentHugePages`，但极其重要的是您也设置了 `AlwaysPreTouch`。否则，THP 可能
会伤害您。我们还没有测量 THP 如何为 Minecraft 工作或其与 `AlwaysPreTouch` 的影响，所以这部分
是为想要实验的高级用户准备的。
