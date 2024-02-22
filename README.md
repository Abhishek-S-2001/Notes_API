# Notes API

## Overview

The Notes API is a simple Node.js application that provides endpoints for managing notes. It includes features such as user registration, user authentication, adding notes, updating notes, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration
- User Authentication
- Add Notes
- Update Notes
- Retrieve User Information


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
- **Add Note:** `/api/notes/add` (POST)
- **Update Note:** `/api/notes/update/:noteId` (PUT)
- **Retrieve User Information:** `/api/user/:userId` (GET)
```
