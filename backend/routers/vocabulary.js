import express from "express"
const router = express.Router()
import vocabularyController from "../controllers/vocabularyController.js"


router.get('/getVocab',vocabularyController.getAllVocabulary)
//below for admin lesson
router.post('/add',vocabularyController.addVocabulary)
router.post('/update',vocabularyController.updateVocabulary)
router.post('/delete',vocabularyController.deleteVocabulary)

//below for addmin Course
router.get('/courses',vocabularyController.getAllCourse)
router.post('/courses/add',vocabularyController.addCourse)
router.post('/courses/update',vocabularyController.updateCourse)
router.post('/courses/delete',vocabularyController.deleteCourse)

//below for client course
router.post('/courses/:course',vocabularyController.getLessonByCourse)
router.post('/courses/:course/:lesson',vocabularyController.getLesson)
//below for admin lesson
router.get('/lessons',vocabularyController.getALLLesson)
router.post('/lessons/add',vocabularyController.addLesson)
router.post('/lessons/update',vocabularyController.updateLesson)
router.post('/lessons/delete',vocabularyController.deleteLesson)

router.get('/getDasshBoard',vocabularyController.getDasshBoard)

export default router
