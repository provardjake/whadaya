const sequelize = require('../config/connection');
const { User, Review } = require('../models');

const userData = require('./userData.json');
const postInfo = require('./reviewData.json');
const commentInfo = require('./commentData.json');
const categoryInfo = require('./categoryData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const review of postInfo) {
    await Review.create({
      ...review,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
