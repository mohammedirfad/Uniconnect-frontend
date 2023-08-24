import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversityLogin } from '../../Api/Services/UniversityAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setLogin } from '../../store/features/authSlice'


export default function Login() {

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async     (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setError(null);
        let data = {
            email,password
        }
       
        try{
            const response = await UniversityLogin(data);

            if(response.status === 200){
               console.log(response.data.message,"ll" ,response);
                toast.success(response.data.message);

                
                Navigate('/home');
                if(response.data){
                    let auth = response.data
                  dispatch(
                    setLogin({
                        UniversityName: auth.University.UniversityName,
                        UniversityLocation: auth.University.UniversityLocation,
                        token: auth.Token,
                        id :auth.University._id,
                        imageUrl:auth?.University?.Image,
                        Email:auth.University.Email,
                        UniversityType:auth.University.UniversityType, 
                       
                    })
                  )
                }

            }
            else{
                console.log(response.data.error,"lll",response);
                toast.error(response.data.error);
            }

    console.log(response.data.error,"lll",response);
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
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-purple-700">
                    UniConnect
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            University-Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-xs font-light text-center justify-center text-gray-700 flex">
                    {" "}
                    Don't have an account?{" "}
                    <span
                        href="#"
                        className="font-medium text-purple-600 hover:underline cursor-pointer"
                        onClick={() => Navigate('/signup')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}