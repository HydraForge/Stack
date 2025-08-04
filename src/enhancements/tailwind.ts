import { join } from "node:path";
import { viteConfig } from "@/templates/tailwind/vite.config";
import type { ProjectConfig } from "@/types/project";
import * as p from "@clack/prompts";
import { $ } from "bun";

export const addTailwind = async (config: ProjectConfig): Promise<void> => {
	await p.tasks([
		{
			title: "Adding Tailwind",
			task: async () => {
				await $`bun add tailwindcss @tailwindcss/vite`
					.cwd(config.projectName)
					.nothrow()
					.quiet();
			},
		},
		{
			title: "Updating Vite config",
			task: async () => {
				const viteConfigPath = join(config.projectName, "vite.config.ts");
				await Bun.write(viteConfigPath, viteConfig);
			},
		},
	]);
};
