'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      customer.belongsTo(models.customerInfo, {foreignKey: "customer_id"})
      customer.belongsToMany(models.descriptions, {as: "Descriptions", through: models.CustomerDescriptions, uniqueKey: "CustomerDescuniq"})
    }
  };
  customer.init({
    idCustomer: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    haveDebt: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};