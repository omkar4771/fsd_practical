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

  // SQL statement to create the movie database
  const createDatabaseSQL = 'CREATE DATABASE IF NOT EXISTS movie_database';

  // SQL statement to use the movie database
  const useDatabaseSQL = 'USE movie_database';

  // SQL statement to create the movies table
  const createTableSQL = `CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    release_year INT NOT NULL
  )`;

  // Execute the SQL statements to create the database and table
  connection.query(createDatabaseSQL, (err) => {
    if (err) throw err;
    console.log('Movie database created');
    
    // Switch to the movie database
    connection.query(useDatabaseSQL, (err) => {
      if (err) throw err;
      console.log('Using movie database');
      
      // Create the movies table
      connection.query(createTableSQL, (err) => {
        if (err) throw err;
        console.log('Movies table created');
        
        // Close the connection
        connection.end();
      });
    });
  });
});
