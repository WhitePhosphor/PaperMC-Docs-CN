---
slug: /profiling
description: 如何对您的 Paper 服务器进行性能分析。
---

# 性能分析

性能分析是一种诊断服务器性能问题的方法。
性能分析器测量运行中服务器的某些特征，例如方法被调用的频率
以及在单个刻中占用了多少时间，垃圾收集器运行的时间和频率等等。

:::warning

_要使性能分析有效，您正在诊断的问题必须正在主动发生。_

:::

如果您需要帮助分析性能问题，请带着 spark 报告来到
[PaperMC Discord 服务器](https://discord.gg/PaperMC)（#paper-help）寻求帮助。

## spark

从 1.21 开始，Paper 捆绑了 [spark](https://spark.lucko.me/) 性能分析器，这是
对 Paper 进行性能分析的首选方式。

要开始对服务器进行性能分析，运行此命令：
```
/spark profiler start --timeout 600
```

10 分钟后，这将返回一个性能分析报告的 URL，您可以自己分析或提供给
插件开发者或 Paper 支持聊天室。

这只是 spark 功能的一小部分，所以如果您想了解 spark 的不同功能
或学习如何自己分析报告，请查看 spark 的[文档](https://spark.lucko.me/docs/)。

:::tip

如果您想使用比捆绑版本更新的 spark 版本，只需将独立的 spark 插件 JAR
放入 `plugins` 目录，并将 [`paper.preferSparkPlugin`](../reference/system-properties.md#paperprefersparkplugin)
系统属性设置为 `true`。

如果您想使用捆绑的 spark 版本的 PlaceholderAPI [占位符](https://spark.lucko.me/docs/misc/Placeholders)，
您需要从 PAPI 的 eCloud 安装 [spark 扩展](https://api.extendedclip.com/expansions/spark/)
（`/papi ecloud download spark` 和 `/papi reload`）。

:::

## Timings

Paper 也捆绑了 [Timings v2](https://timings.aikar.co/) 性能分析器，但是 Timings 已经多年
没有维护，并且其报告对初学者来说难以阅读。它已被弃用，取而代之的是 spark，并在 1.21 中
默认关闭，有关更多信息，请参阅[此讨论](https://github.com/PaperMC/Paper/discussions/10565)。
