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
    .then(response => {
        console.log(
            'Status sent successfully: ',
            JSON.stringify(response.data, undefined, 2)
        );
        process.exit(0);
    })
    .catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(JSON.stringify(error.response.data, undefined, 2));
            console.error(error.response.status);
            console.error(JSON.stringify(error.response.headers, undefined, 2));
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
        console.error(JSON.stringify(error.config, undefined, 2));
        process.exit(1);
    });
