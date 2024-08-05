# Employee Management System

## Overview

The Employee Management System is a web application developed as part of my Full Stack Internship at Prodigy Infotech. This application allows administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records. Built using Node.js, Express, MongoDB, EJS, and Bootstrap, the system includes robust validation and authentication mechanisms to ensure the security of sensitive employee data.

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Frontend:** EJS, Bootstrap

## Features

- **CRUD Operations:**

  - Create new employee records
  - Read existing employee records
  - Update existing employee records
  - Delete employee records

- **Authentication & Authorization:**

  - Secure login and registration for administrators
  - Role-based access control to restrict access to sensitive functionalities

- **Validation:**
  - Server-side validation to ensure data integrity and security
  - Input validation for creating and updating employee records

## Installation

1. **Clone the Repository**
   git clone https://github.com/yashrao0001/PRODIGY_FS_02.git

2. **Navigate to the Project Directory**
   cd PRODIGY_FS_02

3. **Install Dependencies**
   npm install

4. **Setup Environment Variables**
   Create a .env file in the root directory and add the following variables:
   MONGO_URL=<your-mongodb-connection-uri>
   JWT_SECRET=<your-session-secret>

5.**Run the Application**
npm start

The application will start and be accessible at http://localhost:5001.

## Usage

1.**Access the Application:**
Open your web browser and navigate to http://localhost:5001.

2.**Admin Login:**
Use the credentials provided by your administrator to log in.

3.**Perform CRUD Operations:**
Once logged in, you can create, read, update, and delete employee records through the provided interfaces.

## Contributing

If you would like to contribute to the development of this project, please follow these steps:

1.Fork the Repository
2.Create a Feature Branch
3.Commit Your Changes
4.Push to the Branch
5.Submit a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

Bootstrap for providing the stylish frontend components.
EJS for enabling dynamic templating in the frontend.
MongoDB for offering a flexible NoSQL database solution.

## Contact

For any questions or feedback, please reach out to **yyash7796@gmail.com**.
