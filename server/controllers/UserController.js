import argon2 from 'argon2'

import User from '../models/User.js'
import Course from '../models/Course.js'

import { mongooseToObject, multipleMongooseToObject } from '../util/mongoose.js'

class UserController {

    //// @route GET /u
    async user(req, res) {
        const userId = req.userId

        try {

            const user = await User.findOne({ _id: userId })
            // if (user.role == 'student') {
            //     res.render('./user/home-user', { username: user.username, layout: 'main-user' })
            // }
            // else {
            //     res.render('./user/home-user', { username: user.username, layout: 'main-admin' })
            // }
            res.json({
                success: true,
                message: 'this route got after you logged in'
            })

        } catch (error) {
            console.log('error: ' + error)
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }
    }

    // @route GET /u/my-courses
    async getMyCourses(req, res) {
        const userId = req.userId
        try {
            const user = await User.findOne({ _id: userId }).populate('courses_id')
            const courses = user.courses_id
            // if (user.role == 'student') {
            //     res.render('./user/myCourses-user', { courses: multipleMongooseToObject(coursesId), username: user.username, layout: 'main-user', })
            // }
            // else {
            //     res.render('./user/myCourses-user', { courses: multipleMongooseToObject(coursesId), username: user.username, layout: 'main-admin', })
            // }
            console.log("this is all your courses enrolled")
            res.json({
                success: true,
                courses
            })
        } catch (error) {
            console.log('error: ' + error)
            return res.status(400).json({
                success: false,
                message: 'courses not found'
            })
        }
    }

    // @route GET /u/my-profile
    async getMyProfile(req, res) {
        const userId = req.userId
        try {

            const user = await User.findOne({ _id: userId })
            // if (user.role == 'student') {
            //     res.render('./user/myProfile-user', { user: mongooseToObject(user), username: user.username, layout: 'main-user' })
            // }
            // else {
            //     res.render('./user/myProfile-user', { user: mongooseToObject(user), username: user.username, layout: 'main-admin' })
            // }
            console.log('this route to get user for file: username, firstName, lastName, email')
            res.json({success: true,user})

        } catch (error) {
            console.log('error: ' + error)
            return res.status(400).json({
                success: false,
                message: 'cannot get profile'
            })
        }
    }
    // @route GET /u/getCourseDetails
    async getCourseDetails(req, res) {
        const userId = req.userId
        const courseID = req.query.courseID
        try {
            const user = await User.findOne({ _id: userId })
            const course = await Course.findOne({ _id: courseID }).populate('lessonList')
            const lessonList = course.lessonList
            res.json({success: true,course})


        } catch (error) {
            console.log('error: ' + error)
            return res.json({
                success: false,
                message: 'cannot get detail for this course'
            })
        }
    }

    async editMyProfile(req, res) {

        const { firstName, lastName, email, username } = req.body

        const userId = req.userId
        const user = await User.findOne({ _id: userId })

        // Check all existing email and username if modify
        if (username != user.username) {
            const checkUsername = await User.findOne({ username })
            if (checkUsername) return res.status(400).json({
                success: false,
                message: 'username already taken'
            })
        }

        if (email != user.email) {
            const checkEmail = await User.findOne({ email })
            if (checkEmail) return res.status(400).json({
                success: false,
                message: 'Email already taken'
            })
        }

        // all good
        try {
            await User.findOneAndUpdate({ _id: userId }, { firstName, lastName, email, username }, { new: true })
            // res.redirect('./u/my-profile')
            res.json({
                success: true,
                message: 'updated user profile'
            })

        } catch (error) {
            console.log('error: ' + error)
            return res.status(400).json({
                success: false,
                message: 'cannot edit profile'
            })
        }
    }

    async getUpdatePassword(req, res) {
        const userId = req.userId
        try {
            const user = await User.findOne({ _id: userId })
            // if (user.role == 'student') {
            //     res.render('./user/change-password', { layout: 'main-user', username: user.username })
            // }
            // else {
            //     res.render('./user/change-password', { layout: 'main-admin', username: user.username })
            // }
            res.json({
                success: true,
                message: 'route to change password'
            })

        } catch (error) {
            console.log('error: ' + error)
            return res.status(400).json({
                success: false,
                message: 'cannot get change password sitr'
            })
        }
    }

    async updatePassword(req, res) {
        const userId = req.userId

        const { oldPass, newPass, cfNewPass } = req.body

        console.log('nothing in input box to change password')
        if (!oldPass || !newPass || !cfNewPass) return res.redirect('back')

        // check new password and confirm are match??
        if (newPass != cfNewPass) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirmPassword are not match'
            })
        }

        try {

            const user = await User.findOne({ _id: userId })

            // check old password input is matched???
            const checkOldPass = await argon2.verify(user.password, oldPass)
            if (!checkOldPass) {
                return res.json({
                    success: false,
                    message: 'Incorrect old password'
                })
            }

            const hashedNewPassword = await argon2.hash(newPass)

            await User.findOneAndUpdate({ _id: userId }, { password: hashedNewPassword })

            // res.redirect('/u')

            res.json({
                success: true,
                message: 'updated user password'
            })

        } catch (error) {
            console.log('error: ' + error)
            return res.status(400).json({
                success: false,
                message: 'cannot update password'
            })
        }
    }

    async getAllCourses(req, res) {
        const userId = req.userId

        try {

            const user = await User.findOne({ _id: userId })

            const allCourses = await Course.find()
            if (user.role == 'student') {
                res.render('./courses/getCourses', { courses: multipleMongooseToObject(allCourses), username: user.username, layout: 'main-user' })

            }
            else {
                res.render('./courses/getCourses', { courses: multipleMongooseToObject(allCourses), username: user.username, layout: 'main-admin' })
            }

        } catch (error) {
            console.log('error: ' + error)
            res.json({
                message: 'get all courses fail'
            })
        }
    }
    
    // @route POST /u/enroll-course/:courseId
    async enrollCourse(req, res) {
        try {
            const { courseID } = req.body
            const user = await User.findOne({ _id: req.userId })
            console.log(courseID)
            // check if already enrolled course
            var courseList = user.courses_id
            var isIncluded = false
            for (const id of courseList) {
                if (courseID == id) {
                    isIncluded = true
                    break
                }
            }

            if (isIncluded) {
                return res.json({
                    success: true,
                    message: 'you already enrolled this course'
                })
            }

            // all good, push course to list
            user.courses_id.push(courseID)
            await User.updateOne({ _id: req.userId }, user, { new: true }).then(()=>console.log('push successfully'))

            console.log(user)
            // res.redirect('/u/my-courses')
            res.json({
                success: true,
                message: 'enroll this course successfully'
            })

        } catch (error) {
            console.log('error: ' + error)
            res.json({
                success: false,
                message: 'sorry, u cannot enroll this course, pls try again'
            })
        }
    }
}

export default new UserController