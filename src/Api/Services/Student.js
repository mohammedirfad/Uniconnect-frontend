import axios from '../../Api/Axios.js'

export const StudentRegister= async (FormData,id,token,)=>{
    try{

        const response = await axios({
            url: "/student/addStudent/",
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                FormData,id
            }
         });
        
         const data = response
         if(data) return data;
    }
    catch(err){
    
        console.log(err,"errr occured");
        throw err; 
    }

}

export const getStudentList= async (id,token,currentPage,pageSize)=>{
    try{
  
        const response = await axios({
            url: `/student/getStudents?id=${id}&page=${currentPage}&pageSize=${pageSize}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
           
         });
        
         const data = response
         if(data) return data;
    }
    catch(err){
    
        console.log(err,"errr occured");
        throw err; 
    }

}



export const getStudent= async (id,token,)=>{
    try{
     
        const response = await axios({
            url: `/student/getStudent?id=${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
           
         });
  
         const data = response
         if(data) return data;
    }
    catch(err){
    
        console.log(err,"errr occured");
        throw err; 
    }

}

export const UpdateStudent= async (FormData,id,token,studentid)=>{
    try{
    
        const response = await axios({
            url: "/student/updateStudent",
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                FormData,id,studentid
            }
         });
        
         const data = response
         if(data) return data;
    }
    catch(err){
    
        console.log(err,"errr occured");
        throw err; 
    }

}


export const DelStudent= async (id,token)=>{
    try{
    
        const response = await axios({
            url: `/student/DeleteStudent?id=${id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
           
         });
        
         const data = response
         if(data) return data;
    }
    catch(err){
    
        console.log(err,"errr occured");
        throw err; 
    }

}