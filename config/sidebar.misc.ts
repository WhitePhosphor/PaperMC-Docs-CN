import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const misc: SidebarsConfig = {
  primary: [
    {
      type: "category",
      label: "杂项文档",
      collapsed: false,
      collapsible: false,
      link: {
        type: "doc",
        id: "README",
      },
      items: [
        {
          type: "category",
          label: "工具",
          collapsed: false,
          collapsible: true,
          link: {
            type: "doc",
            id: "tools/index",
          },
          items: [
            "tools/start-script-gen",
            "tools/minimessage-web-editor",
            "tools/item-command-converter",
          ],
        },
        "java-install",
        "downloads-api",
        "hangar-publishing",
        "assets",
        "contact",
      ],
    },
  ],
};

export default misc;
