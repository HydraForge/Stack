import type { ProjectConfig } from "@/types/project";
import * as p from "@clack/prompts";
import { $ } from "bun";

export const addBiome = async (config: ProjectConfig): Promise<void> => {
	await p.tasks([
		{
			title: "Adding Biome",
			task: async () => {
				await $`bun add -D -E @biomejs/biome`
					.cwd(config.projectName)
					.nothrow()
					.quiet();
			},
		},
		{
			title: "Creating config file",
			task: async () => {
				await $`bunx --bun biome init`.cwd(config.projectName).quiet();
			},
		},
		{
			title: "Tidying up",
			task: async () => {
				const configPath = `${config.projectName}/biome.json`; // this probably needs to be fixed for Windows
				const configContent = await Bun.file(configPath).json();

				configContent.json = {
					...configContent.json,
					parser: {
						allowComments: true,
						allowTrailingCommas: true,
					},
				};

				await Bun.write(configPath, JSON.stringify(configContent, null, 2));
			},
		},
	]);
};
