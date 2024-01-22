import path from "path"
import express from "express"
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser"
// để dotenv lên trước để nó nhận biến từ file .env
dotenv.config()
import connect from "./database/database.js"
//authentication middleware
import checkToken from "./authentication/auth.js"
import {userRouter,userVocabularyRouter,vocabularyRouter} from './routers/index.js'
const app = express()
app.use(cookieParser())
app.use(checkToken)
app.use(express.json()) 
app.use(express.urlencoded({ extended: true}))
const port= process.env.PORT || 6000
// hoặc có thể dùng const port= process.env.PORT ?? 3000

//routes
app.use('/api/users', userRouter)
app.use('/api/vocabulary', vocabularyRouter)
app.use('/api/userVocabulary', userVocabularyRouter)
app.use('/api/admin/users', userRouter)
app.use('/api/admin/vocabulary', vocabularyRouter)
app.use('/api/admin/userVocabulary', userVocabularyRouter)


if(process.env.NODE_ENV === 'production'){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname,'frontend/dist')));
  app.get('*',(req, res)=>res.sendFile(path.resolve(__dirname,'frontend','dist','index.html')));
} else {
  app.get('/', (req, res) =>{
    res.send('response for this router')
  });
}


app.listen(port, async()=>{
  connect()
  console.log(`listen on ${port}`);
})

// // Hằng số thời gian cho mỗi proficiency level (đơn vị: giây)
// const TIME_INTERVALS = [30, 60, 120];

// // Sử dụng một mảng để lưu trữ các từ vựng và trạng thái ôn tập của chúng
// const vocabulary = [
//   { word: 'apple', proficiency: 1, review_status: false },
//   { word: 'banana', proficiency: 2, review_status: false },
//   { word: 'cat', proficiency: 3, review_status: false }
// ];

// Hàm ôn tập từ vựng
// function reviewVocabulary(index) {
//   // Lấy từ vựng cần ôn tập
//   const word = vocabulary[index];

//   // Thiết lập review_status:true khi ôn tập kết thúc
//   vocabulary[index].review_status = true;

//   console.log(`Reviewing word: ${word.word}`);

//   // Tạo công việc lên lịch ôn tập cho proficiency tiếp theo nếu còn tồn tại
//   if (word.proficiency < TIME_INTERVALS.length) {
//     const nextProficiency = word.proficiency + 1;
//     const timeInterval = TIME_INTERVALS[nextProficiency - 1] * 1000;

//     schedule.scheduleJob(new Date(Date.now() + timeInterval), () => {
//       reviewVocabulary(index);
//     });

//     console.log(`Scheduled next review for word "${word.word}" in ${timeInterval / 1000} seconds`);
//   }
// }

// // Bắt đầu ôn tập từ vựng
// for (let i = 0; i < vocabulary.length; i++) {
//   const word = vocabulary[i];

//   // Kiểm tra nếu từ vựng chưa được ôn tập
//   if (!word.review_status) {
//     // Đặt lịch trình ôn tập cho từ vựng
//     const timeInterval = TIME_INTERVALS[word.proficiency - 1] * 1000;

//     schedule.scheduleJob(new Date(Date.now() + timeInterval), () => {
//       reviewVocabulary(i);
//     });

//     console.log(`Scheduled review for word "${word.word}" in ${timeInterval / 1000} seconds`);
//   }
// }


