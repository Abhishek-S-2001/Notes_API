const connect_userdb = require('../database/userdb');
const connect_getnotesdb = require('../database/getnotesdb');
const connect_notesdb = require('../database/notesdb');

async function signInUser(username, password) {
    try {
        // Connect to the users database
        const User = connect_userdb();

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("Username not found. Please register first.");
        }

        // Check if the password matches
        if (user.password != password) {
            throw new Error("Incorrect password. Please try again.");
        }

        // Retrieve user data including note IDs and titles
        const userData = {
            userId: user.userid,
            noteData: await getNoteData(user.userid)
        };

        return userData;
    } catch (error) {
        throw error;
    }
}

async function getNoteData(userId) {
    // Retrieve note IDs and titles for the given user ID
    const GetNotes = connect_getnotesdb();
    const userNotes = await GetNotes.findOne({ userid: userId });

    if (!userNotes || !userNotes.noteId.length) {
        return [];
    }

    // Connect to the notes database
    const Note = connect_notesdb();

    // Retrieve note details for each note ID
    const noteDetails = await Note.find({ noteId: { $in: userNotes.noteId } });

    return noteDetails.map(note => ({
        noteId: note.noteId,
        title: note.title
    }));
}

module.exports = signInUser;