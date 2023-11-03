const username = 'aaronworsnop';
const accessToken = 'PLACEHOLDER';
const apiUrl = 'https://api.github.com';

function countDaysSinceJune15() {
  const today = new Date();
  const june15 = new Date(2023, 5, 15); 

  // To calculate the time difference of two dates
  const timeDiff = Math.abs(today.getTime() - june15.getTime());

  // To calculate the number of days between two dates
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

  return diffDays;
}

// Call the function to get the number of days since June 15th
const daysSinceJune15 = countDaysSinceJune15();

document.getElementById('github-streak').innerText = daysSinceJune15;

