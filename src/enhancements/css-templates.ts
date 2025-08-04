import { join } from "node:path";
import type { PossibleEnhancements, ProjectConfig } from "@/types/project";

export const selectCSSTemplate = (
  tools: PossibleEnhancements[],
): string | null => {
  const hasTailwind = tools.includes("tailwind");
  const hasShadcn = tools.includes("shadcn");
  const hasInter = tools.includes("inter");

  // No CSS-affecting tools selected
  if (!hasTailwind && !hasShadcn && !hasInter) {
    return null;
  }

  if (hasShadcn && hasInter) return "shadcn-inter.css";
  if (hasShadcn) return "shadcn.css";
  if (hasTailwind && hasInter) return "tailwind-inter.css";
  if (hasTailwind) return "tailwind.css";
  if (hasInter) return "inter.css";

  // Fallback but shouldn't ever be reached
  return null;
};

export const applyCSSTemplate = async (
  config: ProjectConfig,
): Promise<void> => {
  const template = selectCSSTemplate(config.tools ?? []);

  // eep original TanStack CSS
  if (!template) {
    return;
  }

  // Resolve template path relative to the built CLI location
  const templatePath = join(import.meta.dir, "templates", "css", template);
  const targetPath = join(config.projectName, "src", "styles", "app.css");

  const templateContent = await Bun.file(templatePath).text();
  await Bun.write(targetPath, templateContent);
};
