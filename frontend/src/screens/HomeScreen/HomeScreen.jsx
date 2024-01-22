import { useSelector } from "react-redux";
import Hero from "../../components/Hero/Hero";
// import Quiz from '../components/Quiz';
import BarChar from "../../components/BarChar";
import { useEffect, useState } from "react";
import { UserData } from "../../Data";
import "chart.js/auto";
import { Button, Col, Container, Row } from "react-bootstrap";
import Achivement from "../../components/Achivement/Achivement";
import { useNavigate } from "react-router-dom";
import {
  useGetAllVocabMutation,
  useSendUserIdMutation,
} from "../../slices/userVocab";
import "./HomeScreen.scss"
import Chart from "../../components/Chart/Chart";
import NoWord from "../../components/NoWord/NoWord";
const HomeScreen = () => {
  const navigate = useNavigate();
  // console.log(words2);
  const [infor, setInfor] = useState(null);
  const [questions, setQuestions] = useState(null);
  const { userInfor } = useSelector((state) => state.auth);
  const user_id = userInfor?.data;
  const [getAllVocab] = useGetAllVocabMutation();
  const [sendUserId] = useSendUserIdMutation();
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
  useEffect(() => {
    sendUserId(user_id)
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        setQuestions(responseData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


    return (
    <div className="">
      {userInfor && questions &&infor ? (infor.length > 0 ? (
        <>
        <div className="homeScreen">
            <div className="homeScreen_empty"></div>
            <div className="homeScreen_chart" >
              <div></div>
              <div>
                <Chart data={infor} questions={questions}  />
              </div>
              <div>
              </div>
            </div>
            <div className="homeScreen_achievement" ><Achivement /></div>
          </div>
        </>
      ) : (
        <NoWord/>
      ) ) 
      : (
        <Hero />
      )}
    </div>
  );
};

export default HomeScreen;
