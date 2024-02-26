const connect_getnotesdb = require('../database/getnotesdb');
const connect_notesdb = require('../database/notesdb');

async function deleteNote(userid, noteId) {
    try {
        const GetNotes = connect_getnotesdb();
        const Note = connect_notesdb();

        // Find the note by note ID and delete it
        await Note.findOneAndDelete({ noteId });

        // Remove the noteId from getnotes database for the specified userid
        await GetNotes.updateOne({ userid }, { $pull: { noteId } });

        return;
    } catch (error) {
        throw error;
    }
}

module.exports = deleteNote;