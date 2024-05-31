'use strict';

const { saveProductsToDatabase } = require('../services/saveProductsToDatabase');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await saveProductsToDatabase('iPhone 14');
    await saveProductsToDatabase('Notebook');
    await saveProductsToDatabase('Amazfit');
  },

};