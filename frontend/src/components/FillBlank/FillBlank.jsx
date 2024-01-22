import { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import ShowAnswer from "../ShowAnswer/ShowAnswer";
import "./FillBlank.scss"
const FillBlank = ({ data, handleNextQuestion, handleShowFlashCard }) => {
  const audioRef = useRef();
  const answerRef = useRef();
  const [status, setStatus] = useState(null);
  const [openCanvas, setOpenCanvas] = useState(false);
  const playAudio = () => {
    audioRef.current.play();
    console.log(audioRef.current);
  };
  console.log(answerRef);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    if(answerRef.current){
      answerRef.current.focus()
    }
  }, []);
  console.log(data);
  const handleCanvas = () => {
    setOpenCanvas(false);
  };
  console.log(data.content);
  const handleCheckResult = () => {
    const answerInput = answerRef.current.value;
    if (answerInput.toLowerCase().trim() == data.content) {
      
      setStatus("success");
    } else {
      setStatus("failure");
    }
    setOpenCanvas(true);
    // setShowAnswer(true)
  };
  console.log(status);
  console.log(data);
  return (
    <div className="fillBlank">
      <div className="game-learn-2 game-learn-word">
        <div className="text-center">
          <p className="title-game-2">Nghe và viết lại</p>
          <button onClick={playAudio} className="volume">
            <FaVolumeUp className="icon" />
          </button>
          <audio ref={audioRef} src={data.audio} />
        </div>
        <div className="bg-white p-3 input-game-2">
          <input
            className="input-learn-game"
            autoComplete="off"
            id="answer"
            placeholder="Gõ lại từ bạn đã nghe được"
            ref={answerRef}
          />
        </div>
      </div>
      <div className="div-submit-success">
        <button onClick={handleCheckResult} className="btn-submit-success">
          Kiểm tra
        </button>
      </div>
      {status && (
        <ShowAnswer
          placement={"bottom"}
          handleNextQuestion={handleNextQuestion}
          handleShowFlashCard={handleShowFlashCard}
          status={status}
          data={data}
          openCanvas={openCanvas}
          handleCanvas={handleCanvas}
          answerRef={answerRef}
        />
      )}
    </div>
  );
};

export default FillBlank;
