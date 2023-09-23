// Replace with your GitHub username and access token
const username = 'aaronworsnop';
const accessToken = 'PLACEHOLDER';

// Define the GitHub API base URL
const apiUrl = 'https://api.github.com';

// Create headers with the access token for authentication
const headers = {
  Authorization: `Bearer ${accessToken}`,
};

// Function to get the number of commits made yesterday
async function getCommitsYesterday() {
    try {
      // Calculate the date for yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = yesterday.toISOString().split('T')[0];
  
      const response = await fetch(`${apiUrl}/search/commits?q=author:${username}+committer-date:${yesterdayISO}&sort=committer-date&order=desc`, {
        headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const commitCount = data.total_count;
      console.log(`Commits made yesterday: ${commitCount}`);
    } catch (error) {
      console.error('Error fetching commit count:', error.message);
    }
  }

// Function to get the number of repositories
async function getRepositoryCount() {
  try {
    const response = await fetch(`${apiUrl}/users/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const repoCount = data.public_repos;
    console.log(`Total repositories: ${repoCount}`);
  } catch (error) {
    console.error('Error fetching repository count:', error.message);
  }
}

// Function to get the number of pull requests (PRs) made or merged
async function getPullRequestCount() {
  try {
    const response = await fetch(`${apiUrl}/search/issues?q=type:pr+author:${username}+is:merged`, {
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const prCount = data.total_count;
    console.log(`Total merged PRs: ${prCount}`);
  } catch (error) {
    console.error('Error fetching PR count:', error.message);
  }
}

// Function to get the total number of commits made
async function getTotalCommitCount() {
    try {
    const response = await fetch(`${apiUrl}/users/${username}/repos?per_page=1000`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const repos = await response.json();
    let totalCommits = 0;

    for (const repo of repos) {
      const commitsResponse = await fetch(`${apiUrl}/repos/${username}/${repo.name}/commits`, {
        headers,
      });
      if (!commitsResponse.ok) {
        throw new Error(`HTTP error! Status: ${commitsResponse.status}`);
      }
      const commitsData = await commitsResponse.json();
      totalCommits += commitsData.length;
    }

    console.log(`Total commits: ${totalCommits}`);
  } catch (error) {
    console.error('Error fetching total commit count:', error.message);
  }
}

// Function to get the date of yesterday in ISO format (YYYY-MM-DD)
function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2);
    return yesterday.toISOString().split('T')[0];
  }
  

// Fetch and display the information
getCommitsYesterday();
getRepositoryCount();
getPullRequestCount();
getTotalCommitCount();
