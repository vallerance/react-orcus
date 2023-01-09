const axios = require('axios');

const { GITHUB_TOKEN, CF_BUILD_URL, CF_REVISION } = process.env;

const [stage, state] = process.argv.slice(2);

const descriptions = {
    pending: 'Build pending',
    success: 'Build successful',
    failure: 'Build failed',
};
const description = descriptions[state];

axios
    .post(
        `https://api.github.com/repos/vallerance/react-orcus/statuses/${CF_REVISION}`,
        {
            state,
            target_url: CF_BUILD_URL,
            description,
            context: `react-orcus/push/${stage}`,
        },
        {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }
    )
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
