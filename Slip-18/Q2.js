const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username', // Replace with your MySQL username
  password: 'your_password', // Replace with your MySQL password
  database: 'your_database_name' // Replace with the name of your database
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // SQL statement to select all records from the customers table
  const selectSQL = 'SELECT * FROM customers WHERE name LIKE ?';

  // Execute the SQL statement with parameterized query to find customers whose name starts with 'A'
  connection.query(selectSQL, ['A%'], (err, result) => {
    if (err) throw err;

    // Display the customers whose name starts with 'A'
    console.log('Customers whose name starts with \'A\':');
    console.log(result);

    // Close the connection
    connection.end();
  });
});
