async function fetcProductData() {
    // Fetch the resource and get a Response (status, headers, body stream)
    const response = await fetch("data/products.json");
    // Parse the response object to JSON
    const data = await response.json();
    // Verify the code is working by logging the data to the console
    console.log(data);
    displayProducts(data);
}

// Call the function to run the fetch request
fetchProductData();

// Function to handle the DOM output
function displayProducts(productsArray) {
    const container = document.getElementById("products-container");
    let htmlOutput = "";

    // Loop through each product in the array
    productsArray.forEach(product => {
        /* Build the HTML string using the compound assignment operator 
        and template literals.
        Line breaks added for readability */
        htmlOutput += `
            <p>
            <b>${product.name}</b>
            Price: $${product.price}  
            Available?: ${product.inStock ? "Yes" : "No"}
            </p>
        `;
    });

    /* Output the final HTML to the "products-container"
    DIV element on the web page */
    container.innerHTML = htmlOutput;
}

async function fetchProductData() {
    // Fetch the resource and get a Response (status, headers, body stream)
    const response = await fetch("data/products.json");
    // Parse the response object to JSON
    const data = await response.json();
    // Verify the code is working by logging the data to the console
    console.log(data);
}

// Call the function to run the fetch request
fetchProductData();