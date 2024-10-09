document.addEventListener("DOMContentLoaded", function () {
    // Call the fetch function initially
    fetchCurrentGameIssue();
    fetchPreviousResults();
    setInterval(fetchPreviousResults, 30000); // Fetch previous results every 30 seconds
    setTimeout(() => { location.reload(); }, 29000); // Reload every 29 seconds
});

async function fetchCurrentGameIssue() {
    const apiUrl = 'https://api.bdg88zf.com/api/webapi/GetGameIssue';
    const requestData = {
        "typeId": 1,
        "language": 0,
        "random": "99faf1d1c84c48049a84475cbaa0a350",
        "signature": "F83A81877FFAF7DD467A095E82B1DCE5",
        "timestamp": Math.floor(Date.now() / 1000)
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.code === 0) {
                updateTimer(data.data);
                // Get a new prediction for display
                const prediction = getRandomPrediction();
                updateResults(prediction);
            } else {
                console.error('Failed to fetch game issue:', data.msg);
            }
        } else {
            console.error('Network response was not ok:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to generate a random prediction
function getRandomPrediction() {
    const options = ["BIG", "SMALL"];
    return options[Math.floor(Math.random() * options.length)];
}

// Function to update both result elements with the same prediction
function updateResults(prediction) {
    document.getElementById('result-1').textContent = prediction;
    document.getElementById('result-2').textContent = prediction;
}

function updateTimer(data) {
    // Update period numbers
    document.getElementById('period-number').textContent = data.issueNumber;
    document.getElementById('period-number-2').textContent = data.issueNumber;

    const endTime = new Date(data.endTime).getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('seconds').textContent = "00";
            fetchCurrentGameIssue();
            fetchPreviousResults();
        }
    }, 1000);
}

async function fetchPreviousResults() {
    const apiUrl = 'https://api.bdg88zf.com/api/webapi/GetNoaverageEmerdList';
    const requestData = {
        "pageSize": 10,
        "pageNo": 1,
        "typeId": 30,
        "language": 0,
        "random": "48315d525a224df4836d2688b6b8dc14",
        "signature": "FB219EE509F98CC88DD7EF298CD031E6",
        "timestamp": Math.floor(Date.now() / 1000)
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.code === 0) {
                updatePreviousResults(data.data.list);
            } else {
                console.error('Failed to fetch previous results:', data.msg);
            }
        } else {
            console.error('Network response was not ok:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function updatePreviousResults(resultList) {
    const historyTable = document.getElementById('history-list');
    historyTable.innerHTML = ''; // Clear existing history

    resultList.forEach(result => {
        const { issueNumber, number, colour } = result;
        const size = number <= 4 ? 'SMALL' : 'BIG';  // Determine size based on number

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${issueNumber}</td>
            <td>${number}</td>
            <td>${size}</td>
            <td>${colour.toUpperCase()}</td>
        `;
        historyTable.appendChild(row);
    });
}

// Ensure the balls are updated (if needed)
function updateBalls(results) {
    const balls = document.querySelectorAll('.ball');

    results.forEach((result, index) => {
        if (balls[index]) {
            balls[index].textContent = result.number;
            balls[index].className = 'ball';  // Reset classes
            balls[index].classList.add(result.colour.toLowerCase());  // Add colour class
        }
    });
}