import React from 'react'
import { GiBurningForest } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../store/features/authSlice';
import { useSelector, useDispatch } from 'react-redux';

function HomeNavbar() {

    
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const image  = useSelector (state => state?.UniversityAuth?.imageUrl)
    const token = useSelector(state => state?.UniversityAuth?.token);
    console.log(image,"....");
    const handlelogout = async ()=>{
      console.log("logging out");
      dispatch(
        setLogout({
          UniversityName: null,
    UniversityLocation: null,
    token: null,
    id :null,
    imageUrl: null,
    PhoneNumber:null,

    Email:null,
    UniversityType:null, 
        })
     )
     Navigate('/')
    }

  return (
    <>
  
  <nav className="bg-white border-gray-200 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center">
        <h3 className='font-bold '><GiBurningForest className="text-3xl h-8 text-primary mx-2" /></h3>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
           UniConnect
          </span>
        </a>
        <div className="flex items-center gap-4">
        {
                token && <div className='items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md hidden md:block' onClick={handlelogout}>
                <p className="font-bold text-white "><a href=''>Logout</a></p>
             </div>


              }
           
          <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex ' >

                
                  <div className='bg-gray-500 text-white rounded-full  overflow-hidden '>
                    { image ? <img src={image} alt="image" className="w-6 h-6 relative top-.5"></img> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>}

                  </div>


               </div>
        </div>
      </div>
    </nav> 
</>

  
  )
}

export default HomeNavbar