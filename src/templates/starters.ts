import type { ProjectConfig, ProjectType } from "@/types/project";
import { $ } from "bun";

export const starters: Record<
  ProjectType,
  (config: ProjectConfig) => Promise<void>
> = {
  start: async (config) => {
    const startBasic =
      "TanStack/router/tree/main/examples/react/start-tailwind-v4";
    try {
      await $`bunx gitpick ${startBasic} ${config.projectName}`.quiet();
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  },
  router: async (config) => {
    const routerFileBased =
      "Tanstack/router/tree/main/examples/react/basic-file-based";
    console.log(`Scaffolding TanStack Router: ${config.projectName}`);
    try {
      await $`bunx gitpick ${routerFileBased} ${config.projectName}`;
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  },
  api: async (config) => {
    console.log(`coming soon.`);
  },
};
