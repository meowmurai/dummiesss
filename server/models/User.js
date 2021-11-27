import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, default: 'student'},
    courses_id: [{ type: Schema.Types.ObjectId, ref: 'courses' }]
}, {
    timestamps: true
})

export default mongoose.model('users', UserSchema)