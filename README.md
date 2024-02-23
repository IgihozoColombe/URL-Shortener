URL_shortner

[![Coverage Status](https://coveralls.io/repos/github/IgihozoColombe/URL-Shortener/badge.svg?branch=master)](https://coveralls.io/github/IgihozoColombe/URL-Shortener?branch=master)


Url_shortner_work is a URL shortening service that allows logged in users to shorten long URLs into shorter, more manageable links.

Features
Shorten long URLs into concise, easy-to-share links.
Customizable short link URLs.
View click statistics and analytics for shortened links.
RESTful API for integration with other applications.
Technologies Used
Node.js
Express.js
MongoDB
Mongoose
bcrypt
body-parser
cors
dotenv
jsonwebtoken
lodash
mailgun-js
nodemailer
nodemon
shortid
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/Url_shortner_work.git
Install dependencies:

bash
Copy code
cd Url_shortner_work
npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:

makefile
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-jwt-secret
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
Start the server:

sql
Copy code
npm start
Access the application at http://localhost:5000.

Usage
Visit the homepage to shorten a URL.
Use the RESTful API endpoints for programmatic access.
Customize settings and view analytics in the admin dashboard.
API Documentation
The API documentation can be found here.

Contributing
Contributions are welcome! Please follow the guidelines in CONTRIBUTING.md.

License
This project is licensed under the ISC License.

Author
Marie Colombe

