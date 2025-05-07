import { renderTitle } from './src/utils';
import {intro, select} from "@clack/prompts";
import chalk from "chalk";
import { text } from '@clack/prompts';


intro(chalk.bgBlue('create-hydrastack-app'))
renderTitle();

async function getProjectName() {
    const projectName = await text({
        message: 'What is the name of your project?',
    });
}

await getProjectName();

async function getProjectType() {
    const projectType = await select({
        message: 'Select the type of project:',
        options: [
            {
                label: 'Client',
                value: 'client',
            },
            {
                label: 'Server',
                value: 'server',
            },
            {
                label: 'Full-Stack',
                value: 'full-stack',
            },
        ],
    });
}

await getProjectType();
