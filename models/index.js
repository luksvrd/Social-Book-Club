const User = require('./User');
const Bookshelf = require('./Bookshelf');
const ReaderList = require('./ReaderList');

User.hasMany(Bookshelf, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Bookshelf.belongsTo(User, {
  foreignKey: 'user_id'
});

Bookshelf.hasMany(ReaderList, {
  foreignKey: 'bookshelf_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Bookshelf };
