import path from "node:path";

export interface ProjectConfig {
	projectName: string;
	projectType: "client" | "server" | "fullstack";
	projectPath: string;
}

export async function postInstall(config: ProjectConfig): Promise<void> {
	const { projectName, projectPath } = config;

	// Add custom README
	const data = `# ${projectName} Created with HydraStack CLI`;
	await Bun.write(path.join(projectPath, "README.md"), data);

	return Promise.resolve();
}
