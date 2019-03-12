const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Route to get info from a user based on username (used to create profile pages on the frontend)
router.get('/:username', (req, res) => {
	const username = req.params.username;
	User.findOne({
			username
		})
		.then(user => {
			if (!user) {
				return res.status(404).send("User not found");
			} else {
				return res.send(user)
			}
		})
})

module.exports = router;