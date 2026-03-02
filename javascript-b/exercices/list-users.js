async function fetchUsersData() {
    // Fetch the resource and get a Response (status, headers, body stream)
    const response = await fetch("data/users.json");
    // Parse the response object to JSON
    const data = await response.json();
    // Verify the code is working by logging the data to the console
    console.log(data);
    displayUsers(data);
}

// Call the function to run the fetch request
fetchUsersData();

function displayUsers(usersArray) {
    const container = document.getElementById("user-container");
    let htmlOutput = "";

    // Loop through each user in the array
    usersArray.forEach(user => {   
        htmlOutput += `
            <p>
            <b>${user.firstName}</b>
            Price: ${user.lastName}
            Price: ${user.age}
            Premium: ${user.isActive ? "Yes" : "No"}   
            </p>
        `;
    });
    /* Output the final HTML to the "users-container"
    DIV element on the web page */
    container.innerHTML = htmlOutput;
}   