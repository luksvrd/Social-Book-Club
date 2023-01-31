const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Bookshelf extends Model {}

Bookshelf.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bookshelf_content: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "bookshelf",
  }
);

module.exports = Bookshelf;
