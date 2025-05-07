import { intro, select } from '@clack/prompts';



intro(`Stack`);


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
