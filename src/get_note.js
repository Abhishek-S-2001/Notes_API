const connect_notesdb = require('../database/notesdb');

async function getNoteById(noteId) {
    try {
        // Connect to the notes database
        const Note = connect_notesdb();

        // Find the note by note ID
        const note = await Note.findOne({ noteId });

        if (!note) {
            throw new Error("Note not found. Please check the provided noteID.");
        }

        return note;
    } catch (error) {
        throw error;
    }
}

module.exports = getNoteById;