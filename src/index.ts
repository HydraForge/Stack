#!/usr/bin/env bun
import { existsSync } from "node:fs";
import path from "node:path";
import * as p from "@clack/prompts";
import boxen from "boxen";
import chalk from "chalk";
import { installBiome } from "~/installers/biome.ts";
import { installPostHog } from "~/installers/posthogInstaller.ts";
import { installTanStackRouter } from "~/installers/tanstackrouter.ts";
import { postInstall } from "~/utils/postInstall.ts";
import { renderTitle } from "~/utils/utils.ts";

p.intro(chalk.bgBlue("create-hydrastack-app"));

await renderTitle();

const projectConfig = await p.group(
	{
		projectName: () =>
			p.text({
				message: "What is the name of your project?",
				validate: (value) => {
					if (!value) return "Project name cannot be empty";
					if (existsSync(value)) return "Directory already exists";
					return;
				},
			}),
		projectType: () =>
			p.select({
				message: "What type of project do you need?",
				options: [
					{ value: "client", label: "Client" },
					{ value: "server", label: "Server" },
					{ value: "fullstack", label: "FullStack" },
				],
			}),
	},
	{
		onCancel: ({ results }) => {
			p.cancel("Operation cancelled.");
			process.exit(0);
		},
	},
);

// Scaffold

const spinner = p.spinner();
spinner.start("Creating HydraStack App...");

try {
	const { projectName, projectType } = projectConfig;
	const projectPath = path.resolve(process.cwd(), projectName);

	if (projectType === "client") {
		await installTanStackRouter({ projectPath });
		await installBiome({ projectPath });
		await installPostHog({ projectPath });
	}

	if (projectType === "server") {
		p.cancel(chalk.bold.cyan("Coming Soon!"));
		process.exit(0);
	}

	if (projectType === "fullstack") {
		p.cancel(chalk.bold.cyan("Coming Soon!"));
		process.exit(0);
	}

	await postInstall({
		projectName,
		projectType,
		projectPath,
	});

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
