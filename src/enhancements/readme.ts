import { join } from "node:path";
import type { ProjectConfig } from "@/types/project";
import { $ } from "bun";
import dedent from "dedent";

export const addReadMe = async (config: ProjectConfig): Promise<void> => {
	const readMePath = join(config.projectName, "README.md");

	const readMe = dedent(`
    # ${config.projectName}

    This project was bootstrapped using **[HydraStack CLI](https://github.com/lucent-hq/Stack)**.

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
	await $`touch ${readMePath}`;

	await Bun.write(readMePath, readMe);
};
