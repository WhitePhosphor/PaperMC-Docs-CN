import fs from "fs-extra";
import path from "path";
import { env } from "process";
import { glob } from "glob";

export interface AuthorData {
  commit: string;
  username: string;
}

export const AUTHOR_FALLBACK: AuthorData = {
  commit: "unknown",
  username: "unknown",
};

export const commitCache = new Map<string, string>();

export async function cacheAuthorData(isPreview: boolean) {
  // Only Render in Production and not cache in every invocation of importing docusaurus.config.ts
  if (isPreview || !new Error().stack.includes("async loadSite")) {
    return;
  }
  
  // 简化实现，不再依赖 git 信息
  return null;
}

export const getFileCommitHashSafe = async (file: string): Promise<{ commit: string } | null> => {
  // 简化实现，返回默认值
  return {
    commit: AUTHOR_FALLBACK.commit
  };
};
