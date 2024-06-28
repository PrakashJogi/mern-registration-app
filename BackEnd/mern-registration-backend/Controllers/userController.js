const User = require('../Models/User');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, username, contactInfo } = req.body;
        const profilePicture = req.file.path;
        
        const newUser = new User({ name, email, username, contactInfo, profilePicture });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-__v');
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
