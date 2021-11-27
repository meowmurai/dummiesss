import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LessonSchema = new Schema({
    title: { type: String, required: true, unique: true },
    url: { type: String}
}, {
    timestamps: true
})

export default mongoose.model('lessons', LessonSchema)