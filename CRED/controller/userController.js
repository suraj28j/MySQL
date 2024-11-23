const { Student } = require("../models/userModel");

const getUser = async (req, res) => {
    let email = req.email;
    try {
        let user = await Student.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }
        const { password, ...rest } = user.dataValues
        res.status(200).json({ success: true, message: "User found successfully", data: { ...rest } })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const updateUser = async (req, res) => {
    let email = req.email;
    try {
        let user = await Student.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }
        let dataToUpdate = req.body;
        await Student.update(dataToUpdate, {
            where: {
                email: email
            }
        })
        res.status(200).json({ success: true, message: "User updated successfully" })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const deleteUser = async (req, res) => {
    let email = req.email;
    try {
        let user = await Student.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }
        await Student.destroy({
            where: {
                email: email
            }
        })
        res.status(200).json({ success: true, message: "User deleted successfully" })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


module.exports = { getUser, updateUser, deleteUser }