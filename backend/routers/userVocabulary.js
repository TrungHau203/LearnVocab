import express from 'express'
import { userVocabularyController } from '../controllers/index.js'
const router = express.Router()

router.post('/addVocabByUser', userVocabularyController.addVocabByUser)
router.post('/updateVocabByUser', userVocabularyController.updateVocabByUser)
router.post('/getReview', userVocabularyController.getReview)
router.post('/getAllVocab', userVocabularyController.getAllVocab)

export default router