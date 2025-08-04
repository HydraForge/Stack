import { join } from "node:path";
import { components } from "@/templates/shadcn/components";
import { utilsTemplate } from "@/templates/shadcn/utils";
import type { ProjectConfig } from "@/types/project";
import * as p from "@clack/prompts";
import { $ } from "bun";

export const addShadCN = async (config: ProjectConfig): Promise<void> => {
	await p.tasks([
		{
			title: "Installing ShadCN dependencies",
			task: async () => {
				await $`bun add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css`
					.cwd(config.projectName)
					.nothrow()
					.quiet();
			},
		},
		{
			title: "Creating utils",
			task: async () => {
				const libDir = join(config.projectName, "src", "lib");
				const utilsPath = join(libDir, "utils.ts");
				await Bun.write(utilsPath, utilsTemplate);
			},
		},
		{
			title: "Setting up components configuration",
			task: async () => {
				const componentsPath = join(config.projectName, "components.json");
				await Bun.write(
					componentsPath,
					`${JSON.stringify(components, null, 2)}\n`,
				);
			},
		},
	]);
};
