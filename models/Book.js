import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection";

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reader_id: {
      type: DataTypes.INTEGER,
      references: {

        model: "reader",
        key: "id",
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

        model: 'reader',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,

    modelName: "book",
  }
);

export default Book;