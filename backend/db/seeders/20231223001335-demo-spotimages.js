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
      url: 'https://i.imgur.com/J4xZ8vK.png',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/HYXMQtD.png',
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
    {
      spotId: 7,
      url: 'https://i.imgur.com/Mp5riz4.png',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/L0wOS2s.png',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://i.imgur.com/faPeTXh.png',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://i.imgur.com/dZqLcNS.png',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://i.imgur.com/vnAqOpq.png',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://i.imgur.com/EpLKxmc.png',
      preview: true
    },
    {
      spotId: 13,
      url: 'https://i.imgur.com/bLYpmwS.png',
      preview: true
    },
    {
      spotId: 14,
      url: 'https://i.imgur.com/0K7CtmQ.png',
      preview: true
    },
    {
      spotId: 15,
      url: 'https://i.imgur.com/nBx3WLE.png',
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
