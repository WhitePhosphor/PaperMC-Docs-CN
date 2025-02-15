---
slug: /comparisons-to-other-proxies
description: Velocity与其他代理的比较。
---

# 与其他代理的比较

你可能已经了解了Velocity能为你做什么。但它与其他现有的解决方案相比如何呢?毕竟,我们是在试图说服你使用Velocity,所以这份文档可能会有些偏向于我们。

## 概述

:::danger

**Paper团队强烈建议使用Velocity而不是Waterfall和BungeeCord**。Waterfall已经到达生命周期终点。PaperMC的所有未来开发都在Velocity上进行。更多信息,请参见[公告](https://forums.papermc.io/threads/1088/)。

:::

这是Velocity与其他流行代理软件之间差异的快速概述。详细信息请参见下文。
| 功能                                  | BungeeCord | Waterfall | Velocity |
|------------------------------------------|------------|-----------|----------|
| 资源高效                                 | ❌         | ✅        | ✅✅     |
| Velocity插件                             | ❌         | ❌        | ✅       |
| BungeeCord插件                           | ✅         | ✅        | 🟨*      |
| 安全的玩家信息转发                       | ❌         | ❌        | ✅       |
| 支持现代Minecraft功能的API               | ❌         | ❌        | ✅       |
| 积极开发                                 | ❓         | ❌        | ✅       |
| 改进的模组支持                           | ❌         | ❌        | ✅*\*    |

\* _Velocity API不支持为BungeeCord/Waterfall制作的插件,但可以安装[Snap](https://hangar.papermc.io/Phoenix616/Snap)来获得实验性支持。
Snap不由Velocity项目维护或关联。_

\** _完整支持1.7到1.12.2和1.20.2或更高版本的Forge。_

## BungeeCord及其衍生品

我们不能深入讨论Minecraft代理软件的完整历史 - 我们推荐[Me4502的精彩文章](https://madelinemiller.dev/blog/decade-of-minecraft-multiplayer/),它详细介绍了Minecraft多人游戏世界。

### BungeeCord

Velocity的原作者在开始这个项目时,已经有超过5年使用BungeeCord的经验,并且深入了解其各种特性。

有几个原因说明为什么改进BungeeCord是一个愚蠢的游戏:

- BungeeCord对API更改非常保守。如果它破坏了5年前某个不活跃开发者开发的插件,你就可以忘记它了。
- 确实改变API的更改通常都是相当特殊和小众的用例,而且大幅度改变API是不受欢迎的(见对`ChatColor`中RGB颜色支持的态度)。
- 该项目基本上像大教堂一样运作。在BungeeCord(及其姐妹项目Spigot)中,md_5的话就是王道。为BungeeCord贡献一个简单的安全修复为Velocity的主要开发者至少赢得了md_5的两次斥责。
- BungeeCord对继续支持Minecraft模组持敌对态度。
- 自2012年第一个版本的BungeeCord发布以来,我们已经看到了_Minecraft_的新模组API。是时候有一个新的和改进的API,它不会犯BungeeCord API所犯的错误,并从Minecraft现在拥有的新模组API中汲取灵感。

### Waterfall

部分由于作者自己使用BungeeCord获得的经验,他在2016年创立了Waterfall项目,作为BungeeCord的一个分支,仿照Paper的模式,明确目标是改进BungeeCord。_我们尝试了显而易见的下一步_。

遇到了[海勒姆定律](https://www.hyrumslaw.com/):

> 当一个API有足够多的用户时,你在合约中承诺什么并不重要:你的系统的所有可观察行为都会被某人依赖。

这里是海勒姆定律的漫画格式,以防这样更容易理解:

> [![xkcd #1172](https://imgs.xkcd.com/comics/workflow.png)](https://xkcd.com/1172/)  
> ["工作流程"](https://xkcd.com/1172/)来自[xkcd](https://xkcd.com/)作者Randal Munroe,
> [许可](https://xkcd.com/license.html)根据
> [CC BY-NC 2.5](https://creativecommons.org/licenses/by-nc/2.5/)

大多数BungeeCord插件深深依赖于BungeeCord暴露的特定行为和怪癖,这些Velocity无法完美模拟。因此,一个人可以对BungeeCord做出的更改并保持插件保持相同行为的数量是最小的。

假设你玩过公司A发布的一个视频游戏。它运行在公司B制作的操作系统上。有一天,公司B发布了他们操作系统的新版本,你升级到了它,结果却惊恐地发现那个游戏不再工作了。(更糟的是,工作室A可能已经倒闭了,所以不会有补丁了。)你会责怪谁,是制作有缺陷产品的公司A,还是破坏游戏的公司B?[这不是假设](https://devblogs.microsoft.com/oldnewthing/20110131-00/?p=11633)。

我们可以举一个例子,其中[一个尝试](https://github.com/PaperMC/Waterfall/commit/c8eb6aec7bac82fd309fa6d6113b8a0418317b01)
改进1.13及以上版本的记分板处理[被撤销了](https://github.com/PaperMC/Waterfall/issues/255),因为插件期望BungeeCord的错误行为。在这一点上,很明显为什么做一个干净的分离更好。考虑到这发生在Velocity项目生命周期的开始,它可能是一个相当强大的动力,尽管它当然不是唯一的动力。

### 假设的基于BungeeCord API的Velocity

我们不得不简要提到这一点,因为这是项目早期提出的一个话题。我们本可以基于BungeeCord API(或其衍生品,如Waterfall API)来构建Velocity。

这与Waterfall有相同的问题,可能更多,因为我们需要独立地模拟BungeeCord API的_所有_行为。Wine项目已经尝试了30多年来提供一个垫片层,允许Windows程序在Linux和其他操作系统上运行。他们的努力至今仍在继续。模拟另一个操作系统的环境的行为很难。ReactOS的作者情况更糟,试图模拟Windows的所有怪癖,包括其内核,他们已经将基线设置为20年前发布的Windows版本。他们的工作完成度甚至比Wine的还要远。

我们将不得不花费大量时间假装Velocity看起来和叫起来就像BungeeCord。我们有意拒绝了这种方法。这不值得去做。
