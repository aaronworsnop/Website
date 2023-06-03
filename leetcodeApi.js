const leetcodeApi = 'https://leetcode-stats-api.herokuapp.com/Bobwayde';

fetch(leetcodeApi)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const totalSolved = data.totalSolved;
            const easySolved = data.easySolved;
            const mediumSolved = data.mediumSolved;
            const hardSolved = data.hardSolved;
            
            const statisticsElement = document.getElementById('leetcode-statistics');
            statisticsElement.innerHTML = `
                <p>Total Solved: ${totalSolved}</p>
                <p>Easy Solved: ${easySolved}</p>
                <p>Medium Solved: ${mediumSolved}</p>
                <p>Hard Solved: ${hardSolved}</p>
            `;
        } else {
            console.error('Failed to retrieve statistics:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });