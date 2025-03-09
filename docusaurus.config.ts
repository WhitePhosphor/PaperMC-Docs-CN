import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import { themes } from "prism-react-renderer";
import isCI from "is-ci";
import navbar from "./config/navbar.config.js";
import footer from "./config/footer.config.js";
import { env } from "process";
import { Config } from "@docusaurus/types";
import { Options } from "@docusaurus/plugin-content-docs";
import { visit } from "unist-util-visit";
import {
  AUTHOR_FALLBACK,
  AuthorData,
  commitCache,
  cacheAuthorData,
  getFileCommitHashSafe,
} from "./src/util/authorUtils.js";
import { preview, deploymentID } from "./src/util/pagesUtils.js";

cacheAuthorData(preview || env.NODE_ENV === "development");

const url =
  (preview && `https://${deploymentID}.papermc-docs-cn.pages.dev`) || "https://paper.8aka.org";

const docsCommon: Options = {
  breadcrumbs: true,
  editUrl: ({ versionDocsDirPath, docPath }) =>
    `https://github.com/8aka-Team/PaperMC-docs-CN/blob/main/${versionDocsDirPath}/${docPath}`,
  editCurrentVersion: true,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
};

const config: Config = {
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  title: "PaperMC 文档",
  tagline: "PaperMC 旗下所有项目的文档，包括 Paper、Velocity 和 Folia。",
  url: url,
  baseUrl: "/",
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: "warn",
  favicon: "/favicon.ico",
  trailingSlash: false,
  noIndex: preview,
  baseUrlIssueBanner: false,
  clientModules: [
    require.resolve("./src/css/custom.css"),
    require.resolve("./src/css/ui.scss"),
    require.resolve("@fontsource/jetbrains-mono/index.css"),
    require.resolve('./src/clientModules/adsModules.js'),
  ],

  future: {
    experimental_faster: true,
  },

  headTags: [
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }),
    },
    {
      tagName: "script",
      attributes: {
        defer: "true",
        src: "https://trk.papermc.io/api/init",
        "data-website-id": "f93a0860-1253-4868-b27a-08208a36cea7",
      },
    },
  ],

  markdown: {
    mermaid: true,
    mdx1Compat: {
      comments: false,
      admonitions: false,
      headingIds: false,
    },
    format: "detect",
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      let author: AuthorData = {
        ...AUTHOR_FALLBACK,
      };
      if (process.env.NODE_ENV !== "development") {
        const data = await getFileCommitHashSafe(params.filePath);
        if (data) {
          const username = commitCache.get(data.commit);
          author = {
            commit: data.commit,
            username: username ?? AUTHOR_FALLBACK.username,
          };
        }
      }

      return {
        ...result,
        frontMatter: {
          ...result.frontMatter,
          author: author,
        },
      };
    },
  },

  themes: [
    "@docusaurus/theme-classic",
    "@docusaurus/theme-search-algolia",
    "@docusaurus/theme-mermaid",
  ],

  plugins: [
    [
      "content-docs",
      {
        ...docsCommon,
        id: "misc",
        path: "docs/misc",
        routeBasePath: "/misc",
        sidebarPath: require.resolve("./config/sidebar.misc"),
      },
    ],
    [
      "content-docs",
      {
        ...docsCommon,
        id: "paper",
        path: "docs/paper",
        routeBasePath: "paper",
        sidebarPath: require.resolve("./config/sidebar.paper"),
        lastVersion: "current",
        versions: {
          current: {
            label: "1.20",
            path: "",
          },
        },
      },
    ],
    [
      "content-docs",
      {
        ...docsCommon,
        id: "folia",
        path: "docs/folia",
        routeBasePath: "folia",
        sidebarPath: require.resolve("./config/sidebar.folia"),
        lastVersion: "current",
        versions: {
          current: {
            label: "1.20",
            path: "",
          },
        },
      },
    ],
    [
      "content-docs",
      {
        ...docsCommon,
        id: "velocity",
        path: "docs/velocity",
        routeBasePath: "velocity",
        sidebarPath: require.resolve("./config/sidebar.velocity"),
      },
    ],
    [
      "content-docs",
      {
        ...docsCommon,
        id: "waterfall",
        path: "docs/waterfall",
        routeBasePath: "waterfall",
        sidebarPath: require.resolve("./config/sidebar.waterfall"),
      },
    ],
    [
      "content-pages",
      {
        remarkPlugins: [remarkA11yEmoji],
      },
    ],
    [
      "pwa",
      {
        offlineModeActivationStrategies: ["appInstalled", "standalone", "queryString"],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "img/paper.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(0, 78, 233)",
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-sitemap",
      {
        ignorePatterns: ["**/cat/**"],
      },
    ],
    "@docusaurus/plugin-debug",
    "docusaurus-plugin-sass",
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: "img/paper.png",
    metadata: [
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "og:type",
        content: "website",
      },
      {
        name: "og:image:alt",
        content: "PaperMC Logo",
      },
    ],
    navbar: navbar,
    footer: footer,
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    prism: {
      additionalLanguages: [
        "batch",
        "bash",
        "git",
        "java",
        "javastacktrace",
        "kotlin",
        "groovy",
        "log",
        "toml",
        "properties",
      ],
      theme: themes.vsLight,
      darkTheme: themes.vsDark,
    },
    algolia: {
      appId: "P1BCDPTG1Q",
      apiKey: "34772712950f27c6e9c714ad2e6c5e16",
      indexName: "docs-papermc",
      contextualSearch: true,
    },
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },
  },
};

export default config;
