import type { Footer } from "@docusaurus/theme-common";
import { execSync } from "child_process";

let currentCommit: string;
try {
  currentCommit = execSync("git rev-parse HEAD").toString().slice(0, 7).trim();
} catch (error) {
  console.error("获取当前提交失败:", error);
  currentCommit = "unknown";
}

const footer: Footer = {
  style: "dark",
  links: [
    {
      title: "社区",
      items: [
        {
          label: "Discord",
          href: "https://discord.gg/papermc",
        },
        {
          label: "论坛",
          href: "https://forums.papermc.io",
        },
      ],
    },
    {
      title: "文档",
      items: [
        {
          label: "Javadoc",
          href: "https://papermc.io/javadocs",
        },
        {
          label: "下载 API",
          href: "https://api.papermc.io/docs",
        },
      ],
    },
    {
      title: "其他",
      items: [
        {
          label: "主站",
          href: "https://papermc.io",
        },
        {
          label: "GitHub",
          href: "https://github.com/8aka-Team/PaperMC-Docs-CN",
        },
      ],
    },
  ],
  copyright: `版权所有 © ${new Date().getFullYear()} PaperMC 及贡献者。使用 Docusaurus 构建。<div><a href="https://github.com/8aka-Team/PaperMC-docs-CN/">PaperMC/docs</a> @ <a href="https://github.com/8aka-Team/PaperMC-docs-CN/docs/commit/${currentCommit}">${currentCommit}</a></div><div>本网站不是官方 Minecraft 网站，与 Mojang Studios 或 Microsoft 没有关联。所有产品名称和公司名称均为其各自持有者的商标或注册商标。使用这些名称并不表示与它们有任何关联或得到它们的认可。</div>`,
};

export default footer;
