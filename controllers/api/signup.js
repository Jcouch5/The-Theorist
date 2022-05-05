const router = require('express').Router();
const validator = require('validator');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    if (validator.isEmail(req.body.email)) {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      req.session.save(() => {
        req.session.loggedIn = true;

        res.status(200).json(dbUserData);
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
