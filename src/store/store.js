import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore ,
    persistReducer ,
    FLUSH ,
    REHYDRATE ,  
    PAUSE ,
    PERSIST ,
    PURGE ,
    REGISTER      
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import authSlice  from '../../src/store/features/authSlice'; 

const LoginpersistConfig = { key: "UniversityAuth" , storage , version : 1};

const UniversityLoginpersistReducer = persistReducer(LoginpersistConfig, authSlice.reducer);


export const store = configureStore({
    reducer: {
        UniversityAuth: UniversityLoginpersistReducer,
    
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export const persistor = persistStore(store);