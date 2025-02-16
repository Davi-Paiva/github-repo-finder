const apiKey = process.env.REACT_APP_GITHUB_API_KEY;

if (!apiKey || apiKey.length === 0) {
    throw new Error('GitHub API key is not defined in environment variables');
}

export const githubClient = {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/vnd.github.v3+json'
    }
};