import path from "node:path";
import dedent from "dedent";
import { mainComponent } from "~/templates/mainComponent.ts";
import { styles } from "~/templates/styles.ts";

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
  
  ## 🛠️ Features

  - ⚡ Fast startup with Bun
  - ✨ Modern tooling preconfigured
  - 📦 Modular file structure
  - 🧪 Ready for testing and deployment

  ## 🚀 Getting Started

  Run the development server:

  \`\`\`bash
  bun dev
  \`\`\`
  
  # 🧹 Linting
  Ensure your code meets formatting and quality standards.

  ### Run lint check
  \`\`\`bash
  bun check
  \`\`\`
  
  ---
  > Generated with ❤️ by [HydraStack CLI](https://github.com/HydraForge/Stack)
`);
	await Bun.write(path.join(projectPath, "README.md"), data);

	// Add .env.example and .env
	const envData = dedent(`
	VITE_APP_NAME=
	
	# PostHog Analytics
	VITE_PUBLIC_POSTHOG_KEY=
	VITE_PUBLIC_POSTHOG_HOST=
	`);
	await Bun.write(path.join(projectPath, ".env.example"), envData);
	await Bun.write(path.join(projectPath, ".env"), envData);

	// Add customized styles.ts
	const CSSFilePath = path.join(projectPath, "src", "styles.css");
	await Bun.write(CSSFilePath, styles);

	// Add customized main.tsx
	const mainComponentPath = path.join(projectPath, "src", "main.tsx");
	await Bun.write(mainComponentPath, mainComponent);

	return Promise.resolve();
}
