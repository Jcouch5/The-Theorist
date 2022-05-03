const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

const userData = require('./user.json');
const postsData = require('./posts.json');
const commentsData = require('./comments.json');

const injectData = async () => {
	await sequelize.sync({ force: true });

	const users = await User.bulkCreate(userData);

    for (const posts of postsData) {
		await Posts.create({
			...posts,
			user_id: Math.floor(Math.random() * userData.length+1),
		});
	}

	for (const comments of commentsData) {
		await Comments.create({
			...comments,
			user_id: Math.floor(Math.random() * userData.length+1),
            post_id: Math.floor(Math.random() * postsData.length+1),
		});
	}


	process.exit(0);
};

injectData();
