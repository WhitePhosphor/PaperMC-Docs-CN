import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { Icon } from "@iconify/react";
import "../css/projects.css";

const projects: Project[] = [
  {
    title: "Paper",
    description:
      "高性能的 Minecraft 服务端，旨在修复游戏玩法和机制上的不一致。",
    repo: "PaperMC/Paper",
    link: "/paper",
  },
  {
    title: "Folia",
    description: "Paper 的一个分支，为专用服务器添加了区域化的多线程支持。",
    repo: "PaperMC/Folia",
    link: "/folia",
  },
  {
    title: "Velocity",
    description: "现代化的下一代 Minecraft 服务器代理。",
    repo: "PaperMC/Velocity",
    link: "/velocity",
  },
  {
    title: "杂项",
    description: "不适用于任何特定项目的通用文档。",
    repo: "PaperMC",
    link: "/misc",
  },
  {
    title: "Waterfall",
    description:
      "一个已停止维护的 BungeeCord 代理分支，曾致力于提高性能和稳定性。",
    repo: "PaperMC/Waterfall",
    link: "/waterfall",
    eol: true,
  },
];

function Project(project: Project) {
  return (
    <div className={"project"}>
      <div className={"flex"}>
        <Link
          className={clsx("projectGitHub", project.eol && "archivedProjectTitle")}
          to={`https://github.com/${project.repo}`}
        >
          {project.title}
          {project.eol && <Icon className={"margin-left--sm"} icon={"mdi:archive"} height={25} />}
        </Link>
        <p>{project.description}</p>
      </div>
      <div>
        <Link
          className={clsx("button button--primary", project.eol && "archivedProjectButton")}
          to={project.link}
        >
          前往
        </Link>
      </div>
    </div>
  );
}

export default function Projects(): JSX.Element {
  return (
    <section className={"projects"}>
      <div className={"projectsContainer"}>
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

interface Project {
  title: string;
  description: string;
  repo: string;
  link: string;
  eol?: boolean;
}
