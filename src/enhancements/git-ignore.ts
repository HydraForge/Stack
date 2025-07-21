import type { ProjectConfig } from "@/types/project";
import { join } from "node:path";

export const addGitIgnore = async (config: ProjectConfig): Promise<void> => {
  const gitIgnorePath = join(config.projectName, ".gitignore");

  await Bun.write(gitIgnorePath, gitIgnoreContent);
};
