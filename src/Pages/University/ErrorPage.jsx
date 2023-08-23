import React from 'react'
import Homw from '../../components/University/HomeNavbar'
import SideBar from '../../components/University/SideBar'
import Error from '../../components/University/Error'

function ErrorPage() {
  return (
    <>

    <Homw/>
    <div className='flex'>
  <SideBar/>
  <Error/>
</div>
</>
  
  )
}

export default ErrorPage