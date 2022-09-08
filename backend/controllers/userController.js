import User from "../models/User.js"
export const registerUser = async (req, res) => {
    const { email } = req.body;
    const alreadyExistUser = await User.findOne({ email })
    if (alreadyExistUser) {
        const error = new Error('User already have an account')
        return res.status(400).json({ msg: error.message })
    }
    try {
        const user = new User(req.body)
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (error) {
        console.log(error)
    }
    res.json({ msg: 'Created' })
}