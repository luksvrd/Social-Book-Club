import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection";

class ReaderList extends Model {}

ReaderList.init(
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
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current_readings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reader_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "reader",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "reader_list",
  }
);

export default ReaderList;
