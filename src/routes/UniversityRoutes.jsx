import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/University/LoginPage.jsx';
import RegisterPage from '../Pages/University/RegisterPage.jsx';
import Home from '../Pages/University/Home.jsx';
import ProfilePage from '../Pages/University/ProfilePage.jsx';
import AddStudent from '../Pages/Student/AddStudent.jsx';
import StudentEditPage from '../Pages/Student/StudentEditPage.jsx';
import ProtectedRoutes from '../Utils/ProtectedRoutes.js';
import ErrorPage from '../Pages/University/ErrorPage.jsx';



function UniversityRoutes() {
  return (
    
    <Routes>
       <Route path='/' element={<LoginPage/>} />
       <Route path='/signup' element={<RegisterPage/>} />
      
      <Route element={<ProtectedRoutes/>}>
      <Route path='/Home' element={<Home/>} />
       <Route path='/profile' element={<ProfilePage/>} />

       <Route path='/Add-student' element={<AddStudent/>} />
       <Route path='/Edit-student/:id' element={<StudentEditPage/>} />
      </Route>
      

      <Route path='/*' element={<ErrorPage/>}></Route>
    </Routes>
  )
}


export default UniversityRoutes

