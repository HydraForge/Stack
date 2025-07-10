import type { ProjectConfig } from "@/types/project";
import { starters } from "@/scaffolding/starters";
export async function scaffoldBaseProject(
  config: ProjectConfig,
): Promise<void> {
  const starter = starters[config.projectType];
  if (!starter) {
    throw new Error(`Invalid project type: ${config.projectType}`);
  }
  await starter(config);
}
