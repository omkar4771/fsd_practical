const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Extract the requested file path from the URL
    const filePath = '.' + req.url;

    // Read the file asynchronously
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If file not found or any other error, throw a 404 error
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
        } else {
            // If file is found, send its content to the client
            const extname = path.extname(filePath);
            const contentType = getContentType(extname);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Map file extensions to content types
function getContentType(extname) {
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        default:
            return 'text/plain';
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
