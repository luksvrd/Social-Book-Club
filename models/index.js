const Book = require("./Book");
const Bookshelf = require("./Bookshelf");
// const ReaderList = require("./ReaderList");
const User = require("./User");
const Comment = require("./Comments");

Book.hasMany(User, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

User.belongsToMany(Book, {
  through: {
    model: Bookshelf,
    unique: false,
  },
  as: "bookshelf_books",
});

Book.belongsToMany(User, {
  through: {
    model: Bookshelf,
    unique: false,
  },
  as: "bookshelf_users",
});

Bookshelf.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Bookshelf.hasMany(Book, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

// ReaderList.belongsTo(User, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// ReaderList.hasMany(Book, {
//   foreignKey: "book_id",
//   onDelete: "CASCADE",
// });

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Book, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Book, Bookshelf, User, Comment };
