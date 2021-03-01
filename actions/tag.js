

import { API } from './../config';
import axios from 'axios'


export const getTags = async() => {
    const response = await axios.get(`${API}/tags`).catch(err => console.log(err))
    
    return response;

    
}
export const singleTag = async (slug) => {
    console.log('133')
    const response = await axios.get(`${API}/tags/${slug}`).catch(err => console.log(err))
    
    console.log(response)
    
    return response;
    
}

