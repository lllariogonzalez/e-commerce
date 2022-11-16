const { DataTypes } = require('sequelize');

module.exports= (sequelize) => {    
    sequelize.define(
      "Image",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            valide: {
                isUrl: true
            }
        },
        public_id: {
            type: DataTypes.STRING,
            unique: true
        }
      },
      {
        timestamps: false,
      }
    );
};