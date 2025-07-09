import type { ProjectConfig, ProjectType } from "@/types/project";
import { $ } from "bun";

export const starters: Record<ProjectType, (config: ProjectConfig) => void> = {
	start: async (options) => {
		const startBasic = "TanStack/router/tree/main/examples/react/start-basic";
		const startQuery =
			"TanStack/router/tree/main/examples/react/start-basic-react-query";
		console.log(`Scaffolding TanStack Start: ${options.projectName}`);

		// const repo =

		try {
			await $`bunx gitpick ${startBasic} ${options.projectName}`.quiet();
		} catch (e) {
			console.error(`Error: ${e}`);
		}
	},
	router: (options) => {
		console.log(`Scaffolding TanStack Router: ${options.projectName}`);
	},
	api: (options) => {
		console.log(`Scaffolding API: ${options.projectName}`);
	},
};
