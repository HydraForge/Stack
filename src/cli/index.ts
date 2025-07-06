#!/usr/bin/env bun
import { existsSync } from "node:fs";
import * as p from "@clack/prompts";
import chalk from "chalk";
import { scaffold } from "~/core/scaffold";
import { renderTitle } from "~/utils/renderTitle";

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

scaffold(projectConfig);
