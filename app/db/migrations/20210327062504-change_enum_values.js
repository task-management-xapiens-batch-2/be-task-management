'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.addColumn("tasks",'status',{
    //   type: Sequelize.ENUM,
    //   values: ["draft","submit","approved","return","reject","todo","doing","done"],
    //   allowNull: false
    // })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn("tasks",'status',{
    //   type: Sequelize.ENUM,
    //   values:["Draft","Submit","Approved","Return","Reject","Todo","Doing","Done"],
      
    // })
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
