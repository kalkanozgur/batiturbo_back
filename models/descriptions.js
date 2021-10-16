'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class descriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // descriptions.belongsToMany(models.task, {through: models.JobDescriptions})
      // descriptions.belongsToMany(models.task, {through: "TaskDescriptions"})
      // descriptions.belongsToMany(models.turbo, {through: "TurboDescriptions"})
    }
  };
  descriptions.init({
    idDescription: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'descriptions',
  });
  return descriptions;
};