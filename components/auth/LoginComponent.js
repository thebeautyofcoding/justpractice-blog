import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState } from 'react'

import {isAuth} from '../../actions/auth'
import Router from 'next/router'
import {startLogin, successLogin, failLogin, successSetCurrentUser} from '../../redux/user/user.actions'
import { useDispatch, useSelector } from 'react-redux'


import axios from 'axios'
import { authenticate } from '../../actions/auth';
import LoginGoogle from './LoginGoogle'
import { API, DOMAIN } from '../../config'

const LoginComponent = () => {
    const router = useRouter()
    const currentUser = useSelector(state => state.currentUser)
   

    const [values, setValues] = useState({
        
        email: '',
        password: '',
        error:''

  
    })

    const { email, password,error } = values
   
    const dispatch = useDispatch();

    

    const login = (email, password) => async (dispatch) => {
    
     
          
        dispatch(startLogin())
        
              
        var bodyFormData = new FormData();
        bodyFormData.append('email', email)
      
        bodyFormData.append('password', password)
           
        axios({
            method: 'post',
            url: `${API}/signin`,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((data) => {
            if (data.error) return setValues({ ...values, error: data.error })
            
            dispatch(successLogin(data.data))
                    
            dispatch(successSetCurrentUser({ email }))
         
            authenticate(data, () => {
                if (isAuth && isAuth.role == 1) { Router.push('/admin') }
                else {
                    Router.push('/')
                }
            })
                   
        }).catch(err => setValues({ ...values, error: err.response.data.error }))
          
              
   }
    
               
               
       
            
    
      


   

    
 

     

   const submitHandler =  (e) => {
      e.preventDefault();
    
     dispatch(login(email, password))
     console.log('donso')
       
            
   } 

    const changeHandler = (name) => e => {
        setValues({ ...values, error: false, [name]: e.target.value})



        
    }
    const showErrorMessage = () => {
        return <div style={{ display:error? 'flex':'none' }}>{error}</div>
    }
    const loginForm = () =>
     
        <form className="container" onSubmit={submitHandler}>
            
            <div className="container">
            <input className="input mt-small" onChange={changeHandler('email')}name="email" type="email" placeholder="Type your email..." />
            </div>
            <div className="container">
            <input className="input m-small" onChange={changeHandler('password')} type="password" name="password" placeholder="Type your password..." />
            </div>
        <div className="container">
            <button className="Button" type="submit">Login</button>
            </div>
        </form>


    return<>
        <LoginGoogle />
       <div className="error">{showErrorMessage()}</div> 
 {   loginForm()}
        

        <br />
        <div className="container">
        <Link href="auth/password/forgot">
        <a className="Button Button--red">Reset password</a>
            </Link>
            </div>
    </>
    
}


export default LoginComponent