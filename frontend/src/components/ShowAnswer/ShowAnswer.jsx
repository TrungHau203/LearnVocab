import React, { useRef, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { FaVolumeUp } from 'react-icons/fa'
import "./ShowAnswer.scss"
const ShowAnswer = ({handleNextQuestion,handleShowFlashCard,data,status,openCanvas,handleCanvas,quiz,answerRef,...props}) => {
    const handleNext =()=> {
        handleCanvas()
        if(handleShowFlashCard){
          handleShowFlashCard()
        }
        handleNextQuestion();
    }
    const handleReview =()=> {
      handleCanvas()
      if(answerRef.current){
        answerRef.current.focus()
        answerRef.current.value=""
      }
    }
  const audioRef = useRef();
  const playAudio = () => {
    audioRef.current.play();
  };
  return (
    <div className="answer">
      <Offcanvas show={openCanvas} {...props}>
        {/* <Offcanvas.Header closeButton={false}>
          <Offcanvas.Title>{status}</Offcanvas.Title>
        </Offcanvas.Header> */}
        <Offcanvas.Body className={`${status=="success"?"answer-success":"answer-wrong"}`}>
          <h3>{data?.content} ({data?.position})
          <button onClick={playAudio} className="volume" style={{top:-10}}>
            <FaVolumeUp className="icon" />
          </button>
          </h3>
          
          <audio ref={audioRef} src={data.audio} />
          <h5>{data?.trans}</h5>
          <p>{data?.en_hint}</p>
          <p>{data?.trans_hint}</p>
          {
            quiz?(
              <Button variant="primary" className="me-2" onClick={handleNextQuestion}>
                Tiếp tục
              </Button>
            ) : ((status === 'success') && handleShowFlashCard)
             ? (
              <Button variant="primary" className="me-2" onClick={handleNext}>
                Tiếp tục
              </Button>
            ) : (
              <Button variant="primary" className="me-2" onClick={handleReview}>
                Học lại
              </Button>
            )
          }
          
        </Offcanvas.Body>
      </Offcanvas>
    </div>

  )
}

export default ShowAnswer