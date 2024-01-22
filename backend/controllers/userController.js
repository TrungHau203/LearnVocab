import { validationResult, body } from "express-validator"
import { userRepo } from "../repositories/index.js"
import { EventEmitter } from "node:events"
import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import { MAX_RECORDS } from '../Global/constant.js';


const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      error: error.array(),
    });
  }
  const { email, password } = req.body;
  //call repositories
  try {
    let existingUser = await userRepo.login({email, password},res)
    res.status(HttpStatusCode.OK).json({
      message: "login user successfully",
      data: existingUser
      // data:'detail user here'
    });
  } catch(exception){
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
};

const register = async (req, res) => {
  const { email, password, name, phoneNumber, address } = req.body;
  console.log(req.body)
  try {
      debugger
      const user = await userRepo.register({ name, email, password, phoneNumber, address },res);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "register user successfully",
        data: user
      });
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
};

const logout = async(req, res) => {
  res.cookie('jwt','',{
    httpOnly:true,
    expires: new Date(0)
  })
  res.status(HttpStatusCode.OK).json({
    message: 'User log out'
  })
}

const getDetailsUser = async (req, res) => {
  res.send("GET user ");
};

const getAllUser = async(req, res) => {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
    console.log(page,size,searchString);
    size = size < MAX_RECORDS ? size : MAX_RECORDS;

  try {
    debugger
    const user = await userRepo.getAllUser({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      size: user.length,
      page,
      data: user,
    });
} catch (exception) {
  debugger
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message:exception.toString(),
  })
}
}

export default {
  login,
  register,
  getDetailsUser,
  logout,
  getAllUser
};
