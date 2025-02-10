---
title: Hangar 自动发布
description: 如何在提交时自动将您的插件发布到 Hangar。
---

如果您想在提交时自动将您的插件发布到 [Hangar](https://hangar.papermc.io/)，您可以使用
我们的 [Gradle 插件](https://github.com/HangarMC/hangar-publish-plugin)。

在添加了必需的 `hangarPublish` 配置后，您可以通过运行 `./gradlew build publishPluginPublicationToHangar` 
手动发布，或者让 GitHub Actions 在每次提交时自动发布版本。

## 前提条件

### Gradle

您的插件项目需要使用 Gradle 作为构建工具。

:::tip

如果您使用的是 Maven，[切换到 Gradle 设置很容易](https://docs.gradle.org/current/userguide/migrating_from_maven.html)，
而且由于更高的可配置性和对其他插件的支持，通常建议这样做，例如
在[针对未混淆的 Minecraft 服务器进行编译](/paper/dev/userdev)时。

提供的示例使用 Kotlin DSL，但您也可以使用 Groovy。在线转换器（甚至 ChatGPT）
都能转换示例代码。

:::

### 创建 `Snapshot` 发布渠道

下面的构建脚本将在 `Snapshot` 渠道下发布非发布版本。您需要先在
您的 Hangar 项目的渠道页面中创建此渠道。

![创建 Snapshot 渠道](https://i.imgur.com/p4UEIeJ.png)

### 添加 `HANGAR_API_TOKEN` 仓库密钥

首先，您需要创建一个 Hangar API 令牌。在个人资料下拉菜单中转到您的 Hangar 设置，然后点击左侧的"Api keys"。然后，勾选
`create_version` 权限框，给密钥一个名称并创建它。**在顶部**，您应该会得到您的密钥 API
令牌。**不要与任何人分享这个**；您将在下一步中需要它。

提供的 GitHub Actions 工作流使用仓库密钥来存储您的 Hangar API 密钥。转到您的 GitHub 项目设置，
然后点击安全选项卡下的"Actions"，再点击"New repository secret"按钮。将密钥命名为
`HANGAR_API_TOKEN`，并将上一步中的 Hangar API 令牌粘贴到 Secret 字段中。

![Action secrets](https://i.imgur.com/l11Bnx5.png)

## 项目文件

下面的文件是简单的示例，只需要您进行少量手动更改就可以使用，但您仍然可以根据
需要进行调整。查看注释，特别是 TODO，以了解您还需要更改什么。

### `gradle.properties`

如果项目根目录中还没有 `gradle.properties` 文件，请创建一个。在其中，您定义您的插件
兼容的平台版本。只需删除您不需要的平台并输入正确的版本。

Hangar 允许版本范围（如 `1.19-1.20.2`）和通配符（如 `1.20.x`）。

```properties
# 指定 Paper 和 Velocity 的平台版本。
# Hangar 还允许版本范围（如 1.19-1.20.2）和通配符（如 1.20.x）。
# TODO: 删除您不需要的平台并输入正确的版本。
paperVersion=1.12.2, 1.16.5, 1.19-1.20.2
velocityVersion=3.2
waterfallVersion=1.20
```

### `build.gradle.kts`

在您的 `build.gradle.kts` 构建脚本的插件块中，添加发布插件：

```kotlin
plugins {
    id("io.papermc.hangar-publish-plugin") version "0.1.2"
}
```

然后您只需添加 `hangarPublish` 配置块，并确保您执行以下操作：

- 如果您的插件不是 Paper 插件，或者也支持 Velocity/Waterfall，请使用不同的
  平台复制注册块，并更改使用的属性而不是 `paperVersion`（如在 `gradle.properties` 文件中声明的）。
- 插入正确的项目命名空间
- 插入您的插件依赖项（如果有）
- 如果您使用下面的 Actions 文件，则需要设置 `HANGAR_API_TOKEN` 仓库密钥，否则以其他方式添加
  API 密钥。

```kotlin
import io.papermc.hangarpublishplugin.model.Platforms

// ...

hangarPublish {
    publications.register("plugin") {
        version.set(project.version as String)
        channel.set("Snapshot") // 我们使用 'Snapshot' 渠道
        // TODO: 编辑项目名称以匹配您的 Hangar 项目
        id.set("hangar-project")
        apiKey.set(System.getenv("HANGAR_API_TOKEN"))
        platforms {
            // TODO: 为您的插件使用正确的平台
            register(Platforms.PAPER) {
                // TODO: 如果您使用 ShadowJar，请用适当的任务替换 jar 行：
                //   jar.set(tasks.shadowJar.flatMap { it.archiveFile })
                // 设置要上传的 JAR 文件
                jar.set(tasks.jar.flatMap { it.archiveFile })

                // 从 gradle.properties 文件设置平台版本
                val versions: List<String> = (property("paperVersion") as String)
                        .split(",")
                        .map { it.trim() }
                platformVersions.set(versions)

                // TODO: 配置您的插件依赖项（如果有）
                dependencies {
                    // Hangar 上找到的依赖项示例
                    hangar("Maintenance") {
                        required.set(false)
                    }
                    // 外部依赖项示例
                    url("Debuggery", "https://github.com/PaperMC/Debuggery") {
                        required.set(true)
                    }
                }
            }
        }
    }
}
```

### 可选：深入了解

使用以下渠道，任何包含连字符（`-`）的版本都将在您需要在 Hangar 上创建的 `Snapshot` 渠道下发布。
通过编辑 `channel.set(...)` 行，您可以将其更改为您想要的任何渠道。例如，您可以根据当前所在的分支
将构建进一步分为 `Alpha` 构建。

:::warning

确保永远不要将正在进行的开发构建发布到 `Release` 渠道。

:::

```kotlin
import java.io.ByteArrayOutputStream

// ...

// 辅助方法
fun executeGitCommand(vararg command: String): String {
    val byteOut = ByteArrayOutputStream()
    exec {
        commandLine = listOf("git", *command)
        standardOutput = byteOut
    }
    return byteOut.toString(Charsets.UTF_8.name()).trim()
}

fun latestCommitMessage(): String {
    return executeGitCommand("log", "-1", "--pretty=%B")
}

val versionString: String = version as String
val isRelease: Boolean = !versionString.contains('-')

val suffixedVersion: String = if (isRelease) {
    versionString
} else {
    // 使用 GitHub Actions 运行编号给版本一个唯一的名称
    versionString + "+" + System.getenv("GITHUB_RUN_NUMBER")
}

// 使用提交描述作为更新日志
val changelogContent: String = latestCommitMessage()

// 如果您想手动发布带有适当更新日志的发布版本，只需在这里添加一个带有 `isRelease` 变量的 if 语句。
hangarPublish {
    publications.register("plugin") {
        version.set(suffixedVersion)
        channel.set(if (isRelease) "Release" else "Snapshot")
        changelog.set(changelogContent)
        // ... (见上文)
    }
}
```

### GitHub Actions 工作流

您不一定需要通过 GitHub Actions 发布，但这是一种简单的方法。如果您想使用它，请在
项目根文件夹的 `.github/workflows` 目录中创建一个 `publish.yml` 文件，并确保
您[添加了仓库密钥](#添加-hangar_api_token-仓库密钥)。

您可以通过编辑 `branches` 部分来添加和删除要发布的分支。

```yaml
name: Publish to Hangar
on:
  push:
    branches:
      # 添加您想要自动发布的任何其他分支
      - main # 假设您的主分支叫做 'main'

jobs:
  publish:
    # TODO: 可选，确保任务只在推送到您的仓库时运行，而不会在分叉时失败。取消下面一行的注释并将仓库所有者放入引号中
    # if: github.repository_owner == '<YOUR USER/ORG NAME>'
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      - name: Validate Gradle Wrapper
        uses: gradle/wrapper-validation-action@v1
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: 17
      - name: Publish
        env:
          # 确保您已在仓库设置中添加了仓库密钥
          HANGAR_API_TOKEN: ${{ secrets.HANGAR_API_TOKEN }}
        run: ./gradlew build publishPluginPublicationToHangar --stacktrace
```