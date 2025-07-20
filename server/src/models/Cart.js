const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    items: {
      type: DataTypes.JSON, // Array of cart items
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Cart;
