# 为 PaperMC 文档做贡献

感谢您考虑为 PaperMC 文档仓库做贡献！我们感谢您帮助我们改进文档。
为确保贡献过程顺畅且富有协作性，请遵循以下指南。

## 目录

- [为 PaperMC 文档做贡献](#为-papermc-文档做贡献)
  - [目录](#目录)
  - [简介](#简介)
    - [如何添加页面](#如何添加页面)
  - [提交贡献](#提交贡献)
  - [风格指南](#风格指南)
  - [自动文档版本控制](#自动文档版本控制)
  - [魔法值处理](#魔法值处理)
  - [行为准则](#行为准则)

## 简介

PaperMC 文档仓库包含了 PaperMC 项目的文档，用于为我们的用户、开发者和贡献者提供重要信息、说明和指南。
您的贡献在改进和维护我们文档质量方面发挥着重要作用。

我们使用 [Docusaurus](https://docusaurus.io/) 来构建和部署文档网站。
Docusaurus 有[详尽的文档](https://docusaurus.io/docs/category/guides)说明其所有功能。

Paper 的大部分文档都是用 Markdown 编写的，这是一种简单易学的标记语言。
看看一些现有的文档，了解它是如何编写的。

### 如何添加页面

要向文档添加新页面，请在适当的文件夹中创建一个新的 Markdown 文件。例如，如果您想向 Paper 管理文档添加新页面，
请在 `docs-CN/paper/admin/` 文件夹中创建一个新的 Markdown 文件。文件名应该使用小写字母，并使用连字符分隔单词。
例如，`my-new-page.md`。

页面应该以 slug 和标题开始。例如：

```markdown
---
slug: /reference/paper-plugins
---

# Paper 插件

本文档页面用于解释 Paper 插件可能引入的所有新语义和可能的混淆。
```

这将把页面放在网站的 `/paper/reference/paper-plugins` URL 上。slug 应该是唯一的，并遵循文档的文件夹结构。
标题是将在网站和侧边栏中显示的页面名称。

您还必须将页面添加到侧边栏。在这个例子中，我们将转到 `config/sidebar.paper.ts` 文件，
并将文件添加到该部分的 `items` 标签中。您必须使用该文件的文件结构。一个例子是
`admin/reference/paper-plugins`，其中省略文件扩展名并使用斜杠表示文件夹。看看现有的
侧边栏元素，了解它是如何构建的。

## 提交贡献

如果您想为 PaperMC 文档做贡献，请遵循以下步骤：

1. 将仓库 fork 到您的 GitHub 账户。

2. 从 `main` 分支创建一个新分支。

3. 按照下面提到的风格指南进行更改或添加新文档。

4. 提交您的更改并将其推送到您的 fork。

5. 向文档仓库的 `main` 分支提交拉取请求（PR）。
   Cloudflare Pages 将自动为您的更改部署预览到 PR。预览链接将在 PR 评论中提供。

6. 您的 PR 将被审查，如有必要可能会提供反馈。

7. 一旦您的贡献符合指南和要求，它将被合并到主仓库中。

## 风格指南

为了保持文档的一致性和可读性，请遵守以下风格指南：

1. **美式英语**：所有文档都应该用美式英语编写。请使用美式拼写、语法和标点符号。
   看看[这个指南](https://www.oxfordinternationalenglish.com/differences-in-british-and-american-spelling/)，
   它概述了美式和英式英语之间的区别。

2. **Markdown 格式**：文档应该用 Markdown 格式（.md 或 .mdx）编写，以便在网站上轻松渲染。

3. **标题结构**：使用 `h1` (#) 作为主标题，`h2` (##) 作为章节标题，并遵循这种模式用于后续子标题。
   在 h1 中每个单词的首字母都要大写，但在 h2 和 h3 中，除非是专有名词，否则只需将第一个单词的首字母大写。

4. **代码块**：在包含代码片段或终端命令时，使用带有适当语法高亮的围栏代码块。

5. **提示框**：使用提示框来突出重要信息。例如，使用 `:::note` 作为一般注释，`:::tip` 作为提示，
   `:::caution` 作为警告，`:::danger` 作为严重警告。

6. **链接和引用**：在引用外部来源或链接到其他页面时，使用描述性的锚文本并提供完整的 URL。

7. **图片**：如有必要，包含图片来说明概念。确保图片清晰且与内容相关。

8. **格式化代码**：在进行更改后，不要忘记使用 `pnpm run format` 运行格式化脚本。

9. **保持简洁**：写清晰简洁的句子。避免不必要的术语和解释。

10. **保持包容**：考虑所有读者和贡献者。使用包容和友好的语言。

11. **原版大写**：在提到基础游戏时，使用大写的"原版"（Vanilla）。

## 自动文档版本控制

有一些组件和方法可以将当前项目版本嵌入到文档中。这可以通过以下几种方式实现：

1. `SoftwareVersion` 组件

    此组件用于将软件的当前版本嵌入到文档中。例如：

    ```jsx
    <SoftwareVersion versionType={"maj-min-pat"}/> // 例如 1.19.2
    <SoftwareVersion versionType={"maj-min"}/> // 例如 1.19
    <SoftwareVersion versionType={"maj"}/> // 例如 1

    // 您可以设置用于版本控制的项目名称（默认为 paper）：
    <SoftwareVersion versionType={"maj-min-pat"} project={"velocity"}/> // 例如 3.3.0-SNAPSHOT
    ```

2. `Javadoc` 组件

    此组件用于嵌入指向当前版本相应 Javadoc 的链接。例如：

    ```jsx
    <Javadoc name={"org.bukkit.event.Event"}>这里</Javadoc>
    // 这里也可以设置项目，默认为 Paper
    ```

3. `VersionFormattedCode` 组件

    此组件用于嵌入带有软件当前版本的代码块。例如：

    ````jsx
    <VersionFormattedCode language={"yaml"}>
    ```⠀
    name: Paper-Test-Plugin
    version: '1.0'
    main: io.papermc.testplugin.TestPlugin
    description: Paper Test Plugin
    api-version: '%%_MAJ_MIN_PAT_MC_%%'
    bootstrapper: io.papermc.testplugin.TestPluginBootstrap
    loader: io.papermc.testplugin.TestPluginLoader
    ```⠀
    </VersionFormattedCode>

    // 可用的占位符有：
    %%_MAJ_MIN_MC_%%  - Paper 主要-次要版本 (例如 1.20)
    %%_MAJ_MIN_PAT_MC_%% - Paper 主要-次要-补丁版本 (例如 1.20.4)
    %%_MAJ_MIN_VEL_%% - Velocity 主要版本 (例如 3.1.0)
    %%_MAJ_MIN_PAT_VEL_%% - Velocity 主要-次要-补丁版本 (例如 3.1.1-SNAPSHOT)
    %%_MAJ_MIN_PAT_USERDEV_%% - 最新的 Paperweight-Userdev 版本 (例如 1.7.3)
    ````

当软件的主要版本发生变化时，文档仍需要创建一个"快照"以保留旧版本的文档。
这是通过使用 Docusaurus 的 `version` 命令完成的：

```bash
pnpm docusaurus docs:version:paper "1.20"
```

## 魔法值处理

在编写文档时，避免使用"魔法值"很重要。这在文档中可能不像在代码中那样明显，但仍然很重要。
例如，这些值可能最终在多个地方使用，如果它们发生变化，重要的是要在所有地方都进行更改。
这就是为什么使用我们的 `Property` 组件将这些值嵌入到文档中很重要。例如：

```jsx
<Property name="PAPER_JAVA_MIN" />
```

这将把属性的值嵌入到文档中，如果它发生变化，它将在所有地方都发生变化。

这些值存储在 `config-specs/properties.json` 文件中。如果您需要添加新属性，
可以将其添加到此文件中，然后就可以在文档中使用它。

## 行为准则

贡献者应该在与本仓库相关的所有互动中遵循 PaperMC 组织的[社区指南](https://papermc.io/community/guidelines)。

感谢您为 PaperMC 文档做出贡献！您的奉献帮助改进了整个社区的文档。如果您有任何问题或需要进一步帮助，
欢迎在 PaperMC Discord 服务器上联系我们或在仓库中创建问题。
