const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');

  // SQL query to select teachers with salary greater than 20,000
  const sql = 'SELECT * FROM Teacher WHERE salary > 20000';

  // Execute the query
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log('Teachers with salary greater than 20,000:');
    console.log(results);
  });
});
