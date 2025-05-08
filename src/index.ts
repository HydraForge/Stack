#!/usr/bin/env bun

import { cancel, confirm, intro, isCancel, select } from "@clack/prompts";
import { text } from "@clack/prompts";
import chalk from "chalk";
import {renderTitle} from "~/utils.ts";
intro(chalk.bgBlue("create-hydrastack-app"));

renderTitle();

const projectName = await text({
	message: "What is the name of your project?",
});

if (isCancel(projectName)) {
	cancel("Operation cancelled.");
	process.exit(0);
}

const projectType = await select({
	message: "Select the type of project:",
	options: [
		{
			label: "Client",
			value: "client",
		},
		{
			label: "Server",
			value: "server",
		},
		{
			label: "Full-Stack",
			value: "full-stack",
		},
	],
});

if (isCancel(projectType)) {
	cancel("Operation cancelled.");
	process.exit(0);
}

const shouldInstallDependencies = await confirm({
	message: "Do you want to install dependencies?",
});

if (isCancel(shouldInstallDependencies)) {
	cancel("Operation cancelled.");
	process.exit(0);
}
