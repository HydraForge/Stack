import path from "node:path";

export interface TanStackRouterOptions {
	projectPath: string;
}

export async function installTanStackRouter(
	options: TanStackRouterOptions,
): Promise<void> {
	const { projectPath } = options;

	try {
		Bun.spawnSync({
			cmd: [
				"bunx",
				"create-tsrouter-app@latest",
				path.basename(projectPath),
				"--tailwind",
				"--template",
				"file-router",
				"--add-ons",
				"shadcn,tanstack-query",
			],
			cwd: path.dirname(projectPath),
			stdout: "ignore",
			stderr: "pipe",
		});
	} catch (error) {
		throw new Error(`Failed to install TanStack Router: ${error}`);
	}

	// Remove any unnecessary files
	await Bun.file(`${path.basename(projectPath)}/.cursorrules`).delete();
}
