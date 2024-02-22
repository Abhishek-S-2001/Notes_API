const connect_userdb = require('../database/userdb');
const connect_getnotesdb = require('../database/getnotesdb');
const connect_notesdb = require('../database/notesdb')

async function registerUser(username, password) {
    try {
        const User = connect_userdb();

        // Check if the username is already in use
        if (await User.findOne({ username })) {
            throw new Error("Username is already taken. Please choose another.");
        }
       
        let userId = generateUserId(); 
        // Check if the generated userId is already in use
        while (await User.findOne({ userid: userId })) {
            userId = generateUserId();
        }

        // Create a new user instance
        const newUser = new User({
            username,
            password,
            userid: userId
        });
        await newUser.save();

        const GetNotes = connect_getnotesdb();
        // Create an entry in the getnotes database with userid and an empty array for noteIds
        const newGetNotesEntry = new GetNotes({
            userid: userId,
            noteId: []
        });
        await newGetNotesEntry.save();


        const Note = connect_notesdb();
        // Create a default note for the user
        const defaultNote = new Note({
            noteId: generateNoteId(),
            title: "Default Note",
            content: "This is your default note. Feel free to edit or delete it.",
            createdAt: new Date()
        });
        await defaultNote.save();

        // Update the user's entry in getnotes_db to include the noteId
        await GetNotes.updateOne({ userid: userId }, { $push: { noteId: defaultNote.noteId } });
        

        console.log(`User registered successfully. User ID: ${userId}`);
        return userId;
    } catch (error) {
        // Check if the error is due to a duplicate username
        if (error.message.includes("Username is already taken")) {
            throw new Error("Username is already taken. Please choose another.");
        } else {
            throw error;
        }
    }
}

function generateNoteId() {
    // Generate a unique note ID up to 4 characters and append it with "note"
    const uniqueId = Math.random().toString(36).substring(2, 6);
    return `note${uniqueId}`;
}

function generateUserId() {
    return Math.random().toString(36).substring(2, 10);     // // Generate an 8-character alphanumeric user ID
}
// Export the function
module.exports = registerUser;