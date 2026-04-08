import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "API Error"); 
    }
}

 export const  getUser = async (id) =>{
      try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "API Error"); 
    }
 }


 export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`)
        return response.data;
    }catch(error){
       throw new Error(error.response?.data?.message || "API Error");
    }
 }

 export const addUser = async (data) => {
    try{
        const response = await axios.post(`${BASE_URL}/users`,data)
        return response.data

    }catch(error){
        throw new Error(error.response?.data?.message || "API Error");
    }
 }

 export const updateUser = async (id,data) => {
    try{
        const response = await axios.put(`${BASE_URL}/users/${id}`,data)
        return response.data

    }catch(error){
        throw new Error(error.response?.data?.message || "API Error");
    }
 }