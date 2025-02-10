---
slug: /profiling
title: Profiling
description: 如何使用 Profiler 分析 Paper 服务器的性能瓶颈。
---

# 服务器性能分析 (Profiling)

服务器性能分析 (Profiling) 是一种高级的性能诊断技术，可以帮助您深入了解 Paper 服务器的内部运行情况，找出服务器性能瓶颈所在。通过 Profiling，您可以分析服务器 CPU 使用率、内存分配、线程活动等详细信息，从而更精确地定位性能问题，并进行针对性优化。

## 什么是 Profiler

Profiler (性能分析器) 是一种用于测量和分析程序性能的工具。它可以收集程序运行时的各种性能数据，例如 CPU 使用率、内存分配、方法调用次数、线程状态等，并将这些数据以报告或图表的形式呈现出来，帮助开发者了解程序的性能瓶颈。

## Paper 支持的 Profiler

Paper 服务器可以使用多种 Java Profiler 工具进行性能分析，常用的 Profiler 工具包括：

*   **YourKit Java Profiler**:  一款功能强大的商业 Java Profiler，提供全面的性能分析功能，包括 CPU Profiling, Memory Profiling, Thread Profiling 等。YourKit 提供了友好的图形界面和详细的性能报告，易于使用和分析。YourKit 是 PaperMC 官方推荐的 Profiler 工具。
*   **JProfiler**:  另一款流行的商业 Java Profiler，功能与 YourKit 类似，也提供了全面的性能分析功能和图形界面。
*   **VisualVM**:  一款免费的开源 Java Profiler，由 Oracle 官方提供。VisualVM 功能相对 YourKit 和 JProfiler 较弱，但对于基本的性能分析任务也足够使用。VisualVM 优点是免费且易于获取，JDK 自带。
*   **Async Profiler**:  一款基于 Linux perf_events 的开源 Java Profiler，专注于低开销的 CPU Profiling。Async Profiler 的性能开销非常低，对服务器性能影响很小，适合在线环境的性能分析。

您可以根据自己的需求和预算选择合适的 Profiler 工具。对于 Paper 服务器的性能分析，推荐使用 YourKit Java Profiler 或 Async Profiler。

## 使用 YourKit Java Profiler 进行 Profiling

YourKit Java Profiler 是一款商业 Profiler，但提供了 30 天免费试用版。您可以从 [YourKit 官网](https://www.yourkit.com/java/profiler/) 下载试用版。

**YourKit Profiling 步骤:**

1.  **下载和安装 YourKit Java Profiler。**
2.  **启动 Paper 服务器，并添加 YourKit Agent 启动参数。**  在 Paper 服务器启动脚本或命令中，添加以下 JVM 参数：

    ```bash
    -agentpath:<YourKit 安装目录>/bin/linux-x86-64/libyjpagent.so=delay=10000,sessionname=PaperServer
    ```

    请将 `<YourKit 安装目录>` 替换为您的 YourKit 安装目录，并根据您的操作系统选择正确的 Agent 库文件 (例如 `libyjpagent.so` for Linux, `yjpagent.dll` for Windows, `libyjpagent.jnilib` for macOS)。`delay=10000` 参数表示延迟 10 秒后开始 Profiling，`sessionname=PaperServer` 参数表示设置 Profiling 会话名称为 PaperServer。

    **示例启动命令 (Linux):**

    ```bash
    java -Xms8G -Xmx8G -agentpath:/opt/yourkit/bin/linux-x86-64/libyjpagent.so=delay=10000,sessionname=PaperServer -jar paper.jar --nogui
    ```

3.  **连接 YourKit Profiler 到 Paper 服务器。**  启动 YourKit Profiler 客户端，选择 "Attach to Local Application"，在列表中找到 "PaperServer" (或您设置的会话名称)，点击 "Attach"。
4.  **开始 Profiling。**  在 YourKit Profiler 客户端中，选择需要分析的性能指标 (例如 CPU, Memory, Threads)，点击 "Start CPU/Memory/Thread Profiling" 按钮开始 Profiling。
5.  **模拟服务器负载。**  在 Profiling 期间，尽量模拟服务器的真实负载情况，例如让玩家进入服务器进行游戏，或运行压力测试工具。
6.  **停止 Profiling 并生成报告。**  在 Profiling 足够时间后 (例如 5-10 分钟)，点击 "Stop CPU/Memory/Thread Profiling" 按钮停止 Profiling。YourKit Profiler 会自动生成性能报告，并显示在客户端界面中。
7.  **分析性能报告。**  使用 YourKit Profiler 客户端提供的各种图表和表格，分析性能报告，找出服务器性能瓶颈。重点关注 CPU 热点方法、内存分配热点、线程阻塞等信息。

**YourKit Profiler 常用功能:**

*   **CPU Profiling**:  分析 CPU 使用率，找出 CPU 消耗最高的方法和代码路径。
*   **Memory Profiling**:  分析内存分配情况，找出内存泄漏和内存溢出问题。
*   **Thread Profiling**:  分析线程活动情况，找出线程死锁和线程阻塞问题。
*   **Allocation Tracking**:  跟踪对象分配，找出对象分配热点和内存泄漏来源。
*   **Garbage Collection Analysis**:  分析垃圾回收情况，优化 GC 参数。

## 使用 Async Profiler 进行 CPU Profiling

Async Profiler 是一款免费的开源 CPU Profiler，性能开销极低，适合在线环境的 CPU 性能分析。您可以从 [Async Profiler GitHub 仓库](https://github.com/jvm-profiling-tools/async-profiler) 下载。

**Async Profiler Profiling 步骤:**

1.  **下载 Async Profiler。**  从 [Async Profiler GitHub Releases 页面](https://github.com/jvm-profiling-tools/async-profiler/releases) 下载最新版本的 Async Profiler 压缩包。
2.  **解压 Async Profiler 压缩包。**  将下载的压缩包解压到服务器的某个目录。
3.  **启动 Paper 服务器，并添加 Async Profiler Agent 启动参数。**  在 Paper 服务器启动脚本或命令中，添加以下 JVM 参数：

    ```bash
    -agentpath:<Async Profiler 解压目录>/build/libasyncProfiler.so=start,file=profile.html,jfr,interval=1ms,wall,threads
    ```

    请将 `<Async Profiler 解压目录>` 替换为您的 Async Profiler 解压目录。`start` 参数表示启动时开始 Profiling，`file=profile.html` 参数表示将 Profiling 结果保存到 `profile.html` 文件中，`jfr` 参数表示使用 Java Flight Recorder 格式保存结果，`interval=1ms` 参数表示采样间隔为 1 毫秒，`wall` 参数表示使用 Wall-clock 时间采样，`threads` 参数表示记录线程信息。

    **示例启动命令 (Linux):**

    ```bash
    java -Xms8G -Xmx8G -agentpath:/opt/async-profiler/build/libasyncProfiler.so=start,file=profile.html,jfr,interval=1ms,wall,threads -jar paper.jar --nogui
    ```

4.  **模拟服务器负载。**  在 Profiling 期间，尽量模拟服务器的真实负载情况。
5.  **停止 Profiling。**  在服务器控制台或终端中，执行命令 `/async-profiler stop` 停止 Profiling。Async Profiler 会将 Profiling 结果保存到 `profile.html` 文件中。
6.  **分析 Profiling 结果。**  使用浏览器打开 `profile.html` 文件，查看 CPU 火焰图 (Flame Graph) 和其他性能分析图表，找出 CPU 消耗最高的方法和代码路径。

**Async Profiler 常用参数:**

*   `start`/`stop`:  控制 Profiling 的开始和停止。
*   `file=<文件名>`:  指定 Profiling 结果保存的文件名。
*   `jfr`/`collapsed`:  指定 Profiling 结果的输出格式，`jfr` 为 Java Flight Recorder 格式，`collapsed` 为 collapsed stacks 格式。
*   `interval=<时间>`:  设置采样间隔，例如 `1ms`, `100us`。
*   `cpu`/`wall`/`itimer`:  设置采样模式，`cpu` 为 CPU 时间采样，`wall` 为 Wall-clock 时间采样，`itimer` 为 ITIMER 采样。
*   `threads`/`traces`/`total`:  设置记录的信息类型，`threads` 记录线程信息，`traces` 记录方法调用栈，`total` 记录总计信息。
*   `event=<事件类型>`:  指定要 Profiling 的事件类型，例如 `cpu`, `alloc`, `lock`, `cache-misses` 等。

## 选择合适的 Profiler 工具

选择哪种 Profiler 工具取决于您的性能分析需求和经验水平。

*   **如果您需要进行全面的性能分析，包括 CPU, 内存, 线程等多个方面，并且希望使用图形界面和详细报告，建议使用 YourKit Java Profiler 或 JProfiler。**  这两款商业 Profiler 功能强大，易于使用，但需要付费。
*   **如果您只需要进行 CPU 性能分析，并且希望使用低开销的 Profiler，或者您是技术专家，喜欢使用命令行工具，建议使用 Async Profiler。**  Async Profiler 免费开源，性能开销极低，但需要一定的命令行操作和性能分析经验。
*   **如果您只是想进行简单的性能分析，并且希望使用免费的 Profiler，可以尝试使用 VisualVM。**  VisualVM 功能相对较弱，但对于基本的性能分析任务也足够使用。

您可以根据自己的实际情况选择合适的 Profiler 工具。对于 Paper 服务器的性能分析，YourKit Java Profiler 和 Async Profiler 都是不错的选择。

## 注意事项

*   **Profiler 会增加服务器的性能开销。**  在生产环境中进行 Profiling 时，请尽量选择低开销的 Profiler 工具 (例如 Async Profiler)，并控制 Profiling 时间，避免对服务器性能造成过大影响。
*   **Profiling 结果分析需要一定的经验和知识。**  性能报告中包含了大量的性能数据，需要您具备一定的 Java 性能分析知识才能正确理解和分析。如果您不熟悉性能分析，可以参考相关的性能分析教程和文档，或寻求专业人士的帮助。
*   **不要在生产环境中长时间运行 Profiler。**  长时间运行 Profiler 会持续增加服务器的性能开销，并可能导致性能数据失真。建议在测试环境或预发布环境中进行 Profiling，并在问题定位后及时停止 Profiling。
*   **结合 timings 报告和 Profiling 工具进行性能分析。**  timings 报告可以帮助您快速了解服务器的整体性能概况，找出潜在的性能瓶颈。Profiler 工具可以帮助您深入分析性能瓶颈的细节，定位到具体的代码和方法。结合使用 timings 报告和 Profiler 工具，可以更有效地进行 Paper 服务器的性能优化。

如果您在使用 Profiler 工具过程中遇到任何问题，请随时在 [PaperMC Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求帮助。
