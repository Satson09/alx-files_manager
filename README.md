# File Manager

## Overview
The File Manager project is a back-end service that provides an API for user authentication, file uploads, and file management. Built using modern JavaScript (ES6) and a NoSQL database, this project integrates MongoDB, Redis, Node.js, Express.js, and Kue for background processing.

This project was developed by Satson Johnson as part of a collaborative learning experience, emphasizing authentication, storage, and background task management. The project ran from October 10, 2024, to October 17, 2024, with manual and automatic quality assurance reviews pending.

## Features
- **User Authentication**: Secure authentication using token-based access.
- **File Management**:
  - List all files associated with a user.
  - Upload new files.
  - Modify file permissions.
  - View files securely.
- **Background Processing**:
  - Generate image thumbnails.
  - Utilize Redis for temporary data storage.
- **Pagination Support**: Efficient retrieval of large datasets.

## Technologies Used
- **Back-end Framework**: Node.js with Express.js
- **Database**: MongoDB (NoSQL)
- **Caching and Queue Management**: Redis & Kue
- **Testing**: Mocha
- **Development Tools**:
  - ESLint for code linting
  - Nodemon for live reloading
  - Babel for JavaScript compilation

## Project Structure
```
project-root/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── workers/
│   ├── models/
│   ├── middlewares/
│   ├── app.js
│   └── server.js
├── tests/
├── config/
├── .eslintrc.js
├── babel.config.js
├── package.json
├── README.md
└── .gitignore
```

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (version 12.x.x)
- MongoDB
- Redis

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd file-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB and Redis servers:
   ```sh
   mongod --dbpath /path/to/db
   redis-server
   ```
4. Run the development server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Authenticate user and return a token
- `GET /auth/logout` - Log out the user

### File Management
- `GET /files` - List user’s files (supports pagination)
- `POST /files` - Upload a new file
- `PUT /files/:id/permissions` - Modify file permissions
- `GET /files/:id` - Retrieve file details
- `GET /files/:id/thumbnail` - Get image thumbnail

## Background Processing
- Kue is used for handling background jobs such as image thumbnail generation.

## Testing
Run tests with Mocha:
```sh
npm test
```

## Code Style
- Follow ESLint rules (`.eslintrc.js` included).
- Use consistent code formatting.

## Deployment
To deploy the application:
1. Configure environment variables.
2. Deploy the server using a hosting service (e.g., AWS, Heroku).
3. Set up MongoDB and Redis on the production server.
4. Start the application.

## Contributors
- **Satson Johnson**

## License
This project is for educational purposes and does not have a specific license.

## Notes
- A manual QA review is required before completion.
- Automatic QA review is pending (0.0/86 mandatory tasks completed).

Enjoy building and improving this project!


File: utils/, worker.js, controllers/UsersController.js
