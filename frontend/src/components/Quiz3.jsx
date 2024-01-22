import { useEffect, useState } from "react";
import { useSendUserIdMutation, useUpdateVocabByUserMutation } from "../slices/userVocab";
import Loading from "./Loading";
import RenderQuiz from "./RenderQuiz/RenderQuiz";
import RenderResult from "./RenderResult/RenderResult";
import { useSelector } from "react-redux";

const Quiz3 = () => {
  const [questions, setQuestions] = useState(null);
  const [learnedWord, setLearnedWord] = useState([]);
  const [openRender, setOpenRender] = useState(true);
  const { userInfor } =  useSelector((state)=>state.auth);
  const user_id = userInfor.data;
//   const { data: wordsApi, isLoading, isError } = useGetReviewQuery(user_id);
  const [sendUserId] = useSendUserIdMutation();
//   const words = wordsApi?.data;
//   const [words2, setWords2] = useState();
//   useEffect(() => {
//     if (words !== undefined) {
//       setQuestions(words);
//     }
//   }, [isLoading]);

  useEffect(() => {
    sendUserId(user_id)
      .then(response => {
        const responseData = response.data;
        console.log(responseData);
      setQuestions(responseData.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  console.log(questions);
  console.log(learnedWord);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [updateVocabByUser] = useUpdateVocabByUserMutation();
  const handleClose = async(e)=>{
    e.preventDefault();
    try{
      console.log(learnedWord);
      const res = await updateVocabByUser(learnedWord).unwrap()
      console.log(res);
      setOpenRender(false)
      } catch(err) {
        console.log(err);
        console.log(err.data.message);
      }
  }
  return (
    <div>
      {questions===null ? (
        <Loading />
      ) : (
          (currentQuestion < questions.length)&&openRender ? (
            <RenderQuiz 
                currentQuestion={currentQuestion} 
                questions={questions} 
                score={score}
                setScore={setScore}
                setCurrentQuestion={setCurrentQuestion}
                setQuestions={setQuestions}
                learnedWord={learnedWord}
                setLearnedWord={setLearnedWord}
                user_id={user_id}
                handleClose={handleClose}
                updateVocabByUser={updateVocabByUser}
                />
          ) : (
            <RenderResult questions={questions} learnedWord={learnedWord} currentQuestion={currentQuestion}  />
          )
        ) 
      }
    </div>
  );
};

export default Quiz3;
