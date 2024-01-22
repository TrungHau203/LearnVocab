import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import { useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import "./TongleSideBar.scss";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { SiBookstack, SiCoursera } from "react-icons/si";
import { MdOutlineBook } from "react-icons/md";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLogoutMutation } from "../../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/authSlice";

const TongleSideBar = ({ show, setShow, handleClose }) => {
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
    return savedActiveState || "DashBoard";
  });
  console.log(isActive);
  console.log(isActive==="DashBoard");
  const location = useLocation();
  const navigate = useNavigate();
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
    // return localStorage.setItem("isActive", "")
  }, [isActive]);
  return (
    <div className="">
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop={true}
        backdropClassName="toggle"
      >
        {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
        {/* <Offcanvas.Header closeButton>
        </Offcanvas.Header> */}
        <Offcanvas.Body className="toggleBar">
            <div className="toggleBar_head">
              <h3>CamCamAdmin</h3>
            </div>
            <div className="toggleBar_body">
              <div
                className={`toggleBar_body-item ${
                  isActive === "DashBoard" ? "active" : ""
                }`}
              >
                <div onClick={handleClick} className="toggleBar-icon">
                  <MdSpaceDashboard/>
                  <p>DashBoard</p>
                </div>
              </div>
              <div
                className={`toggleBar_body-item ${
                  isActive === "Users" ? "active" : ""
                }`}
              >
                <div onClick={handleClick} className="toggleBar-icon">
                  <MdOutlineAccountCircle/>
                  <p>Users</p>
                </div>
              </div>
              <div
                className={`toggleBar_body-item ${
                  isActive === "Courses" ? "active" : ""
                }`}
              >
                <div onClick={handleClick} className="toggleBar-icon">
                  <SiCoursera/>
                  <p>Courses</p>
                </div>
              </div>
              <div
                className={`toggleBar_body-item ${
                  isActive === "Lessons" ? "active" : ""
                }`}
              >
                <div onClick={handleClick} className="toggleBar-icon">
                  <MdOutlineBook/>
                  <p>Lessons</p>
                </div>
              </div>
              <div
                className={`toggleBar_body-item ${
                  isActive === "Vocabularies" ? "active" : ""
                }`}
              >
                <div onClick={handleClick} className="toggleBar-icon">
                  <SiBookstack/>
                  <p>Vocabularies</p>
                </div>
              </div>
              
            </div>
            <div className="toggleBar_food" onClick={logoutHandler}>
                <div className="toggleBar_food-item"><ExitToAppIcon className="icon" /> Log out</div>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default TongleSideBar;
