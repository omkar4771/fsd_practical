const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set content type to text/html
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Read the HTML file
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If there's an error reading the file, send a 500 Internal Server Error response
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        
        // Serve the contents of the HTML file
        res.end(data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// This script creates an HTTP server using Node.js's built-in http module. When a request is received, it sets the content type to text/html, reads the contents of the index.html file from the file system, and serves it as the response.

// Make sure you have an index.html file in the same directory as this script. You can replace index.html with the name of your HTML file if it's different.

// To run this script, save it as server.js and execute the following command in your terminal: