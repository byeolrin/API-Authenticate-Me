'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Review } = require('../models')

let options = { tableName: 'Spots'};
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
   await Review.bulkCreate([
    {
      spotId: 1,
      userId: 5,
      review: 'This place provided everything we need but needs to cleaned up  better.',
      stars: 3,
    },
    {
      spotId: 2,
      userId: 2,
      review: 'This place brings back a lot of nostalgic memories.',
      stars: 4,
    },
    {
      spotId: 5,
      userId: 4,
      review: 'This place is so much fun. You can practically do anything you want here!',
      stars: 5,
    }
   ])
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
      SpotId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
