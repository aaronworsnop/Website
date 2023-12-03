const leetcodeApi = 'https://leetcode-stats-api.herokuapp.com/aaronworsnop';
const statisticsElement = document.getElementById('leetcode-statistics');

// Display "Retrieving data" message
statisticsElement.innerHTML = '<h4 style="margin-top: 0.5rem;">Retrieving statistics...</h4>';

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
                <div style="display: flex; gap: 1rem;">
                    <div style="font-weight: 700; font-size: 5rem;">${totalSolved}</div>
                    <div style="display: flex; flex-direction: column; justify-content: center; width: 100%;">
                        <div style="display: flex; flex-direction: row; justify-content: space-around; flex-wrap: wrap;">
                            <h1 style="color: #00b8a3; margin: 0.5rem 0 0 0.5rem; font-size: 2.5rem; line-height: 2rem">${easySolved}</h1>
                            <h1 style="color: #ffc01e; margin: 0.5rem 0 0 0.5rem; font-size: 2.5rem; line-height: 2rem">${mediumSolved}</h1>
                            <h1 style="color: #ee365b; margin: 0.5rem 0 0 0.5rem; font-size: 2.5rem; line-height: 2rem">${hardSolved}</h1>
                        </div>
                    </div>
                </div>
            `;
        } else {
            console.error('Failed to retrieve LeetCode statistics...', data.message);
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
