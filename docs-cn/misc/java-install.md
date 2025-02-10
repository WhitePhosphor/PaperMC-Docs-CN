---
title: 安装或更新 Java
description: 如何在 Linux (apt/rpm)、Windows 或 Mac 上安装或更新到 Java 21。
toc_max_heading_level: 5
---

安装 Java 是使用或开发 Paper 和 Velocity 插件的关键第一步。本指南将引导您完成大多数主要平台的推荐安装步骤。

:::caution[不要使用 Java 的 headless 变体！]

Java 有 `headless` 变体，这些变体通常在其包名称中带有 `-headless` 后缀。这些变体缺少 Paper 所需的依赖项。因此，不建议使用它们。

:::

:::tip

本指南侧重于 Amazon 的 Corretto OpenJDK 发行版。这是因为它在大多数平台上提供了最佳的安装体验。然而，Corretto 并不是唯一的 OpenJDK 供应商。存在许多替代方案，例如 [Eclipse Adoptium](https://adoptium.net/)、[Microsoft](https://www.microsoft.com/openjdk) 和 [Azul Zulu](https://www.azul.com/downloads/?package=jdk)。请注意，Oracle 分发的 JDK 虽然功能相同，但**不**推荐使用，因为它具有极其不友好的安装程序和以前不友好的许可。

:::

## Linux

### Ubuntu/Debian

在基于 Debian 的 Linux 发行版上安装 Java 21 非常简单。首先，确保您的系统具有成功安装 Java 所需的所有工具。

```bash
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install ca-certificates apt-transport-https gnupg wget
```

其次，导入 Amazon Corretto 公钥和 apt 仓库。

```bash
wget -O - https://apt.corretto.aws/corretto.key | sudo gpg --dearmor -o /usr/share/keyrings/corretto-keyring.gpg && \
echo "deb [signed-by=/usr/share/keyrings/corretto-keyring.gpg] https://apt.corretto.aws stable main" | sudo tee /etc/apt/sources.list.d/corretto.list
```

然后，使用以下命令安装 Java 21 和其他依赖项：

```bash
sudo apt-get update
sudo apt-get install -y java-21-amazon-corretto-jdk libxi6 libxtst6 libxrender1
```

继续[验证您的安装](#verifying-installation)。

### 基于 RPM 的发行版

要在 CentOS、RHEL、Fedora、openSUSE、SLES 或任何其他基于 RPM 的 Linux 发行版上安装 Java 21，请根据您的软件包管理器执行以下命令。完成后，继续[验证您的安装](#verifying-installation)。

#### DNF

DNF 用于 Fedora、CentOS/RHEL 7+ 和相关发行版。

```bash
sudo rpm --import https://yum.corretto.aws/corretto.key
sudo curl -Lo /etc/yum.repos.d/corretto.repo https://yum.corretto.aws/corretto.repo
sudo dnf -y install java-21-amazon-corretto-devel
```

#### Zypper

Zypper 用于 openSUSE、SLES 和相关发行版。

```bash
sudo zypper addrepo https://yum.corretto.aws/corretto.repo
sudo zypper refresh
sudo zypper install java-21-amazon-corretto-devel
```

#### YUM

YUM 用于较旧版本的 CentOS/RHEL 和极其旧版本的 Fedora。

```bash
sudo rpm --import https://yum.corretto.aws/corretto.key
sudo curl -Lo /etc/yum.repos.d/corretto.repo https://yum.corretto.aws/corretto.repo
sudo yum -y install java-21-amazon-corretto-devel
```

## Windows 10 和 11

如果您使用的是 Windows 10 或 11，则安装 Java 就像安装任何其他程序一样。从 [他们的网站](https://corretto.aws/downloads/latest/amazon-corretto-21-x64-windows-jdk.msi) 下载 Amazon Corretto 安装程序。

运行安装程序后，可以安全地单击“下一步”完成整个过程。不会安装额外的 bloatware 或工具栏，并且所有必需的功能都已开箱即用。

现在，打开命令提示符并继续[验证您的安装](#verifying-installation)。

## macOS/OS X

如果您使用的是 macOS，管理 Java 安装的最佳方法是使用名为 [Homebrew](https://brew.sh) 的工具。按照其主页上的说明安装它。然后在您的终端中运行以下命令：

```bash
brew install openjdk@21
```

此命令完成后，继续[验证您的安装](#verifying-installation)。

## Pterodactyl

:::note

在低于 `1.2.0` 的 Pterodactyl 版本上，需要管理员帐户才能更改 Java 版本。这些说明不适用。

:::

如果您使用错误的 Java 版本启动了 Paper 服务器，Pterodactyl 将自动提示您更新，如下所示：

![Pterodactyl 自动提示](pterodactyl-prompt.png)

如果这没有显示给您，则可以手动更改 Java 版本。导航到服务器的“启动”选项卡，从“Docker 镜像”下拉列表中选择 `Java 21`，如下图所示。

![Pterodactyl 手动 Java 版本更改](pterodactyl-manual.png)

:::note

如果您在下拉列表中看不到 `Java 21`，则需要管理员帐户才能更新 Paper egg。

:::

验证安装部分不适用于 Pterodactyl。

## 验证安装

现在您已经安装了 Java 21，请在您的终端中运行此命令以确保该过程成功。

```bash
java -version
```

输出应类似于此。需要注意的重要部分是它以 `openjdk 21` 开头，并且最后一行包含 `64-Bit`。如果您获得的输出类似于 `java: command not found`，请尝试创建一个新的终端会话。

```
openjdk version "21" 2023-09-19 LTS
OpenJDK Runtime Environment Corretto-21.0.0.35.1 (build 21+35-LTS)
OpenJDK 64-Bit Server VM Corretto-21.0.0.35.1 (build 21+35-LTS, mixed mode, sharing)
```

如果您的安装失败，请随时在我们的 [Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求支持。
