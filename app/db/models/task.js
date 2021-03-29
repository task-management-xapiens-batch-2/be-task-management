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
      task.hasMany(models.note,{foreignKey:"task_id"})
      task.belongsTo(models.project,{foreignKey:"project_id"})
      task.belongsTo(models.user,{foreignKey:"assignee"})
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
    status: DataTypes.ENUM("draft","submit","approved","return","reject","todo","doing","done"),
    deletedAt: DataTypes.DATE,
    is_read:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'task',
    paranoid:true
  });
  return task;
};