import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

class AuthController {
    async register(req, res) {
        const { firstname, lastname, email, username, password, pwconfirm } = req.body

        // simple validation
        if (!firstname || !lastname)
            return res.status(400).json({
                success: false,
                message: 'Missing first/last name'
            })

        if (!email)
            return res.status(400).json({
                success: false,
                message: 'Missing email'
            })

        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: 'Missing username and/or password'
            })

        // check password matched?
        if (!(password === pwconfirm))
            return res.status(400).json({
                success: false,
                message: 'Password and confirmPassword are not match'
            })

        try {
            // Check all existing email and user
            const checkUsername = await User.findOne({ username })
            if (checkUsername) return res.status(400).json({
                success: false,
                message: 'username already taken'
            })

            const checkEmail = await User.findOne({ email })
            if (checkEmail) return res.status(400).json({
                success: false,
                message: 'Email already taken'
            })

            // all good
            const hashPassword = await argon2.hash(password)
            const newUser = new User({
                firstname,
                lastname,
                email,
                username,
                password: hashPassword
            })
            await newUser.save()

            // return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)

            // // set cookie
            // res.cookie('token', accessToken, {
            //     expires: new Date(Date.now() + 30 * 60000) // cookie will be removed after 8 hours
            // })
            //     .redirect('/u')

            res.json({
                success: true,
                message: 'User created successfully',
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal error server'
            })
        }
    }

    async login(req, res) {
        const { username, password } = req.body

        // simple validation
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: 'missing username and/or password'
            })

        try {
            // Check for existing user
            const user = await User.findOne({ username })
            if (!user) return res.status(400).json({
                success: false,
                message: 'incorrect password or username'
            })

            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) return res.status(400).json({
                success: false,
                message: 'incorrect password or username'
            })

            // all good
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)

            // // set cookie
            // res.cookie('token', accessToken, {
            //     expires: new Date(Date.now() + 30 * 60000) // cookie will be removed after 8 hours
            // })
            // .redirect('/u')

            res.json({
                success: true,
                message: 'Login successfully',
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal error server'
            })
        }
    }

    async resetPassword(req, res) {
        const { email, newPassword, cfnPassword } = req.body

        console.log('email:' + email)

        if (!email) {
            return res.json({
                success: false,
                message: 'missing email'
            })
        }

        if (!newPassword || !cfnPassword) {
            return res.json({
                success: false,
                message: 'missing new password or confirm'
            })
        }

        if (newPassword != cfnPassword) {
            return res.json({
                success: false,
                message: 'new password and confirm new password are not matched'
            })
        }

        try {

            const user = await User.findOne({ email })

            if (!user) {
                return res.json({
                    success: false,
                    message: 'email is not existed'
                })
            }

            const hashNewPassword = await argon2.hash(newPassword)
            await User.findOneAndUpdate({ email }, { password: hashNewPassword })

            // res.redirect('/')
            res.json({
                success: true,
                message: 'reset password successfully'
            })

        } catch (error) {
            console.log('Error: ' + error)
            res.status(400).json({
                success: false,
                message: 'Internal error server'
            })
        }

        
    }
}

export default new AuthController