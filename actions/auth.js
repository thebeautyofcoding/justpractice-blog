import cookie, { remove } from 'js-cookie'
import {API} from '../config'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { successSignout } from '../redux/user/user.actions'


import Router from 'next/router'


export const preSignup = (user) => {
    return axios.post(`${API}/pre-signup`,
        user).then(response=>response)
}

export const setCookie = (key, value) => {
    if (process.browser) return cookie.set(key, value, {
        expiresIn: '1d'
    })
}


export const getCookie = key => {
    if(process.browser) return cookie.get(key)
}

export const setLocalStorage = (key, value) => {
    if(process.browser)localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key) => {
    if(process.browser) localStorage.removeItem(key)
}

export const updateUser = (user, next) => {
   
    if (process.browser) {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(sessionStorage.getItem('user'))
            auth = user.data
            localStorage.setItem('user', JSON.stringify(auth))
            next()
            
         
        }
   
    }
}
export const authenticate = (data, next) => {
  
    setCookie('token', data.data.token)
    setLocalStorage('user', data.data.user)
  next()
}

export const isAuth = () => {
    if (process.browser) {
        const checkedCookie = getCookie('token')
        if (checkedCookie) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
}


export const signout = async() => {
    removeCookie('token')
    removeLocalStorage('user')

    const response = await axios.get(`${API}/signout`).catch(err => console.log(err))
   
    Router.replace('/login')
    
    return response
}

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires:1
        })
    }
}

export const signup = (token) => {
   return axios.post(`${API}/signup`,
        token).then(response => {
            
            
           
            return response
        }).catch(err => console.log(err))
}

export const forgotPassword = (email) => {
   return axios.put(`${API}/forgot-password`,
        email).then(response => {
            
            
           
            return response
        })
}

export const loginWithGoogle = (user) => {

    
   return axios.post(`${API}/google-login`,
        user).then(response => {
            
            
          
            return response
        })
}

export const resetPassword = (resetInfo) => {
   return axios.put(`${API}/reset-password`,
        resetInfo).then(response => {
            
            
           
            return response
        })
}


export const handleResponse = response => {
    if ( response && response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: 'your session has been expired. Please sign in'
                }
            })
        })
    } else {
        return
    }
}

