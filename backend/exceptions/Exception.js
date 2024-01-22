import {print, OutputType} from '../helpers/print.js'
export default class Exception extends Error{
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static CANNOT_CONNECT_MONGODB = "can't connect to MongoDB"
    static USER_EXIST = "User already exists, cannot create"
    static LESSON_EXIST = "Lesson already exists, cannot add"
    static CANNOT_REGISTER_USER = "can't register user"
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password"
    constructor(message, validationErrors={}) {
        super(message)
        print(message, OutputType.ERROR)
        // this.validationErrors = validationErrors
    }
}