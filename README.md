# Notes API

## Overview

The Notes API is a simple Node.js application that provides endpoints for managing notes. It includes features such as user registration, user authentication, adding notes, updating notes, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)


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

3. **Set up your MongoDB database.**

4. **Update the .env file:**

   - Add your MongoDB connection string and other configurations.

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
