
import { API } from './../config';
import axios from 'axios'
export const getCategories = async () => {
    const response = await axios.get(`${API}/categories`).catch(err => console.log(err))
    
    return response;


}

export const getTags = async() => {
    const response = await axios.get(`${API}/tags`).catch(err => console.log(err))
    
    return response;

    
}
export const singleCategory = async (slug) => {
    console.log('133')
    const response = await axios.get(`${API}/categories/${slug}`).catch(err => console.log(err))
    
    console.log(response)
    
    return response;
    
}

