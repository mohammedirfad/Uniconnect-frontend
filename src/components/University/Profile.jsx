import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../store/features/authSlice';
import { UniversityUpdate } from '../../Api/Services/UniversityAuth';

export default function ProfileCard() {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.UniversityAuth);
    const id = useSelector(state => state?.UniversityAuth.id);
    const token = useSelector(state => state?.UniversityAuth.token);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.UniversityName);
    const [type, setType] = useState(user.UniversityType);
    const [email, setEmail] = useState(user.Email);
    const [location, setLocation] = useState(user.UniversityLocation);
    const [image, setImage] = useState(user.imageUrl); // Assuming image is a URL

    const handleSave = (e) => {
        e.preventDefault();
        let base64Image = null;
    
        if (image) {
            const reader = new FileReader();
            reader.onload = (event) => {
                base64Image = event.target.result;
                sendDataToBackend(base64Image); // Move this line here
            };
            reader.readAsDataURL(image);
        } else {
            sendDataToBackend(user.imageUrl); // Send data to the backend
        }
    };
    

    const sendDataToBackend = async (base64Image) => {
        try {
            // Prepare data for API request
         
            const formData ={
                name,type,email,location,base64Image
            }
            

       
            const respons = await UniversityUpdate(token, formData,id)
                if (respons.status === 201) {
                    console.log(respons.data);
                    dispatch(setLogin({token:token , id:id, UniversityName:name, Email:email,UniversityLocation: location, UniversityType:type, imageUrl:respons.data.response }));
                   setIsEditing(false);
                }
                console.log(image,"lllllllllllllll>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            }

           
         catch (error) {
            // Handle error
            console.error(error);
        }
    };


       

    return (
        <>
  {/* component */}
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
  />
  <link
    rel="stylesheet"
    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
  />
  <section className="pt-16 bg-blueGray-50 flex w-full">
    <div className="w-full lg:w-4/12 px-4 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                {
                    image?<img
                    alt="..."
                    src={image}
                    className=" w-44 h-40 shadow-xl rounded-full  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />:<img
                  alt="..."
                  src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
                }
              </div>
            </div>
          
          </div>
          <div className="text-center mt-28 my-28">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {email}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
              {location}
            </div>

            <hr className=''></hr>
            <div className="mb-2 text-blueGray-600 mt-8">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
             {type} {" "} University
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400" />
             {name}
            </div>
            <button
                className="justify rounded-md bg-purple-500 h-10 my-4"
                onClick={() => setIsEditing(true)} // Open the modal on button click
            >
                <h1 className="mx-5 text-white text-center justify-center flex">
                    Edit Profile
                </h1>
            </button>
          </div>
          {isEditing && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50 z-50">
        <div className="bg-white w-96 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        University Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 p-2 border rounded w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        University Type
                    </label>
                    <input
                        type="text"
                        id="type"
                        className="mt-1 p-2 border rounded w-full"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 p-2 border rounded w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        className="mt-1 p-2 border rounded w-full"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="mt-1 p-2 border rounded w-full"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                
                <div className="flex mt-4">
                    <button
                        className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
)}

        
        </div>
      </div>
    </div>
 
  </section>
</>

    );
          }