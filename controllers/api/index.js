const router = require('express').Router();
const signup = require('./signup');

router.use('/signup', signup);

module.exports = router;
