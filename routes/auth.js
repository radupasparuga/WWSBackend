const  express = require('express');
const router = express.Router();
const auth = require('../auth');
const models = require('../models');

router.post('/signup', auth.signup(models.User))
router.post('/login', auth.login(models.User))

module.exports = router;