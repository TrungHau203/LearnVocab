import React from 'react'
import "./Achivement.scss"
import * as icon from "../../assets/index"
const Achivement = () => {
  return (
    <div className='achivement'>
      <div className='achivement_item'>
        <img src={icon.firstAchievement} alt="" />
        <div className='achivement_item-content'>
          <h6>Sổ tay cấp độ 1</h6>
          <p>33 từ</p>
        </div>
      </div>
      <div>
        <div className='achivement_item'>
          <img src={icon.seconAchievement}/>
          <div className='achivement_item-content'>
            <h6>Tân binh</h6>
            <p>33 từ</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Achivement