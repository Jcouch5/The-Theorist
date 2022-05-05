const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');
const bcrypt = require('bcrypt');

const userData = require('./user.json');
const postsData = require('./posts.json');
const commentsData = require('./comments.json');

const injectData = async () => {
  await sequelize.sync({ force: true });

  userData.forEach(async (user) => {
    console.log(user.password);
    user.password = await bcrypt.hash(user.password, 10);
  });

  console.log(userData);
  const createUsers = () => User.bulkCreate(userData);
  createUsers();
  for (const posts of postsData) {
    await Posts.create({
      ...posts,
      user_id: Math.floor(Math.random() * userData.length + 1),
    });
  }

  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
      user_id: Math.floor(Math.random() * userData.length + 1),
      post_id: Math.floor(Math.random() * postsData.length + 1),
    });
  }

  process.exit(0);
};

injectData();
