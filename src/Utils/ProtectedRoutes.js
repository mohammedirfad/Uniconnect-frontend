import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoutes() {

    const clientToken = useSelector(state => state?.UniversityAuth?.token);
  return (
    clientToken ? <Outlet/> : <Navigate to="/"/>
  )
}

export default ProtectedRoutes