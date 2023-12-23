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
      url: 'https://imagez.tmz.com/image/87/o/2023/10/16/87c088acc09b4cc3b6a9c2fd287f159e_md.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://i.ytimg.com/vi/rxEXxfUffN4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGDAgZSg-MA8=&rs=AOn4CLBGOpVX0Vrpdmuj_udMSoEJAdWWZw',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-scarlet-violet/2/25/FirstDayofSchoolWalkthrough_%2851%29.png?width=640',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://www.tripsavvy.com/thmb/w-HTNvDBtiVQHMdVVJJGbUXXjiI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TheGettyCenter-839a4dbc76c44c63b9a075d7ce194eb1.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2F5bxwpa0sgsny.jpg',
      preview: true
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
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
