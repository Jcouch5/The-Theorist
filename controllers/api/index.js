const router = require('express').Router();
const signup = require('./signup');
const posts = require('./posts');
const comment = require('./comment.js');
const user = require('./user.js');

router.use('/signup', signup);
router.use('/posts', posts);
router.use('/comment', comment);
router.use('/user', user);

module.exports = router;
