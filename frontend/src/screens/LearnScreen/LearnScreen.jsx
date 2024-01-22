import { useEffect, useId, useState } from "react";
import { useLessonQuery } from "../../slices/courseApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import FlashCard from "../../components/FlashCard/FlashCard";
import { FaTimes, FaVolumeUp } from "react-icons/fa";
import FillBlank from "../../components/FillBlank/FillBlank";
import OverView from "../../components/OverView/OverView";
import { useAddVocabToReviewMutation } from "../../slices/userVocab";
import { useSelector } from "react-redux";
import Flashcard from "../../components/FlashCard/FlashCard";
import "./LearnScreen.scss"
import * as icon from "../../assets/index"
const LearnScreen = () => {
  const lessonParams = useParams();
  const navigate= useNavigate();
  
  //hợp params 1 cách thần thánh :))
  const paramsString = Object.values(lessonParams).join("/");
  const { data: wordsApi, isLoading, isError } = useLessonQuery(paramsString);
  const words = wordsApi?.data;
  console.log(words);
  const [addVocabToReview] = useAddVocabToReviewMutation()
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (wordsApi?.data && wordsApi.data.length) {
      setQuestions(wordsApi.data);
    }
  }, [wordsApi]);
  const { userInfor } =  useSelector((state)=>state.auth)
  console.log(userInfor.data._id);
  const idOverView = useId();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFlashcard, setShowFlashcard] = useState(true);
  const [score, setScore] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const updateWords = (words&&userInfor.data._id)&&words.map(word=>{
    return {
      ...word,
      user_id: userInfor.data._id,
      vocab_id:word._id,
    }
  })
  const newWord = updateWords
  console.log(updateWords);
  console.log(newWord);
  console.log(words);
  const submitHandler = async (e)=>{
    e.preventDefault();
    try{
      console.log(newWord);
      const res = await addVocabToReview(newWord).unwrap()
      console.log(res);
      navigate('/')
      } catch(err) {
        navigate('/')
        console.log(err);
        console.log(err.data.message);
      }
  }
  const handleAnswer = (selectedAnswer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].userAnswer = selectedAnswer;
    if (selectedAnswer === updatedQuestions[currentQuestion].answer) {
      setScore(score + 1);
      setWrongAnswerCount(0);
    } else {
      setWrongAnswerCount(wrongAnswerCount + 1);
      if (wrongAnswerCount >= 1) {
        const wrongQuestion = updatedQuestions[currentQuestion];
        if (currentQuestion < questions.length - 1) {
          updatedQuestions.splice(currentQuestion + 3, 0, wrongQuestion);
        } else {
          updatedQuestions.splice(currentQuestion + 2, 0, wrongQuestion);
        }
        setQuestions(updatedQuestions);
      }
    }
    setSelectedOption(selectedAnswer);
    setShowAnswer(true);
    // setCurrentQuestion(currentQuestion + 1);
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setSelectedOption(null);
    }
  };
  const handleCloseFlashCard = () => {
    setShowFlashcard(false);
  };
  const handleShowFlashCard = () => {
    setShowFlashcard(true);
  };
  const handleClose = async (e) => {
    e.preventDefault();
    try {
      navigate("/")
    } catch (err) {
      console.log(err);
      console.log(err.data.message);
    }
  };
  const renderResult = () => {
    const percentage = (score / questions.length) * 100;
    console.log(questions);
    return (
      <div className="learnScreen_overview">
        <h4>Đã thêm từ vào sổ tay của bạn </h4>
        <OverView data={questions} status={"learned"} />
        <div className="div-submit-success">
          <button onClick={submitHandler} className="btn-submit-success">
            Tiếp tục
          </button>
      </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const currentQuestionData = questions[currentQuestion];
    const percentage = Math.round((currentQuestion/questions.length) * 100);
    return (
      <div className="quiz">
        <div className="process">
            <div className="process_bar">
                <div className="process-element" id="process-element" style={{width:percentage+"%"}}>
                    <img className="process-icon" src={icon.orange} alt=""/>
                </div>
            </div>
        </div>
        <div onClick={handleClose} style={{fontSize:30}}>
          <FaTimes />
        </div>
        {showFlashcard ? (
          <Flashcard 
            data={currentQuestionData}
            showAnswer={showAnswer}
            handleCloseFlashCard={handleCloseFlashCard}
            currentQuestion={currentQuestion}
           />
        ) : (
          <FillBlank
            data={currentQuestionData}
            handleNextQuestion={handleNextQuestion}
            handleShowFlashCard={handleShowFlashCard}
          />
        )}
      </div>
    );
  };
  return (
    <div className="learnScreen">

{currentQuestion < questions?.length ? renderQuiz() :isLoading ? (
  <Loading />
) : 
  renderResult()
}

      
    </div>
  );
};

// {currentQuestion < questions?.length ? renderQuiz() :isLoading ? (
//   <Loading />
// ) : 
//   renderResult()
// }

export default LearnScreen;
