import mongoose, {Schema, ObjectId} from "mongoose";
const Course = mongoose.model('Courses',
    new Schema({
        id: {type: ObjectId},
        course:{
            type: String,
            required:true,
        },
        target: {type: String, required:true},
        des_target: {type: String, required:true},
    })
)

export default Course