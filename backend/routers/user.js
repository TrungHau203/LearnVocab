import express from 'express'
import {body, validationResult} from 'express-validator'
import { userController } from '../controllers/index.js'
const router = express.Router()
router.get('/:id',userController.getDetailsUser)

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min:5}),
    userController.login
    )

router.post('/register',userController.register)
router.post('/logout',userController.logout)
router.get('/',userController.getAllUser)


export default router