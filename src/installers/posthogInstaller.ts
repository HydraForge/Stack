import path from "node:path";
import { postHogWrapperTemplate } from "~/templates/posthogWrapper.ts";

interface postHogOptions {
	projectPath: string;
}

async function installPostHog(config: postHogOptions): Promise<void> {
	const { projectPath } = config;

	const postHogInstaller = Bun.spawnSync(["bun", "add", "posthog-js"], {
		cwd: projectPath,
		stdout: "ignore",
		stderr: "pipe",
	});

	if (postHogInstaller.exitCode !== 0) {
		const errorMessage = new TextDecoder().decode(postHogInstaller.stderr);
		throw new Error(`Failed to install PostHog: ${errorMessage}`);
	}

	const postHogWrapperComponent = Bun.file(
		path.join(projectPath, "src", "components", "PostHogProviderWrapper.tsx"),
	);

	await Bun.write(postHogWrapperComponent, postHogWrapperTemplate);
}

export { installPostHog };
