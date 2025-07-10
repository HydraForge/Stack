export type ProjectType = "start" | "router" | "api";

export interface ProjectConfig {
  projectName: string;
  projectType: ProjectType;
  tools?: Array<string>;
}
