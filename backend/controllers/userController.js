import User from "../models/User.js"
import { generateId } from "../helpers/generateId.js";
import { generateJwt } from "../helpers/generateJWT.js";
import e from "express";
export const registerUser = async (req, res) => {
    const { email } = req.body;
    const alreadyExistUser = await User.findOne({ email })
    if (alreadyExistUser) {
        const error = new Error('User already have an account')
        return res.status(400).json({ msg: error.message })
    }
    try {
        const user = new User(req.body)
        user.token = generateId();
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (error) {
        console.log(error)
    }
    res.json({ msg: 'Created' })
}

export const auth = async (req, res) => {

    const { email, password } = req.body
    //Check if the user exist
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("User no exists")
        res.status(404).json({ msg: error.message })
    }

    //Check if is it confirmated
    if (!user.confirm) {
        const error = new Error("Usuario Exists but it is not confirm")
        res.status(403).json({ msg: error.message })
    }

    //Check password
    if (await user.checkPassword(password)) {
        res.json({ _id: user._id, name: user.name, email: user.email, token: generateJwt(user._id) })
    } else {
        const error = new Error("Password is not valid")
        res.status(403).json({ msg: error.message })
    }
}

export const confirmUser = async (req, res) => {
    const { token } = req.params
    const confirmUser = await User.findOne({ token })
    if (!confirmUser) {
        const error = new Error("Token is not valid")
        res.status(403).json({ msg: error.message })
    }
    try {
        confirmUser.confirm = true;
        confirmUser.token = ''
        await confirmUser.save()
        res.json({ msg: 'User confimed correctly' })
    } catch (error) {
        console.log(error)
    }
}

export const restorePassword = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("Email does not exists, please check again")
        return res.status(404).json({ msg: error.message })
    }
    try {
        user.token = generateId()
        await user.save()
        res.json({ msg: "We sent an email with instructions to restore your password" })
    } catch (error) {
        console.log(error)
    }
}

export const checkToken = async (req, res) => {
    const { token } = req.params
    const validToken = await User.findOne({ token })
    if (validToken) {
        res.json({ msg: "Token is ok, change your password..." })
    }
    else {
        const error = new Error("Token is not valid")
        res.status(404).json({ msg: error.message })
    }
}

export const changePassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const userNewPassword = await User.findOne({ token })
    if (userNewPassword) {
        try {
            userNewPassword.password = password
            userNewPassword.token = ''
            await userNewPassword.save()
            res.json({ msg: 'Password modified correctly' })
        } catch (error) {
            console.log(error)
        }
    }
    else {
        const error = new Error("Enter a valid token")
        res.status(404).json({ msg: error.message })
    }

}

export const profile = async (req, res) => {
    const { user } = req
    res.json(user)
}