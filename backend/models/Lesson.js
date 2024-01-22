import mongoose, {Schema, ObjectId} from "mongoose";
const Lesson = mongoose.model('Lesson',
    new Schema({
        id: {type: ObjectId},
        course_id: {
            type: ObjectId,
            ref: 'Courses'
        },
        lesson:{
            type:String,
            required: true,
        },
        vn_lesson:{type:String, required:true}
    })
)

export default Lesson