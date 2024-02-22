const mongoose = require('mongoose');

// Connecting the mongoDB database server hostted on server "mongodb://localhost:27017/"

function connect_getnotesdb(){
    // Connect to the getnotes database
    const getnoteDB = mongoose.createConnection("mongodb://localhost:27017/getnotes_db");
    getnoteDB.once('open', () => { console.log('Connected to getNotes_DB');});
    getnoteDB.on('error', (err) => {console.error('Error connecting to getNotes_DB:', err);});

    // Create a model based on the schema in the getNotes database
    const getnotesSchema = new mongoose.Schema({
        userid: { type:String, required: true }, // Reference to the User
        noteId: { type:[String], default: ['Created'] } // Reference to the Array of Notes collection
    });

    const GetNotes = getnoteDB.model('GetNotes', getnotesSchema);
    return GetNotes        
};

module.exports = connect_getnotesdb;