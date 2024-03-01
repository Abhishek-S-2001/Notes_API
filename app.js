const express = require('express');
const body_parser = require('body-parser');
const bcrypt = require('bcrypt')

const registerUser = require('./src/Authentication/register_user')
const signInUser = require('./src/Authentication/sign_in')
const addNote = require('./src/CRUD_Routes/add_note')
const getNoteById = require('./src/CRUD_Routes/get_note')
const getAllNotes = require('./src/CRUD_Routes/get_all_notes')
const updateNote = require('./src/CRUD_Routes/update_note')
const deleteNote = require('./src/CRUD_Routes/delete_note')
const { generateAccessToken, generateRefreshToken, authenticateToken } = require('./src/Authentication/access_token')

const app = express();

// Middleware to parse JSON in the request body
app.use(body_parser.json());


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
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await registerUser(username, hashedPassword);

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
      const userInfo = await signInUser(username, password);
      // Generate an access token
      const accessToken = generateAccessToken(userInfo.user);
      const refreshToken = generateRefreshToken(userInfo.user);

      res.status(200).json({accessToken : accessToken, refreshToken: refreshToken, userData: userInfo.userData});
  } catch (error) {
    console.log(error)
      res.status(401).json({ error: error.message });
  }
});

// Add Note route
app.post("/api/notes", authenticateToken, async (req, res) => {
  const { userid, title, content } = req.body;

  try {
      const noteId = await addNote(userid, title, content);
      res.status(201).json({ noteId, message: title + " Note created successfully." });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Get Note by ID route
app.get("/api/notes/:noteID", authenticateToken, async (req, res) => {
  const noteId = req.params.noteID;

  try {
      const note = await getNoteById(noteId);
      res.status(200).json(note);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all Notes route
app.get("/api/notes", authenticateToken, async (req, res) => {
  const { userid } = req.query;
  try {
      const notesList = await getAllNotes(userid);
      res.status(200).json(notesList);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Update Note route
app.put("/api/notes/:noteID", authenticateToken, async (req, res) => {
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
app.delete("/api/notes", authenticateToken, async (req, res) => {
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