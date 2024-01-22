import React from 'react'
import OverView from '../OverView/OverView';
import { useNavigate } from 'react-router-dom';
import "./RenderResult.scss"
const RenderResult = ({learnedWord}) => {
    console.log(learnedWord);
    const navigate = useNavigate()
    const wrongArr = learnedWord.filter(item=>{
      console.log(item.review_status=="failure");
      return item.review_status=="failure"
    })

    const trueArr = learnedWord.filter(item=>{
      console.log(item.review_status=="success");
      return item.review_status=="success"
    })

    const mergeArr = [...wrongArr,...trueArr];
    console.log(mergeArr);
    console.log(trueArr.length,learnedWord.length);
    const percentage = (trueArr.length / learnedWord.length).toFixed(2) * 100;
    
    const goLesson = (e)=>{
      e.preventDefault();
      navigate('/courses/')
    }
  return (
    <div className='renderResult'>
      <div>
        <h4>
          Bạn đã ôn tập lại {learnedWord.length} từ
        </h4>
        <p> Bạn đã trả lời đúng : {percentage}%</p>
      </div>
      <OverView data={mergeArr}/>
      <div className="div-submit-success">
        <button
          onClick={goLesson}
          className="btn-submit-success"
        >
          Tiếp tục học
        </button>
      </div>
      {/*  */}
    </div>
  )
}

export default RenderResult