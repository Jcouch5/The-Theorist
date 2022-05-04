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

router.get('/posts', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postsData.map((post) => post.get({ plain: true }));
    res.render('posts', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
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
