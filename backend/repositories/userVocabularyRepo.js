import Exception from "../exceptions/Exception.js";
import { UserVocabulary, Vocabulary } from "../models/index.js";
import mongoose, { ObjectId } from "mongoose";
const addVocabByUser = async (datas) => {
  debugger;
  const useId = datas[0].user_id;
  const vocabId = datas[0].vocab_id;
  // console.log(vocabId);
  const listVocabByUser = await UserVocabulary.find({ user_id: useId }).exec();
  const existingLesson = listVocabByUser.find(
    (item) => item.vocab_id == vocabId
  );
  // console.log(existingLesson);

  if (!!existingLesson) {
    throw new Exception(Exception.LESSON_EXIST);
  }
  const userVocabData = datas.map((vocab) => {
    const { id, _id, ...userData } = vocab;
    // console.log(userData);
    return {
      ...userData,
      proficiency: 1,
    };
  });
  // console.log(userVocabData);
  debugger;
  UserVocabulary.insertMany(userVocabData);
};

const updateVocabByUser = async (datas) => {
  debugger;
  const listVocabByUser = datas.forEach( async (data) => {
    // console.log(data._id,data.proficiency);
    let ok = await UserVocabulary.updateOne(
      { _id: new mongoose.Types.ObjectId(data._id) },
      { $set: { proficiency: data.proficiency } }
      // { $set: { proficiency: data.proficiency, review_status: data.review_status } },
    ).exec();
    // console.log(ok);
  });
  return listVocabByUser;
};

// cả đoạn này chỉ để random đáp án trans, và content
function getRandomWords(defaultWord, array) {
  // Chọn ngẫu nhiên 3 vị trí từ mảng
  const randomIndexes = [];
  while (randomIndexes.length < 3) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  // Lấy các từ từ vị trí ngẫu nhiên đã chọn
  const randomWords = randomIndexes.map((index) => array[index]);

  // Chọn ngẫu nhiên vị trí cho từ defaultWord
  const defaultIndex = Math.floor(Math.random() * (randomIndexes.length + 1));

  // Thêm từ defaultWord vào mảng kết quả
  randomWords.splice(defaultIndex, 0, defaultWord);
  //loại bỏ trùng (defaultWord)
  const newArr = randomWords.filter((item, index, self) => {
    return self.indexOf(item) === index;
  });
  return newArr;
}

const filteredProficiency = (data, numberProficiency) => {
  const output = data.filter((item) => item.proficiency == numberProficiency);
  return output;
};
const getAllVocab = async (user_id) => {
  debugger;
  const useId = user_id._id;
  // console.log(useId);
  const toOjectID = new mongoose.Types.ObjectId(useId)

  const listVocabByUser = await UserVocabulary.aggregate([
    {
      $match: { 
        user_id: toOjectID
      } 
    },
    {
      $lookup: {
        from: 'vocabularies',
        localField: 'vocab_id',
        foreignField: '_id',
        as: 'vocab'
      }
    },
  ]).exec()
  // const vocabByUser = listVocabByUser.map((item)=>{
  //   return {
  //     ...item,
  //     ...item.vocab[0],
  //     vocab:undefined
  //   }
  // })
  return listVocabByUser;
};
const dataForReview = async (user_id) => {
  const idByUser = user_id._id;
  const toOjectID = new mongoose.Types.ObjectId(idByUser)
  const filteredVocabByUser = await UserVocabulary.aggregate([
    {
      $match: { 
        user_id: toOjectID
      } // Thay 'your_course_id' bằng ID của khóa học bạn muốn tìm
    },
    {
      $lookup: {
        from: 'vocabularies',
        localField: 'vocab_id',
        foreignField: '_id',
        as: 'vocab'
      }
    },
  ]).exec()
  // console.log(filteredVocabByUser);

  const vocabByUser = filteredVocabByUser.map((item)=>{
    const { _id, vocab, ...rest } = item.vocab[0];
    return {
      ...item,
      ...rest,
      vocab: undefined,
    };
  })
  // console.log(vocabByUser);

  const arrWord = filteredVocabByUser.map((item)=>{
    if (item.vocab[0]?.content){
      return item.vocab[0].content
    }
  })
  const arrTrans = filteredVocabByUser.map((item)=>{
    if (item.vocab[0]?.trans){
      return item.vocab[0].trans
    }
  })
  // console.log(getRandomWords('maximum', arrWord));
  const toTimeRiview = (datas, numberProficiency) => {
    const output = datas.map((item) => {
      const targetDate = new Date(item.updatedAt);
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - targetDate.getTime();
      // Tính toán giờ, phút và giây từ timeDifference
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(timeDifference / (1000 * 60));
      // console.log(days, hours, minutes);
      function checkProficiency(numberProficiency) {
        switch (numberProficiency) {
          case 1:
            return true;
          case 2:
            return days > 1;
          case 3:
            return days > 4;
          case 4:
            return days > 7;
          case 5:
            return days > 30;
        }
      }
      const result = checkProficiency(numberProficiency);
      // console.log(result);
      if (result) {
        return item;
      }
    });
    // console.log(output);
    return output;
  };
  const arr1 = toTimeRiview(filteredProficiency(vocabByUser, 1), 1) ;
  const arr2 = toTimeRiview(filteredProficiency(vocabByUser, 2), 2) ;
  const arr3 = toTimeRiview(filteredProficiency(vocabByUser, 3), 3) ;
  const arr4 = toTimeRiview(filteredProficiency(vocabByUser, 4), 4) ;
  const arr5 = toTimeRiview(filteredProficiency(vocabByUser, 5), 5) ;
  const mergedArr = [];
  mergedArr.push(
    ...(arr1 ),
    ...(arr2 ),
    ...(arr3 ),
    ...(arr4 ),
    ...(arr5 )
  );

  const filteredArr = mergedArr.filter(value => value !== undefined);

  let content = null;
  let trans = null;
  // console.log(filteredArr);
  const change = filteredArr.map((data) => {
    // console.log(data);
    if (data) {
      trans = data.trans;
      content = data.content;
      // console.log(trans,data.content);
      const randomWord = getRandomWords(content, arrWord);
      data.word_answer = randomWord;
      const randomTrans = getRandomWords(trans, arrTrans);
      data.answer_trans = randomTrans;
    }
    return data;
  });
  
  return change;
};

const AdminGetAllUserVocab = async ({ page, size, searchString }) => {
  page = parseInt(page);
  size = parseInt(size);
  let filteredVocabulary = await Vocabulary.aggregate([
    {
      $match: {
        $or:[
            {
              _id : searchString ? new mongoose.Types.ObjectId(searchString) : ""
            },
            {
              user_id : searchString ? new mongoose.Types.ObjectId(searchString) : ""
            },
            {
              vocab_id : searchString ? new mongoose.Types.ObjectId(searchString) : ""
            },
            {
              proficiency: {$regex :`.*${searchString}.*`,$options:'i'}// i -> ignore case không phân biệt hoa thường
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

  return filteredVocabulary;
};

export default {
  addVocabByUser,
  dataForReview,
  updateVocabByUser,
  getAllVocab,
};

