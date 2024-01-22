import mongoose from "mongoose"
import {print, OutputType} from "../helpers/print.js"
import Exception from "../exceptions/Exception.js"
mongoose.set('strictQuery',true)
async function connect(){
    try{
        let connection = await mongoose.connect(process.env.MONGODB_URI)
        print('connect mongose successfully',OutputType.SUCCESS )
        return connection
    } catch (error){
        // let errorMessage = error.code
        //nếu muốn biết key của object bất kì vd: Object.keys(error)
        // ở đây trả về lỗi mã lỗi 8000 sau khi chạy error.code ở debug
        const {code}=error
        debugger
        if(error.code==8000){
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        } else if (error.code=='ENOTFOUND'){
            //với exception.code=='ENOTFOUND' thì làm tương tự, lỗi này là sai server name
            throw new Exception(Exception.WRONG_CONNECTION_STRING)
        }
        throw new Exception(Exception.CANNOT_CONNECT_MONGODB)

    }
}

export default connect
