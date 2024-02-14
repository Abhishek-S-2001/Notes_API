const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/sample_db'; // Replace with your MongoDB connection string

// Connect to MongoDB
const client = new MongoClient(uri, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Connected to Database")
    }
  });
  

// Define a route to handle POST requests and insert data into MongoDB
app.post('/addData', async (req, res) => {
  try {
      await client.connect();
      const database = client.db('sample_db');
      const collection = database.collection('collection_1');

      // Extract data from the request body
      console.log(req.body)
      const newData = req.body;
      console.log(newData)

      // Insert the data into MongoDB
      const result = await collection.insertOne(newData);
      if (result.result.ok === 1 && result.insertedCount === 1) {
        // Respond with the inserted data
        res.json(result.ops[0]);
      } else {
        // If the insertion failed, send an appropriate error response
        res.status(500).send('Failed to insert data into the database.');
    }
  } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
  } finally {
      await client.close();
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
