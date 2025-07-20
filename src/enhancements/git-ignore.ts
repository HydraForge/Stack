import type { ProjectConfig } from "@/types/project";

export const addGitIgnore = async (config: ProjectConfig): Promise<void> => {
	const configPath = `${config.projectName}`;
	console.log(configPath, "from git ignore");
};
