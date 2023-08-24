import React from 'react';

import { useNavigate,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {

    const Navigate = useNavigate();
    const image  = useSelector (state => state?.UniversityAuth?.imageUrl)
    const token = useSelector(state => state?.UniversityAuth?.token);
 
    console.log(image,token);

  return (
    <>
    {/* <nav className="bg-black border-gray-200 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://flowbite.com" className="flex items-center">
        <h3 className='font-bold '><img
  width={80}
  height={80}
  src="https://img.icons8.com/dotty/80/university.png"
  alt="university"
  className='text-3xl h-8 text-primary mx-2 text-white'
/>
</h3>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
          UniConnect : University Student Management System
          </span>
        </a>
        <div className="flex items-center">
          <a
            href="tel:5541251234"
            className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline"
          >
            
          </a>
          <h1
            href="#"
            className="text-xl  text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => Navigate('/')}
          >
        
          </h1>
        </div>
      </div>
    </nav> */}
   <header className='p-4 flex justify-between border border-gray-200'>
            <Link to='/hostings' className='flex items-center gap-1 '>
               {/* <h3 className='font-bold '><GiBurningForest className="text-3xl h-8" onClick={()=>navigate('/hosting')} /></h3> */}
               <span className='font-bold text-xl text-rose-500 hidden sm:block'>Uni Connect</span>
            </Link>

           

            <div className='flex gap-6 '>

              {
                token && <div className='items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md hidden md:block' onClick={""}>
                <p className="md:after:content-['_Your_Home'] font-bold "><a href='/host'>Logout</a></p>
             </div>


              }
               <div className=' items-center gap-2 border sm:border-300 rounded-full py-2 px-3 sm:shadow-md overflow-hidden hidden sm:flex
            ' onClick={Navigate('/profile')}>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:block">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <div className='bg-gray-500 text-white rounded-full border border-gray overflow-hidden '>
                    { image ? <img src={image} alt="image" className="w-6 h-6 relative top-.5"></img> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-.5 ">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                     </svg>}

                  </div>


               </div>
            </div>

         </header>

  </>
  
  )
}

export default Navbar