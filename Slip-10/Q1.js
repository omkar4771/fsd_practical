const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username', // Replace with your MySQL username
  password: 'your_password', // Replace with your MySQL password
  database: 'your_database_name' // Replace with the name of the database you want to create
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // SQL statement to create the college database
  const createDatabaseSQL = 'CREATE DATABASE IF NOT EXISTS college';

  // SQL statement to use the college database
  const useDatabaseSQL = 'USE college';

  // SQL statement to create the students table
  const createTableSQL = `CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    department VARCHAR(255) NOT NULL
  )`;

  // Execute the SQL statements to create the database and table
  connection.query(createDatabaseSQL, (err) => {
    if (err) throw err;
    console.log('College database created');
    
    // Switch to the college database
    connection.query(useDatabaseSQL, (err) => {
      if (err) throw err;
      console.log('Using college database');
      
      // Create the students table
      connection.query(createTableSQL, (err) => {
        if (err) throw err;
        console.log('Students table created');
        
        // Close the connection
        connection.end();
      });
    });
  });
});
