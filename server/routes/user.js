import { Router } from "express"

import UserController from "../controllers/UserController.js"
import { verifyLoggedIn } from "../middleware/auth.js"

const router = Router()

// @route GET /u/my-courses
// @desc Get courses enrolled by user
// @access Private
router.get('/my-courses', verifyLoggedIn, UserController.getMyCourses)

// @route GET /u/my-profile
// @desc Get user profile
// @access Private
router.get('/my-profile', verifyLoggedIn, UserController.getMyProfile)

// @route POST /u/my-profile
// @desc edit user profile
// @access Private
router.post('/my-profile', verifyLoggedIn, UserController.editMyProfile)

// @route GET /u/change-password
// @desc get change-password site
// @access Private
router.get('/change-password', verifyLoggedIn, UserController.getUpdatePassword)

// @route POST /u/change-password
// @desc update password
// @access Private
router.post('/change-password', verifyLoggedIn, UserController.updatePassword)

// @route GET /u/all-courses
// @desc Get all courses 
// @access Private
router.get('/all-courses', verifyLoggedIn, UserController.getAllCourses)

// @route GET /u/:courseId/details
// @desc get 1 course details 
// @access Private
router.get('/details', verifyLoggedIn, UserController.getCourseDetails)

// @route POST /u/enroll-course/:courseId
// @desc enroll 1 course 
// @access Private
router.post('/enroll-course', verifyLoggedIn, UserController.enrollCourse)

// @route GET /u/
// @desc GET user homepage when logged in
// @access Private
router.get('/', verifyLoggedIn, UserController.user)

export default router