const router = require('express').Router();
const { Comments, Posts, User } = require('../models');
const authorize = require('../util/auth');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Posts.findAll({
      include: [
        {
          model: Comments,
          attributes: ['comments'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
