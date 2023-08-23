import React from 'react';
import Homw from '../../components/University/HomeNavbar'
import SideBar from '../../components/University/SideBar'
import EditData from '../../components/Students/EditData';

function StudentEditPage() {
  return (
    <>
    <Homw/>
    <div className='flex'>
     <SideBar/>
     <EditData/>
  
     </div>
    </>
  )
}

export default StudentEditPage