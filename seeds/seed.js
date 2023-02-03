const seedUsers = require("./userData.json");
const { User, Book, Bookshelf, Comment } = require("../models");
const seedBooks = require("./bookSeedData.json");
const seedBookshelves = require("./bookshelvesSeedData.json");
const seedComments = require("./commentsSeedData.json");

const sequelize = require("../config/connection");

const seedAllDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });
  console.log("\n----- USERS SEEDED -----\n");

  await Book.bulkCreate(seedBooks);
  console.log("\n----- BOOKS SEEDED -----\n");

  await Bookshelf.bulkCreate(seedBookshelves);
  console.log("\n----- BOOKSHELVES SEEDED -----\n");

  await Comment.bulkCreate(seedComments);
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedAllDatabase();

