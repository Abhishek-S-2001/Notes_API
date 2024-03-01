const connect_notesdb = require('../database/notesdb');

async function updateNote(noteId, title, content) {
    try {
        // Connect to the notes database
        const Note = connect_notesdb();

        // Find the note by note ID and update the title and content
        await Note.findOneAndUpdate({ noteId }, { title, content });

        return;
    } catch (error) {
        throw error;
    }
}

module.exports = updateNote;