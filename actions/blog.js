


import queryString from 'query-string'
import { API } from '../config';
import Blog from './../pages/user/crud/blog';
import axios from 'axios'
import { handleResponse, isAuth } from './auth';


export const list = (username) => {
    let listBlogsEndpoint
   
    console.log(username)
    if (username) {
        listBlogsEndpoint = `${API}/${username}/blogs`
        console.log('username!!!!!!')
    } else {
        listBlogsEndpoint= `${API}/blogs`
        
    }
    return axios.get(listBlogsEndpoint)
        .then(response => {
         
        return response
    }).catch(err=>console.log(err))
}


export const totalBlogsCounted = async () => {
    const response = await axios.get(`${API}/blogs-count`).catch(err=>console.log(err))
    return response
}


export const listAllBlogsAndCategoriesAndTags = async (skip, limit) => {
    console.log('14!!!', skip, limit)
    const data = { limit, skip }
    const response = await axios.post(`${API}/blogs-categories-tags`,  {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },data
        
    }).catch(err => {

        console.log(err)
    })


    return response
}

export const singleBlog = async (slug) => {
    const response = await axios.get(`${API}/blogs/${slug}`).catch(err => console.log('32!!!', err))
    console.log('DONE')
    return response
}

export const removeBlog = (slug, token) => {
    let deleteBlogEndpoint;


    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/blog/${slug}`
    } else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint=`${API}/user/blog/${slug}`
    }

    return axios.delete(deleteBlogEndpoint, {
        headers: {
        Accept: 'application/json',
            'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }

    }).then(response => {
        handleResponse(response)
        return response
    })
   
}


export const updateBlog =async (blog, token, slug) => {
    let updateBlogEndpoint;

    console.log(token)

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/blog/${slug}`
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint=`${API}/user/blog/${slug}`
    }
    console.log(blog)
    
    
 
       const response =  await axios.put(updateBlogEndpoint, blog, {
        headers: {
            Accept: 'application/json',
       
            Authorization: `Bearer ${token}`
        },
       
    })
  
   return response
        
    }

    
        
     
           
       

    







export const listSearch = (params) => {
    console.log('search params', params)
    let query = queryString.stringify(params)
   
    return axios.get(`${API}/blogs/search?${query}`)
              .then(response => {
            console.log(response)
        return response.data
    }).catch(err=>console.log(err))
}
export const listSearchSuggs = (params) => {
    console.log('search params', params)
    let query = queryString.stringify(params)
   
    return axios.get(`${API}/blogs/search-suggs?${query}`)
              .then(response => {
            console.log(response)
        return response.data
    }).catch(err=>console.log(err))
}

export const listRelated = async (blog) => {
    console.log(blog.blog)
    
    const { _id, categories } = blog.blog
    console.log(_id, categories)
    const response = await axios.post(`${API}/blogs/related`,{_id, categories}).catch(err => console.log(err))
    console.log(response)
    return response
}