import type { ProjectConfig } from "@/types/project";
import { starters } from "@/utils/starters";
import * as p from "@clack/prompts";
import boxen from "boxen";
import chalk from "chalk";

export function scaffold(options: ProjectConfig) {
  const { projectName, projectType } = options;
  const spinner = p.spinner();
  console.log(options);

  try {
    spinner.start("Creating HydraStack App...");

    const starter = starters[projectType];
    if (!starter) {
      throw new Error(`Invalid project type: ${projectType}`);
    }

    starter(options);

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
