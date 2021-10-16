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
      task.belongsTo(models.job, {as:"JobId", foreignKey: {allowNull: false, name: "jobId"}})
      task.belongsToMany(models.descriptions, {as: "Descriptions",through: models.TaskDescriptions})
      task.belongsToMany(models.photo_url, { through: "TaskPhotos" })
      task.belongsTo(models.payment, {as: "Payment", foreignKey: "paymentId"})
      task.belongsTo(models.user, {as: "TaskCreatedBy", foreignKey: {allowNull: false, name: "created_by"}})
      task.belongsTo(models.user, {as: "TaskUpdatedBy", foreignKey: {allowNull: false, name: "updated_by"}})
    }
  };
  task.init({
    idTask: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};