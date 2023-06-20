const leetcodeApi = 'https://leetcode-stats-api.herokuapp.com/Bobwayde';
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
                <div style="display: flex; gap: 2rem;">
                    <div style="font-weight: 700; font-size: 10rem;">${totalSolved}</div>
                    <div style="display: flex; flex-direction: column; justify-content: center;">
                        <h1 style="color: #00b8a3">${easySolved}</h1>
                        <h1 style="color: #ffc01e">${mediumSolved}</h1>
                        <h1 style="color: #ee365b">${hardSolved}</h1>
                    </div>
                </div>
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
