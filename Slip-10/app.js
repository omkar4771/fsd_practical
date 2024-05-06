// app.js main file run this

// Require the custom module
const myModule = require('./modules');

// Call the getCurrentDateTime function from the custom module
const dateTime = myModule.getCurrentDateTime();

// Print the result
console.log('Current date and time:', dateTime);
