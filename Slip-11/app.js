const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Define a route to handle file download
app.get('/download', (req, res) => {
    // Path to the file you want to download
    const filePath = 'demo.txt'; // Update the path with your file path

    // Get the filename from the file path
    const filename = path.basename(filePath);

    // Set the content disposition to "attachment" to prompt the browser to download the file
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);

    // Read the file and stream it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Navigate to http://localhost:3000/download in your web browser. The browser will prompt the user to download the file specified in the code.
// Make sure to replace 'path/to/your/file.txt' with the actual path to the file you want to transfer.