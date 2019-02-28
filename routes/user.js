const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function (req, res) {

	const {
		errors,
		isValid
	} = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		username: req.body.username
	}).then(user => {
		if (user) {
			return res.status(400).json({
				username: 'Username already exists'
			});
		} else {
			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				country: req.body.country,
				region: req.body.region,
				password: req.body.password,
			});

			bcrypt.genSalt(10, (err, salt) => {
				if (err) console.error('There was an error', err);
				else {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) console.error('There was an error', err);
						else {
							newUser.password = hash;
							newUser
								.save()
								.then(user => {
									res.json(user)
								});
						}
					});
				}
			});
		}
	});
});

router.post('/login', (req, res) => {

	const {
		errors,
		isValid
	} = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const username = req.body.username;
	const password = req.body.password;

	User.findOne({
			username
		})
		.then(user => {
			if (!user) {
				errors.username = 'User not found'
				return res.status(404).json(errors);
			}
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						const payload = {
							id: user.id,
							firstName: user.firstName,
							lastName: user.lastName,
							username: user.username,
							country: user.country,
							region: user.region
						}
						jwt.sign(payload, 'secret', {
							expiresIn: 3600
						}, (err, token) => {
							if (err) console.error('There is some error in token', err);
							else {
								res.json({
									success: true,
									token: `Bearer ${token}`
								});
							}
						});
					} else {
						errors.password = 'Incorrect Password';
						return res.status(400).json(errors);
					}
				});
		});
});

// Route to get a list for all users (used in the dashboard component on the frontend)
router.get('/usersList', (req, res) => {
	User.find({}, function (err, users) {
		let userMap = {};
		let i = 0;
		users.forEach(function (user) {
			userMap[i++] = {
				user
			};
		});

		res.send(userMap);
	});
});

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


// Function to upload profile file to server
router.post('/upload', (req, res, next) => {
	// console.log(req.files);
	let uploadFile = req.files.file
	const fileName = req.files.file.name
	uploadFile.mv(
		`../public/files/${fileName}`,
		function (err) {
			/*if (err) {
			  return res.status(500).send(err)
			}*/

			res.json({
				file: `public/${req.files.file.name}`,
			})
		},
	)
})

router.post('/post', (req, res, next) => {
	post = req.body.post
	username = req.body.username
	User.findOne({
		username
	})
	.then(user => {
		if (!user) {
			return res.status(404).send("User not found");
		} else {
			user.posts[0] = post
			console.log(user.posts[0])
		}
	})
})
module.exports = router;