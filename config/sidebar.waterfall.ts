import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const waterfall: SidebarsConfig = {
  primary: [
    {
      type: "category",
      label: "欢迎来到 Waterfall 文档",
      collapsed: false,
      collapsible: false,
      link: {
        type: "doc",
        id: "README",
      },
      items: ["getting-started", "configuration"],
    },
  ],
};

export default waterfall;
