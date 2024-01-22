import HttpStatusCode from "./../exceptions/HttpStatusCode.js"
import jwt from "jsonwebtoken"

export default function checkToken(req, res, next) {
    //bypass login, register
    debugger
    if(req.url.toLowerCase().trim()=='/api/users/login'.toLowerCase().trim() || req.url.toLowerCase().trim()== '/api/users/register'.toLowerCase().trim()){
        next()
        return
    }
    // other requests
    // get and validate token 
    // const token = req.headers?.authorization?.split(" ")[1]
    //other way is using cookies-parse to use req.cookies
    // console.log(Object.keys(req.cookies.jwt));
    const token = req?.cookies.jwt;
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        const isExpired = Date.now() >= jwtObject.exp * 1000
        if(isExpired){
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "Token expired"
            })
            req.end()
        } else {
            next()
            return
        }
    } catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message
        })
    }
}