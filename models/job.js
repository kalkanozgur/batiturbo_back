'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      job.belongsToMany(models.descriptions, {as: "Descriptions", through: models.JobDescriptions})
      // job.belongsToMany(models.photo_url, { through: "JobPhotos" })
      job.belongsTo(models.customerInfo, {as: "Customer", foreignKey: {allowNull: false, name: "customer_id"}})
      job.belongsTo(models.turbo, {as: "Turbo", foreignKey: {name: "turbo_id"}})
      job.hasMany(models.task, {as: "Tasks"})
      job.belongsToMany(models.payment, {as: "Payments",through: "JobsPayments"})
      job.belongsTo(models.user, {as: "JobCreatedBy", foreignKey: {allowNull: false, name: "created_by"}})
      job.belongsTo(models.user, {as: "JobUpdatedBy", foreignKey: {allowNull: false, name: "updated_by"}})
    }
  };
  job.init({
    idJob: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      //allowNull: false,
      defaultValue: false
    },
    isPaused: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'job',
  });
  return job;
};