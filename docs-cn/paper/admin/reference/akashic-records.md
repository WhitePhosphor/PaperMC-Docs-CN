---
slug: /reference/akashic-records
title: Akashic Records
description: Akashic Records 是 Paper 提供的一种工具，用于分析服务器性能问题。
---

# Akashic Records

Akashic Records 是 Paper 提供的一种工具，用于分析服务器性能问题。它可以记录服务器的各种事件，例如区块加载、实体生成、插件事件等，并将这些事件存储在数据库中。然后，您可以使用 Web 界面或命令行工具来分析这些记录，以找出服务器性能瓶颈。

Akashic Records 主要由两部分组成：

1.  **记录器 (Recorder)**：负责收集服务器事件并将它们写入数据库。记录器是 Paper 服务器的一部分，默认情况下处于禁用状态。
2.  **分析器 (Analyzer)**：负责读取数据库中的记录并生成报告。分析器是一个独立的 Web 应用程序，您可以将其部署在任何地方。

## 启用 Akashic Records

要启用 Akashic Records，您需要在 `paper.yml` 配置文件中进行一些设置。首先，您需要启用记录器：

```yaml
config:
  akashic-records:
    enabled: true
```

然后，您需要配置数据库连接。Akashic Records 支持以下数据库：

*   **SQLite** (默认): 无需额外配置，数据将存储在服务器目录下的 `akashic-records.db` 文件中。
*   **MySQL**: 您需要提供数据库连接信息。
*   **PostgreSQL**: 您需要提供数据库连接信息。

以下是使用 MySQL 数据库的配置示例：

```yaml
config:
  akashic-records:
    enabled: true
    database:
      type: mysql
      host: localhost
      port: 3306
      database: akashic_records
      username: akashic_records
      password: your_password
```

配置完成后，重启 Paper 服务器，Akashic Records 记录器将开始工作。

## 使用 Akashic Records 分析器

Akashic Records 分析器是一个独立的 Web 应用程序。您可以从 [GitHub Releases](https://github.com/PaperMC/AkashicRecords/releases) 下载最新版本的分析器。下载后，解压缩文件并运行 `akashic-records-analyzer.jar` 文件。

分析器启动后，您可以在浏览器中访问 `http://localhost:8080`（默认地址）。首次访问时，您需要配置数据库连接信息，这需要与您在 `paper.yml` 中配置的数据库连接信息一致。

配置完成后，您可以使用分析器来查看和分析服务器记录。分析器提供了各种图表和表格，以帮助您理解服务器性能数据。

## 命令行工具

Akashic Records 还提供了一个命令行工具，用于导出和分析记录数据。您可以在 [GitHub Releases](https://github.com/PaperMC/AkashicRecords/releases) 下载命令行工具。下载后，解压缩文件并运行 `akashic-records-cli.jar` 文件。

命令行工具提供了以下功能：

*   **导出数据**: 将数据库中的记录导出为 CSV 或 JSON 文件。
*   **分析数据**: 使用命令行工具分析记录数据并生成报告。

有关命令行工具的详细用法，请参考 [Akashic Records Wiki](https://github.com/PaperMC/AkashicRecords/wiki)。

## 注意事项

*   启用 Akashic Records 记录器会增加服务器的性能开销，尤其是在高负载服务器上。建议仅在需要分析服务器性能问题时启用记录器。
*   Akashic Records 记录的数据量可能会很大，请确保您的数据库有足够的存储空间。
*   Akashic Records 分析器和命令行工具仍在开发中，可能会存在一些 bug 或功能不完善之处。

如果您在使用 Akashic Records 过程中遇到任何问题，请随时在 [PaperMC Discord](https://discord.gg/papermc) 的 `#paper-help` 频道中寻求帮助。 