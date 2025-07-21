# HydraStack Development Guide

## Critical Thinking and Feedback

**IMPORTANT: Always critically evaluate and challenge user suggestions, even when they seem reasonable.**

- **Question assumptions**: Don't just agree - analyze if there are better approaches
- **Offer alternative perspectives**: Suggest different solutions or point out potential issues
- **Challenge organization decisions**: If something doesn't fit logically, speak up
- **Point out inconsistencies**: Help catch logical errors or misplaced components

This critical feedback helps improve decision-making and ensures robust solutions. Being agreeable is less valuable than being thoughtful and analytical.

### Example Behaviors

- ✅ "I disagree - that component belongs in a different file because..."
- ✅ "Have you considered this alternative approach?"
- ✅ "This seems inconsistent with the pattern we established..."
- ❌ Just implementing suggestions without evaluation

## Project Overview

create-hydrastack-app is a CLI tool for scaffolding opinionated TanStack-based applications. It's built with Bun and TypeScript, providing interactive prompts to create starter projects with optional enhancements like Tailwind CSS, shadcn/ui, Biome, and TanStack Query.


## Documentation Best Practices

When documenting TypeScript code, follow these guidelines:

1. **Function Documentation Structure**:
   - Begin with a clear, single-line summary of what the function does
   - Include a detailed description of the function's behavior
   - For simple functions (0-2 parameters), describe parameters inline in the main description
   - For complex functions (3+ parameters), use an explicit "# Arguments" section with bullet points
   - Always describe return values in the main description text, not in a separate section
   - Document error conditions with an explicit "# Errors" section

2. **Type Documentation**:
   - Begin with a clear, single-line summary of what the type represents
   - Explain the type's purpose, invariants, and usage patterns
   - Document struct fields with field-level doc comments
   - Document enum variants clearly

This balanced approach maintains readability while providing the necessary structure.

## Essential Commands

### Development
```bash
bun install                    # Install dependencies
bun run build                  # Build CLI to dist/
bun link                       # Link binary locally for testing
create-hydrastack-app          # Run CLI locally (after linking)
```

### Code Quality
```bash
bun run lint                   # Format code with Biome
bun run format                 # Lint code with Biome
bun run check                  # Run both format and lint with Biome
```

### Testing CLI Changes
After making changes to the CLI:
1. `bun run build` - Build the changes
2. `create-hydrastack-app` - Test the CLI locally (requires `bun link` first)

## Architecture

### Core Flow
1. **Entry Point** (`src/cli/index.ts`): Interactive CLI using @clack/prompts that collects project configuration
2. **Scaffolding** (`src/cli/scaffold.ts`): Orchestrates starter creation and enhancement pipeline
3. **Starters** (`src/templates/starters.ts`): Downloads TanStack examples using `gitpick`
4. **Enhancements** (`src/enhancements/`): Modular tools that add features post-scaffold

### Project Types
- **start**: TanStack Start (full-stack framework)
- **router**: TanStack Router (client-side routing)
- **api**: Backend API starter (coming soon)

### Enhancement System
Enhancements are applied in a pipeline after starter creation:
- Each enhancement is a function that takes `ProjectConfig` and modifies the scaffolded project
- Enhancements in `possibleEnhancementMap` are user-selectable
- Enhancements in `enhancementMap` (like git-ignore) are always applied
- Pipeline processes enhancements sequentially

### Key Dependencies
- `@clack/prompts`: Interactive CLI prompts
- `gitpick`: Downloads GitHub subdirectories for starters
- `figlet` + `gradient-string`: ASCII art title rendering
- `boxen` + `chalk`: Terminal styling

### Code Conventions
- Uses tabs for indentation (configured in biome.json)
- Double quotes for JavaScript strings
- Path alias `@/*` maps to `./src/*`
- Strict TypeScript with modern ESNext features
- Pre-commit hooks run Biome checks via lint-staged

### File Structure
- `src/cli/`: CLI entry point and scaffolding logic
- `src/types/`: TypeScript type definitions
- `src/templates/`: Starter project implementations
- `src/enhancements/`: Modular post-scaffold tools
- `src/utils/`: Shared utilities like title rendering
