const express = require('express');
const mongoose = require('mongoose')
const app = express();

app.get("/", (req, res) => {
    return res.send("API Started on port 3000");
});

mongoose.connect("mongodb://localhost:27017/sample_db")
        .then(() => console.log("MongoDB Server Connected"))
        .catch((err) => console.log("Mongo ERROR", err));

app.get

app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000/')
});