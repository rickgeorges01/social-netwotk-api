const express = require('express');
const router = express.Router();
const User = require('./models/User');
const jwt = require('jsonwebtoken');


// Route de test
router.get('/', (req, res) => {
    res.send('Auth Service is running');
});

// Register
router.post('/register', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const existingUser = await User.findOne({ userName });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ userName, password });
        await user.save();
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    const { userName, newPassword } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ message: 'User not found' });

        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
