import React, { useState, useEffect, useRef } from "react";
import "./FlashCard.scss";
import { FaVolumeUp } from "react-icons/fa";
import * as icon from "../../assets/index";
export default function Flashcard({ data, handleCloseFlashCard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const audioRef = useRef();
  const frontEl = useRef();
  const backEl = useRef();
  const [showQuestion, setShowQuestion] = useState(false);
  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }
  const highlightedSentence = data.en_hint?.replace(
    new RegExp(data.content, "gi"),
    "<u><strong>$&</strong></u>"
  );
  const playAudio = () => {
    audioRef.current.play();
  };
  const handleShowQuestion = () => {
    setShowQuestion(true);
    handleCloseFlashCard();
  };
  
  return (
    <div className="flashCard">
      
      <button onClick={playAudio} className="volume">
        <FaVolumeUp className="icon" />
      </button>
      <div
        className={`cards ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="front" ref={frontEl}>
          <h3>
            {data.content} ({data.position})
          </h3>
          <p dangerouslySetInnerHTML={{ __html: highlightedSentence }}></p>
          <div className="data-options">
            <img src={data.picture} style={{ "marginLeft": "-6px" }} />
          </div>
        </div>
        <div className="back" ref={backEl}>
          <h3>
            {data.content} ({data.position})
          </h3>
          <audio ref={audioRef} src={data.audio} />
          <p>{data.phonetic}</p>
          <p>{data.trans}</p>
        </div>
        <img src={icon.hand} className="hand-icon"/>
      </div>
      <div className="div-submit-success">
        <button onClick={handleShowQuestion} className="btn-submit-success">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
