const leetcodeApi = 'https://leetcode-stats-api.herokuapp.com/Bobwayde';
const statisticsElement = document.getElementById('leetcode-statistics');

// Display "Retrieving data" message
statisticsElement.innerHTML = '<h4>Retrieving statistics...</h4>';

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
                    <div style="font-weight: 700; font-size: 10rem; background-color: red;">${totalSolved}</div>
                    <div style="display: flex; flex-direction: column; justify-content: space-around; background-color: blue; height: 100%">
                        <h4 style="color: #00b8a3">${easySolved}</h4>
                        <h4 style="color: #ffc01e">${mediumSolved}</h4>
                        <h4 style="color: #ee365b">${hardSolved}</h4>
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
