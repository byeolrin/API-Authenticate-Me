'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = { tableName: 'Users' };
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'ledennisjamesthe2nd@gmail.com',
        username: 'enchuu205',
        hashedPassword: bcrypt.hashSync('ripwemisshim'),
        firstName: 'Andrew',
        lastName: 'Ly'
      },
      {
        email: 'faker2@gmail.com',
        username: 'byeolrin',
        hashedPassword: bcrypt.hashSync('nextworldswinner'),
        firstName: 'Gary',
        lastName: 'Cheung'
      },
      {
        email: 'theshy2@gmail.com',
        username: 'TylerHan1226',
        hashedPassword: bcrypt.hashSync('unluckystopfeeding'),
        firstName: 'Tyler',
        lastName: 'Han'
      },
      {
        email: 'kevinfantetokounmpo@gmail.com',
        username: 'Kyfan01',
        hashedPassword: bcrypt.hashSync('greekbballlegend'),
        firstName: 'Kevin',
        lastName: 'Fan'
      },
      {
        email: 'ledennisjames@gmail.com',
        username: 'dennisbtw',
        hashedPassword: bcrypt.hashSync('lebronfanboy'),
        firstName: 'Dennis',
        lastName: 'Ma'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['enchuu205', 'byeolrin', 'TylerHan1226', 'Kyfan01', 'dennisbtw'] }
    }, {});
  }
};