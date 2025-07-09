export type ProjectType = "router" | "api" | "start";

export interface ProjectConfig {
  projectName: string;
  projectType: ProjectType;
  tools?: Array<string>;
}
