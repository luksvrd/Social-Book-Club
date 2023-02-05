const { User, Book, Bookshelf } = require("../models");
const seedUsers = require("./userData.json");
const seedBooks = require("./bookSeedData.json");
const seedBookshelves = require("./bookshelvesSeedData.json");

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

  process.exit(0);
};

seedAllDatabase();
