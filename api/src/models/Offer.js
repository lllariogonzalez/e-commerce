const { DataTypes } = require('sequelize');

module.exports= (sequelize) => {    
    sequelize.define(
      "Offer",
      {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        event: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDay:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
        endDay:{
            type: DataTypes.DATEONLY,
        },
        active:{
            type: DataTypes.VIRTUAL,
            get(){
                return `${new Date(this.startDay)<=Date.now() && Date.now()<new Date(this.endDay)}`
            },
            set(value){
                throw new Error("Do not try to set the active value");
            }
        },
        detail: {
         type: DataTypes.TEXT,
        }
      },
      {
        timestamps: false,
      }
    );
};