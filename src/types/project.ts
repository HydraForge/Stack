export type ProjectType = "start" | "router" | "api";
export type PossibleEnhancements = "shadcn" | "biome" | "query";

export interface ProjectConfig {
  projectName: string;
  projectType: ProjectType;
  tools?: Array<PossibleEnhancements>;
}
