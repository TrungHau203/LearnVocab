import React, { useEffect, useId, useState } from "react";
import ShowAnswer from "../ShowAnswer/ShowAnswer";
import { Col, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useUpdateVocabByUserMutation } from "../../slices/userVocab";
import "./RenderQuiz.scss";
const RenderQuiz = ({
  currentQuestion,
  setCurrentQuestion,
  questions,
  score,
  setScore,
  setQuestions,
  learnedWord,
  setLearnedWord,
  handleClose,
  updateVocabByUser,
  percentage,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [openCanvas, setOpenCanvas] = useState(false);
  const [status, setStatus] = useState(null);
  const [option, setOption] = useState();
  const currentQuestionData = questions[currentQuestion];
  const idAnswer = useId();
  const handleAnswer = (selectedAnswer) => {
    const updatedQuestions = [...questions];
    const updateLearnedWord = [...learnedWord];
    console.log(updatedQuestions, updatedQuestions.length);
    let newCurrentQuestion = null;
    // if(updatedQuestions[currentQuestion].length < 1){
      
    // }
    if (selectedAnswer === updatedQuestions[currentQuestion].content) {
      setScore(score + 1);
      setWrongAnswerCount(0);
      setStatus("success");
      if (currentQuestionData.proficiency < 5) {
        const proficiencyPlusOne = currentQuestionData.proficiency + 1;
        newCurrentQuestion = {
          ...currentQuestionData,
          proficiency: proficiencyPlusOne,
          review_status: "success"
        };
        console.log("hi there");
        console.log(newCurrentQuestion, proficiencyPlusOne);
      } else {
        newCurrentQuestion = {
          ...currentQuestionData,
          review_status: "success"
        };
      }
    } else {
      setWrongAnswerCount(wrongAnswerCount + 1);
      setStatus("failure");
      if (currentQuestionData.proficiency > 1) {
        const proficiencySubOne = currentQuestionData.proficiency - 1;
        newCurrentQuestion = {
          ...currentQuestionData,
          proficiency: proficiencySubOne,
          review_status:"failure",
        };
        console.log("hi there");
        console.log(newCurrentQuestion, proficiencySubOne);
      } else {
        newCurrentQuestion = {
          ...currentQuestionData,
          review_status:"failure",
        };
      }
      const wrongQuestion = updatedQuestions[currentQuestion];

      if (currentQuestion < questions.length - 1) {
        updatedQuestions.splice(currentQuestion + 3, 0, wrongQuestion);
      } else {
        updatedQuestions.splice(currentQuestion + 2, 0, wrongQuestion);
      }
      setQuestions(updatedQuestions);
      console.log(updatedQuestions);
    }
    const existingLearnedWords = learnedWord.findIndex(
      (item) => item._id === currentQuestionData._id
    );
    if (existingLearnedWords === -1) {
      updateLearnedWord.push(newCurrentQuestion);
      setLearnedWord(updateLearnedWord);
    }

    setSelectedOption(selectedAnswer);
    // console.log(selectedAnswer);
    setShowAnswer(true);
    setCurrentQuestion(currentQuestion);
    setOpenCanvas(true);
    console.log("Phuong an da chon" + questions.length);
    console.log("vij tri  hien tai" + (currentQuestion + 1));
  };
  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setSelectedOption(null);
      setOpenCanvas(false);
      setOption(false)
    }
    const completedPercent = currentQuestion == questions.length;
    console.log(completedPercent);
    if (currentQuestion == questions.length - 1) {
      // here cập nhật ở đây
      setCurrentQuestion(currentQuestion + 1);
      const res = await updateVocabByUser(learnedWord).unwrap();
      console.log(res);
      console.log("xong r nha");
    }
  };

  function blankAnswer(answer, questions) {
    const hiddenAnswer = questions?.replace(new RegExp(answer, "gi"), "______");
    return hiddenAnswer;
  }
  function changeOption(option) {
    setOption(option);
    console.log(option);
  }
  return (
    <div className="renderQuiz">
      <div className="process">
        <div className="process_bar">
          <div
            className="process-element"
            id="process-element"
            style={{ width: percentage + "%" }}
          >
            <img
              className="process-icon"
              src="https://learn.mochidemy.com/image/9362859030ff2f1748657ae47ef40370.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="renderQuiz-">
        <div onClick={handleClose} style={{fontSize:30}}>
          <FaTimes />
        </div>

        <div className="row justify-content-center position-r">
          <div className="col-9">
            <div className="game-learn-2 game-learn-word">
              <div className="text-center w-100">
                <p className="title-game-2">
                  Chọn từ thích hợp điền vào chỗ trống
                </p>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="box-answer-3">
              <div className="text-center list-answer-3">
                <p className="mb-0">
                  {/* style="font-size: 15px; font-weight: bold" */}
                  {blankAnswer(
                    currentQuestionData.content,
                    currentQuestionData.en_hint
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="div-answer-game">
              {currentQuestionData.word_answer.map((data, index) => (
                // eslint-disable-next-line react/jsx-key
                <div className="bg-answer-item">
                  <div
                    className={`item-game text-center 
                    ${(showAnswer && data === currentQuestionData.content
                        ? "answer-review-item-success"
                        : showAnswer && data === selectedOption
                        ? "answer-review-item-error"
                        : data === option
                        ? "answer-review-item-success"
                        : "answer-review-item"
                        ) 
                    }`}
                    key={idAnswer}
                    onClick={() => changeOption(data)}
                  >
                    <p key={index} className="mb-0">
                      {data}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {
            option ? 
            (
              <div className="div-submit-success">
                <button
                  onClick={() => handleAnswer(option)}
                  className="btn-submit-success"
                >
                  Kiểm tra
                </button>
              </div>
            ) : (
              <div className="div-no_click w-100 text-center">
                <button className="no_click btn-active" id="no_click">
                  KIỂM TRA
                </button>
              </div>
            )
          }
        </div>
        
        {showAnswer && (
          <ShowAnswer
            placement={"bottom"}
            handleNextQuestion={handleNextQuestion}
            openCanvas={openCanvas}
            quiz={true}
            data={currentQuestionData}
            status={status}
          />
        )}
      </div>
    </div>
  );
};

export default RenderQuiz;
