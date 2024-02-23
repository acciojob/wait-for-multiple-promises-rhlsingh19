//your JS code here. If required.
// Function to generate a random time between 1 and 3 seconds
function getRandomTime() {
    return Math.floor(Math.random() * 3000) + 1000; // Random time between 1000 and 3000 milliseconds (1 to 3 seconds)
}

// Function to create a Promise that resolves after a random time
function createPromise(id) {
    return new Promise(resolve => {
        const time = getRandomTime();
        setTimeout(() => {
            resolve({ id, time: time / 1000 }); // Resolve with id and time taken in seconds
        }, time);
    });
}

// Create an array to hold the promises
const promises = [];

// Create 3 promises and push them into the array
for (let i = 1; i <= 3; i++) {
    promises.push(createPromise(i));
}

// Add a row with Loading...
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
document.getElementById('your-table-id').appendChild(loadingRow);

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
    .then(results => {
        // Remove the loading row
        loadingRow.remove();

        // Populate the table with the results
        results.forEach(result => {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            idCell.textContent = `Promise ${result.id}`;
            const timeCell = document.createElement('td');
            timeCell.textContent = result.time.toFixed(3);
            row.appendChild(idCell);
            row.appendChild(timeCell);
            document.getElementById('your-table-id').appendChild(row);
        });

        // Calculate and add the total time
        const totalTime = results.reduce((acc, curr) => acc + curr.time, 0);
        const totalRow = document.createElement('tr');
        const totalIdCell = document.createElement('td');
        totalIdCell.textContent = 'Total';
        const totalTimeCell = document.createElement('td');
        totalTimeCell.textContent = totalTime.toFixed(3);
        totalRow.appendChild(totalIdCell);
        totalRow.appendChild(totalTimeCell);
        document.getElementById('your-table-id').appendChild(totalRow);
    });

