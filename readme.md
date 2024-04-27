# BookAPI Server

This is a Node.js server built using Express.js for creating a simple API for managing books.

## Setup

### Prerequisites

Before running the server, make sure you have the following installed:

Node.js

npm (Node Package Manager)

### Installation

1.Clone this repository to your local machine.

```
git clone <repository-url>
```

2.Navigate into the project directory.

```
cd bookapi
```

3.Install dependencies using npm.

```
npm install
```

## Configuration

#### package.json

Ensure that your package.json file is configured with the necessary dependencies and scripts. Here's an example package.json configuration:

```
{
  "name": "bookapi",
  "version": "0.0.1",
  "description": "my server",
  "scripts": {
    "server": "nodemon server.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.2",
    "nodemon": "^3.1.0"
  }
}

```

#### .env file

Ensure that you have a .env file in the root directory of your project with the following configuration:

```
DATABASE_URL=.mongodb+srv://

BASE_URL=YOUR_BASE_URL(Optional)
PORT=8000(DEFAULT)

TOKEN_SECRET=YOUR_TOKEN_SECRET
```

```

Make sure to replace `<your-database-url>` with your actual MongoDB Atlas connection string.

### Usage

To start the server, run the following command:

npm run server
```

The server will start on the port specified in the `.env` file (default is 8000).

#### Endpoints

```
The following endpoints are available:

- `GET /books`: Get all books.
- `GET /books/:id`: Get a specific book by ID.
- `POST /books`: Add a new book.
- `PUT /books/:id`: Update a book by ID.
- `DELETE /books/:id`: Delete a book by ID.

full api documentaion - https://documenter.getpostman.com/view/29038389/2sA3Bt3qHM
```
