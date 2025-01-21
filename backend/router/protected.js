// const express = require('express');
// const auth = require('../middleware/auth');

// const router = express.Router();

// router.get('/protected', auth, (req, res) => {
//     res.json({ message: 'This is a protected route' });
// });

// module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const User = require('../model/User'); // Import your User model

const router = express.Router();

router.get('/protected', auth, async (req, res) => {
    try {
        // Find user by ID (req.user is set in the `auth` middleware)
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user data (you may want to exclude sensitive fields like password)
        res.json({
            message: 'Protected route accessed',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
