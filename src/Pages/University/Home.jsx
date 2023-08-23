import React from 'react'

import Homw from '../../components/University/HomeNavbar'
import SideBar from '../../components/University/SideBar'
import StudentData from '../../components/Students/StudentData'

function Home() {
  return (
     <>

       <Homw/>
       <div className='flex'>
     <SideBar/>
     <StudentData/>
  
     </div>
     
     </>
  )
}

export default Home