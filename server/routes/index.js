import authRouter from './auth.js'
import siteRouter from './site.js'
import courseRouter from  './courses.js'
import userRouter from './user.js'
import lessonRouter from './lessons.js'

function route(app) {
    app.use('/api/auth', authRouter)
    app.use('/courses', courseRouter)
    app.use('/lessons', lessonRouter)
    app.use('/u', userRouter)
    app.use('/', siteRouter)
}

export default route
