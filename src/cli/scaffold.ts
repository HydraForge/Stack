import { addBiome } from "@/enhancements/biome";
import { addGitIgnore } from "@/enhancements/git-ignore";
import { addShadCN } from "@/enhancements/shadcn";
import { addTailwind } from "@/enhancements/tailwind";
import { starters } from "@/templates/starters";
import type { ProjectConfig } from "@/types/project";
import * as p from "@clack/prompts";
import boxen from "boxen";
import chalk from "chalk";

const possibleEnhancementMap = {
	tailwind: addTailwind,
	shadcn: addShadCN,
	biome: addBiome,
};

const enhancementMap = {
	git: addGitIgnore,
};

export async function scaffold(config: ProjectConfig) {
	const { projectName, tools } = config;
	const spinner = p.spinner();

	spinner.start("Creating HydraStack App...");

	const starter = starters[config.projectType];
	if (!starter) {
		throw new Error(`Invalid project type: ${config.projectType}`);
	}

	try {
		await starter(config);
		const pipeline: Array<(config: ProjectConfig) => Promise<void>> = [];

		// tools?.forEach((tool) => {
		//   if (possibleEnhancementMap[tool]) {
		//     pipeline.push(possibleEnhancementMap[tool]);
		//   }
		// });

		for (const tool of tools) {
			if (possibleEnhancementMap[tool]) {
				pipeline.push(possibleEnhancementMap[tool]);
			}
		}
		for (const [key, value] of Object.entries(enhancementMap)) {
			pipeline.push(value);
		}

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
