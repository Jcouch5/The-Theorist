const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../util/auth.js');

router.post('/', withAuth, async (req, res) => {
  const { title, summary } = req.body;
  try {
    const newPost = await Posts.create({
      title,
      summary,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
