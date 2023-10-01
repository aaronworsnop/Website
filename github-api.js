const username = 'aaronworsnop';
const accessToken = 'PLACEHOLDER';
const apiUrl = 'https://api.github.com';

async function getCommitsOnDate(date) {
  try {
    const response = await fetch(`${apiUrl}/search/commits?q=author:${username}+committer-date:${date}&sort=committer-date&order=desc`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.cloak-preview',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`\nCommits on ${date}: ${data.total_count}`);
    data.items.forEach(item => {
      console.log(`- ${item.commit.message} in ${item.repository.full_name}`);
    });
  } catch (error) {
    console.error('Error fetching commit count:', error.message);
  }
}

function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

// Example usage:
console.log(`Fetching commit data for user: ${username}`);
getCommitsOnDate(getYesterday());
