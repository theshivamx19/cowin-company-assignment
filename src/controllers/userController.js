const userModel = require('../models/userModel')
const vfy = require('../validator/validation')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const data = req.body
        if (vfy.isEmptyObject(data)) {
            return res.status(400).send({ status: false, message: err.message })
        }
        const { name, phoneNumber, age, pincode, aadharNumber, password } = data
        if (!name) {
            return res.status(400).send({ status: false, message: 'Name is required' })
        }
        if (!phoneNumber) {
            return res.status(400).send({ status: false, message: 'Phone number is required' })
        }
        if (!age) {
            return res.status(400).send({ status: false, message: 'Age is required' })
        }
        if (!pincode) {
            return res.status(400).send({ status: false, message: 'Pincode is required' })
        }
        if (!aadharNumber) {
            return res.status(400).send({ status: false, message: 'Aadhar number is required' })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: 'Password is required' })
        }
        const checkMobile = await userModel.findOne({ phoneNumber })
        if (checkMobile) {
            return res.status(400).send({ status: false, message: 'Mobile no. already exists' })
        }
        const checkAadhar = await userModel.findOne({ aadharNumber })
        if (checkAadhar) {
            return res.status(400).send({ status: false, message: 'Aadhar no. already exists' })
        }
        const user = await userModel.create(data)
        return res.status(201).send({ status: true, data: user })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


const loginUser = async (req, res) => {
    try {
        const phone = req.body.phoneNumber
        const password = req.body.password
        if (!phone) {
            return res.status(400).send({ status: false, message: 'Phone number is required' })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: 'Password is required' })
        }
        const user = await userModel.findOne({ phoneNumber: phone, password: password })
        if (!user) {
            return res.status(400).send({ status: false, message: 'Phone no. or password is wrong' })
        }
        const token = jwt.sign({
            userId: user._id.toString()
        }, "mySecretKey", { expriresIn: "1h" })
        res.setHeader('x-api-key', token)
        return res.status(200).send({ status: true, data: token })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = {
    createUser,
    loginUser
}


