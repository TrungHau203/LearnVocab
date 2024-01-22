import mongoose from "mongoose";
import Exception from "../exceptions/Exception.js";
import { Lesson, Vocabulary, Course, UserVocabulary, User } from "../models/index.js";

const getLessonByCourse = async ({ page, size, searchString, course }) => {
  page = parseInt(page);
  size = parseInt(size);
  // console.log(course);
  const toOjectID = new mongoose.Types.ObjectId(course)
  let filteredLesson = await Lesson.aggregate([
    {
      $match: { 
        "course_id":toOjectID
      } // Thay 'your_course_id' bằng ID của khóa học bạn muốn tìm
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course_id',
        foreignField: '_id',
        as: 'course'
      }
    },
  ]).exec()
  // let filteredLesson = Lesson.find({ course_id:"648804b90cf2dcfdbe599e6f" }).exec()
  
  return filteredLesson;
};


const getAllCourse = async ({page, size, searchString}) => {
  page = parseInt(page);
  size = parseInt(size);
  try {
    let filteredCourse = Course.aggregate([
      {
        $match: {
          $or:[
              {
                course: {$regex :`.*${searchString}.*`,$options:'i'}// i -> ignore case không phân biệt hoa thường
              },
              {
                des_target: {$regex :`.*${searchString}.*`,$options:'i'}
              },
              {
                target: {$regex :`.*${searchString}.*`,$options:'i'}
              },
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
    return filteredCourse;
  } catch (exception) {
    throw new Exception(exception);
  }
};

const getAllVocabulary = async ({ page, size, searchString }) => {
  page = parseInt(page);
  size = parseInt(size);
  let filteredVocabulary = await Vocabulary.aggregate([
    { 
      $match: {
        $or:[
            // {
            //   _id : searchString ? new mongoose.Types.ObjectId(searchString) : ""
            // },
            {
              content: {$regex :`.*${searchString}.*`,$options:'i'}// i -> ignore case không phân biệt hoa thường
            },
            {
              phonetic: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              position: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              lesson_id: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              trans: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              trans_hint: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              en_hint: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              audio: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              picture: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            
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
 // Tính tổng số bản ghi thoả mãn điều kiện tìm kiếm
 const totalCount = await Vocabulary.aggregate([
  {
    $match: {
      $or:[
        // {
        //   _id : searchString ? new mongoose.Types.ObjectId(searchString) : ""
        // },
        {
          content: {$regex :`.*${searchString}.*`,$options:'i'}// i -> ignore case không phân biệt hoa thường
        },
        {
          phonetic: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        {
          position: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        {
          lesson_id: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        {
          trans: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        {
          trans_hint: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        {
          en_hint: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        {
          audio: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        {
          picture: {$regex :`.*${searchString}.*`,$options:'i'}
        },
        
    ]
    },
  },
  {
    $count: 'totalCount',
  },
]);

const totalRecords = totalCount.length > 0 ? totalCount[0].totalCount : 0;

return {
  totalRecords,
  data: filteredVocabulary,
};
};

//bên client 
const getLesson = async ({ page, size, lessonParam }) => {
  page = parseInt(page);
  size = parseInt(size);
  let filteredVocabulary = await Vocabulary.find({ lesson_id: lessonParam }).exec();
  // console.log(filteredVocabulary);
  return filteredVocabulary;
};

const getALLLesson = async ({ page, size,searchString }) => {
  page = parseInt(page);
  size = parseInt(size);
  let filteredVocabulary = await Lesson.aggregate([
      {
        $match: {
          $or:[
            {
              lesson: {$regex :`.*${searchString}.*`,$options:'i'}// i -> ignore case không phân biệt hoa thường
            },
            {
              vn_lesson: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            {
              course_id: {$regex :`.*${searchString}.*`,$options:'i'}
            },
            // {
            //   _id : searchString ? new mongoose.Types.ObjectId(searchString) : ""
            // },
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
  return filteredVocabulary;
};

//cud Course 
const addCourse = async (datas) => {
  debugger;
  const courses = datas
  const course = courses.course;
  const listCourse = await Course.find().exec();
  const existingLesson = listCourse.find(
    (item) => item.course == course
  );
  if (!!existingLesson) {
    throw new Exception(Exception.LESSON_EXIST);
  }
  debugger;
  Course.create(courses);
};

const updateCourse= async (data) => {
  debugger;
    let ok = await Course.updateOne(
      { _id: data._id },
      { $set: data }
    ).exec();
};

const deleteCourse= async (data) => {
  debugger;
    let ok = await Course.deleteOne(
      { _id: data._id },
    ).exec();
};

//cud Lesson 
const addLesson = async (datas) => {
  debugger;
  const lessons = datas
  const lesson = lessons.lesson;
  const listLesson = await Lesson.find().exec();
  const existingLesson = listLesson.find(
    (item) => item.lesson == lesson
  );
  const course_id = lessons.course_id;
  const listCourse = await Course.find().exec();
  const toOjectId = new mongoose.Types.ObjectId(course_id)
  datas.course_id = toOjectId
  const existingCourse = listCourse.find(
    (item) => {
      return item._id.equals(toOjectId)
    }
  );
  if (!!existingLesson) {
    throw new Exception(Exception.LESSON_EXIST);
  }
  if(!existingCourse) {
    throw new Exception("không khớp course_id")
  }
  Lesson.create(datas);
};

const updateLesson= async (data) => {
  debugger;
    let ok = await Lesson.updateOne(
      { _id: data._id },
      { $set: data }
    ).exec();
};

const deleteLesson= async (data) => {
  debugger;
    let ok = await Lesson.deleteOne(
      { _id: data._id },
    ).exec();
};

const addVocabulary = async (datas) => {
  debugger;
  const lessons = datas
  const lesson_id = lessons.lesson_id;
  const listLesson = await Lesson.find().exec();
  const toOjectId = new mongoose.Types.ObjectId(lesson_id)
  datas.lesson_id = toOjectId
  const existingLesson = listLesson.find(
    (item) => {
      return item._id.equals(toOjectId)
    }
  );
  if(!existingLesson) {
    throw new Exception("không khớp lesson_id")
  }
  console.log(datas);
  Vocabulary.create(datas);
};

const updateVocabulary= async (data) => {
  debugger;
    let ok = await Vocabulary.updateOne(
      { _id: data._id },
      { $set: data }
    ).exec();
};

const deleteVocabulary= async (data) => {
  debugger;
    let ok = await Vocabulary.deleteOne(
      { _id: data._id },
    ).exec();
};
const getDasshBoard = async () => {
  const userCount = await User.countDocuments({ role: { $ne: "admin" } });
  const coursesCount = await Course.countDocuments();
  const lessonsCount = await Lesson.countDocuments();
  const vocabCount = await Vocabulary.countDocuments();
  return {
    user:userCount,
    courses:coursesCount,
    lesson:lessonsCount,
    vocab:vocabCount,
  }
}



export default {
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
};

