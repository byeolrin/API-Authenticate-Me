'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models')

let options = { tableName: 'Spots' };
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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: '121 Twitch Road',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States of America',
      lat: 34.0549,
      lng: 118.2426,
      name: 'Andrew\'s Streamer House',
      description: 'A house where you can have LAN parties!',
      price: 49.99
    },
    {
      ownerId: 4,
      address: '28 Little Root Street',
      city: 'Boston',
      state: 'Massachusetts',
      country: 'United States of America',
      lat: 42.3601,
      lng: 71.0589,
      name: 'Kevin\'s House',
      description: 'Why is it so cold in Boston?',
      price: 19.89
    },
    {
      ownerId: 5,
      address: '431 Pokemon Road',
      city: 'Sacramento',
      state: 'California',
      country: 'United States of America',
      lat: 38.5816,
      lng: 121.4944,
      name: 'Dennis\'s House',
      description: 'Which part of California is this?',
      price: 16.60
    },
    {
      ownerId: 3,
      address: '1200 Getty Center Drive',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States of America',
      lat: 34.0549,
      lng: 118.2426,
      name: 'Tyler\'s House',
      description: 'A very beautiful place to live.',
      price: 888.88
    },
    {
      ownerId: 2,
      address: '222 Henesys Market',
      city: 'New York',
      state: 'New York',
      country: 'United States of America',
      lat: 40.7128,
      lng: 74.0060,
      name: 'Gary\'s House',
      description: 'A 2D place and world to live in.',
      price: 182348.88
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
      city: { [Op.in]: ['Los Angeles', 'New York', 'Boston', 'Sacramento'] }
    }, {});
  }
};
