import mongoose, {Schema, ObjectId} from "mongoose";
// lỗi , lẽ ra là Vocabulary nhưng do đã thêm vào db nên k sửa được
const Dictionary = mongoose.model('Vocabulary',
    new Schema({
        // id: {type: ObjectId},
        // data:{
        //     type: Object,
        //     required: true,
        // },
        // meaning:{
        //     type: String,
        //     required:true,
        // },
        // level:{
        //     type: String,
        //     enum:{
        //         values:['basic','toeic','ielts','THCS','THPT'],
        //         message:"{VALUE} is not supported"
        //     },
        //     required:true,
        // },
        //trường này thêm sau khi đã thêm 1899 bản ghi, nên phải dùng updateMany để thêm trường này vào
        // lesson:{
        //     type: String,
        //     required:true,
        // }
            id: {type: ObjectId},
            content: {
                    type: String,
                    required:true,
                },
            review_status: {
                type: Boolean,
            },
            phonetic: {
                type: String,
            },
            position: {
                type: String,
                required:true,
            },
            lesson_id: {
                type: ObjectId,
                ref: 'Lesson'
            },
            multi_answer: [],
            trans: {
                type: String,
                required:true,
            },
            trans_hint: {
                type: String,
                required:true,
            },
            en_hint: {
                type: String,
                required:true,
            },
            audio:{
                type: String,
                required:true,
            },
            picture:{
                type: String,
            },
            // proficiency: {
            //     type: Number,
            //     required:true,
            // },
        
    })
)

export default Dictionary