// Execute the following code when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the search buttons
    const searchButton = document.getElementById("searchButton");
    const searchButton2 = document.getElementById("searchButton2");

    // Add click event listeners to the search buttons
    searchButton.addEventListener("click", function() {
        // Get search type, search string, limit, start time, and end time
        const searchType = document.getElementById("searchType").value;
        const searchString = document.getElementById("searchInput").value;
        const limit = document.getElementById("limitInput").value;
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        
        // Call the search function with respective parameters
        search(searchType, searchString, limit, startTime, endTime, "searchResults");
    });

    // Add click event listener to the second search button
    searchButton2.addEventListener("click", function() {
        // Get search type and search string
        const searchType = document.getElementById("searchType2").value;
        const searchString = document.getElementById("searchInput2").value;
        
        // Call the search function with respective parameters
        search(searchType, searchString, null, null, null, "searchResults2");
    });

    // Listen for change event on the start time input
    document.getElementById("startTime").addEventListener("change", function() {
        console.log("Start time changed:", this.value);
    });

    // Listen for change event on the end time input
    document.getElementById("endTime").addEventListener("change", function() {
        console.log("End time changed:", this.value);
    });

    // Define the search function
    function search(searchType, searchString, limit, startTime, endTime, resultId) {
        // Make a search request
        fetch(`/search/${searchType}?string=${searchString}&limit=${limit}&start_time=${startTime}&end_time=${endTime}`)
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data); // Log the received data
            const resultContainer = document.getElementById(resultId);
            resultContainer.innerHTML = '';  // Clear the result container

            // Process the data based on its type
            if (Array.isArray(data)) {
                // If data is an array, iterate over it, create list items, and append them to the result container
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = JSON.stringify(item);
                    resultContainer.appendChild(listItem);
                });
            } else {
                // If data is not an array, create a single list item and append it to the result container
                const listItem = document.createElement('li');
                listItem.textContent = JSON.stringify(data);
                resultContainer.appendChild(listItem);
            }
        })
        .catch(error => console.error('Error searching:', error)); // Catch and log errors that occur during searching
    }
});

// Load top users data
function loadTopUsers() {
    // Make a request to fetch top users data
    fetch('/top_users')
    .then(response => response.json())
    .then(data => {
        // Get the user list container
        const userList = document.getElementById('topUsers');
        userList.innerHTML = '';  // Clear the user list

        // Iterate over user data, create user list items, and append them to the user list container
        data.forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = `${user.name} (${user.followers_count} followers)`;
            userList.appendChild(userItem);
        });
    })
    .catch(error => console.error('Error loading top users:', error)); // Catch and log errors that occur during loading user data
}

// Load top tweets data
function loadTopTweets() {
    // Make a request to fetch top tweets data
    fetch('/top_tweets')
    .then(response => response.json())
    .then(data => {
        // Get the tweet list container
        const tweetList = document.getElementById('topTweets');
        tweetList.innerHTML = '';  // Clear the tweet list

        // Iterate over tweet data, create tweet list items, and append them to the tweet list container
        data.forEach(tweet => {
            const tweetItem = document.createElement('li');
            tweetItem.textContent = `Tweet: ${tweet.text} (Favorites: ${tweet.favorite_count})`;
            tweetList.appendChild(tweetItem);
        });
    })
    .catch(error => console.error('Error loading top tweets:', error)); // Catch and log errors that occur during loading tweet data
}
