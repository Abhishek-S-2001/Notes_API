const mongoose = require('mongoose');

// Connecting the mongoDB database server hostted on server "mongodb://localhost:27017/"

function connect_userdb(){
    // Connect to the users database
    const usersDB = mongoose.createConnection("mongodb://localhost:27017/users_db");
    usersDB.once('open', () => { console.log('Connected to UserDB');});
    usersDB.on('error', (err) => {console.error('Error connecting to UserDB:', err);});

    // Create a model based on the schema in the users database
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: {type: String, required: true},
        userid: { type:String, required: true }
    });

    const User = usersDB.model('User', userSchema);
    return User
}


function connect_getnotesdb(){
    // Connect to the getnotes database
    const getnoteDB = mongoose.createConnection("mongodb://localhost:27017/getnotes_db");
    getnoteDB.once('open', () => { console.log('Connected to getNotes_DB');});
    getnoteDB.on('error', (err) => {console.error('Error connecting to getNotes_DB:', err);});

    // Create a model based on the schema in the getNotes database
    const getnotesSchema = new mongoose.Schema({
        userid: { type:String, required: true }, // Reference to the User
        noteId: { type: Array, required: true } // Reference to the Array of Notes collection
    });

    const getNotes = getnoteDB.model('User', getnotesSchema);
    return getNotes        
}


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
}

// Export the function
module.exports = connect_userdb;
module.exports = connect_getnotesdb;
module.exports = connect_notesdb;