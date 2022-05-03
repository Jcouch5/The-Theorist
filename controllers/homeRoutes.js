const router = require('express').Router();
const { Comments, Posts, User } = require('../models');
const authorize = require('../util/auth.js');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/posts', (req, res) => {
  res.render('posts');
});

router.get('/posts:id', (req, res) => {
  const postId = req.params.id;
  Posts.findOne({
    where: {
      id: postId,
    },
    include: [Comments],
  })
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
