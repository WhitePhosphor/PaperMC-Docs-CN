---
slug: /misc/paper-bug-fixes
description: 解释我们在 Paper 中修复了哪些原版漏洞。
---

# Paper 漏洞修复

Paper 修复了 Minecraft 中的许多游戏玩法和技术问题。最主要的修复是针对 TNT 复制和基岩破坏。

## 原版漏洞修复

Paper 修复了许多 Mojang 未打算出现的原版漏洞。这些漏洞被修复是为了纠正行为或防止服务器被滥用和不稳定。我们的一些修复是可配置的，因为我们理解某些服务器可能想要保持原版行为。您可以在[全局配置](../reference/configuration/global-configuration.mdx)和[世界配置](../reference/configuration/world-configuration.mdx)中找到这些配置选项。

### 什么是预期行为与漏洞？

当有问题报告给我们时，我们会检查 Mojang 的问题追踪器。如果问题已经在那里报告过，那么我们会检查它是否：

1) 已被确认为漏洞
2) 已被分配优先级

如果它满足这两个标准，那么我们会接受修复该漏洞的更改，因为 Mojang 可能需要很长时间才能修复它们（有时需要数年）。如果一个问题被 Mojang 拒绝，我们通常不会"修复"它，因为这是预期的行为。

## 复制漏洞

因为 TNT 复制被认为是一种自动化挖矿的形式而不是资源复制，我们提供了一个选项来恢复它。这也不可避免地重新启用了地毯和铁轨复制，通常我们不会为此提供配置选项，但这些都是同一个漏洞，所以我们别无选择。配置选项如下：

```yaml title="config/paper-global.yml"
unsupported-settings:
  allow-piston-duplication: true
```

我们还允许您恢复使用末地传送门复制重力方块（如沙子）的功能。不建议这样做，因为它可能会导致服务器出现问题，但我们确实提供了一个配置选项来恢复此功能：
```yaml title="config/paper-global.yml"
unsupported-settings:
  allow-unsafe-end-portal-teleportation: true
```

## 方块破坏

我们还修复了破坏基岩和末地传送门框架的功能。我们也提供了一个配置选项来恢复此功能，但不建议这样做：
```yaml title="config/paper-global.yml"
unsupported-settings:
  allow-permanent-block-break-exploits: true
```

## 后记

如果您启用这些设置时遇到问题，我们将不会提供支持，因为它们可能会导致意外的副作用。这些设置也不保证在未来会继续支持，它们的行为可能会随时被更改或移除。

关于为什么许多复制漏洞不提供配置选项的历史原因，请参见：
[#3724](https://github.com/PaperMC/Paper/issues/3724)
