import S3 from 'aws-sdk/clients/s3.js'
import Lesson from '../models/Lesson.js'

const bucketName = 'lesson'
const region = 'hn'
const accessKeyId = '3U8HUTU0D0N7NZDJBAAU'
const secretAccessKey = 'tGUmGxJnqcHqpHy4sRJd2BiV5doX4rzAGQVnMvKq'
const endpoint = 'https://hn.ss.bfcplatform.vn'

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    endpoint
})

export async function getVideoUrl(req, res, next) {
    try {
        const lessonID = req.query.lessonID
        console.log('get url')
        const lesson = await Lesson.findOne({ _id: lessonID })
        const url = await s3.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: `${lesson.title}.webm`,
            Expires: 60 * 60, // 1 hour
        })
        console.log({ url })
        // lesson.url = url
        await Lesson.findOneAndUpdate({ _id: lessonID }, { url }, { new: true })
        res.json({
            success: true,
            url: url
        })

    } catch (error) {
        console.log({ error })
        res.json({
            success: false,
            url: ''
        })
    }
}

export async function getUploadVideoUrl(req, res, next) {
    try {
        const filename = req.body.title
        const filetype = req.body.filetype
        const url = await s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: filename,
            ContentType: filetype,
            Expires: 60 * 60, // 1 hour
        })
        console.log({ url })
        res.json({
            success: true,
            signedUrl: url
        })
    } catch (error) {
        console.log({ error })
    }
}