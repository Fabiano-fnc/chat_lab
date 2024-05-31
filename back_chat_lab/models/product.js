const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prices: {
      type: DataTypes.JSON,
      allowNull: false
    }
  });

module.exports = product;