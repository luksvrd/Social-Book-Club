const seedUsers = require("./userData.json");
const seedBooks = require("./bookSeedData.json");
const seedBookshelves = require("./bookshelvesSeedData.json");
const seedComments = require("./commentsSeedData.json");

const sequelize = require("../config/connection");

const seedAllDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  // this is where i am getting the error in the terminal: "TypeError: seedUsers is not a function"
  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedBooks();
  console.log("\n----- BOOKS SEEDED -----\n");

  await seedBookshelves();
  console.log("\n----- BOOKSHELVES SEEDED -----\n");

  await seedComments();
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedAllDatabase();

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

// for (const book of booksData) {
//   await Book.create({
//     ...book,
//     user_id: users[Math.floor(Math.random() * users.length)].id,
//   });
// }

// for (const bookshelf of bookshelfData) {
//   await Bookshelf.create({
//     ...bookshelf,
//     user_id: users[Math.floor(Math.random() * users.length)].id,
//   });
// }

// for (const comment of commentData) {
//   await Comment.create({
//     ...comment,
//     user_id: users[Math.floor(Math.random() * users.length)].id,
//   });
// }

//   process.exit(0);
// };

// seedDatabase();
