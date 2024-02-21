const express = require('express');
const body_parser = require('body-parser');
const registerUser = require('./register_user')
const connect_getnotesdb = require('./database/getnotesdb')

const app = express();

// Middleware to parse JSON in the request body
app.use(body_parser.json());

app.get("/", (req, res) => {
    return res.send("API Started on port 3000");
});

// Example usage:
const username = "exampleUser";
const password = "examplePassword";

registerUser(username, password)




app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000/')
});