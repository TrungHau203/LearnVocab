import { MAX_RECORDS } from '../Global/constant.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import vocabularyRepo from '../repositories/vocabularyRepo.js'


async function generateVocabulary(req,res){
    let data = await vocabularyRepo.generateVocabulary(req.body);
    debugger
    res.status(HttpStatusCode.INSERT_OK).json({
        message:"insert vocabulary successfully",
        data: data
    })
}

async function getAllCourse(req,res){
    let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
    size = size < MAX_RECORDS ? size : MAX_RECORDS;
    try {
        let filteredCourse = await vocabularyRepo.getAllCourse({
          size,
          page,
          searchString,
        });
        res.status(HttpStatusCode.OK).json({
          size: filteredCourse.length,
        page,
        searchString,
        data: filteredCourse,
        });
      } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: exception.message,
        });
      }
}
async function getLessonByCourse(req,res){
    let course = req.params.course;
    let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
    size = size < MAX_RECORDS ? size : MAX_RECORDS;
    try {
        let filteredLessonByCourse = await vocabularyRepo.getLessonByCourse({
            size,
            page,
            searchString,
            course,
        });
        debugger
          res.status(HttpStatusCode.OK).json({
            data: filteredLessonByCourse,
          });
      } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: exception.message,
        });
      }
}
async function getAllVocabulary(req, res) {
    let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;

    size = size < MAX_RECORDS ? size : MAX_RECORDS;
    try {
      let filteredVocabulary = await vocabularyRepo.getAllVocabulary({
        size,
        page,
        searchString,
      });
      res.status(HttpStatusCode.OK).json({
        totalSize: filteredVocabulary.totalRecords,
        size:filteredVocabulary.data.length,
        page,
        searchString,
        data: filteredVocabulary.data,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.message,
      });
    }
  }

  async function getLesson(req, res) {
    let { page = 1, size = MAX_RECORDS} = req.query;
    let lessonParam = req.params.lesson
    size = size < MAX_RECORDS ? size : MAX_RECORDS;
    debugger
    try {
      let filteredVocabulary = await vocabularyRepo.getLesson({
        size,
        page,
        lessonParam
      });
      res.status(HttpStatusCode.OK).json({
        size: filteredVocabulary.length,
        page,
        data: filteredVocabulary,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.message,
      });
    }
  }
  async function getALLLesson(req, res) {
    
    //https://localhost:5000?page=1&size=100
    let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
    size = size < MAX_RECORDS ? size : MAX_RECORDS;
    debugger
    try {
      let filteredVocabulary = await vocabularyRepo.getALLLesson({
        size,
        page,
        searchString,
      });
      res.status(HttpStatusCode.OK).json({
        size: filteredVocabulary.length,
        page,
        data: filteredVocabulary,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.message,
      });
    }
  }
  //cud Course
  const addCourse = async (req, res) => {
    const datas = req.body;
    try {
        debugger
        const data = await vocabularyRepo.addCourse(datas);
        res.status(HttpStatusCode.INSERT_OK).json({
          message: "add data successfully",
          data: data 
        });
    } catch (exception) {
      debugger
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:exception.toString(),
      })
    }
  };

  const updateCourse = async (req, res) => {
    const data = req.body
    try {
        debugger
        const result = await vocabularyRepo.updateCourse(data);
        res.status(HttpStatusCode.INSERT_OK).json({
          message: "update data successfully",
          data: result 
        })
    } catch (exception) {
      debugger
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:exception.toString(),
      })
    }
  }

  const deleteCourse = async (req, res) => {
    const data = req.body
    try {
        debugger
        const result = await vocabularyRepo.deleteCourse(data);
        res.status(HttpStatusCode.INSERT_OK).json({
          message: "delete data successfully",
          data: result 
        })
    } catch (exception) {
      debugger
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:exception.toString(),
      })
    }
  }

//cud lesson 
const addLesson = async (req, res) => {
  const datas = req.body;
  try {
      debugger
      const data = await vocabularyRepo.addLesson(datas);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "add data successfully",
        data: data 
      });
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
};

const updateLesson = async (req, res) => {
  const data = req.body
  try {
      debugger
      const result = await vocabularyRepo.updateLesson(data);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "update data successfully",
        data: result 
      })
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
}

const deleteLesson = async (req, res) => {
  const data = req.body
  try {
      debugger
      const result = await vocabularyRepo.deleteLesson(data);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "delete data successfully",
        data: result 
      })
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
}

//cud lesson 
const addVocabulary = async (req, res) => {
  const datas = req.body;
  try {
      debugger
      const data = await vocabularyRepo.addVocabulary(datas);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "add data successfully",
        data: data 
      });
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
};

const updateVocabulary = async (req, res) => {
  const data = req.body
  try {
      debugger
      const result = await vocabularyRepo.updateVocabulary(data);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "update data successfully",
        data: result 
      })
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
}

const deleteVocabulary = async (req, res) => {
  const data = req.body
  try {
      debugger
      const result = await vocabularyRepo.deleteVocabulary(data);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "delete data successfully",
        data: result 
      })
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
}

const getDasshBoard = async (req, res) => {
  try {
      debugger
      const result = await vocabularyRepo.getDasshBoard();
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "get data successfully",
        data: result 
      })
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message:exception.toString(),
    })
  }
}

export default {
    generateVocabulary,
    getAllVocabulary,
    getAllCourse,
    getLessonByCourse,
    getLesson,
    getALLLesson,
    addCourse,
    updateCourse,
    deleteCourse,
    addLesson,
    updateLesson,
    deleteLesson,
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    getDasshBoard
}