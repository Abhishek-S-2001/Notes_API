const connect_userdb = require('./database/userdb');
const connect_getnotesdb = require('./database/getnotesdb');

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
            noteId: ['Created']
        });
        await newGetNotesEntry.save();

        console.log(`User registered successfully. User ID: ${userId}`);
        return userId;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

function generateUserId() {
    return Math.random().toString(36).substring(2, 10);     // // Generate an 8-character alphanumeric user ID
}
// Export the function
module.exports = registerUser;