# Notes API

## Overview

The Notes API is a RESTful Node.js application designed for efficient note management. It seamlessly integrates CRUD (Create, Read, Update, Delete) operations, allowing users to create, retrieve, update, and delete notes effortlessly. Adhering to RESTful principles, each endpoint corresponds to a specific action, simplifying interactions. Powered by Node.js, Express.js, and MongoDB, this API provides a scalable and user-friendly solution for personalized note-taking experiences.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Testing (Postman)](#testing-the-api-with-postman)


## Features

- **User Registration:**
  - Register with a unique username and password.
  - Generates a unique user ID for each registration.

- **User Authentication:**
  - Authenticate using a registered username and password.
  - Obtain an access token for secure API access.

- **Add Notes:**
  - Add new notes with a title and content.
  - Each note has a unique note ID.

- **Update Notes:**
  - Modify the title and content of existing notes.
  - Update based on the unique note ID.

- **Delete Notes:**
  - Delete notes securely with the unique note ID.
  - Remove the note ID from the user's entry.


## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abhishek-S-2001/Notes_API.git
   ```

2. **Install dependencies:**

   ```bash
   cd notes-api
   npm install
   ```

3. **Set up your MongoDB database:**

   - Install MongoDB if not already installed on your system.
   - Create a new MongoDB database for the Notes API, e.g., `notes_db`.

4. **Run the application:**

   ```bash
   npm start
   ```

## Endpoints

- **User Registration:** `/api/auth/signup` (POST)
- **User Authentication:** `/api/auth/signin` (POST)
- **Add Note** `/api/notes/add` (POST)
- **Retrieve Notes** `/api/notes/:noteID` (GET)
- **Retrieve All Notes Of User** `/api/notes` (GET)
- **Update Note** `/api/notes/:noteId` (PUT)
- **Delete Note** `/api/notes` (DELETE)


## Testing the API with Postman

1. **User Registration:**

   - Endpoint: `POST /api/auth/signup`
   - Body: Provide a unique username and password in the request body.
   - Example:
     ```json
     {
       "username": "your_unique_username",
       "password": "your_secure_password"
     }
     ```
   - Execute the request to register a new user.

2. **User Authentication:**

   - Endpoint: `POST /api/auth/signin`
   - Body: Use the registered username and password for authentication.
   - Example:
     ```json
     {
       "username": "your_registered_username",
       "password": "your_registered_password"
     }
     ```
   - Execute the request to obtain an access token for API access.

3. **Add Note:**

   - Endpoint: `POST /api/notes/add`
   - Headers: Include the obtained access token in the Authorization header.
   - Body: Provide the user ID, note title, and note content in the request body.
   - Example:
     ```json
     {
       "userid": "your_user_id",
       "title": "Your Note Title",
       "content": "Your Note Content"
     }
     ```
   - Execute the request to add a new note.

4. **Retrieve Notes:**

   - Endpoint: `GET /api/notes/:noteID`
   - Headers: Include the obtained access token in the Authorization header.
   - Replace `:noteID` with the actual note ID.
   - Execute the request to retrieve a specific note by note ID.

5. **Retrieve All Notes of User:**

   - Endpoint: `GET /api/notes`
   - Headers: Include the obtained access token in the Authorization header.
   - Execute the request to retrieve all notes of the authenticated user.

6. **Update Note:**

   - Endpoint: `PUT /api/notes/:noteId`
   - Headers: Include the obtained access token in the Authorization header.
   - Replace `:noteId` with the actual note ID.
   - Body: Provide the updated note title and content in the request body.
   - Example:
     ```json
     {
       "title": "Updated Note Title",
       "content": "Updated Note Content"
     }
     ```
   - Execute the request to update a specific note by note ID.

7. **Delete Note:**

   - Endpoint: `DELETE /api/notes/:noteId`
   - Headers: Include the obtained access token in the Authorization header.
   - Replace `:noteId` with the actual note ID.
   - Execute the request to delete a specific note by note ID.
