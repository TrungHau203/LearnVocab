import { useNavigate } from "react-router-dom";
import "./NoWord.scss"
import * as icon from "../../assets/index"
const NoWord = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/courses")

  }
  return (
    <div className='noWord'>
        <div className="text-center" >
            <img style={{maxWidth: 300}} src={icon.banner} alt=""/>
            <div className="hero-row_item" >
                <h4 >
                    Để kích hoạt tính năng ôn tập , hãy bắt đầu học bài mới nhé
                </h4>
                <div className="div-submit-success">
                    <button className="btn-submit-success" id="btn-close-first-view" onClick={handleSubmit}>
                        Học từ mới
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NoWord;