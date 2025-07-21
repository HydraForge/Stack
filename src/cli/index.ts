#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { scaffold } from "@/cli/scaffold";
import { renderTitle } from "@/utils/renderTitle";
import * as p from "@clack/prompts";
import chalk from "chalk";

p.intro(chalk.bgBlue("create-hydrastack-app"));

await renderTitle();

const projectConfig = await p.group(
  {
    projectName: () =>
      p.text({
        message: "What is the name of your project?",
        validate: (value) => {
          if (!value) return "Project name cannot be empty";
          if (existsSync(value)) return "Directory already exists";
          return;
        },
      }),
    projectType: () =>
      p.select({
        message: "What starter do you need?",
        options: [
          { value: "start", label: "TanStack Start" },
          { value: "router", label: "TanStack Router" },
          { value: "api", label: "API" },
        ],
      }),
    tools: () =>
      p.multiselect({
        message:
          "Select additional tools. (Press space to select & enter to skip)",
        options: [
          { value: "shadcn", label: "shadcn/ui" },
          { value: "biome", label: "Biome", hint: "recommended" },
          { value: "query", label: "TanStack Query" },
        ],
        required: false,
      }),
  },

  {
    onCancel: ({ results }) => {
      p.cancel("Operation cancelled.");
      process.exit(0);
    },
  },
);

await scaffold(projectConfig);
