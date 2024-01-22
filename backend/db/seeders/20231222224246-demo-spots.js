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
      address: 'Ellinel Fairy Academy',
      city: '	Ellinel City',
      state: 'Ellinel',
      country: 'Victoria Island',
      lat: 34.0549,
      lng: 118.2426,
      name: 'Ellinel Academy Lobby',
      description: 'A place where young Maplers and become a fairy magician.',
      price: 17.99
    },
    {
      ownerId: 2,
      address: 'Empress Road',
      city: 'Ereve City',
      state: 'Ereve',
      country: 'Victoria Island',
      lat: 42.3601,
      lng: 71.0589,
      name: 'Cygnus Knight',
      description: 'A place where Maplers can gathers and become a Knight for Cygnus.',
      price: 125.99
    },
    {
      ownerId: 3,
      address: 'Henesys Avenue',
      city: '	Henesys City',
      state: 'Henesys',
      country: 'Victoria Island',
      lat: 38.5816,
      lng: 121.4944,
      name: 'Bowman Instructional School',
      description: 'This is where you decide to become an Explorer Bowman.',
      price: 33.99
    },
    {
      ownerId: 4,
      address: 'Lake of Oblivion',
      city: 'Vanishing City',
      state: 'Vanishing Journey',
      country: 'Arcane River',
      lat: 34.0549,
      lng: 118.2426,
      name: 'Nameless Town',
      description: 'Where all the LEVEL 200 Maplers start progressing on their end-game.',
      price: 899.99
    },
    {
      ownerId: 5,
      address: 'Root Abyss',
      city: 'Root Abyss City',
      state: 'Root Abyss',
      country: 'Victoria Island',
      lat: 40.7128,
      lng: 74.0060,
      name: 'Colossal Root',
      description: 'You get to meet the 4 bosses of Root Abyss: Crimson Queen, Pierre, Von Bon, Vellum.',
      price: 420.99
    },
    {
      ownerId: 6,
      address: 'Ellinia Library',
      city: '	Ellinia City',
      state: 'Ellinia' ,
      country: 'Victoria Island',
      lat: 90.0000,
      lng: 135.0000,
      name: 'Magic Library',
      description: 'This is where you decide to become an Explorer Magician.',
      price: 212.99
    },
    {
      ownerId: 7,
      address: 'Temple of Time',
      city: 'Temple of Time City',
      state: 'Temple of Time' ,
      country: 'Ossyria',
      lat: 34.0326,
      lng: 118.4575,
      name: 'Crack in Time',
      description: 'A place where you will eventually meet Pink Bean.',
      price: 245.99
    },
    {
      ownerId: 8,
      address: 'Tyrant\'s Castle',
      city: 'Heliseum City',
      state: 'Heliseum' ,
      country: 'Grandis',
      lat: 37.5126,
      lng: 127.0428,
      name: 'Tyrant\'s Throne',
      description: 'You will meet Magnus here.',
      price: 76.99
    },
    {
      ownerId: 9,
      address: 'Perion\'s Sanctuary',
      city: 'Perion City',
      state: 'Perion' ,
      country: 'Victoria Island',
      lat: 37.5126,
      lng: 127.0428,
      name: 'Warriors\' Sanctuary',
      description: 'This is where you decide to become an Explorer Warrior.',
      price: 231.99
    },
    {
      ownerId: 10,
      address: 'Kerning City\'s Hideout',
      city: '	Kerning City',
      state: 'Kerning State',
      country: 'Victoria Island',
      lat: 37.5126,
      lng: 127.0428,
      name: 'Hideout',
      description: 'This is where you decide to become an Explorer Thief.',
      price: 421.99
    },
    {
      ownerId: 2,
      address: 'Henesys Street',
      city: 'Henesys City',
      state: 'Henesys' ,
      country: 'Victoria Island',
      lat: 37.5126,
      lng: 127.0428,
      name: 'Henesys Town',
      description: 'A place where you can show off your high-end fashion as a Mapler.',
      price: 934823.99
    },
    {
      ownerId: 2,
      address: 'Wedding Street',
      city: 'Amoria City',
      state: 'Amoria' ,
      country: 'Grandis',
      lat: 37.5126,
      lng: 127.0428,
      name: 'Amoria Chapel',
      description: 'You can get married here as a Mapler.',
      price: 53.99
    },
    {
      ownerId: 2,
      address: 'Vulpes Street',
      city: 'Fox Point Village',
      state: 'Vulpes' ,
      country: 'Grandis',
      lat: 37.5126,
      lng: 127.0428,
      name: 'Fox Point Village',
      description: 'Where you become friends with Moonbeam and become a Shade.',
      price: 162.99
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
      city: { [Op.in]: ['Los Angeles', 'New York', 'Boston', 'Sacramento', 'North Pole', 'Gangnam-gu'] } // FIX THIS HERE NEXT TIME
    }, {});
  }
};
