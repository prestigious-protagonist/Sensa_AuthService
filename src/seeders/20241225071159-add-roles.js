'use strict';

const { UUIDV4 } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
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

    
     
    await queryInterface.bulkInsert('Roles', [
      {
       id: uuidv4(),
       name: 'Admin', 
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        id:uuidv4(),
        name: 'Customer', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Roles', null, {});
  }
};
