import type { ProjectConfig } from "@/types/project";
import { starters } from "@/utils/starters";
import * as p from "@clack/prompts";
import boxen from "boxen";
import chalk from "chalk";

export function scaffold(config: ProjectConfig) {
  const { projectName, projectType, tools } = config;
  const spinner = p.spinner();

  console.log(config);

  spinner.start("Creating HydraStack App...");

  try {
    const starter = starters[projectType];
    if (!starter) {
      throw new Error(`Invalid project type: ${projectType}`);
    }

    starter(config);

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
