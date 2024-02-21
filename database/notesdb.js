const mongoose = require('mongoose');

// Connecting the mongoDB database server hostted on server "mongodb://localhost:27017/"

function connect_notesdb(){
    // Connect to the notes database
    const notesDB = mongoose.createConnection("mongodb://localhost:27017/notes_db");
    notesDB.once('open', () => { console.log('Connected to NotesDB');});
    notesDB.on('error', (err) => {console.error('Error connecting to NotesDB:', err);});

    // Define a mongoose schema and model for the Note collection
    const noteSchema = new mongoose.Schema({
        noteId: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    });

    const Note = notesDB.model('Note', noteSchema);
    return Note
};

module.exports = connect_notesdb;