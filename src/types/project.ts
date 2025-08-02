export type ProjectType = "start" | "router" | "api";
export type PossibleEnhancements =
	| "tailwind"
	| "shadcn"
	| "biome"
	| "query"
	| "inter";

export interface ProjectConfig {
	projectName: string;
	projectType: ProjectType;
	tools?: Array<PossibleEnhancements>;
}
