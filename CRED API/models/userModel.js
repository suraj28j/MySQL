const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnection.js')

// sequelize.define(modelName, attributes, options)

const Student = sequelize.define(
    'Student',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique:true,
            allowNull:false
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type:DataTypes.INTEGER,
            // unique:true
            // allowNull defaults to true
        },
        role:{
            type:DataTypes.STRING,
            defaultValue:"user"
        }
    },
    {
        // Other model options go here
        // freezeTableName: true,
        tableName: 'students',
        timestamps: false
    },
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = {Student}