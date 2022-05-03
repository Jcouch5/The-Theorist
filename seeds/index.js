const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./user.json');
const PostsData = require('./posts.json');
const CommentsData = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of PostsData) {
    await Posts.create({
      ...post,
      user_id: Math.floor(Math.random() * userData.length + 1),
    });
  }
  for (const comments of CommentsData) {
    await Comments.create({
      ...comments,
      user_id: Math.floor(Math.random() * userData.length + 1),
      post_id: Math.floor(Math.random() * PostsData.length + 1),
    });
  }

  process.exit(0);
};

seedDatabase();
