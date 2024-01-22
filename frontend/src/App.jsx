import { useState, useEffect } from 'react';
// import { Container } from 'react-bootstrap';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useSelector } from 'react-redux';

const App = () => {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();
  const { lesson, learn } = useParams();
  const { userInfor } = useSelector((state) => state.auth);
  useEffect(() => {
    // Kiểm tra đường dẫn hiện tại và ẩn tiêu đề nếu cần
    if (location.pathname.includes('courses') && lesson && learn) {
      setShowHeader(false);
    } else if (location.pathname === '/quiz') {
      setShowHeader(false); 
    } else if (location.pathname.includes('/admin')) {
      setShowHeader(false); 
    } else {
      setShowHeader(true);
    }
  }, [location.pathname, lesson, learn]);

  return (
    <>
      {showHeader && <Header />}
      <div className=''>
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
