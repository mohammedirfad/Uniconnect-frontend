import React, { useEffect, useState } from 'react';
import loadgifs from '../../../src/Assets/loadgif.gif';
// import { getPaymentRequests } from '../../api/Services/HostsetUp';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DelStudent, getStudentList } from '../../Api/Services/Student';

function StudentData() {
  const token = useSelector(state => state?.UniversityAuth?.token);
  const id = useSelector(state => state?.UniversityAuth?.id);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const pageSize = 10; // Number of items per page

  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const response = await getStudentList(id, token, currentPage, pageSize);

              setUsers(response?.data.students);
              setTotalStudents(response?.data.totalStudents);
              setIsLoading(false);
              setError(null);
          } catch (err) {
              setIsLoading(false);
              setError(err?.response?.data?.message);
          }
      };

      fetchUser();
  }, [currentPage,token]);


     if (isLoading) {
        return <div className='w-full'>
          <div className='flex justify-center items-center w-full'>
          
            <img className='w-48 h-48 justify-center' src={loadgifs} alt='loading.....'></img>
          </div>
        </div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      const HandleDelete = async (id) =>{

     
    
       try{
        
        const resposne = await DelStudent(id,token);
        if(resposne.status === 200){
          Navigate('/home')

        }
       }
       catch(err){
        console.log(err);
       }
      }

  return (
   <>
<div className="w-full">
<div className='flex my-5 justify-center'>
      <h1 className='text-xl md:text-3xl font-bold  justify-center mx-10 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 '>Student Managment</h1>
    </div>

<div className='flex mx-5'>
    <button className='justify-end bg-purple-400 rounded-md 'onClick={()=>{Navigate('/Add-student')}}><h1 className='text-white font-semibold mx-2 my-2 '>+ Add Student</h1></button>
</div>

    <div className='overflow-auto rounded-lg shadow hidden sm:block mx-5 my-4'>
        <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr className=''>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>NO.</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Profile</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Age</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Place</th>

                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>University ID</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Edit</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Delete</th>


                </tr>

            </thead>
            <tbody>
                {!users && <tr><h1 className='text-black '>No data found </h1></tr>}
           {
            users ?  users.map((data,index)=>
                (<tr >
                
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{index + 1}</td>
                    {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' onClick={()=>navigate(`/viewAndpay/${data.carData}`,{state:{amount:data.amount,orderId:data?._id}})} ><button className='font-bold text-blue-500 hover:underline text-lg'  >view and pay</button></td> */}
                    {/* <ViewApprove open={isOpen} setOpen={setIsOpen} carData={hostData[count]}  token={token} /> */}
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><span className={`p-1.5 text-xs font-medium uppercase tracking-wider w-6 h-6
                    'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}><img src={data.Image} alt='im' className='w-6 h-6 rounded-full'></img></span></td>
                    
                    <td className={`p-3 text-sm  text-gray-700 whitespace-nowrap`} >{data.StudentName }</td>
                    <td className={`p-3 text-sm  text-gray-700 whitespace-nowrap`} >{data.Age}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' > {data.Location} </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' > {data.Location} </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><button className='rounded-md bg-green-700'onClick={()=>Navigate('/Edit-student/'+ data?._id,{state:{data:data._id}})}><h1 className='mx-2 my-2 text-white font-semibold'>Edit</h1></button></td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><button className='rounded-md bg-red-800'onClick={()=>HandleDelete(data._id)}><h1 className='mx-2 my-2 text-white font-semibold'>Delete</h1></button></td>
                </tr>)
            )  : <tr><h1 className='text-black '>No data found </h1></tr>
           }
              
            </tbody>

        </table>
        <div className="flex justify-center mt-5">
                <button
                    className="bg-purple-400 rounded-md mr-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                   <h1 className='mx-2 my-2 text-black font-semibold'> Previous</h1>
                </button>
                <button
                    className="bg-purple-400 rounded-md"
                    disabled={users.length < pageSize}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                   <h1 className='mx-2 my-2 text-black font-semibold'> Next</h1>
                </button>
            </div>
            <div className="mt-3">
                Total Students: {totalStudents}
            </div>
        </div>
      


</div>

   </>
  )
}

export default StudentData