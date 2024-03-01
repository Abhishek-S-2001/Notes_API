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
};

module.exports = connect_userdb;