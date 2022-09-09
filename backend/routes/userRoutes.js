import express from "express";
const router = express.Router()
import { registerUser, auth, confirmUser, restorePassword, checkToken, changePassword, profile } from '../controllers/userController.js'
import cheackAuth from "../middleware/checkAuth.js";


router.post('/', registerUser)
router.post('/login', auth)
router.get('/confirm/:token', confirmUser)
router.post('/forgot-password', restorePassword)
router.route('/forgot-password/:token').get(checkToken).post(changePassword)
router.get('/profile', cheackAuth, profile)

export default router;