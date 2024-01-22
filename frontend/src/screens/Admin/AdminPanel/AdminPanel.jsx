import { useEffect, useState } from "react";
import SideBar from "../../../components/admin/SideBar/SideBar";
import TongleSideBar from "../../../components/admin/TongleSideBar/TongleSideBar";
import DashBoardAdmin from "../DashBoardAdmin/DashBoardAdmin";
import "./AdminPanel.scss"
import Header from '../../../components/admin/Header/Header';
import { Outlet, useParams } from "react-router-dom";

const AdminPanel = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Định nghĩa hàm xử lý sự kiện thay đổi kích thước màn hình
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Đăng ký sự kiện xử lý thay đổi kích thước màn hình
    window.addEventListener('resize', handleResize);

    // Hủy đăng ký sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const shouldShowSidebar = windowWidth > 1024;
  console.log(shouldShowSidebar);
  console.log(windowWidth);
  return (
    <div >
      <div className="adminPanel">
        {shouldShowSidebar&&<SideBar />}
        <TongleSideBar show={show} handleClose={handleClose}/>
        <div className={shouldShowSidebar?"adminPanel-showSideBar":"adminPanel-hideSideBar"}>
          <Header show={show} toggleShow={toggleShow} shouldShowSidebar={shouldShowSidebar}/>
          <div className="adminPanel-width_outlet" style={shouldShowSidebar?{width:windowWidth-310}:{width:windowWidth-36}}>
            <Outlet/> 
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
