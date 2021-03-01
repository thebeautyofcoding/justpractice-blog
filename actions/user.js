import axios from 'axios'
import { API } from './../config';
import { handleResponse } from './auth';


export const userPublicProfile = async (username) => {
    console.log('7!!!', API)
    const response = await axios.get(`${API}/user/${username}`)
    return response
}



export const profile = async token => {
    const response = await axios.get(`${API}/user/profile`, {
        headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${token}`
        }
    })

    return response;
}

export const update = async (token, user) => {
    

           const response = await axios.put(`${API}/user/update`, user, {
        headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${token}`
               }
               
           })
        handleResponse(response)

    
    return response;
        
} 
    



    

        
       
        
  


    
