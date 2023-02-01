const Book = require("./Book");
const Bookshelf = require("./Bookshelf");
// const ReaderList = require("./ReaderList");
const User = require("./User");
const Comment = require("./Comments");

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

// User has many Comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Book, Bookshelf, User, Comment };
