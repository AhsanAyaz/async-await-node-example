const octokit = require('@octokit/rest')()
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file
 */
dotenv.config({path: __dirname + '/.env'});

octokit.authenticate({
    type: 'token',
    token: process.env.GITHUB_TOKEN
})

/**
 * @author Ahsan Ayaz
 * @desc Gets the stargazers for a specified repository from github
 * @returns {Promise}
 */
function getStarGazers() {
    const owner = 'koderlabs';
    const repo = 'ngx-device-detector';
    const per_page = 100;
    const page = 0;
    return octokit.activity.getStargazersForRepo({owner, repo, per_page, page});
}

/**
 * @author Ahsan Ayaz
 * @desc Demonstrates how the stargazers are retrieved using standard Promise.then
 */
function startWPromise() {
    getStarGazers()
        .then(result => {
            const data = processResponse(result);
            console.log('stargazers', data.starGazers);
        })
        .catch(err => {
            console.log('Could not fetch stargazers');
            console.log(err.message);
        });
}

/**
 * @author Ahsan Ayaz
 * @desc Demonstrates how to use async await to fetch the stargazers
 */
async function startWAwait() {
    try {
        const result = await getStarGazers();
        const data = processResponse(result);
        console.log('stargazers', data.starGazers);
    }
    catch(err) {
        console.log('Could not fetch stargazers');
        console.log(err.message);
    }
}

/**
 * @author Ahsan Ayaz
 * @desc Processes the data retrieved from the Github API before we console it out
 */
function processResponse(response) {
    const data = response.data.map(entry => {
        return entry.user.login
    });
    
    return {
        stars: data.length,
        starGazers: data
    };
}

// startWPromise();
startWAwait();
console.log('execution started. life goes on');