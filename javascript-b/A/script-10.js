// === CALLBACK FUNCTIONS AS DATA RECEIVERS ===

/* The 'main function accepts a parameter named 'callback' 
But it already **has** the data (userName) for the callback to work with */
function fetchUserAndGreet(callback) {
    let userName = "Alice";
    callback(userName);
}

// Two callback functions that will receive data (name) from the 'main' function
const sayHello = userName => console.log(`Hello: ${userName}`);
const sayGoodbye = userName => console.log(`Goodbye: ${userName}`);

// Calling the 'main' function
fetchUserAndGreet(sayHello);    // Outputs: "Hello, Alice"
fetchUserAndGreet(sayGoodbye);  // Outputs: "Goodbye, Alice"