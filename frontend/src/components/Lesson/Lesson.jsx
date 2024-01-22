import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Lesson.scss";
// eslint-disable-next-line react/prop-types
const Lesson = ({ lesson, lessonParam, href }) => {
  const navigate = useNavigate();
  const handleChoose = (e) => {
    e.preventDefault();
    console.log("ok");
    navigate(`/courses/${lessonParam}/${href}`);
  };

  return (
    <div className="box-lesson">
      
      <div className={`lesson ${lesson.learned ? "lesson-active" : ""}`}>
        <div
          onClick={handleChoose}
          className={`lesson-item ${
            lesson.learned ? "lesson-item-active" : ""
          } `}
        >
          <h2>{lesson.lesson}</h2>
          <p>{lesson.vn_lesson}</p>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
