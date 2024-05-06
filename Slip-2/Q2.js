const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');

// Create a simple HTML form
const formHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Append File Contents</title>
</head>
<body>
<form method="post" action="/append">
    <label for="file1">First File Name:</label>
    <input type="text" id="file1" name="file1"><br><br>
    <label for="file2">Second File Name:</label>
    <input type="text" id="file2" name="file2"><br><br>
    <input type="submit" value="Append">
</form>
</body>
</html>
`;

// Create a HTTP server
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const reqPath = reqUrl.pathname;

    if (req.method === 'GET' && reqPath === '/') {
        // Serve the HTML form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(formHtml);
    } else if (req.method === 'POST' && reqPath === '/append') {
        // Parse form data
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            const file1 = formData.file1;
            const file2 = formData.file2;

            // Read the contents of the first file
            fs.readFile(file1, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found or cannot be read.');
                } else {
                    // Append the contents of the first file to the second file
                    fs.appendFile(file2, data, err => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error appending file contents.');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('File contents appended successfully.');
                        }
                    });
                }
            });
        });
    } else {
        // Serve a 404 page for unknown paths
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
