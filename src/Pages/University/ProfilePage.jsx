import React from 'react'
import HomeNavbar from '../../components/University/HomeNavbar'
import Profile from '../../components/University/Profile'

import SideBar from '../../components/University/SideBar'

function ProfilePage() {
  return (
    <>
      <HomeNavbar/>

      <div className='flex'>
     <SideBar/>
     <Profile/>
  
     </div>
    
    </>
  )
}

export default ProfilePage