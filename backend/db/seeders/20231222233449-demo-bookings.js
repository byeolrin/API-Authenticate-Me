'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Booking } = require('../models')

let options = { tableName: 'Bookings' };
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
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 5,
      startDate: 12/25/23,
      endDate: 1/2/24
    },
    {
      spotId: 2,
      userId: 2,
      startDate: 1/22/24,
      endDate: 2/10/24
    },
    {
      spotId: 3,
      userId: 1,
      startDate: 3/15/24,
      endDate: 3/18/24
    },
    {
      spotId: 4,
      userId: 4,
      startDate: 12/25/23,
      endDate: 1/2/24
    },
    {
      spotId: 5,
      userId: 3,
      startDate: 12/25/23,
      endDate: 1/2/24
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
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
