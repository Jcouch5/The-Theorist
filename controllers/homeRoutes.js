const router = require('express').Router();
const { Comments, Posts, User } = require('../models');
const withAuth = require('../util/auth.js');
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

router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const postsData = await Posts.findByPk(postId, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comments,
        attributes: ['comment'],
      },
    ],
  });
  const post = postsData.get({ plain: true });
  res.render('postwithcomment', {
    ...post,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
