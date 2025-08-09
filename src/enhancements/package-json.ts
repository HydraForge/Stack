import { join } from "node:path";
import type { ProjectConfig } from "@/types/project";

export const addPackageJSON = async (config: ProjectConfig): Promise<void> => {
  const packageJsonPath = join(config.projectName, "package.json");
  const packageContent = await Bun.file(packageJsonPath).json();

  packageContent.scripts = {
    ...packageContent.scripts,
    check: "bunx biome check --write ./src/*",
  };

  await Bun.write(
    packageJsonPath,
    JSON.stringify(packageContent, null, 2) + "\n",
  );
};
