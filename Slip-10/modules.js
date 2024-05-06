// modules.js

// Function to get today's date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
  }
  
  // Export the getCurrentDateTime function to make it available externally
  module.exports = {
    getCurrentDateTime: getCurrentDateTime
  };
  