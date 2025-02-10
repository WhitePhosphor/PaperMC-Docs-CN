import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const folia: SidebarsConfig = {
  primary: [
    "README",
    {
      type: "category",
      label: "管理",
      collapsed: true,
      link: {
        type: "doc",
        id: "admin/README",
      },
      items: [
        {
          type: "category",
          label: "入门",
          link: {
            type: "generated-index",
            slug: "/cat/admin/getting-started",
          },
          items: [
            "admin/reference/faq",
            {
              type: "category",
              label: "参考",
              collapsed: true,
              link: {
                type: "generated-index",
                slug: "/cat/dev/reference",
              },
              items: ["admin/reference/overview", "admin/reference/region-logic"],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "开发",
      collapsed: true,
      link: {
        type: "doc",
        id: "dev/README",
      },
      items: [
        // Placed here until some guides exist
        "dev/README",
      ],
    },
  ],
};

export = folia;
