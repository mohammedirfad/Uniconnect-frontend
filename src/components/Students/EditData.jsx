import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {  UpdateStudent, getStudent } from '../../Api/Services/Student';

import { ToastContainer, toast } from 'react-toastify';

function EditData() {

    const Navigate = useNavigate();
  const token = useSelector(state => state?.UniversityAuth?.token);
  const [users, setUsers] = useState([]);
  
  const [imageModified, setImageModified] = useState(false); 


const [error, setError] = useState(null);
  const ids = useSelector(state => state?.UniversityAuth?.id);
  const {id} = useParams()


  useEffect( ()=>{

    const fetchUser = async () =>{
       try{
          const response = await getStudent(id,token);
    
          setUsers(response?.data);
       
        
          setError(null);
       }
       catch(err){
         
          setError(err?.response?.data?.message);
       }
    };    
      fetchUser();
 
 }, []);




  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    location: '',
    age: '',
    phoneNumber: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    studentName: '',
    email: '',
    location: '',
    age: '',
    phoneNumber: '',
    image: '',
  });



  useEffect(() => {
    if (users[0]) {
      setFormData({
        studentName: users[0].StudentName,
        email: users[0].Email,
        location: users[0].Location,
        age: users[0].Age,
        phoneNumber: users[0].PhoneNumber,
        image: null,
      });
    }
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    if (file) {
        setImageModified(true); 
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          image: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.studentName) {
      newErrors.studentName = 'Student name is required.';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required.';
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = 'Invalid age.';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (isNaN(formData.phoneNumber) || formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Invalid phone number.';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        if (validateInputs()) {
            const modifiedFormData = { ...formData };
            if (!imageModified) {
               
                formData.image = users[0]?.Image;
              }
         
          const resposne = await UpdateStudent(formData ,ids, token,users[0]._id)
          if(resposne.status ===201){
            toast.success(resposne.data.message);
            Navigate('/home')
          }
        }
    }
    catch(error){
        if (error.response) {
            console.log(error.response.data.error,"123");
            toast.error(error.response.data.error);
        } else {
            console.log(error.response.data.error,"123");
            toast.error('An error occurred. Please try again.');
        }
    }

  
  };

  return (
   <div className='flex-col justify-center mx-auto mt-2'>

    <div className='flex justify-center mt-3 mx-auto my-auto'>
        <h1 className='text-3xl '>Student Managment</h1>
        </div>
     <form className="w-full max-w-lg my-10 "onSubmit={handleSubmit}>
    <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-first-name"
        >
          Student Name
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
            errors.studentName ? 'border-red-500' : 'border-gray-200'
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
            errors.studentName ? 'focus:border-red-500' : 'focus:border-gray-500'
          }`}
          id="grid-first-name"
          type="text"
          name="studentName"
          placeholder="Jane"
          value={formData.studentName}
          onChange={handleInputChange}
        />
        {errors.studentName && <p className="text-red-500 text-xs italic">{errors.studentName}</p>}
      </div>

      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-email"
        >
          Email
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
            errors.email ? 'border-red-500' : 'border-gray-200'
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
            errors.email ? 'focus:border-red-500' : 'focus:border-gray-500'
          }`}
          id="grid-email"
          type="email"
          name="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-location"
        >
          Location
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
            errors.location ? 'border-red-500' : 'border-gray-200'
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
            errors.location ? 'focus:border-red-500' : 'focus:border-gray-500'
          }`}
          id="grid-location"
          type="text"
          name="location"
          placeholder="Kerala"
          value={formData.location}
          onChange={handleInputChange}
        />
        {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-age"
        >
          Age
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
            errors.age ? 'border-red-500' : 'border-gray-200'
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
            errors.age ? 'focus:border-red-500' : 'focus:border-gray-500'
          }`}
          id="grid-age"
          type="number"
          name="Age"
          placeholder="20"
          value={formData.age}
          onChange={handleInputChange}
        />
        {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-phoneNumber"
        >
          Phone Number
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
            errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
            errors.phoneNumber ? 'focus:border-red-500' : 'focus:border-gray-500'
          }`}
          id="grid-phoneNumber"
          type="tel"
          name="phoneNumber"
          placeholder="1234567890"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
      </div>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-zip"
        >
          Image
        </label>
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
            errors.image ? 'border-red-500' : 'border-gray-200'
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
            errors.image ? 'focus:border-red-500' : 'focus:border-gray-500'
          }`}
          id="grid-zip"
          type="file"
          onChange={handleImageChange}
        />
        {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
      </div>

      

 
      <div className="w-full px-3 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Student
        </button>
      </div>
    </div>
  </form>
  
   <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default EditData