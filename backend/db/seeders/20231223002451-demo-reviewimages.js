'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ReviewImage } = require('../models')

let options = { tableName: 'ReviewImages' };
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: 'https://c1.vgtstatic.com/thumb/2/4/241586-v2-xl/offlinetv-house.jpg'
    },
    {
      reviewId: 2,
      url: 'https://kokorojapanstore.com/cdn/shop/articles/Pokemon_Center1_1024x1024.jpg?v=1630683901'
    },
    {
      reviewId: 3,
      url: 'https://nxcache.nexon.net/cms/2021/q4/2111/in-post-banner-1100x225-maplestory-december-29-cash-shop-update.png'
    }
   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
