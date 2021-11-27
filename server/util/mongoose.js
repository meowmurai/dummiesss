export function multipleMongooseToObject(mongooseArrays) {
    return mongooseArrays.map(mongoose => mongoose.toObject())
}
export function mongooseToObject(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose
}