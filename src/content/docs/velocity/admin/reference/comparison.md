---
title: 比较其他代理
description: Velocity 与其他代理的比较
slug: velocity/comparisons-to-other-proxies
---

想必你已经了解了 Velocity 能为你做些什么。
但它与其他解决方案相比如何呢？毕竟，我们是在试图说服你使用Velocity，所以这份文档可能会有些偏向于我们。

## 概述

:::danger

**Paper 团队强烈推荐使用 Velocity 而不是 Waterfall 和 BungeeCord**。
Waterfall 已经结束生命周期。
PaperMC 的所有未来开发工作都在 Velocity 上进行。
更多信息请参阅[公告](https://forums.papermc.io/threads/1088/)。

:::

这是一个关于Velocity与其他流行的代理软件之间差异的快速概述。更多详细信息请参阅下方内容。

| 功能                  | BungeeCord | Waterfall | Velocity |
| ------------------- | ---------- | --------- | -------- |
| 资源高效                | ❌          | ✅         | ✅✅       |
| Velocity插件          | ❌          | ❌         | ✅        |
| BungeeCord插件        | ✅          | ✅         | 🟨\*     |
| 安全的玩家信息转发           | ❌          | ❌         | ✅        |
| 支持现代Minecraft特性的API | ❌          | ❌         | ✅        |
| 持续开发                | ❓          | ❌         | ✅        |
| 改进的模组支持             | ❌          | ❌         | ✅\*\*    |

\* _Velocity API 不支持为 BungeeCord/Waterfall 制作的插件，但可以安装 [Snap](https://hangar.papermc.io/Phoenix616/Snap) 以提供实验性支持。
Snap 并非由 Velocity 项目维护，也与 Velocity 项目无关。_

\** _Full Forge support for 1.7 through 1.12.2 and 1.20.2 or higher._

## BungeeCord and derivatives

We can't discuss the full history of Minecraft proxy software deeply – we recommend
[Me4502's excellent article](https://madelinemiller.dev/blog/decade-of-minecraft-multiplayer/) that
covers the multiplayer Minecraft world in great detail.

### BungeeCord

The original author of Velocity, at the time of starting the project, had over 5 years of experience
using BungeeCord, and knew its various quirks inside and out.

There are several reasons why improving BungeeCord was a fool's game:

- BungeeCord is very conservative with regard to API changes. If it breaks some plugin developed 5
  years ago from an inactive developer, you can forget about it.
- The changes that _do_ change the API are often quite particular and niche use cases and changing
  the API in substantial ways is frowned upon (witness the support for RGB colors in `ChatColor`).
- The project is essentially run like a cathedral. In BungeeCord (and its sister project, Spigot),
  the word of md_5 is king. Contributing a simple security fix to BungeeCord earned the primary
  developer of Velocity at least two beratings from md_5.
- BungeeCord is actively hostile to continued support for Minecraft modding.
- We have seen new modding APIs for _Minecraft_ since the first version of BungeeCord released
  in 2012. It's time for a new and improved API that does not make the mistakes the BungeeCord API
  makes, and to draw influence from the new modding APIs that Minecraft now boasts.

### Waterfall

Partly due to experience obtained by the author's own experience with BungeeCord, he founded the
Waterfall project in 2016 as a fork of BungeeCord, modeled after Paper, with the explicit aim of
improving BungeeCord. _We tried the obvious next step_.

Meet [Hyrum's Law](https://www.hyrumslaw.com/):

> With a sufficient number of users of an API, it does not matter what you promise in the contract:
> all observable behaviors of your system will be depended on by somebody.

Here's Hyrum's law in comic format, in case that eases getting the point across:

> <span class="img-inline">[![xkcd #1172](https://imgs.xkcd.com/comics/workflow.png)](https://xkcd.com/1172/)</span>
>
> ["Workflow"](https://xkcd.com/1172/) from [xkcd](https://xkcd.com/) by Randal Munroe,
> [licensed](https://xkcd.com/license.html) under
> [CC BY-NC 2.5](https://creativecommons.org/licenses/by-nc/2.5/)

Most BungeeCord plugins are deeply dependent on the specific behaviors and quirks BungeeCord
exposes, which Velocity cannot perfectly emulate. As a result, the number of changes one can make
to BungeeCord and have plugins retain the same behavior is minimal.

Suppose you have played a video game published by Company A. It runs on an operating system made by Company B.
One day, Company B releases a new version of their operating system, and you upgrade to it, only to recoil
in horror as that video game no longer works. (Worse, Studio A might be out of business at that point, so
no patch is forthcoming.) Who do you blame, Company A for producing a defective product, or Company B for
breaking the game? [This isn't a hypothetical](https://devblogs.microsoft.com/oldnewthing/20110131-00/?p=11633).

We can point to one example where
[an attempt](https://github.com/PaperMC/Waterfall/commit/c8eb6aec7bac82fd309fa6d6113b8a0418317b01)
to improve scoreboard handling on 1.13 and above
[was reversed](https://github.com/PaperMC/Waterfall/issues/255) thanks to plugins expecting
BungeeCord's broken behavior. At this point, it is fairly obvious why making a clean break was
better. Given that this happened near the start of the Velocity project's lifetime, it was probably
a quite powerful motivator, although it certainly wasn't the only motivator.

### Hypothetical BungeeCord API-based Velocity

We are compelled to mention this briefly as this was a topic brought up in the early days of the
project. We could have based Velocity on the BungeeCord API (or a derivative thereof, such as the
Waterfall API) instead.

This has the same problems as Waterfall, perhaps more as we would need to emulate _all_ the behavior
of the BungeeCord API independently. The Wine project has been trying for over 3 decades to provide
a shim layer that allows Windows programs to run on Linux and other operating systems. Their efforts
remain ongoing to this day. It is hard to emulate the behavior of another operating system's environment.
The authors of ReactOS have it even worse, trying to emulate all the quirks of Windows, including its
kernel, and they have set their baseline to a version of Windows that was released 2 decades ago. Their
work is even further from completed than Wine's is.

We would have to spend a lot of time pretending that Velocity looked and quacked just like BungeeCord.
We intentionally rejected this approach. It's not worth doing.
