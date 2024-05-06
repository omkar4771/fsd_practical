const express = require('express');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <button type="submit">Upload</button>
        </form>
    `);
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
