const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')

const authRoute = require('./routes/authRoute.js')
const userRoute = require('./routes/userRoute.js')
const { dbConnection, sequelize } = require('./config/dbConnection.js');
const { Student } = require('./models/userModel.js');

dotenv.config();

const app = express();

const corsOption = {
    origin:true,
    credentials:true
}

app.use(cors(corsOption));
app.use(express.json())
app.use(authRoute);
app.use(userRoute);

//Student.sync(); // perticutar model synchronize
sequelize.sync({force:false}) // all models synchronize

app.listen(8000, () => {
    console.log("server is running");
    dbConnection();
})