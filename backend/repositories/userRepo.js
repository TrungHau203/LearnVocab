import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/print.js"
import {User} from "../models/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateToken from "../utils/generateToken.js";

const login = async ({email,password},res) => {
    // console.log('login user in user repository');
    let existingUser = await User.findOne({email}).exec()
    if (existingUser){
        //not encrypt password
        const isMatched =  await bcrypt.compare(password, existingUser.password) // so sánh mật khẩu nhập nhập vào mà mật khẩu đẫ có trong db và trả về boolean
        // console.log(isMatched);
        if(isMatched){
            //create java web token
            //
            //không dùng cái này nữa 
            //
            // let token = jwt.sign({
            //         data:existingUser,
            //     },
            //     process.env.JWT_SECRET, {
            //         // expiresIn:'60' // 1 minute
            //         expiresIn:'30days',
            //     }
            // )
            //
            //thay vào đó  dùng cái này
            const token = generateToken(res, existingUser._id)
            // clone an add more properties
            return {
                ...existingUser.toObject(),
                password: "not show",
                token:token
            }
        } else{
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
        }
    } else {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
    }
}

const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address
},res) => {
    //validation already done
    // try{
        debugger
        const existingUser = await User.findOne({email}).exec()
        console.log(existingUser);
        
        if(!!existingUser){
            throw new Exception(Exception.USER_EXIST)
        } 
        
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
        //insert  to db
        const newUser = await User.create({
            name, 
            email, 
            password: hashedPassword,
            phoneNumber,
            address
        })
        if(newUser){
            debugger
            generateToken(res, newUser._id)
        }
        return {
            ...newUser._doc,
            password:"not show"
        }
    // } catch(exception){
    //     // check model validation here
    //     debugger
    //     throw new Exception(Exception.CANNOT_REGISTER_USER)
    // }
    // print('register user with:name ' + name + 
    // ' email :' + email + 
    // ' password :' + password + 
    // ' phoneNumber :' + phoneNumber + 
    // ' address :' + address, OutputType.INFORMATION)
}

const getAllUser = async ({ page, size,searchString })=>{
    page = parseInt(page);
    size = parseInt(size);
    // const users = await User.find({ role:{ $exists: false } }).exec();
    const users = await User.aggregate([
      {
        $match: {
            $and: [
                {
                    $or: [
                        {
                            name: { $regex: `.*${searchString}.*`, $options: 'i' }
                        },
                        {
                            email: { $regex: `.*${searchString}.*`, $options: 'i' }
                        },
                        {
                            phoneNumber: { $regex: `.*${searchString}.*`, $options: 'i' }
                        },
                        {
                            address: { $regex: `.*${searchString}.*`, $options: 'i' }
                        }
                    ]
                },
                { role: { $exists: false } },
            ]
        },
      },
      {
        $skip: (page - 1) * size,
      },
      {
        $limit: size,
      },
    ]);
//   console.log(users);
  return users;
}




export default {
    login,
    register,
    getAllUser
}
