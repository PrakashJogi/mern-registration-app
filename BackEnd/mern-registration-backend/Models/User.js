const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    contactInfo: { type: String, required: true },
    profilePicture: { type: String, required: true },
    password: { type: String, required: true }, // Add password field
});

module.exports = mongoose.model('User', userSchema);
