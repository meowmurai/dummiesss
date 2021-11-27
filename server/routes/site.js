import { Router } from "express"
import siteController from '../controllers/SiteController.js'

const router = Router()

router.get('/register', siteController.register)
router.get('/login', siteController.login)
router.get('/forgot-password', siteController.resetPassword)
router.post('/logout', siteController.logout)
router.get('/', siteController.home)

export default router