import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    title: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    lessonList:  [{ type: Schema.Types.ObjectId, ref: 'lessons' }]
}, {
    timestamps: true
})

export default mongoose.model('courses', CourseSchema)