const mysql = require("mysql");

// Create a connection to MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.CONN_USERNAME,
  password: process.env.CONN_PASSWORD,
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }

  console.log("Connected as id " + connection.threadId);

  // Create database if it doesn't exist
  const createDatabaseSQL = "CREATE DATABASE IF NOT EXISTS crunchbase_data";
  connection.query(createDatabaseSQL, (err) => {
    if (err) throw err;
    console.log("Database created or already exists.");

    // Use the new database
    connection.query("USE crunchbase_data", (err) => {
      if (err) throw err;

      // Create table
      const createTableSQL = `
                CREATE TABLE IF NOT EXISTS organizations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    executive_name TEXT,
                    funding_details TEXT
                )`;
      connection.query(createTableSQL, (err) => {
        if (err) throw err;
        console.log("Table created or already exists.");

        // Close the connection
        connection.end();
      });
    });
  });
});