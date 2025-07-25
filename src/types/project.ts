export type ProjectType = "start" | "router" | "api";
export type PossibleEnhancements = "shadcn" | "biome" | "query" | "inter";

export interface ProjectConfig {
  projectName: string;
  projectType: ProjectType;
  tools?: Array<PossibleEnhancements>;
}
