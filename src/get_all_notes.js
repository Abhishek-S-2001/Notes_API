const connect_getnotesdb = require('../database/getnotesdb');
const connect_notesdb = require('../database/notesdb');

async function getAllNotes(userid) {
    try {
        // Connect to the database
        const GetNotes = connect_getnotesdb();
        const Note = connect_notesdb();

        // Find the user's entry in getnotes database
        const userGetNotesEntry = await GetNotes.findOne({ userid });

        if (!userGetNotesEntry) {
            throw new Error("User not found. Please check the provided userid.");
        }

        // Get all noteIds for the user
        const noteIds = userGetNotesEntry.noteId;

        // Retrieve titles for all noteIds
        const notesList = await Note.find({ noteId: { $in: noteIds } }).select('noteId title');

        return notesList;
    } catch (error) {
        throw error;
    }
}

module.exports = getAllNotes;