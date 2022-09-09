import jwt from 'jsonwebtoken'

export const generateJwt = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}