// Get the button element
const myButton = document.getElementById("myButton");

// Add event listener to button
myButton.addEventListener('click', e => {
    // Access properties of the event object
    console.log(e.target.id);        // ID of clicked element
    console.log(e.target.classList); // CSS class(es) of clicked element
});



document.getElementById('myNewButton').addEventListener('click', () => {
    console.log('Button clicked');
});

document.getElementById('inner').addEventListener('click', () => {
    console.log('Inner div clicked');
});

document.getElementById('outer').addEventListener('click', () => {
    console.log('Outer div clicked');
});