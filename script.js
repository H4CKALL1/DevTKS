// Predefined list of valid keys with their corresponding access numbers
const validKeys = [
    { number: 0, key: "AB12-CD34" },
    { number: 1, key: "EF56-GH78" },
    { number: 2, key: "IJ90-KL12" },
    { number: 3, key: "MN34-OP56" },
    { number: 4, key: "QR78-ST90" },
    { number: 5, key: "UV12-WX34" },
    { number: 6, key: "YZ56-AB78" },
    { number: 7, key: "CD90-EF12" },
    { number: 8, key: "GH34-IJ56" },
    { number: 9, key: "KL78-MN90" },
    { number: 10, key: "OP12-QR34" },
    { number: 11, key: "ST56-UV78" },
    { number: 12, key: "WX90-YZ12" },
    { number: 13, key: "AB34-CD56" },
    { number: 14, key: "EF78-GH90" },
    { number: 15, key: "IJ12-KL34" },
    { number: 16, key: "MN56-OP78" },
    { number: 17, key: "QR90-ST12" },
    { number: 18, key: "UV34-WX56" },
    { number: 19, key: "YZ78-AB90" },
    { number: 20, key: "CD12-EF34" },
    { number: 21, key: "GH56-IJ78" },
    { number: 22, key: "KL90-MN12" },
    { number: 23, key: "OP34-QR56" },
    { number: 24, key: "ST78-UV90" },
    { number: 25, key: "WX12-YZ34" },
    { number: 26, key: "AB56-CD78" },
    { number: 27, key: "EF90-GH12" },
    { number: 28, key: "IJ34-KL56" },
    { number: 29, key: "MN78-OP90" },
    { number: 30, key: "QR12-ST34" },
    { number: 31, key: "UV56-WX78" },
    { number: 32, key: "YZ90-AB12" },
    { number: 33, key: "CD34-EF56" },
    { number: 34, key: "GH78-IJ90" },
    { number: 35, key: "KL12-MN34" },
    { number: 36, key: "OP56-QR78" },
    { number: 37, key: "ST90-UV12" },
    { number: 38, key: "WX34-YZ56" },
    { number: 39, key: "AB78-CD90" },
    { number: 40, key: "EF12-GH34" },
];

// Function to get or assign a permanent number to the user
function getOrAssignUserNumber() {
    let userNumber = localStorage.getItem('userNumber');

    if (userNumber === null) {
        // Assign a random number between 0 and 40 if not already assigned
        userNumber = Math.floor(Math.random() * 41);
        localStorage.setItem('userNumber', userNumber);
    }

    return userNumber;
}

// Call this function on page load to make sure the user has a number
const userNumber = getOrAssignUserNumber();

// Display only the user's number (they will not know the key)
function displayUserNumber() {
    const userInfoElement = document.getElementById('user-info');
    userInfoElement.innerHTML = `Your access number is: <strong>${userNumber}</strong>`;
}

// Call displayUserNumber to show the user's number
displayUserNumber();

// Function to log the key for your reference
function logUserKey() {
    const userKey = validKeys[userNumber].key; // Accessing the key using userNumber
    console.log(`User with access number ${userNumber} has the key: ${userKey}`);
}

// Call logUserKey to see the key in the console
logUserKey();

function checkKey() {
    const userInput = document.getElementById('keyInput').value;
    const errorMessage = document.getElementById('error-message');

    // Check if the user's input key matches the key associated with their number
    if (userInput === validKeys[userNumber].key) {
        // Redirect to main.html if key is valid
        window.location.href = "main.html";
    } else {
        // Display error message if the key is invalid
        errorMessage.textContent = "Invalid Key! Please try again.";
        errorMessage.style.display = 'block';
    }
}
