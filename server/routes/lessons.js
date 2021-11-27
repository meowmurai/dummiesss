import { Router } from 'express'
import { verifyLoggedIn, verifyAdmin } from '../middleware/auth.js'
import { getVideoUrl, getUploadVideoUrl } from '../util/bizfly.js'
import LessonController from '../controllers/LessonController.js'

const router = Router()

// @route GET /lessons/
// @desc create lesson
// @access private
router.get('/', verifyLoggedIn, verifyAdmin, LessonController.getCreateLesson)

// @route POST /lessons/
// @desc create lesson
// @access private
router.post('/', verifyLoggedIn, verifyAdmin, LessonController.createLesson)

router.get('/getUrl', verifyLoggedIn, verifyAdmin, getVideoUrl)

router.post('/getUploadUrl', verifyLoggedIn, verifyAdmin, getUploadVideoUrl)


export default router