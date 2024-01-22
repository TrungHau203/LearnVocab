import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const { userInfor } = useSelector((state)=>state.auth) 
  return userInfor ? <Outlet/>:<Navigate to='/login' replace/>
}

export default PrivateRoute