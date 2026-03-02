// // Creating array of sample user data
const arrUsers = [
    { id: 1001, firstName: "Alice", lastName: "Smith", age: 25, city: "New York", isActive: true },
    { id: 1002, firstName: "Bob", lastName: "Jones", age: 30, city: "Los Angeles", isActive: false },
    { id: 1003, firstName: "Charlie", lastName: "Murphy", age: 35, city: "Chicago", isActive: true },
    { id: 1004, firstName: "Diana", lastName: "Wilson", age: 28, city: "Houston", isActive: true },
    { id: 1005, firstName: "Ethan", lastName: "Brown", age: 42, city: "Phoenix", isActive: false },
    { id: 1006, firstName: "Fiona", lastName: "Davis", age: 31, city: "Philadelphia", isActive: true },
    { id: 1007, firstName: "George", lastName: "Miller", age: 27, city: "San Antonio", isActive: true },
    { id: 1008, firstName: "Hannah", lastName: "Garcia", age: 38, city: "San Diego", isActive: false },
    { id: 1009, firstName: "Ian", lastName: "Rodriguez", age: 29, city: "Dallas", isActive: true },
    { id: 1010, firstName: "Julia", lastName: "Martinez", age: 33, city: "San Jose", isActive: false }
];
console.log(arrUsers);

// Add main heading container
const mainHeadingContainer = document.createElement("header");
// Create h1 heading with text
const mainHeading = document.createElement("h1");
mainHeading.innerText = "List of users";
// Inject h1 in heading container
mainHeadingContainer.appendChild(mainHeading);
// Inject heading container at top of web page
document.body.appendChild(mainHeadingContainer);

// Add DIV container to hold data
const displayOutputDIV = document.createElement("div");
// Add CSS class to data container for styling
displayOutputDIV.classList.add("data-output");
// Inject data container to web page under header
document.body.appendChild(displayOutputDIV);

// Build HTML output with compound assignment and forEach() loop;
let htmlOutput = ''; // initial value is an empty string ""
let userStatus; // variable to display user active or inactive
let totalUsers = arrUsers.length; // variable to hold total number of users for later display
let totalAge = 0; // variable to hold total age of all users for later display

arrUsers.forEach(user => {
    // Check status of user and assign text to userStatus variable with CSS classes for styling
    userStatus = user.isActive ? "<span class='active-user'>ACTIVE</span>" : "<span class='inactive-user'>INACTIVE</span>";
    htmlOutput += `<div><p>
    <b>${user.lastName.toUpperCase()}</b> ${user.firstName} (ID: ${user.id}) <i>Age</i>: ${user.age} from ${user.city} ${userStatus}
    </p></div>`;
    // Add this user's age to totalAge
    totalAge += user.age;
});

// Inject the HTML output into the data container
displayOutputDIV.innerHTML = htmlOutput;

// Append the data container to the body
document.body.appendChild(displayOutputDIV);

// Outside the loop, display the total numbers of users and their average age
const averageAge = totalAge / totalUsers;

// Create a new DIV to hold the totals output
const totalsOutputDiv = document.createElement("div");
// Add CSS class to totals output DIV for styling
totalsOutputDiv.classList.add("totals-output");

// Create a new paragraph element to display the totals and average age
const totalsOutput = document.createElement("p");
// Set the innerHTML of the totals output paragraph with total users and average age, using toFixed(2) to limit average age to 2 decimal places
totalsOutput.innerHTML = `<p><b>Total Users:</b> ${totalUsers} <b>Average Age:</b> ${averageAge.toFixed(2)}</p>`;
// Append the totals output paragraph to the totals output DIV
totalsOutputDiv.appendChild(totalsOutput);
// Append the totals output DIV to the body of the web page, under previous content
document.body.appendChild(totalsOutputDiv);