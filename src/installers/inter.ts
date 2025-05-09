import * as fs from "node:fs";
import path from "node:path";

interface interOptions {
	projectPath: string;
}

async function installInterFont(config: interOptions): Promise<void> {
	const { projectPath } = config;

	const source = path.join(__dirname, "../templates/fonts");
	const destination = path.join(projectPath, "public", "fonts");

	// Copy templates/fonts to public/fonts
	fs.cpSync(source, destination, { recursive: true });

	// Customized styles.css
	const CSSFilePath = path.join(projectPath, "src", "styles.css");
	const CSSTemplatePath = path.join(__dirname, "../templates/styles.css");

	const CSSContents = await Bun.file(CSSTemplatePath).text();

	await Bun.write(CSSFilePath, CSSContents);
}
export { installInterFont };
