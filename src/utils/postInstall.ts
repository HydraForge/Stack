import path from "node:path";
import dedent from "dedent";

export interface ProjectConfig {
	projectName: string;
	projectType: "client" | "server" | "fullstack";
	projectPath: string;
}

export async function postInstall(config: ProjectConfig): Promise<void> {
	const { projectName, projectPath } = config;

	// Add custom README
	const data = dedent(`
  # ${projectName}

  This project was bootstrapped using **[HydraStack CLI](https://github.com/HydraForge/Stack)**.

  ## 🚀 Getting Started

  Run the development server:

  \`\`\`bash
  bun dev
  \`\`\`

  ## 🛠️ Features

  - ⚡ Fast startup with Bun
  - ✨ Modern tooling preconfigured
  - 📦 Modular file structure
  - 🧪 Ready for testing and deployment
  
  ---
  > Generated with ❤️ by [HydraStack CLI](https://github.com/HydraForge/Stack)
`);
	await Bun.write(path.join(projectPath, "README.md"), data);

	// Add .env and .env.example
	const envData = dedent(`
	APP_NAME=
	VITE_APP_NAME=\${APP_NAME}
	`);
	await Bun.write(path.join(projectPath, ".env"), envData);
	await Bun.write(path.join(projectPath, ".env.example"), envData);

	return Promise.resolve();
}
