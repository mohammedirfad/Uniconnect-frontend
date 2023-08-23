import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversityRegister } from '../../Api/Services/UniversityAuth';

export default function Register() {
    const Navigate = useNavigate();
    
    const [universityName, setUniversityName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [universityType, setUniversityType] = useState('public');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!universityName) {
            newErrors.universityName = 'University name is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if(!location){
            newErrors.location = 'University location is required';
        }

       

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistration = async (e) => {
        console.log("kkkkk");
        e.preventDefault();

       try{
        if (validateForm()) {
            // Perform registration logic here
            let data = {
                universityName,
                email,
                password,
                universityType,
                location,
            } 
            console.log(data,"kkk");
            const response = await UniversityRegister(data)
            if(response.status === 201){
                Navigate('/')
            }
            else{
                console.log("something went wrong!");
            }
        }
       }
       catch(err){
        console.log(err);

       }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   UniConnect Registration
                </h1>
                <form className="mt-6" onSubmit={handleRegistration}>
                    <div className="mb-2">
                        <label
                            htmlFor="universityName"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            University Name
                        </label>
                        <input
                            type="text"
                            id="universityName"
                            value={universityName}
                            onChange={(e) => setUniversityName(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.universityName && <p className="text-red-500 text-xs mt-1">{errors.universityName}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="universityType"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            University Type
                        </label>
                        <select
                            id="universityType"
                            value={universityType}
                            onChange={(e) => setUniversityType(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="location"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>




                    <div className="flex mb-2 space-x-2">
                        <div className="w-1/2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                University Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>
                    {/* Add other input fields similarly */}
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-xs font-light text-center justify-center text-gray-700 flex">
                    {" "}
                    Already have an account?{" "}
                    <span
                        className="font-medium text-purple-600 hover:underline cursor-pointer"
                        onClick={() => Navigate('/')}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}