'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models')

let options = { tableName: 'SpotImages' };
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
   await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: 'https://i.imgur.com/W0cEydI.png',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/H7D3JXf.png',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/5jmepuT.png',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://i.imgur.com/CQHqiJy.png',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://i.imgur.com/vfsK2ss.png',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/NWl1G4v.png',
      preview: true
    },
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
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
