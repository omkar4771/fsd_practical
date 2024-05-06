const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username', // Replace with your MySQL username
  password: 'your_password' // Replace with your MySQL password
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // Create the student database
  connection.query('CREATE DATABASE IF NOT EXISTS student_db', (err) => {
    if (err) throw err;
    console.log('Student database created or already exists');

    // Switch to the student database
    connection.query('USE student_db', (err) => {
      if (err) throw err;

      // Create the students table
      connection.query(`CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
      )`, (err) => {
        if (err) throw err;
        console.log('Students table created or already exists');

        // Close the connection
        connection.end((err) => {
          if (err) throw err;
          console.log('Connection to MySQL server closed');
        });
      });
    });
  });
});
