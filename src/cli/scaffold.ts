import { addBiome } from "@/enhancements/biome";
import { addShadCN } from "@/enhancements/shadcn";
import { addTailwind } from "@/enhancements/tailwind";
import { scaffoldBaseProject } from "@/scaffolding/base-project";
import type { ProjectConfig } from "@/types/project";
import * as p from "@clack/prompts";
import boxen from "boxen";
import chalk from "chalk";

const enhancementMap = {
  tailwind: addTailwind,
  shadcn: addShadCN,
  biome: addBiome,
};

export async function scaffold(config: ProjectConfig) {
  const { projectName, tools } = config;
  const spinner = p.spinner();

  spinner.start("Creating HydraStack App...");

  try {
    const pipeline: Array<(config: ProjectConfig) => Promise<void>> = [
      scaffoldBaseProject,
    ];

    tools?.forEach((tool) => {
      if (enhancementMap[tool]) {
        pipeline.push(enhancementMap[tool]);
      }
    });

    for (const step of pipeline) {
      await step(config);
    }

    spinner.stop("App Created Successfully!");

    console.log(
      boxen(
        `${chalk.green("✓")} Your ${chalk.blue("HydraStack")} app is ready!

      Next steps:
      ${chalk.yellow(`cd ${projectName}`)}
      ${chalk.yellow("bun run dev")}

      Create something amazing! 🚀`,
        { title: "HydraStack CLI", titleAlignment: "center" },
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    spinner.stop(`Failed to create project: ${message}`);
    process.exit(1);
  }
}
