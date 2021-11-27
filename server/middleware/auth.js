import jwt, { decode } from 'jsonwebtoken'
import User from '../models/User.js'

export function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    //  unauthorized
    if (!token) return res.status(401).json({
        success: false,
        message: 'Access token not found'
    })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()

    } catch (error) {
        // forbidden
        console.log(error.data.message);
        res.status(403).json({
            success: false,
            message: 'invalid token'
        })
    }
}

export function verifyLoggedIn(req, res, next) {
    verifyToken(req,res,next)
}

export async function verifyAdmin(req, res, next) {
    try {
        
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) {
            return res.json({
                message: 'something went wrong!!!'
            })
        }

        req.userId = decoded.userId
        const user = await User.findOne({ _id: decoded.userId })

        if (user.role == 'admin') {
            console.log('you\'re admin')
            next()
        }
        else {
            return res.status(403).json({
                success: false,
                message: 'user is not permitted'
            })
        }

    } catch (error) {
        console.log('error: ' + error)
        res.status(403).json({
            success: false,
            message: 'invalid user'
        })
    }
}
