# Streamify(Video streaming platform)
## Introduction

Streamify is a web application that replicates the functionality of YouTube, built using the MERN stack (MongoDB, Express.js, React, Node.js) with added Firebase Google Login. This platform allows users to upload and manage videos, subscribe to channels, like and dislike videos, comment on videos, and delete their own videos.

## Features
- User authentication and authorization
- Video uploading functionality
- Channel subscription management
- Like and dislike videos
- Comment on any video
- Delete user's own videos

## Prerequisites
Before you get started, make sure you have the following installed:

- Node.js
- MongoDB (and it should be running)

## Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/streamify.git

2. Navigate to the client-side project directory: 

    ```bash
    cd /client


3. Install dependencies:
      ```bash
      npm install

4. Navigate to the server-side project directory: 

    ```bash
    cd /server


5. Install dependencies:
      ```bash
      npm install

##  Usage

1. Start the MongoDB server.
2. Run the application:
   ```bash
    cd /server
3. Open your browser and go to http://localhost:3000 to access the application.

## Folder Structure
The project structure is organized as follows:

    keep-note-mern/
    │
    ├── client/              # Frontend code (React)
    │   └── public           # Static assets and HTML template
    ├── src/                 # React application source code
    │   ├── components/      # Reusable React components
    │   ├── pages/           # Individual pages/components
    │   ├── context          # useContext api
    │   ├── App.jsx          # Main App component
    │   └── index.jsx        # Entry point for the React app
    | 
    ├── server/              # Backend code (Express.js)
    │   ├── routes/          # API routes
    │   ├── controllers/     # Request handlers
    │   ├── models/          # MongoDB models
    │   ├── config/          # Configuration files
    |   ├── utils/           # Utility functions or helper modules
    |   ├── firebase.js      # firebase authentication
    │   └── server.js        # Entry point for the server application
    └── README.md            # Project documentation

## Technologies Used
- [MongoDB](https://www.mongodb.com/) 
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/en)
- [Firebase(Google Login)](https://firebase.google.com/docs/web/setup)
