'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.hasMany(models.note)
      task.belongsTo(models.project)
      task.belongsTo(models.user)
    }
  };
  task.init({
    project_id: DataTypes.INTEGER,
    assignee: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    attachment: DataTypes.STRING,
    status: DataTypes.ENUM("Draft","Submit","Approved","Return","Reject","Todo","Doing","Done"),
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
    paranoid:true
  });
  return task;
};