import React, { useEffect, useState } from 'react';
import { useGetReviewQuery } from '../slices/userVocab';
import Loading from './Loading';
import ShowAnswer from './ShowAnswer';

const Quiz = () => {
  const [questions, setQuestions] = useState(["is", "loading"]);
  const { data:wordsApi, isLoading, isError } = useGetReviewQuery();
  const words = wordsApi?.data
  console.log(words,isLoading);
  
  useEffect(() => {
    if (words !== undefined) {
      setQuestions(words);
    }
  }, [isLoading]);
 
  console.log(wordsApi);
  console.log(questions);
  console.log(words);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [openCanvas, setOpenCanvas] = useState(false);
  const handleAnswer = (selectedAnswer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].userAnswer = selectedAnswer;
    if (selectedAnswer === updatedQuestions[currentQuestion].answer) {
      setScore(score + 1);
      setWrongAnswerCount(0);
    } else {
      setWrongAnswerCount(wrongAnswerCount + 1);
      const wrongQuestion = updatedQuestions[currentQuestion];
      console.log("da dai hon chua"+currentQuestion < questions.length - 1);
      if (currentQuestion < questions.length - 1) {
        updatedQuestions.splice(currentQuestion + 2, 0, wrongQuestion);
      } else {
        updatedQuestions.splice(currentQuestion + 1, 0, wrongQuestion);
      }
      setQuestions(updatedQuestions);
    }
    setSelectedOption(selectedAnswer);
    // console.log(selectedAnswer);
    setShowAnswer(true);
    setCurrentQuestion(currentQuestion);
    setOpenCanvas(true);
    console.log("Phuong an da chon" + questions.length);
    console.log("vij tri  hien tai" + currentQuestion);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setSelectedOption(null);
      setOpenCanvas(false);
    }
  };
  const renderResult = () => {
    const percentage = (score / questions.length) * 100;
    return <div>Your score: {percentage}%</div>;
  };
  const renderQuiz = () => {
    const currentQuestionData = questions[currentQuestion];
    console.log(questions[0]);
    return (
      <div>
        <h1>Question {currentQuestion + 1}</h1>
        <h3>{questions.en_hint}</h3>
        <ul>
          {isLoading || questions.word_answer.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswer(option)}
              style={{
                backgroundColor:
                  showAnswer && option === questions.content
                    ? "green"
                    : showAnswer && option === selectedOption
                    ? "red"
                    : "transparent",
                cursor: showAnswer ? "default" : "pointer",
              }}
            >
              {option.word}
            </li>
          ))}
        </ul>
        {showAnswer && (
          <ShowAnswer
            placement={"bottom"}
            handleNextQuestion={handleNextQuestion}
            openCanvas={openCanvas}
            quiz={true}
            data={questions}
          />
        )}
      </div>
    );
  };
  return (
    
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        Array.isArray(questions) ? (
          currentQuestion < questions?.length ? (
            <>{renderQuiz()}</>
          ) : (
            renderResult()
          )
        ) : (
          <p>Invalid data format.</p>
        )
      )}
    </div>
  );
};

export default Quiz;
