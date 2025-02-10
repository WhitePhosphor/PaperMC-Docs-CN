---
slug: /reference/paper-plugins
description: 关于 Paper 插件的详细指南。
---

# Paper 插件

本文档页面用于解释 Paper 插件可能引入的所有新语义和可能的混淆点。

:::info

开发者可以在[这里](docs/paper/dev/getting-started/paper-plugins.mdx)获取更多关于 Paper 插件的信息。

:::

## 它们是什么？

Paper 插件是由 Paper 的新插件加载框架加载的插件。开发者使用 Paper 插件可以利用 Mojang 提供的现代系统，例如数据包。

![插件列表](assets/plugin-list.png)

## 有什么区别？

启用后，Paper 插件与 Bukkit 插件**完全相同**。这允许插件仍然可以完全相互通信和支持，这意味着无论插件是 Bukkit 插件还是 Paper 插件，它们都可以很好地相互依赖。

Paper 插件只支持由 Paper 的插件加载器加载，并且可以使用 Bukkit 插件无法使用的新 API。

### 如何添加 Paper 插件？

Paper 插件的添加方式与 Bukkit 插件相同，因此，您可以按照[本指南](docs/paper/admin/getting-started/adding-plugins.md)进行操作。

### 循环插件加载

随着 Paper 插件的引入，Paper 引入了一个新的插件加载器，修复了一些奇怪的问题。
然而，这导致不再支持插件之间的[循环加载](docs/paper/dev/getting-started/paper-plugins.mdx#cyclic-plugin-loading)。

如果 Paper 检测到循环，您的服务器将会显示错误并关闭。

:::danger[遗留支持]

如果您的服务器**必须**使用这种循环加载，您可以通过添加 [`-Dpaper.useLegacyPluginLoading=true`](system-properties.md#paperuselegacypluginloading) 启动标志来启用它。
请注意，这可能在未来不再受支持。

:::
