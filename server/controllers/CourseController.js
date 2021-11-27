import jwt from 'jsonwebtoken'
import Course from "../models/Course.js"
import User from "../models/User.js"
import { multipleMongooseToObject } from "../util/mongoose.js"

class CourseController {
    // @route POST /courses/delete
    async deleteCourse(req, res) {
        const courseID = req.body.courseID
        try {
            const result = await Course.findOneAndDelete({ _id: courseID }, { new: true })
            console.log(result)
            res.json({
                success: true,
                message: 'delete course successfully'
            })
        } catch (error) {
            console.log('error: ' + error)
            res.json({
                success: false,
                message: 'delete course fail'
            })
        }
    }

    // @route GET /courses
    async getAllCourses(req, res) {
        try {
            console.log('trigger');
            const courses = await Course.find().select('-lessonList')
            // res.render('./courses/getCourses', { courses: multipleMongooseToObject(allCourses) })
            res.json({
                success: true,  
                courses
            })

        } catch (error) {
            console.log('error: ' + error)
            res.json({
                message: 'get all courses fail'
            })
        }
    }

    // @route GET /courses/create
    async createCourseSite(req, res) {

        const userId = req.userId
        const user = await User.findOne({ _id: userId })

        // res.render('./courses/createCourses', { layout: 'main-admin', username: user.username })
        res.json({
            success: true,
            message: 'get courses/create route'
        })
    }

    // @route POST /courses/create
    async createCourse(req, res) {
        const { title, code, description } = req.body;
        // console.log(req.body)

        try {
            if (!title || !code) {
                res.json({
                    success: false,
                    message: 'Some fields is missing'
                })
            }
            // check if exist course
            // ...
            if (await Course.findOne({ title })) {
                return res.json({
                    success: false,
                    message: 'course title already existed'
                })
            }

            if (await Course.findOne({ code })) {
                return res.json({
                    success: false,
                    message: 'course code already existed'
                })
            }


            // all good
            const newCourse = new Course({
                title,
                code,
                description
            })
            await newCourse.save()
            const course = jwt.sign({ courseId: newCourse._id, title, code, }, process.env.COURSE_COOKIE_SECRET)

            // set cookie
            res.cookie('course', course, {
                expires: new Date(Date.now() + 30 * 60000) // cookie will be removed after 30 mins
            })
            
            // res.redirect('../lessons')
            res.json({
                success: true,
                coursecookie:  cookie('course', course, {expires: new Date(Date.now() + 30 * 60000)}),
                message: 'created course, have to create lesson for this course'
            })

        } catch (error) {
            console.log('error: ' + error)
            res.json({
                message: 'create course fail'
            })
        }
    }

}

export default new CourseController