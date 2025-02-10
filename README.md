# 📖 PaperMC 文档

[![Discord](https://img.shields.io/discord/289587909051416579.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/papermc) ![Deployment Status](https://img.shields.io/github/deployments/PaperMC/docs/production?label=deployment&logo=github) ![License](https://img.shields.io/github/license/PaperMC/docs)

这是 PaperMC 项目下所有文档的仓库。内容发布在 [docs.papermc.io](https://docs.papermc.io) 上供查看。

## 🚀 开始使用

如何在本地运行文档进行开发。

### 📋 前置要求

- [node](https://nodejs.org)
- [pnpm](https://pnpm.io/installation)

### 💻 本地开发

1. 克隆仓库。如果你计划修改，请先创建分支！

```bash
$ git clone https://github.com/8aka-Team/PaperMC-docs-CN
```

2. 安装所需依赖。

```bash
$ pnpm install
```

3. 启动开发服务器。

```bash
$ pnpm run dev
```

这将启动本地开发服务器并打开浏览器窗口。大多数更改将实时生效，无需重启开发服务器或刷新浏览器页面。开始编辑吧！

### 🏗️ 构建

```bash
$ pnpm run build
```

此命令会在 `build` 目录下构建一个生产就绪的部署。这些文件可以托管在任何静态内容服务器上。

## 📄 许可证

PaperMC 文档 (如 `/docs` 文件夹中的 `.md` 文件) 采用 [CC-BY-SA-4.0](https://github.com/8aka-Team/PaperMC-docs-CN/blob/main/LICENSE-docs) 许可。

支持代码采用 [BSD-2-Clause](https://github.com/8aka-Team/PaperMC-docs-CN/blob/main/LICENSE) 许可。

PaperMC 标志受其[自身条款](https://docs.papermc.io/misc/assets)约束，不继承任何项目的许可证。

![:PaperMC-Docs](https://count.kjchmc.cn/get/@:PaperMC-Docs)
