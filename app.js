const express = require('express');
const body_parser = require('body-parser');
const registerUser = require('./src/register_user')
const signInUser = require('./src/sign_in')

const app = express();

// Middleware to parse JSON in the request body
app.use(body_parser.json());

app.get("/", (req, res) => {
    return res.send("API Started on port 3000");
});


// Authentication/ Registration API End point
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




app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000/')
});