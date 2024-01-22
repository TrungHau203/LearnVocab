import React from 'react'
import "./Chart.scss"
import { useNavigate } from 'react-router-dom';


const Chart = ({data,questions}) => {
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          navigate("/quiz");
        } catch (err) {
          console.log(err);
        }
      };
    
      // Đối tượng để lưu trữ kết quả
      const CountByProficiency = (data) => {
        var vocabularyCount = {};
      
        data.forEach(function(vocabulary) {
          var proficiency = vocabulary.proficiency;
      
          if (vocabularyCount.hasOwnProperty(proficiency)) {
            vocabularyCount[proficiency]++;
          } else {
            vocabularyCount[proficiency] = 1;
          }
        });
        var arrObj = {
          proficiency1: vocabularyCount[1] || 0,
          proficiency2: vocabularyCount[2] || 0,
          proficiency3: vocabularyCount[3] || 0,
          proficiency4: vocabularyCount[4] || 0,
          proficiency5: vocabularyCount[5] || 0
        };
    
        return arrObj;
        }
      
      
        function calculateHeight(array) {
          // Tìm phần tử lớn nhất trong mảng
          var max = Math.max(...Object.values(array));
          
          // Tính phần trăm cho mỗi phần tử
          var result = {};
          for (var key in array) {
            if (array.hasOwnProperty(key)) {
              var percentage = (array[key] / max) * 300;
              result[key] = parseFloat(percentage.toFixed(1));
            }
          }
          
          return result;  
        }
        console.log(CountByProficiency(data).proficiency1);
  return data&&(
    <div>
        <div className="chart">
          
          {/* <BarChar chartData={userData} /> */}
          <div className="">
            {/* style="min-height: 330px; margin-top: 150px" */}
            <div className="row chartBody">
              <div className="col text-center colChart">
                {/* style="height: 300px; padding-left: 5px!important; padding-right: 5px!important;" */}
                <div
                  className="dashboard-1 dashboard dashboard-item-1"
                  style={{marginTop:300-calculateHeight(CountByProficiency(data)).proficiency1, height:calculateHeight(CountByProficiency(data)).proficiency1}}
                >
                  <div className="text-center text-count-word">
                    <span className="count-word">{CountByProficiency(data).proficiency1}từ</span>
                    {/* style="display: inline;" */}
                  </div>
                  <div className="text-center dashboard-stt">
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div className="colChart col text-center">
                {/* style="height: 300px; padding-left: 5px!important; padding-right: 5px!important;" */}
                <div
                  className="dashboard-1 dashboard dashboard-item-2"
                  style={{marginTop:300-calculateHeight(CountByProficiency(data)).proficiency2, height:calculateHeight(CountByProficiency(data)).proficiency2}}
                >
                  <div className="text-center text-count-word">
                    <span className="count-word">{CountByProficiency(data).proficiency2}từ</span>
                    {/* style="display: inline;" */}
                  </div>
                  <div className="text-center dashboard-stt">
                    <span>2</span>
                  </div>
                </div>
              </div>
              <div className="colChart col text-center">
                {/*  */}
                {/* style="height: 300px; padding-left: 5px!important; padding-right: 5px!important;" */}
                <div
                  data-count="100"
                  className="dashboard-1 dashboard dashboard-item-3"
                  style={{marginTop:300-calculateHeight(CountByProficiency(data)).proficiency3, height:calculateHeight(CountByProficiency(data)).proficiency3}}

                >
                  <div className="text-center text-count-word">
                    <span className="count-word">{CountByProficiency(data).proficiency3}từ</span>
                    {/* style="display: inline;" */}
                  </div>
                  <div className="text-center dashboard-stt">
                    <span>3</span>
                  </div>
                </div>
              </div>
              <div className="colChart col text-center">
                <div
                  data-count="100"
                  className="dashboard-1 dashboard dashboard-item-4"
                  style={{marginTop:300-calculateHeight(CountByProficiency(data)).proficiency4, height:calculateHeight(CountByProficiency(data)).proficiency4}}

                >
                  <div className="text-center text-count-word">
                    <span className="count-word">{CountByProficiency(data).proficiency4}từ</span>
                    {/* style="display: inline;" */}
                  </div>
                  <div className="text-center dashboard-stt">
                    <span>4</span>
                  </div>
                </div>
              </div>
              <div className="colChart col text-center">
                <div
                  data-count="100"
                  className="dashboard-1 dashboard dashboard-item-5"
                  style={{marginTop:300-calculateHeight(CountByProficiency(data)).proficiency5, height:calculateHeight(CountByProficiency(data)).proficiency5}}

                >
                  <div className="text-center text-count-word">
                    <span className="count-word">{CountByProficiency(data).proficiency5}từ</span>
                    {/* style="display: inline;" */}
                  </div>
                  <div className="text-center dashboard-stt">
                    <span>5</span>
                  </div>
                </div>
              </div>
              <div className="col-8 dashboard-border"></div>
            </div>

            <div className="text-center btn-dashboard">
              {/* style="margin-top: 50px;" */}
              <p>
                {/* style="margin-bottom: 30px" */}
                Chuẩn bị ôn tập: {questions.length} từ 
              </p>
              {/* <button id="btn-wait-learn" >
    style="display:  none ; margin: auto; width: 250px"
        <img src="https://learn.mochidemy.com/svg/time.svg" alt="" style={{width: 30}}/>
        <span >
        style="color: #000; font-weight: bold; padding-left: 10px; font-size: 15px"
            <span id="hours"></span>:
            <span id="minutes"></span>:
            <span id="seconds"></span>
        </span>

        <div >
        style="position: absolute; top: -10px; right: 4px"
            <img src="https://learn.mochidemy.com/image/5c51ba59c76f0e03db0f12c2f253f0e9.png" style={{width: 20}}/>
        </div>
    </button> */}
                <div className="div-submit-success" id="btn-review">
                  {/* style="display:  block ; margin: auto" */}
                  <button className="btn-submit-success" onClick={submitHandler}>
                    ÔN TẬP NGAY
                  </button>
                </div>
            </div>
          </div>        
    </div>
    </div>
  )
}

export default Chart