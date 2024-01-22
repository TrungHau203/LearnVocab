import { useEffect, useState } from "react";
import {
  useSendUserIdMutation,
  useUpdateVocabByUserMutation,
} from "../../slices/userVocab";
import Loading from "../../components/Loading";
import RenderQuiz from "../../components/RenderQuiz/RenderQuiz";
import RenderResult from "../../components/RenderResult/RenderResult";
import { useSelector } from "react-redux";
import "./ReviewScreen.scss"
const ReviewScreen = () => {
  const [questions, setQuestions] = useState(null);
  const [learnedWord, setLearnedWord] = useState([]);
  const [openRender, setOpenRender] = useState(true);
  const { userInfor } = useSelector((state) => state.auth);
  const user_id = userInfor.data;
  //   const { data: wordsApi, isLoading, isError } = useGetReviewQuery(user_id);
  const [sendUserId] = useSendUserIdMutation();
  useEffect(() => {
    sendUserId(user_id)
      .then((response) => {
        const responseData = response.data;
        setQuestions(responseData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [updateVocabByUser] = useUpdateVocabByUserMutation();
  let percentage = null
  if(currentQuestion&&questions.length) {
    percentage = Math.round((currentQuestion/questions.length)*100);
  }
  const handleClose = async (e) => {
    e.preventDefault();
    try {
      const res = await updateVocabByUser(learnedWord).unwrap();
      console.log(res);
      setOpenRender(false);
    } catch (err) {
      console.log(err);
      console.log(err.data.message);
    }
  };
  return (
    <div className="review">
      
      {questions === null ? (
        <Loading />
      ) : currentQuestion < questions.length && openRender ? (
        <RenderQuiz
          currentQuestion={currentQuestion}
          questions={questions}
          score={score}
          setScore={setScore}
          setCurrentQuestion={setCurrentQuestion}
          setQuestions={setQuestions}
          learnedWord={learnedWord}
          setLearnedWord={setLearnedWord}
          handleClose={handleClose}
          updateVocabByUser={updateVocabByUser}
          percentage={percentage}
        />
      ) : (
        <RenderResult
          learnedWord={learnedWord}
        />
      )}
    </div>
  );
};

export default ReviewScreen;
