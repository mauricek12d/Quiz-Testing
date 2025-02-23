# Tech Quiz Application

This is a full-stack MERN application designed to help aspiring developers test and enhance their technical knowledge. It provides users with a quiz composed of random questions, tracks their score, and allows them to restart the quiz as often as they'd like.

## Technologies Used

MongoDB: Database for storing quiz questions

Express.js & Node.js: Backend server and API handling

React: Frontend user interface

TypeScript: Strongly-typed JavaScript for enhanced development experience

Vite: Fast frontend build tool

Cypress: Component and end-to-end testing

Bootstrap: Styling framework

## Installation

To install and run this application locally, follow these steps:

** Step 1: Clone the repository
```sh
git clone https://github.com/mauricek12d/Quiz-Testing.git
```

** Step 2: Install Dependencies
```sh
npm install
```

** Step 3: Set Up Environment Variables
```sh
Create a .env file in your server directory and add your MongoDB connection URI:

MONGODB_URI=mongodb://localhost:27017/techquiz
```

** Step 4: Seed the Database
```sh
Seed your database with questions:

npm run seed
```

## Usage

To run the application in development mode:

npm run start:dev

The application will be available at http://localhost:3001.

Running Tests

This application is thoroughly tested using Cypress. To run tests:

npm run test

This command will launch the Cypress test suite, where you can view and run component and end-to-end tests.

## Walkthrough Video

Watch the Walkthrough Video - https://drive.google.com/file/d/1fFVlNNk92vpTPfXhekKNr6jIalQTAv7I/view

## Contributing

Contributions are welcome! Please create a pull request or raise an issue to discuss improvements.

## License

This project is licensed under the MIT license. See LICENSE for more details.

