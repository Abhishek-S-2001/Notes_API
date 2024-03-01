const connect_getnotesdb = require('../database/getnotesdb');
const connect_notesdb = require('../database/notesdb');

async function addNote(userid, title, content) {
    try {
        // Connect to the database
        const GetNotes = connect_getnotesdb();
        const Note = connect_notesdb();
        // Find the user's entry in getnotes database
        const userGetNotesEntry = await GetNotes.findOne({ userid });

        // Generate a unique note ID for the user
        let uniqueId = Math.random().toString(36).substring(2, 6);
        let noteId = `${userid}${uniqueId}`;

        // Check if the generated NoteId is already in use
        while (await Note.findOne({ noteid: noteId })) {
            uniqueId = Math.random().toString(36).substring(2, 6);
            noteId = `${userid}${uniqueId}`;
        }

        // Create a new note
        const newNote = new Note({
            noteId,
            title,
            content,
            createdAt: new Date()
        });
        await newNote.save();

        // Update the getnotes database with the new noteId
        userGetNotesEntry.noteId.push(noteId);
        await userGetNotesEntry.save();

        return noteId;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports = addNote;