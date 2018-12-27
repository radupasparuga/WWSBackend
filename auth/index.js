const jwt = require('jsonwebtoken'),
      config = require('../config');

const api = {};

api.login = (User) => (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (error, user) => {
    if (error) throw error;

    if (!user) res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
    else {
      user.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ user }, config.secret);
          res.json({ success: true, message: 'Token granted', token, user: user });
        } else {
          res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
}

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');

    if (split.length === 2) return split[1];
    else return null;
  } else return null;
}

function checkPassword(password) {
  const regexp = /(?:[A-Z]+|[1-9]+|[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+)/
  return password.length > 7 && regexp.test(password)
}

function checkEmail(email) {
  const regexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  return regexp.test(email)
}

api.signup = (User) => (req, res) => {
  const { firstName, lastName, password, email, username } = req.body;
  const isAllFieldsAreExist = firstName && lastName && password && email && username;
  if (!isAllFieldsAreExist) res.json({ success: false, message: 'Please, pass all require fields' });
  else {
    if (!checkPassword(password)) return res.json({ success: false, message: 'Invalid password'});
    if (!checkEmail(email)) return res.json({ success: false, message: 'Invalid email '});
    const user = new User({
      firstName,
      lastName,
      password,
      email,
      username
    });

    user.save(error => {
      if (error) return res.status(400).json({ success: false, message: 'Username already exists.' });
      res.json({ success: true, message: 'Account created successfully' });
    });
  }
}

module.exports = api;