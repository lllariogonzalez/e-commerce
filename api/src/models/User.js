const { DataTypes } = require('sequelize');

module.exports= (sequelize) => {    
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        block: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        shipping_address: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.BIGINT,
            validate: {
                isInt: true,
                isNumeric: true
            }
        },
        postal_code: {
            type: DataTypes.BIGINT,
        },
        region: {
            type: DataTypes.STRING,
        }
    },{
        timestamps: true
    });
};