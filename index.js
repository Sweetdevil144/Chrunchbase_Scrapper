const mysql = require("mysql");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

// Read companies from the JSON file
const companies = JSON.parse(
  fs.readFileSync("companies.json", "utf8")
).companies;
const API_KEY = process.env.API_KEY;
const username = process.env.CONN_USERNAME;
const password = process.env.CONN_PASSWORD;
let completedRequests = 0;

// Create a connection to MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: username,
  password: password,
  database: "crunchbase_data",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }

  console.log("Connected as id " + connection.threadId);

  // Create table org_test
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS org_test (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      short_description TEXT,
      facebook_url VARCHAR(255),
      created_at DATETIME,
      rank_org_company INT
    )`;
  connection.query(createTableSQL, (err) => {
    if (err) throw err;
    console.log("Table org_test created or already exists.");

    // Fetch and store data for each company
    companies.forEach((company) => {
      fetchDataAndStore(company.company_name);
      completedRequests++;
      if (completedRequests === companies.length) {
        connection.end((err) => {
          if (err) {
            console.error("Error ending the connection:", err);
          } else {
            console.log("Connection ended successfully.");
          }
        });
      }
    });
  });
});

// Function to fetch data from Crunchbase API and store in the database
async function fetchDataAndStore(companyName) {
  const url = `https://api.crunchbase.com/api/v4/entities/organizations/${companyName}?card_ids=founders,raised_funding_rounds&field_ids=categories,short_description,rank_org_company,founded_on,website,facebook,created_at&user_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data.properties;
    const date = new Date(data.created_at);
    const FormattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    const insertSql = `
      INSERT INTO org_test (name, short_description, facebook_url, created_at, rank_org_company)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(
      insertSql,
      [
        data.identifier.value,
        data.short_description,
        data.facebook.value,
        data.FormattedDate,
        data.rank_org_company,
      ],
      (err, results) => {
        if (err) {
          console.error("Error inserting data into database:", err);
        } else {
          console.log(`Data for ${companyName} inserted successfully.`);
        }
      }
    );
  } catch (error) {
    console.error(`Error fetching data for ${companyName}:`, error);
  }
}
