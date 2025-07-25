import type { ProjectConfig } from "@/types/project";
import { join } from "node:path";

export const addInter = async (config: ProjectConfig): Promise<void> => {
  const cssPath = join(config.projectName, "src", "styles", "app.css");
  const content = await Bun.file(cssPath).text();

  const interImport = `@import url(https://fonts.bunny.net/css?family=inter:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);`;
  const fontFamily = `font-family: "Inter", 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';`;

  const withInterImport = `${interImport}\n\n${content}`;

  const updatedContent = config.tools?.includes("shadcn")
    ? withInterImport.replace(
        "@apply bg-background text-foreground;",
        `@apply bg-background text-foreground;\n\n\n${fontFamily}`,
      )
    : withInterImport.replace(/font-family:[\s\S]*?;/, fontFamily);

  await Bun.write(cssPath, updatedContent);
};
