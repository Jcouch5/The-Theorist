const router = require('express').Router();
const { Comments, Posts, User } = require('../models');

router.post('/', withAuth, async (req, res) => {
  const { comment } = req.body;
  try {
    const newComment = await Comments.create({
      comment,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
