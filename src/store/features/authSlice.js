import {createSlice  } from "@reduxjs/toolkit";



const initialState = {
    UniversityName: null,
    UniversityLocation: null,
    token: null,
    id :null,
    imageUrl: null,
    PhoneNumber:null,

    Email:null,
    UniversityType:null, 

  
};

const authSlice = createSlice({
    name:"UniversityAuth",
    initialState,
    reducers :{
        setLogin : (state, action) => {
            state.UniversityName = action.payload.UniversityName;
            state.UniversityLocation = action.payload.UniversityLocation;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.imageUrl = action.payload.imageUrl;
            state.PhoneNumber = action.payload.PhoneNumber;
            state.Email = action.payload.Email;
            state.UniversityType = action.payload.UniversityType;
           
        },

        setLogout : (state) => {
            state.UniversityName = null;
            state.token = null;
            state.id = null;
            state.UniversityLocation = null;
            state.imageUrl = null;
            state.PhoneNumber = null;
            state.Email = null;
            state.UniversityProfile = null; 
            state.UniversityType = null;
        },
    },
   
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice;