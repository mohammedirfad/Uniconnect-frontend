import axios from '../../Api/Axios.js'

export const UniversityRegister= async (datas)=>{
    try{
        const response = await axios({
            url: "/signup",
            method: "POST",
            data: {
               datas
            }
         });
 
         const data = response
         if(data) return data;
    }
    catch(err){
    
        console.log(err,"errr occured")
    }

}


export const UniversityLogin = async (Datas)=>{
    try{
        console.log(Datas,"123");
        const response = await axios({
            url: "/login",
            method: "post",

            data: {
                Datas
            }
         });

         const data = response

         if(data) return data;
    }
    catch(err){
        console.log(err,"errr occured")
        throw err; 
    }

}

export const UniversityUpdate = async (token,formData,id)=>{
    try{

        const response = await axios({
            url: "/update",
            method: "Patch",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                formData,id            }
         });
    
         const data = response
   
         if(data) return data;
    }
    catch(err){
        console.log(err,"errr occured")
        throw err; 
    }

}