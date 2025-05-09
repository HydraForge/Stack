import path from "node:path";
import { biomeConfig } from "~/templates/biomeConfig.ts";

interface biomeOptions {
    projectPath: string;
}

async function installBiome(config: biomeOptions): Promise<void> {
    const { projectPath } = config;

    try {
        // Add Biome as a dependency
        const install = Bun.spawnSync({
            cmd: ["bun", "add", "--dev", "--exact", "@biomejs/biome"],
            cwd: projectPath,
            stdout: "ignore",
            stderr: "pipe",
        });

        if (install.exitCode !== 0) {
            throw new Error(`Failed to install Biome:\n${new TextDecoder().decode(install.stderr)}`);
        }

        // Create biome config file
        const init = Bun.spawnSync({
            cmd: ["bunx", "biome", "init"],
            cwd: projectPath,
            stdout: "ignore",
            stderr: "pipe",
        });

        if (init.exitCode !== 0) {
            throw new Error(`Failed to initialize Biome:\n${new TextDecoder().decode(install.stderr)}`);
        }

        // Customized biome.json
        const biomeJSONPath = path.join(projectPath, "biome.json");
        await Bun.write(biomeJSONPath, JSON.stringify(biomeConfig, null, 2));

        // Add custom scripts to package.json
        const packageJSONPath = path.join(projectPath, "package.json");
        const packageJSON = JSON.parse(await Bun.file(packageJSONPath).text());

        packageJSON.scripts = {
            ...packageJSON.scripts,
            format: "biome format --write src",
            lint: "biome lint --write src",
            check: "biome check --write src",
        };

        await Bun.write(packageJSONPath, JSON.stringify(packageJSON, null, 2));
    } catch (error) {
        throw new Error(`Failed to install Biome: ${error}`);
    }
}

export { installBiome };
