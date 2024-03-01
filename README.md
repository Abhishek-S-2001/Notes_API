# Notes API

## Overview

The Notes API, built on Node.js and Express.js, offers a seamless note management experience with a focus on secure authentication using JSON Web Tokens (JWT). Users can easily create, read, update, and delete notes through RESTful endpoints. JWTs are employed to authenticate users, ensuring secure access to personalized data. Token expiration is handled intelligently, allowing for smooth access renewal. This API provides a scalable solution, aligning with modern authentication practices for a secure and efficient note-taking experience.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Testing (Postman)](#testing-the-api-with-postman)

## Features

- **User Registration:**
  - Register with a unique username and password.
  - Generates a unique user ID for each registration.

- **Authentication:**
  - JWT (JSON Web Tokens) are used for user authentication. Upon successful login or registration, the server issues an access token with a short expiration time.
  - Additionally, a refresh token with a longer expiration time is generated. The access token is required for most API requests, and the refresh token is used to obtain a new access token without requiring the user to log in again.

- **Token Expiration Handling**
  - The server checks for the expiration of access tokens during API requests. If an access token has expired, the server attempts to refresh it using the provided refresh token. 
  - If the refresh token has also expired, the server responds with a message indicating that the user needs to sign in again.

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

4. **Change access key:**

  - Change the both access key for access and refresh token.
  - File Location : `./src/Authentication/access_token.js`

5. **Run the application:**

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

**Note:** This Access Tokens will be required to pass with the headers by client Side.  

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
