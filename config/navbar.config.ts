import { Navbar } from "@docusaurus/theme-common";

// don't specify style or hideOnScroll here, we want it to be dynamic
const navbar: Omit<Navbar, "style" | "hideOnScroll"> = {
  logo: {
    src: "img/logo-marker-light.svg",
    srcDark: "img/logo-marker-dark.svg",
    height: 42, // when changing here, also change css
    width: 121,
    alt: "PaperMC 文档",
  },
  items: [
    {
      type: "dropdown",
      label: "Paper",
      to: "/paper",
      position: "left",
      activeBaseRegex: "\\/paper.*",
      items: [
        {
          label: "管理",
          to: "/paper/admin",
          activeBaseRegex: "\\/paper/(?!(dev|contributing)).*",
        },
        {
          label: "开发",
          to: "/paper/dev",
          activeBaseRegex: "\\/paper\\/dev.*",
        },
        {
          label: "贡献",
          to: "/paper/contributing",
          activeBaseRegex: "\\/paper\\/contributing.*",
        },
      ],
    },
    {
      type: "dropdown",
      label: "Folia",
      to: "/folia",
      position: "left",
      activeBaseRegex: "(\\/folia)(.+)?",
      items: [
        {
          label: "管理",
          to: "/folia/admin",
          activeBaseRegex: "(\\/folia/)(?!dev)(.+)?",
        },
        {
          label: "开发",
          to: "/folia/dev",
          activeBaseRegex: "\\/folia\\/dev.*",
        },
      ],
    },
    {
      type: "dropdown",
      label: "Velocity",
      to: "/velocity",
      position: "left",
      activeBaseRegex: "\\/velocity.*",
      items: [
        {
          label: "管理",
          to: "/velocity/admin",
          activeBaseRegex: "\\/velocity/(?!dev).*",
        },
        {
          label: "开发",
          to: "/velocity/dev",
          activeBaseRegex: "\\/velocity\\/dev.*",
        },
      ],
    },
    {
      to: "waterfall",
      label: "Waterfall",
      position: "left",
    },
    {
      to: "misc",
      label: "其他",
      position: "left",
    },
    {
      type: "docsVersionDropdown",
      docsPluginId: "paper",
      position: "right",
    },
    {
      to: "https://papermc.io/downloads",
      label: "下载",
      position: "right",
    },
    {
      href: "https://discord.com/invite/jN4Br8uhSS",
      className: "header-icon-link header-discord-link",
      position: "right",
    },
    {
      href: "https://github.com/8aka-Team/PaperMC-Docs-CN",
      className: "header-icon-link header-github-link",
      position: "right",
    },
  ],
};

export default navbar;
