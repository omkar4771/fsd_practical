const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// User database (temporary storage)
let users = [];

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the User Login System');
});

app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="post">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/profile');
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/register', (req, res) => {
    res.send(`
        <form action="/register" method="post">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    `);
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.some(user => user.username === username)) {
        res.send('Username already exists');
    } else {
        users.push({ username, password });
        res.redirect('/login');
    }
});

app.get('/profile', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.send(`Welcome ${user.username}`);
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
