const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/employee_registration.html');
});

// Validation rules for employee registration
const registrationValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('mobile').isMobilePhone().withMessage('Invalid mobile number')
    // Add more validation rules for other fields
];

// Handle form submission and perform validation
app.post('/register', registrationValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, process the form data
    const { name, email, mobile } = req.body;
    // Save to database or perform other actions
    
    res.send('Employee registered successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
