import React, { useEffect, useState } from 'react'
import Lesson from '../../components/Lesson/Lesson';
import { useCourseQuery} from '../../slices/courseApiSlice';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import './LessonScreen.scss'
import { useGetAllVocabMutation } from '../../slices/userVocab';
import { useSelector } from 'react-redux';
import Course from '../../components/Course/Course';
const LessonScreen = () => {
    const lessonParam = useParams()
    let paramString = lessonParam.lesson
    const { data: lessonApi, isLoading, isError } = useCourseQuery(paramString); 
    const lessons = lessonApi?.data;
    const [infor, setInfor] = useState(null);
  const { userInfor } = useSelector((state) => state.auth);
  const user_id = userInfor.data;
  const [getAllVocab] = useGetAllVocabMutation();
  useEffect(() => {
    getAllVocab(user_id)
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        setInfor(responseData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function filter_learned (data){
    const arr = data.reduce((result, item) => {
      const existingItem = result.find((element) => {
        // console.log(item.vocab[0].lesson_id);
        return element.lesson_id === item.vocab[0]?.lesson_id
      });
    
      if (!existingItem) {
        // console.log(item.vocab[0].lesson_id );
        result.push({ lesson_id: item.vocab[0]?.lesson_id });
      }
      return result;
    }, []);
    return arr
  }
  function updated_arrLesson (arr_vocab,arr_lesson){
    const updatedArrLesson = arr_lesson.map(lesson => {
      const matchedLesson = arr_vocab.find(vocab => vocab.lesson_id === lesson._id);
      if (matchedLesson) {
        return { ...lesson, learned: true };
      }
      return lesson;
    });
    return updatedArrLesson
  }
  console.log(infor&&lessons&&updated_arrLesson(filter_learned(infor),lessons));
  (infor&&lessons)&&console.log(updated_arrLesson(filter_learned(infor),lessons))
    return (infor&&lessons)&&updated_arrLesson(filter_learned(infor),lessons)&&(
      <div className='lesson-screen'>
        <div className="course-item">
          <div className="text-center course-item-header">
              <div className="course-item-button">
                  <div className="course-item-button-1"></div>
                  <div className="course-item-button-2">
                      <p>{lessons[0].course[0].course}</p>
                  </div>
              </div>
          </div>
        </div>
        <div >
          {isLoading ? <Loading/> : updated_arrLesson(filter_learned(infor),lessons).map((lesson) => (
            <>
              <Lesson lessonParam={paramString} href={lesson._id} lesson={lesson}></Lesson>
            </>
          ))}
        </div>
      </div>
    );
}

export default LessonScreen