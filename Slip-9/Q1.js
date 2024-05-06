const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);

    // Check if the request is for the form page
    if (parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <html>
            <head>
                <title>String Concatenation</title>
            </head>
            <body>
                <h2>String Concatenation Form</h2>
                <form action="/concatenate" method="get">
                    <label for="string1">String 1:</label>
                    <input type="text" id="string1" name="string1" required><br><br>
                    <label for="string2">String 2:</label>
                    <input type="text" id="string2" name="string2" required><br><br>
                    <button type="submit">Concatenate</button>
                </form>
            </body>
            </html>
        `);
        res.end();
    }

    // Check if the request is to concatenate strings
    else if (parsedUrl.pathname === '/concatenate') {
        const query = parsedUrl.query;
        const string1 = query.string1 || '';
        const string2 = query.string2 || '';
        const result = string1 + string2;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <html>
            <head>
                <title>String Concatenation Result</title>
            </head>
            <body>
                <h2>Concatenation Result</h2>
                <p>String 1: ${string1}</p>
                <p>String 2: ${string2}</p>
                <p>Concatenated Result: ${result}</p>
            </body>
            </html>
        `);
        res.end();
    }

    // If the request is for an unknown route
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
