const router = require('express').Router();
const signup = require('./signup');
const posts = require('./posts');

router.use('/signup', signup);
router.use('/posts', posts);

module.exports = router;
