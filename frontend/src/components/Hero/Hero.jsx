import { useNavigate } from "react-router-dom";
import "./Hero.scss"
import * as icon from "../../assets/index"
const Hero = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login")

  }
  return (
    <div className='hero'>
      <div className="row">
        <div className="col-5 text-end hero-row_box" >
            <img style={{maxWidth: 300}} src={icon.banner} alt=""/>
            <div className="hero-row_item" >
                <p >
                    Ghi nhớ 1000 từ vựng trong 1 tháng
                </p>
                <div className="div-submit-success">
                    <button className="btn-submit-success" id="btn-close-first-view" onClick={handleSubmit}>
                        BẮT ĐẦU NGAY
                    </button>
                </div>
            </div>
        </div>
    </div>
      
    </div>
  );
};

export default Hero;