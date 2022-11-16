const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image:{
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      public_id: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      timestamps: true,
    }
  );
};
