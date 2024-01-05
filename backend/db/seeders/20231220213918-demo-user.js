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
      },
      {
        email: 'testing1@gmail.com',
        username: 'battlecat',
        hashedPassword: bcrypt.hashSync('testingpassword1'),
        firstName: 'Vincent',
        lastName: 'Li'
      },
      {
        email: 'testing2@gmail.com',
        username: 'buymebread',
        hashedPassword: bcrypt.hashSync('youreaproblem'),
        firstName: 'James',
        lastName: 'Lim'
      },
      {
        email: 'testing3@gmail.com',
        username: 'byebyegpa',
        hashedPassword: bcrypt.hashSync('huhurcrazy'),
        firstName: 'Nathan',
        lastName: 'Lam'
      },
      {
        email: 'testing4@gmail.com',
        username: 'burgerking',
        hashedPassword: bcrypt.hashSync('nuggetfries'),
        firstName: 'Nolan',
        lastName: 'Leung'
      },
      {
        email: 'testing5@gmail.com',
        username: 'bozer',
        hashedPassword: bcrypt.hashSync('lolololol'),
        firstName: 'Raymond',
        lastName: 'Pan'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['enchuu205', 'byeolrin', 'TylerHan1226', 'Kyfan01', 'dennisbtw', 'battlecat', 'buymebread', 'byebyegpa', 'burgerking', 'bozer'] }
    }, {});
  }
};