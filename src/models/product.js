const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  lote: { type: DataTypes.STRING, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  fechaIngreso: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Product;
