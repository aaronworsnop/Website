const leetcodeApi = 'https://leetcode-stats-api.herokuapp.com/Bobwayde';
const statisticsElement = document.getElementById('leetcode-statistics');

// Display "Retrieving data" message
statisticsElement.innerHTML = '<p>Retrieving data...</p>';

// Function to fetch statistics and handle retries
const fetchStatistics = async () => {
    try {
        const response = await fetch(leetcodeApi);
        const data = await response.json();

        if (data.status === 'success') {
            const totalSolved = data.totalSolved;
            const easySolved = data.easySolved;
            const mediumSolved = data.mediumSolved;
            const hardSolved = data.hardSolved;

            // Update statistics
            statisticsElement.innerHTML = `
                <h4>Total Solved: ${totalSolved}</h4>
                <h4>Easy Solved: ${easySolved}</h4>
                <h4>Medium Solved: ${mediumSolved}</h4>
                <h4>Hard Solved: ${hardSolved}</h4>
            `;
        } else {
            console.error('Failed to retrieve statistics:', data.message);
            // Retry after a delay (e.g., 3 seconds)
            setTimeout(fetchStatistics, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        // Retry after a delay (e.g., 3 seconds)
        setTimeout(fetchStatistics, 3000);
    }
};

// Initial fetch
fetchStatistics();
