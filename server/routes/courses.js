import { Router } from 'express'
import { verifyAdmin } from '../middleware/auth.js'
import CourseController from '../controllers/CourseController.js'

const router = Router()

// @route GET /courses/
// @desc get all course
// @access public
router.get('/', CourseController.getAllCourses)

// @route GET /courses/create
// @desc Get course create form
// @access Private
router.get('/create', verifyAdmin, CourseController.createCourseSite )

// @route POST /courses/create
// @desc Create course
// @access Private
router.post('/create', verifyAdmin, CourseController.createCourse)

// @route POST /courses/delete
// @desc delete course
// @access Private
router.post('/delete', verifyAdmin, CourseController.deleteCourse)

export default router