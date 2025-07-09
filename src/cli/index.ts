#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { scaffold } from "@/core/scaffold";
import { renderTitle } from "@/utils/renderTitle";
import * as p from "@clack/prompts";
import chalk from "chalk";

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
				message: "What starter do you need?",
				options: [
					{ value: "router", label: "TanStack Router" },
					{ value: "api", label: "API" },
					{ value: "start", label: "TanStack Start" },
				],
			}),
		useQuery: ({ results }) => {
			if (results.projectType === "start" || results.projectType === "router") {
				return p.confirm({
					message: "Would you like to include TanStack Query?",
					initialValue: true,
				});
			}
		},
	},
	{
		onCancel: ({ results }) => {
			p.cancel("Operation cancelled.");
			process.exit(0);
		},
	},
);

scaffold({
	...projectConfig,
	useQuery:
		typeof projectConfig.useQuery === "boolean"
			? projectConfig.useQuery
			: undefined,
});
