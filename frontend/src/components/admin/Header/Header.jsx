import { AiFillHome } from "react-icons/ai";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";
const Header = ({route,toggleShow,shouldShowSidebar}) => {
  const [isActive, setisActive] = useState(() => {
    const savedActiveState = localStorage.getItem("isActive");
    return savedActiveState || "Dashboard";
  });
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
  return (
    <div className="headerAdmin">
      <div className="headerAdmin-left">
        <div className="headerAdmin-left_item" onClick={toggleShow}>
            {(!shouldShowSidebar)&& <IoReorderThreeSharp className="headerAdmin-left_HamberIcon" /> } 
        </div>
        <div className="headerAdmin-right_item">
            <Link to="/admin">
                <AiFillHome className="headerAdmin-left_homeIcon"/>
            </Link> / <Link to={`/admin/${route?route:""}`}>
                {isActive}
            </Link>
        </div>
      </div>
      <div className="headerAdmin-right">
      </div>
    </div>
  );
};

export default Header;
