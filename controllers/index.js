const router = require('express').Router();
const apiRoutes = require('./api');
const { Posts, Comments } = require('../../models');

router.use('/api', apiRoutes);

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
