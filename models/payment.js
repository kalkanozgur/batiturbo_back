'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payment.belongsTo(models.job, {as: "TaskId", foreignKey: {allowNull: false, name: "taskId"}})
    }
  };
  payment.init({
    idPayment: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    payment_type: {
      type: DataTypes.STRING,
      defaultValue: "Harcama"
    },
    payment_method: {
      type: DataTypes.STRING,
      defaultValue: "Nakit"
    },
    debt: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false, 
    sequelize,
    modelName: 'payment',
  });
  return payment;
};