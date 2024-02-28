const express = require('express');
const body_parser = require('body-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('./config')

const registerUser = require('./src/register_user')
const signInUser = require('./src/sign_in')
const addNote = require('./src/add_note')
const getNoteById = require('./src/get_note')
const getAllNotes = require('./src/get_all_notes')
const updateNote = require('./src/update_note')
const deleteNote = require('./src/delete_note')

const app = express();

// Middleware to parse JSON in the request body
app.use(body_parser.json());

// Secret key for JWT  // Do Not change the seceretKey
const secretKey = config.JWT_Secret_key;      //jsonwebtoken uses a secret key to encrypt and decrypt the token
console.log(secretKey)

app.get("/", (req, res) => {
    return res.send("API Started on port 3000");
});


// Registration route
app.post('/api/auth/signup', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Validate if username and password are provided
      if (!username || !password) {
          return res.status(400).json({ error: "Username and password are required." });
      }

      const userId = await registerUser(username, password);

      res.status(201).json({ userId, message: "User registered successfully." });
  } catch (error) {
      console.error("Error registering user:", error.message);
      res.status(500).json({ error: error.message });
  }
});

// Sign-in route
app.post("/api/auth/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
      const userData = await signInUser(username, password);
      res.status(200).json(userData);
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
});

// Add Note route
app.post("/api/notes", async (req, res) => {
  const { userid, title, content } = req.body;

  try {
      const noteId = await addNote(userid, title, content);
      res.status(201).json({ noteId, message: title + " Note created successfully." });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Get Note by ID route
app.get("/api/notes/:noteID", async (req, res) => {
  const noteId = req.params.noteID;

  try {
      const note = await getNoteById(noteId);
      res.status(200).json(note);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all Notes route
app.get("/api/notes", async (req, res) => {
  const { userid } = req.query;
  try {
      const notesList = await getAllNotes(userid);
      res.status(200).json(notesList);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Update Note route
app.put("/api/notes/:noteID", async (req, res) => {
  const noteId = req.params.noteID;
  const { title, content } = req.body;

  try {
      await updateNote(noteId, title, content);
      res.status(200).json({ message: "Note updated successfully." });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Delete Note route
app.delete("/api/notes", async (req, res) => {
  const { userid, noteId } = req.body;

  try {
      await deleteNote(userid, noteId);
      res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000/')
});