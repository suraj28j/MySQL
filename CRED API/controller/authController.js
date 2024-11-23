const { Student } = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
}

const registerUser = async (req, res) => {
    // console.log(req.body);
    const { name, email, password, phone, role } = req.body;

    try {
        let user = await Student.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt)
        user = await Student.create({
            name,
            email,
            password: hashPassword,
            phone,
        });

        // console.log(user.toJSON());
        // console.log(JSON.stringify(user));

        res.status(200).json({ success: true, message: "Registration Successfull" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const loginUser = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await Student.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        let isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Incorrect Password" })
        }

        let token = generateToken(user);

        const { password, role, ...rest } = user.dataValues;
        res.status(200).json({ success: true, message: "Login Successful", token, data: { ...rest }, role })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { registerUser, loginUser }