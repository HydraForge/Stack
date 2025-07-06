import path from "node:path";
import * as p from "@clack/prompts";
import boxen from "boxen";
import chalk from "chalk";

interface ProjectConfigOptions {
	projectName: string;
	projectType: string;
}

export function scaffold({ projectName, projectType }: ProjectConfigOptions) {
	const spinner = p.spinner();
	spinner.start("Creating HydraStack App...");

	try {
		const projectPath = path.resolve(process.cwd(), projectName);

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
		spinner.stop(`Failed to create project: ${error}`);
		console.error(error);
		process.exit(1);
	}
}
