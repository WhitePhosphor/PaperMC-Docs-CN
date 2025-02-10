---
slug: /aikars-flags
title: Aikar's Flags
description: 推荐的 JVM 启动参数 (Aikar's Flags) 及其说明。
---

# Aikar's Flags (推荐的 JVM 启动参数)

Aikar's Flags 是一组由 Aikar (PaperMC 核心开发者) 推荐的 JVM 启动参数，旨在优化 Minecraft 服务器的性能和稳定性。这些参数主要针对 Garbage Collection (垃圾回收) 和内存管理进行调优，可以显著提升服务器的 TPS (每秒 Tick 数) 和降低延迟。

**推荐的 JVM 启动参数:**

```bash
-Xms<启动内存> -Xmx<最大内存> -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true
```

**参数说明:**

*   `-Xms<启动内存>`:  设置 JVM 初始堆内存大小。建议设置为与 `-Xmx` (最大内存) 相同的值，以避免 JVM 动态调整内存大小带来的性能开销。例如 `-Xms8G` 表示设置初始堆内存为 8GB。
*   `-Xmx<最大内存>`: 设置 JVM 最大堆内存大小。根据服务器的玩家数量、插件数量和世界大小等因素，合理设置最大内存。通常建议为服务器物理内存的 50%-75%。例如 `-Xmx8G` 表示设置最大堆内存为 8GB。
*   `-XX:+UseG1GC`: 启用 Garbage-First Garbage Collector (G1 GC) 垃圾回收器。G1 GC 是目前最先进的垃圾回收器之一，专为大内存应用设计，可以有效地降低垃圾回收的停顿时间，提高服务器的响应速度和 TPS。
*   `-XX:+ParallelRefProcEnabled`: 启用并行引用处理。可以提高 G1 GC 的垃圾回收效率。
*   `-XX:MaxGCPauseMillis=200`: 设置 G1 GC 的最大垃圾回收停顿时间目标为 200 毫秒。G1 GC 会尽量控制垃圾回收的停顿时间不超过此值，以减少服务器卡顿。
*   `-XX:+UnlockExperimentalVMOptions`: 解锁实验性 JVM 参数。启用后可以使用一些实验性的 JVM 参数，例如 `-XX:+DisableExplicitGC` 和 `-XX:+AlwaysPreTouch`。
*   `-XX:+DisableExplicitGC`: 禁用 System.gc() 显式垃圾回收调用。Minecraft 服务器代码和部分插件会显式调用 `System.gc()` 触发 Full GC (完全垃圾回收)，但这通常会导致服务器卡顿。禁用显式垃圾回收可以避免不必要的 Full GC，提高服务器性能。
*   `-XX:+AlwaysPreTouch`:  在 JVM 启动时预先访问所有堆内存页。可以提高服务器启动速度和运行稳定性。
*   `-XX:G1HeapWastePercent=5`: 设置 G1 GC 堆浪费百分比为 5%。当堆内存浪费达到 5% 时，G1 GC 将启动混合垃圾回收周期。
*   `-XX:G1MixedGCCountTarget=4`: 设置 G1 GC 混合垃圾回收周期的目标次数为 4 次。
*   `-XX:G1MixedGCLiveThresholdPercent=90`: 设置 G1 GC 混合垃圾回收周期的存活对象阈值为 90%。当 Region 中的存活对象比例超过 90% 时，该 Region 将被认为是存活对象较多的 Region。
*   `-XX:G1RSetUpdatingPauseTimePercent=5`: 设置 G1 GC RSet (Remembered Set) 更新停顿时间百分比为 5%。RSet 是 G1 GC 用于跟踪对象引用关系的数据结构。
*   `-XX:SurvivorRatio=32`: 设置 Eden 区和 Survivor 区的比例。SurvivorRatio=32 表示 Eden 区的大小是每个 Survivor 区大小的 32 倍。
*   `-XX:+PerfDisableSharedMem`: 禁用 JVM 性能监控子系统的共享内存。在某些 Linux 系统上，共享内存可能导致性能问题。
*   `-XX:MaxTenuringThreshold=1`: 设置对象晋升到老年代的最大年龄阈值为 1。年轻代 Minor GC 回收后，存活的对象年龄加 1。当对象年龄达到此阈值时，将被晋升到老年代。设置为 1 可以使对象更快地晋升到老年代，减少年轻代 Minor GC 的压力。
*   `-Dusing.aikars.flags=https://mcflags.emc.gs`:  用于标识服务器使用了 Aikar's Flags，方便 Aikar 统计和分析。
*   `-Daikars.new.flags=true`:  用于启用 Aikar's Flags 的最新优化参数。

**如何使用 Aikar's Flags:**

将以上 JVM 启动参数添加到您的服务器启动脚本或命令中。例如，如果您使用 `java -jar paper.jar` 启动服务器，可以将启动命令修改为：

```bash
java -Xms8G -Xmx8G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar paper.jar --nogui
```

**注意事项:**

*   **根据服务器内存调整 `-Xms` 和 `-Xmx` 参数。**  请根据您的服务器实际内存大小和服务器负载情况，合理设置 `-Xms` 和 `-Xmx` 参数。通常建议 `-Xmx` 设置为服务器物理内存的 50%-75%。如果服务器内存较小 (例如低于 4GB)，可以适当减小内存设置。
*   **Aikar's Flags 并非万能的。**  Aikar's Flags 可以优化 JVM 的垃圾回收和内存管理，但并不能解决所有服务器性能问题。服务器性能瓶颈可能由多种因素引起，例如插件性能、世界大小、玩家数量、网络延迟等。您还需要综合考虑其他优化措施，例如优化插件配置、精简插件列表、优化世界预生成、限制玩家视野距离等。
*   **持续监控服务器性能。**  使用 timings 报告等工具持续监控服务器性能，根据实际情况调整 JVM 参数和服务器配置。

**更多信息:**

*   [Aikar's Flags 官方 Gist](https://gist.github.com/aikar-hippo/87798844c12e2916561c)
*   [PaperMC 官方论坛关于 Aikar's Flags 的讨论](https://forums.papermc.io/threads/aikars-flags-no-bullshit-flags.309/)

---

**希望 Aikar's Flags 能帮助您提升 Paper 服务器的性能和稳定性。祝您游戏愉快！**

```bash
java -Xms10G -Xmx10G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar paper.jar --nogui
```

:::danger[Do not allocate all of your available memory on a shared host!]

When setting the `Xms` and `Xmx` values, if your host says you have 8GB of memory, **do not use 8GB**!

Minecraft (and Java) needs additional memory on top of that `Xmx` parameter. It is recommended to
**reduce your `Xmx` and `Xms` by about 1000-1500MB** to avoid running out of memory or `OOMKiller` killing
your server. This also leaves room for the operating system to use memory too.

Do you have 8GB of memory? Use 6500MB for safety.
_But you may also ask your host if they will cover this overhead for you and
give you 9500M instead. Some hosts will! Just ask._

:::

## Recommended memory

**We recommend using at least 6-10GB**, no matter how few players! If you can't afford 10GB of
memory, give as much as you can, but ensure you leave the operating system some memory too. G1GC
operates better with more memory.

However, more memory does not mean better performance above a certain point. Eventually you will hit
a point of diminishing returns. Going out and getting 32GB of RAM for a server will only waste your
money with minimal returns.

## Java GC logging

Are you having old gen issues with these flags? Add the following flags based on your Java version
to enable GC logging:

**Java 8-10**

```bash
-Xloggc:gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps
-XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=1M
```

**Java 11+**

```bash
-Xlog:gc*:logs/gc.log:time,uptime:filecount=5,filesize=1M
```

GC logging does not hurt your performance and can be left on at all times. The files will not take
up much space (5MB)

## Technical explanation of the flags

1.  **-Xms matching -Xmx - why:** You should never run your server with the case that `Xmx` can run
    the system completely out of memory. Your server should always be expected to use the entire
    `Xmx`! You should then ensure the OS has extra memory on top of that `Xmx` for non-Minecraft/OS level
    things. Therefore, you should never run Minecraft with `Xmx` settings you can't support if Java uses it
    all. Now, that means **if `Xms` is lower than `Xmx` you have unused memory**! Unused memory is
    wasted memory. G1 operates better with the more memory it's given. G1 adaptively chooses how
    much memory to give to each region to optimize pause time. If you have more memory than it needs
    to reach an optimal pause time, G1 will simply push that extra into the old generation, and it
    will not hurt you. The fundamental idea of improving GC behavior is to ensure short-lived objects
    die young and never get promoted. With the more memory G1 has, the better assurance you will get
    that objects are not getting prematurely promoted to the old generation. G1 operates differently
    than previous collectors and is able to handle larger heaps more efficiently.

    If it does not need the memory given to it, it will not use it. The entire engine operates
    differently and does not suffer from too large of heaps, and this is industry-wide accepted
    information that under G1 to keep Xms and Xmx the same!

2.  **UnlockExperimentalVMOptions:** needed for some the below options

3.  **G1NewSizePercent:** These are the important ones. You now can specify percentages of an
    overall desired range for the new generation. With these settings, we tell G1 to not use its
    default 5% for new gen, and instead give it 40%! **Minecraft has an extremely high memory
    allocation rate**, ranging to at least 800MB/second on a 30 player server! And this is
    mostly short-lived objects (Block Position).

    Now, this means Minecraft **really** needs more focus on new gen to be able to even support this
    allocation rate. If your new gen is too small, you will be running new gen collections 1-2+
    times per second, which is awful. You will have so many pauses that TPS has risk of suffering,
    and the server will not be able to keep up with the cost of GCs. Then combine the fact that
    objects will now promote faster, resulting in your old gen growing faster. Given more new gen,
    we are able to slow down the intervals of young gen collections, resulting in more time for
    short-lived objects to die young and overall more efficient GC behavior.

4.  **G1MixedGCLiveThresholdPercent:** Controls when to include regions in mixed GCs in the young
    GC collection, keeping old gen tidy without doing a normal old gen GC collection. When your
    memory is less than this percent, old gen won't even be included in 'mixed' collections. Mixed
    are not as heavy as a full old collection, so having small incremental cleanups of old keeps
    memory usage light.

    Default is 65 to 85 depending on the Java version, we are setting that to 90 to ensure we reclaim garbage
    in old gen as fast as possible to retain as much free regions as we can.

5.  **G1ReservePercent=20:** Minecraft memory allocation rate in up-to-date versions is really insane. We
    run the risk of a dreaded "to-space exhaustion" not having enough memory free to move data
    around. This ensures more memory is waiting to be used for this operation. Default is 10, so we
    are giving another 10 to it.

6.  **MaxTenuringThreshold=1:** Minecraft has a really high allocation rate of memory. Of that
    memory, most is reclaimed in the eden generation. However, transient data will overflow into
    survivor. Initially played with completely removing survivor and had decent results, but does
    result in transient data making its way to old which is not good. Max Tenuring 1 ensures that we
    do not promote transient data to old generation, but anything that survives 2 passes of GC is
    just going to be assumed as longer-lived.

    Doing this greatly reduces pause times in young collections as copying data up to 15 times in
    survivor space for a tenured object really takes a lot of time for actually old memory. Ideally
    the GC engine would track average age for objects instead and tenure out data faster, but that
    is not how it works.

    Considering average GC rate is 10s to the upwards of minutes per young collection, this does not
    result in any 'garbage' being promoted, and just delays longer lived memory to be collected in
    mixed GCs.

7.  **SurvivorRatio=32:** Because we drastically reduced MaxTenuringThreshold, we will be reducing
    use of survivor space drastically. This frees up more regions to be used by eden instead.

8.  **AlwaysPreTouch:** AlwaysPreTouch gets the memory setup and reserved at process start ensuring
    it is contiguous, improving the efficiency of it more. This improves the operating systems
    memory access speed. Mandatory to use Transparent Huge Pages

9.  **+DisableExplicitGC:** Many plugins think they know how to control memory, and try to invoke
    garbage collection. Plugins that do this trigger a full garbage collection, triggering a massive
    lag spike. This flag disables plugins from trying to do this, protecting you from their bad
    code.

10. **MaxGCPauseMillis=200:** This setting controls how much memory is used in between the minimum
    and maximum ranges specified for your new generation. This is a "goal" for how long you want
    your server to pause for collections. 200 is aiming for at most loss of 4 ticks. This will
    result in a short TPS drop, however the server can make up for this drop instantly, meaning it
    will have no meaningful impact on your TPS. 200ms is lower than players can recognize. In
    testing, having this value constrained to an even lower number results in G1 not recollecting
    memory fast enough and potentially running out of old gen triggering a full collection. Just
    because this number is 200 does not mean every collection will be 200. It means it can use up to
    200 if it really needs it, and we need to let it do its job when there is memory to collect.

11. **+ParallelRefProcEnabled:** Optimizes the GC process to use multiple threads for weak reference
    checking. Not sure why this isn't default...

12. **G1RSetUpdatingPauseTimePercent=5:** Default is 10% of time spent during pause updating RSets,
    reduce this to 5% to make more of it concurrent to reduce pause durations.

13. **G1MixedGCCountTarget=4:** Default is 8. Because we are aiming to collect slower, with less old
    gen usage, try to reclaim old gen memory faster to avoid running out of old.

14. **G1HeapRegionSize=8M+:** Default is auto calculated. Super important for Minecraft, especially
    1.15, as with low memory situations, the default calculation will in most times be too low. Any
    memory allocation half of this size (4MB) will be treated as "Humongous" and promote straight to
    old generation and is harder to free. If you allow Java to use the default, you will be
    destroyed with a significant chunk of your memory getting treated as Humongous.

15. **+PerfDisableSharedMem:** Causes GC to write to file system which can cause major latency if
    disk IO is high - see https://www.evanjones.ca/jvm-mmap-pause.html

### Transparent huge pages

Controversial feature but may be usable if you can not configure your host for real HugeTLBFS. Try
adding `-XX:+UseTransparentHugePages` but it's extremely important you also have `AlwaysPreTouch` set.
Otherwise, THP will likely hurt you. We have not measured how THP works for Minecraft or its impact with
`AlwaysPreTouch`, so this section is for the advanced users who want to experiment.
