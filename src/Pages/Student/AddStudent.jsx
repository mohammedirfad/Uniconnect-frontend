import React from 'react'
import Homw from '../../components/University/HomeNavbar'
import SideBar from '../../components/University/SideBar'
import StudentForm from '../../components/Students/StudentForm'

function AddStudent() {
  return (
    <>
    <Homw/>
    <div className='flex'>
     <SideBar/>
     <StudentForm/>
  
     </div>
    </>
  )
}

export default AddStudent