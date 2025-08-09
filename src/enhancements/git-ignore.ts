import { join } from "node:path";
import type { ProjectConfig } from "@/types/project";
import { $ } from "bun";

export const addGitIgnore = async (config: ProjectConfig): Promise<void> => {
	const gitIgnorePath = join(config.projectName, ".gitignore");
	const ignores = `
node_modules
.idea
.vscode
`;
	await $`touch ${gitIgnorePath}`;

	await Bun.write(gitIgnorePath, ignores);
};
