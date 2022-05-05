const router = require('express').Router();
const { Comments, Posts, User } = require('../../models');
const withAuth = require('../../util/auth.js');

router.post('/', withAuth, async (req, res) => {
  const { comment, post_id } = req.body;
  try {
    const newComment = await Comments.create({
      comment,
      user_id: req.session.user_id,
      post_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
