import { userVocabularyRepo } from "../repositories/index.js"
import HttpStatusCode from "../exceptions/HttpStatusCode.js"
const addVocabByUser = async (req, res) => {
  const datas = req.body;
  try {
      debugger
      const data = await userVocabularyRepo.addVocabByUser(datas);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "addVocabByUser data successfully",
        data: data 
      });
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
};
const updateVocabByUser = async (req, res) => {
  const datas = req.body;
  try {
      debugger
      const data = await userVocabularyRepo.updateVocabByUser(datas);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "addVocabByUser data successfully",
        data: data 
      });
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
};
async function getReview(req,res){
  debugger
  const user_id = req.body;
  try {
      let filteredCourse = await userVocabularyRepo.dataForReview(user_id);
      res.status(HttpStatusCode.OK).json({
        data: filteredCourse,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.message,
      });
    }
}

async function getAllVocab(req,res){
  debugger
  const user_id = req.body;
  // console.log(user_id);
  try {
      let filteredCourse = await userVocabularyRepo.getAllVocab(user_id);
      res.status(HttpStatusCode.OK).json({
        data: filteredCourse,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.message,
      });
    }
}


export default {
  addVocabByUser,
  getReview,
  updateVocabByUser,
  getAllVocab,
  
};
