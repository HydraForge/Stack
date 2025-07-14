import type { ProjectConfig } from "@/types/project";
import { $ } from "bun";
export async function addBiome(config: ProjectConfig): Promise<void> {
  console.log("adding Biome.....");
  await $`bun add -D -E @biomejs/biome`.cwd(config.projectName).quiet();
  console.log("Installed Biome!");
  console.log("Creating config file...");
  await $`bunx --bun biome init`.quiet();
}
