import chalk from "chalk";
import { input, select } from '@inquirer/prompts';



console.log(`
    ${chalk.green("Welcome!")}
    ${chalk.yellow("This is a CLI tool for setting up a new Stack project.")}
    ${chalk.blue("Please enter the name of your project:")}
`);


const appName = await input({
    message: 'Enter your project name:'
});


async function getProjectType() {
    const projectType = await select({
        message: 'Select the type of project:',
        choices: [
            {
                name: 'Client',
                value: 'client',
                description: `
                ${chalk.white("Client-side Application includes:")}
                ${chalk.cyan("Vite")} - Lightning fast dev server 
                ${chalk.blue("React")} - Library
                ${chalk.green("TanStack Router")} - Type-safe routing
                ${chalk.magenta("TailwindCSS")} - Utility-first CSS
                ${chalk.yellow("Shadcn/ui")} - Accessible components
                ${chalk.white("Inter")} - Modern sans-serif font
                ${chalk.hex('#F73A43')("Lucide Icons")} - Tree-shakable icon set
                ${chalk.hex('#FFA500')("Biome")} - Fast linting & formatting
                ${chalk.hex('#3178C6')("TypeScript")} - Static typing
                ${chalk.hex('#4B32C3')("Vitest")} - Unit testing
                ${chalk.hex('#FF4154')("TanStack Query")} - Server state management
                ${chalk.hex('#8B5CF6')("PostHog")} - Analytics & feature flags
                `,
            },
            {
                name: 'Server',
                value: 'server',
                description: `
                ${chalk.white("Server-side Application includes:")}
                ${chalk.green("Hono")} - Fast web framework
                ${chalk.yellow("Bun")} - JS runtime & package manager
                ${chalk.hex('#3178C6')("TypeScript")} - Static typing
                ${chalk.hex('#FFA500')("Biome")} - Fast linting & formatting
                ${chalk.hex('#8BC34A')("Better Auth")} - Auth framework
                ${chalk.hex('#8B5CF6')("PostHog Server SDK")} - Analytics
                ${chalk.hex('#FF4154')("Vitest")} - Unit testing
                `,
            },
            {
                name: 'Full-Stack',
                value: 'full-stack',
                description: `
                ${chalk.white("Full-stack Application includes everything:")}
                
                ${chalk.white.bold("Client:")}
                ${chalk.cyan("Vite")} - Lightning fast dev server 
                ${chalk.blue("React")} - Library
                ${chalk.green("TanStack Router")} - Type-safe routing
                ${chalk.magenta("TailwindCSS")} - Utility-first CSS
                ${chalk.yellow("Shadcn/ui")} - Accessible components
                ${chalk.white("Inter")} - Modern sans-serif font
                ${chalk.hex('#F73A43')("Lucide Icons")} - Tree-shakable icon set
                ${chalk.hex('#FF4154')("TanStack Query")} - Server state management
                
                ${chalk.white.bold("Server:")}
                ${chalk.green("Hono")} - Fast web framework
                ${chalk.yellow("Bun")} - JS runtime & package manager
                ${chalk.hex('#8BC34A')("Better Auth")} - Auth framework
                
                ${chalk.white.bold("Shared:")}
                ${chalk.hex('#3178C6')("TypeScript")} - Static typing
                ${chalk.hex('#FFA500')("Biome")} - Fast linting & formatting
                ${chalk.hex('#8B5CF6')("PostHog")} - Analytics & feature flags
                ${chalk.hex('#FF4154')("Vitest")} - Unit testing
                `,
            },
        ],
    });
    return handleProjectType(projectType);
}

async function handleProjectType(projectType: string) {
    switch (projectType) {
        case 'client':
            await generateClientProject();
            break;
        case 'server':
            await generateServerProject();
            break;
        case 'full-stack':
            await generateFullStackProject();
            break;
        default:
            console.log(`
                ${chalk.red("Error!")}
                ${chalk.yellow("Invalid project type. Please try again.")}
            `);
            process.exit(1);
    }
}

await getProjectType();

async function generateClientProject() {}
async function generateServerProject() {}
async function generateFullStackProject() {}