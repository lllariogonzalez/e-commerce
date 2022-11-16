const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_payment: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("created", "pending", "in process", "delivered", "received", "cancelled"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );  
 }