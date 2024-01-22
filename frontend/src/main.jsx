  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App.jsx';
  import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from 'react-router-dom';
  import store from './store'
  import { Provider } from 'react-redux';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './index.scss';
  import HomeScreen from './screens/HomeScreen/HomeScreen.jsx';
  import LoginScreen from './screens/LoginScreen/LoginScreen.jsx';
  import RegisterScreen from './screens/RegisterScreen.jsx';
  import ProfileScreen from './screens/ProfileScreen.jsx';
  import PrivateRoute from './components/PrivateRoute.jsx';
  import WordScreen from './screens/WordScreen/WordScreen.jsx';
  import { CourseScreen } from './screens/CourseScreen/CourseScreen.jsx';
  import LessonScreen from './screens/LessonScreen/LessonScreen.jsx';
  import LearnScreen from './screens/LearnScreen/LearnScreen.jsx';
  import ReviewScreen from './screens/ReviewScreen/ReviewScreen.jsx';
  import AdminPanel from './screens/Admin/AdminPanel/AdminPanel.jsx';
import DashBoardAdmin from './screens/Admin/DashBoardAdmin/DashBoardAdmin.jsx';
import SideBar from './components/admin/SideBar/SideBar.jsx';
import AdminUser from './screens/Admin/AdminUser/AdminUser.jsx';
import AdminCourse from './screens/Admin/AdminCourse/AdminCourse.jsx';
import AdminLesson from './screens/Admin/AdminLesson/AdminLesson.jsx';
import AdminVocab from './screens/Admin/AdminVocab/AdminVocab.jsx';
import AddNew from './screens/Admin/AddNew/AddNew.jsx';


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/courses' element={<CourseScreen />} />
          <Route path='/courses/:lesson' element={<LessonScreen />} />
          <Route path='/courses/:lesson/:learn/' element={<LearnScreen />} />
          <Route path='/word' element={<WordScreen />} />
          <Route path='/quiz' element={<ReviewScreen />} />
          {/* this path for the admin page */}
          <Route element={<AdminPanel/>} >
            <Route path="/admin/" element={<DashBoardAdmin/>}/>
            <Route path="/admin/Users" element={<AdminUser/>} />
            <Route path="/admin/Courses" element={<AdminCourse/>} />
            <Route path="/admin/Lessons" element={<AdminLesson/>} />
            <Route path="/admin/Vocabularies" element={<AdminVocab/>} />
            <Route path="/admin/:something/add" element={<AddNew/>} />
          </Route>
        </Route>
      </Route>
    )
  );

  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  );