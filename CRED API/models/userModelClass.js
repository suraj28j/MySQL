const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");

// Extending Model and calling init(attributes, options)

class Student extends Model { }

Student.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        age: {
            type: DataTypes.INTEGER
        },
        city: {
            type: DataTypes.STRING
        }
    },
    {
        // freezeTableName: true,  // This way, Sequelize will infer the table name to be equal to the model name, without any modifications:
        sequelize, // We need to pass the connection instance
        modelName: 'Student', // We need to choose the model name
        tableName: "students"
    }
)

// module.exports = {Student}