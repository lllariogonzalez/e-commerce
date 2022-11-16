const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "OrderDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      units: {
       type: DataTypes.INTEGER,
       allowNull: false
      }
    },
    {
      timestamps: false,
    }
  );
};
