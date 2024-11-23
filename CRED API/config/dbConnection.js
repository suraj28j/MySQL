const { Sequelize } = require('sequelize')

const sequelize = new Sequelize("test", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging:false
})

const dbConnection = async () => {
    try {
        sequelize.authenticate();
        console.log("DB connection has been esablished successfully ");
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
}

module.exports = {dbConnection,sequelize}