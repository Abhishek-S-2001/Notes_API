const express = require('express');
const body_parser = require('body-parser');

const mongo_db = require('./mongo_db');
const connect_notesdb = require('./mongo_db');

const app = express();

// Middleware to parse JSON in the request body
app.use(body_parser.json());

app.get("/", (req, res) => {
    return res.send("API Started on port 3000");
});

note = connect_notesdb();

app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000/')
});