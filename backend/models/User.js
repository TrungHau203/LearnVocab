import mongoose, {Schema, ObjectId} from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const User = mongoose.model('User',
    new Schema({
        id: {type: ObjectId},
        name:{
            type: String,
            required:true,
            validate:{
                validator: (value)=>value.length>3,
                message:"User name must be at least 3 characters"
            }
        },
        email:{
            type: String,
            required:true,
            validate:{
                validator: (email)=>isEmail,
                message:"Email is incorrect format"
            }
        },
        password:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type: String,
            validate:{
                validator: (phoneNumber)=>phoneNumber.length>5,
                message:"Please enter a valid phone number, Phone number must be at least 5 characters"
            }
        },
        address:{
            type:String,
        },
        role:{
            type:String,
        },
        
        
    },{ timestamps: true })
)

export default User