import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import { verifyToken, verifyAdmin } from '../middleware/auth.js'
import User from '../models/User.js'
const router = Router()

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password');

		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' });
		res.json({ success: true, user });
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
});
// @route GET api/auth/admin
// @desc Check if user is admin
// @access Public
router.get('/admin', verifyAdmin, async (req, res) => {
	res.json({success: true})
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', AuthController.register)

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login',  AuthController.login)

// @route POST api/auth/reset-password
// @desc Reset password
// @access Public
router.post('/reset-password', AuthController.resetPassword)


export default router