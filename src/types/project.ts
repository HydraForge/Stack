export type ProjectType = "start" | "router" | "api";
export type PossibleEnhancements = "tailwind" | "shadcn" | "biome" | "query";

export interface ProjectConfig {
  projectName: string;
  projectType: ProjectType;
  tools?: Array<PossibleEnhancements>;
}
