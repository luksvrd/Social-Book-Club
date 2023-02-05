const Book = require("./Book");
const Bookshelf = require("./Bookshelf");
const User = require("./User");

// Bookshelf belongs to User
Bookshelf.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Bookshelf has many Books
Bookshelf.hasMany(Book, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

// Book belongs to Bookshelf
Book.belongsTo(Bookshelf, {
  foreignKey: "bookshelf_id",
  onDelete: "CASCADE",
});

// User has many Bookshelves
User.hasMany(Bookshelf, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Book, Bookshelf, User };
