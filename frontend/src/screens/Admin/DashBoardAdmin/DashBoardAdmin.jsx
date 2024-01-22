import Widget from '../../../components/admin/widget/Widget'
import "./DashBoard.scss"
import { useDashBoardQuery } from '../../../slices/adminSlice';
import Loading from '../../../components/Loading';
const DashBoardAdmin = () => {
  const { data: dashBoard, isLoading} = useDashBoardQuery(); 
  dashBoard&&console.log(dashBoard);
  return isLoading ? <Loading /> : (
    <div>
      {/* <Header /> */}
      <div className="widgets">
          <Widget type="users" item={dashBoard}/>
          <Widget type="courses" item={dashBoard}/>
          <Widget type="lesson" item={dashBoard}/>
          <Widget type="vocab" item={dashBoard}/>
        </div>
    </div>
  )
}

export default DashBoardAdmin