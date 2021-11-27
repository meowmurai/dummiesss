import jwt from 'jsonwebtoken'

import Course from "../models/Course.js"
import Lesson from "../models/Lesson.js"
import User from "../models/User.js"

class LessonController {

    // @route GET /lessons
    async getCreateLesson(req, res) {
        const userId = req.userId
        const user = await User.findOne({ _id: userId })

        // res.render('./lessons/createLessons', { layout: 'main-admin', username: user.username })
        res.json({
            success: true,
            message: 'route to create lesson for course'
        })
    }


    // @route POST /lessons
    async createLesson(req, res) {
        try {
            // verify cookie to get courseId
            const courseCookie = req.cookies.course
            const decoded = jwt.verify(courseCookie, process.env.COURSE_COOKIE_SECRET)
            const courseId = decoded.courseId

            // find course
            const course = await Course.findOne({ _id: courseId })

            // creat new lesson to add to course
            const {title} = req.body
            const newLesson =  new Lesson({title: title})
            newLesson.save()

            // adding to lesson list
            course.lessonList.push(newLesson._id)

            // update course
            await Course.findOneAndUpdate({ _id: courseId }, course, { new: true })

            res.json({
                success: true,
                message: 'created lesson!!'
            })

        } catch (error) {
            console.log('error: ' + error)
            return res.json({
                success: false,
                message: 'fail to create lesson'
            })
        }
    }
}

export default new LessonController