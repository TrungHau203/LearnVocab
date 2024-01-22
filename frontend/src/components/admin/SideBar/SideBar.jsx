import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { SiBookstack, SiCoursera } from "react-icons/si";
import { MdOutlineBook } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../../slices/userApiSlice";
import { logout } from "../../../slices/authSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async ()=>{
    try{
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigation('/')
    } catch(e){
      console.log(e)
    }
  }
  const [isActive, setisActive] = useState(() => {
    const savedActiveState = localStorage.getItem("isActive");
    return savedActiveState || "Dashboard";
  });
  const handleClick = (e) => {
    e.preventDefault();
    const select = e.target.textContent;
    setisActive(select);
    console.log(isActive);
    if (select === "DashBoard") {
      navigate("/admin");
    } else {
      navigate(`/admin/${select}`);
    }
  };
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let activeItem = "DashBoard";
    if (path === "/admin") {
      activeItem = "DashBoard";
    } else if (path.includes("/admin/Users")) {
      activeItem = "Users";
    } else if (path.includes("/admin/Courses")) {
      activeItem = "Courses";
    } else if (path.includes("/admin/Lessons")) {
      activeItem = "Lessons";
    } else if (path.includes("/admin/Vocabularies")) {
      activeItem = "Vocabularies";
    }
    setisActive(activeItem);
    localStorage.setItem("isActive", activeItem);
  }, [location.pathname]);
  useEffect(() => {
    localStorage.setItem("isActive", isActive);
    console.log(isActive);
  }, [isActive]);
  console.log(isActive);
  return (
    <div className="sideBar">
      <div className="siderBar_head">
        <h3>CamCamAdmin</h3>
      </div>
      <div className="siderBar_body">
        <div
          className={`siderBar_body-item ${
            isActive === "DashBoard" ? "active" : ""
          }`}
        >
          <div onClick={handleClick} className="siderBar-icon">
            <MdSpaceDashboard />
            <p>DashBoard</p>
          </div>
        </div>
        <div
          className={`siderBar_body-item ${
            isActive === "Users" ? "active" : ""
          }`}
        >
          <div onClick={handleClick} className="siderBar-icon">
            <MdOutlineAccountCircle />
            <p>Users</p>
          </div>
        </div>
        <div
          className={`siderBar_body-item ${
            isActive === "Courses" ? "active" : ""
          }`}
        >
          <div onClick={handleClick} className="siderBar-icon">
            <SiCoursera />
            <p>Courses</p>
          </div>
        </div>
        <div
          className={`siderBar_body-item ${
            isActive === "Lessons" ? "active" : ""
          }`}
        >
          <div onClick={handleClick} className="siderBar-icon">
            <MdOutlineBook />
            <p>Lessons</p>
          </div>
        </div>
        <div
          className={`siderBar_body-item ${
            isActive === "Vocabularies" ? "active" : ""
          }`}
        >
          <div onClick={handleClick} className="siderBar-icon">
            <SiBookstack />
            <p>Vocabularies</p>
          </div>
        </div>
        
      </div>
      <div className="siderBar_food" onClick={logoutHandler}>
          <div className="siderBar_food-item"><ExitToAppIcon className="icon" /> Log out</div>
      </div>
    </div>
  );
};

export default SideBar;
