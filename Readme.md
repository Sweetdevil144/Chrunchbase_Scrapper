# Readme.md

## This is a Crunchbase Scrapper that will scrape required data and save it in the sql db

### Task 1: Project Setup

- Initialize a new Node.js project.
- Install necessary npm packages (`mysql`, `axios`, `cheerio`, and possibly `puppeteer` if needed).

### Task 2: Database Configuration

- Set up your MySQL database.
- Ensure your `index.js` or another file properly connects to this database.
- Create the required table(s) as per your schema.

### Task 3: Building the Web Scraper

1. **Fetch Data**:
   - Write a function to make HTTP requests to the Crunchbase website.
   - Handle any network errors or issues that may occur during this process.

2. **Parse HTML**:
   - Write a function to parse the fetched HTML content.
   - Extract the required data: organization name, executive names, and funding details.

### Task 4: Storing Data in Database

- Write functions to insert the scraped data into your MySQL database.
- Ensure your queries are secure against SQL injection.

### Task 5: Error Handling and Logging

- Implement error handling throughout your application.
- Optionally, set up a logging mechanism to track the process and any errors.

### Task 6: Testing and Validation

- Test each component of your application to ensure it works as expected.
- Validate that the data is being scraped and stored correctly.

### Task 7: Compliance and Ethical Considerations

- Review and ensure compliance with Crunchbase's terms of service regarding scraping.
- Implement rate limiting in your scraping logic to avoid overloading the website's servers.

### Task 8: Documentation

- Document your code.
- Write a README file explaining how to set up and run your application.
