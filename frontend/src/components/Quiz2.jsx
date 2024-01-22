import React, { useState } from "react";
import ShowAnswer from "./ShowAnswer";

const Quiz = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What does "abate" mean?',
      options: ["To intensify", "To reduce", "To clarify"],
      answer: "To reduce",
      userAnswer: null,
    },
    {
      id: 2,
      question:
        'Which word means "to make an unpleasant situation less severe"?',
      options: ["Mitigate", "Aggravate", "Alleviate"],
      answer: "Alleviate",
      userAnswer: null,
    },
    {
      id: 3,
      question: 'What is the synonym of "eloquent"?',
      options: ["Fluent", "Incoherent", "Mute"],
      answer: "Fluent",
      userAnswer: null,
    },
    {
      id: 4,
      question: 'Which word means "to understand or comprehend something"?',
      options: ["Perceive", "Misinterpret", "Neglect"],
      answer: "Perceive",
      userAnswer: null,
    },
    // Add more questions here
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [openCanvas, setOpenCanvas] = useState(false);
  console.log(questions);

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
    return (
      <div>
        <h1>Question {currentQuestion + 1}</h1>
        <h3>{currentQuestionData.question}</h3>
        <ul>
          {currentQuestionData.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswer(option)}
              style={{
                backgroundColor:
                  showAnswer && option === currentQuestionData.answer
                    ? "green"
                    : showAnswer && option === selectedOption
                    ? "red"
                    : "transparent",
                cursor: showAnswer ? "default" : "pointer",
              }}
            >
              {option}
            </li>
          ))}
        </ul>
        {showAnswer && (
          <ShowAnswer
            placement={"bottom"}
            handleNextQuestion={handleNextQuestion}
            openCanvas={openCanvas}
            quiz={true}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      {currentQuestion < questions.length ? (
        <>{renderQuiz()}</>
      ) : (
        renderResult()
      )}
    </div>
  );
};

export default Quiz;
