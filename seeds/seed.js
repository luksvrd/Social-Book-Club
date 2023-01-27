const sequelize = require("../config/connection");
const { User, Bookshelf, Book, Comment } = require("../models");

const userData = require("./userData.json");
const booksData = require("./bookSeedData.json");
const bookshelfData = require("./bookshelvesSeedData.json");
const commentData = require("./commentsSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of booksData) {
    await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const bookshelf of bookshelfData) {
    await Bookshelf.create({
      ...bookshelf,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
