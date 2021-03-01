

import Router from 'next/router'

import React, { useState, useEffect } from 'react'


import axios from 'axios'

import {isAuth} from '../../actions/auth'
import { preSignup } from './../../actions/auth';
const RegisterComponent = () => {
    const [values, setValues] = useState({
        
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            error: '',
            loading: false,
            message: '',
            showForm:true, 
        success: false
  
    })
    
 
const {email,success, name, password, confirmPassword, showForm, message, loading, error} = values
     
useEffect(() => {
        // isAuth() && Router.push('/')
    },[name, email, password] )
        
    
    
    const submitHandler = async(e) => {
            e.preventDefault();
  setValues({ ...values, error: false, loading:true, confirmPassword:'', password:'' })
            if (password !== confirmPassword) {
                return setValues({ ...values, error: 'Passwords did not match' })
        }
      
          
            const user = { name, email, password };

            try {
                const data = await preSignup(user)

                console.log(data.data.message)
                 setValues({ ...values, name:'', confirmPassword:'',  email:'', password:'', error:'', loading:false, message:data.data.message, showForm:false });
            } catch (err) {
                console.log(err.response.data)
                setValues({ ...values, error: err.response.data.error, loading: false });
                console.log(error)
            }
          
        
            
            // try {
            //     var bodyFormData = new FormData();
            //     bodyFormData.append('email', email)
            //     bodyFormData.append('name', name)
            //     bodyFormData.append('password', password)
               
                
            //     await axios({
            //         method: 'post',
            //         url: 'http://localhost:4000/register',
            //         data: bodyFormData,
            //         headers: {'Content-Type': 'multipart/form-data' }
            //     })
            //     console.log('DONSO')
            // } catch (err) {
            //     console.log(err)
            // }
            
    }

    const showErrorMessage = () => {
            return <div className="error" style={{ display: error ? 'flex': 'none' }}>{error}</div>
    }
        const showSuccessMessage = () => {
            return <div className="success" style={{ display: success ? 'flex': 'none' }}>{success}</div>
    }
    
    const showInfoMessage = () => {
        return <div className="success" style={{ display: message ? 'flex': 'none' }}>{message}</div>
    }
    const changeHandler = (name) => e => {

        
        setValues({ ...values, error: '', success:'', [name]: e.target.value})



        
    }
    
 
    
    const registerForm = () =>
        <form className="container__column" onSubmit={submitHandler}>
            { !error && showSuccessMessage()}
             {!success && showErrorMessage()}
            
            <input className="input m-small" value={email} onChange={changeHandler('email')} name="email" type="email" placeholder="Type your email..." />
            <input className="input m-small" vlaue={name}onChange={changeHandler('name')} type="text" name="name" placeholder="Type your username..." />
            <input className="input m-small" value={password}onChange={changeHandler('password')} type="password" name="password" placeholder="Type your password..." />
            <input className="input m-small" value={confirmPassword} onChange={changeHandler('confirmPassword')}type="password" name="confirmPassword" placeholder="Confirm your password..." />
        
            <button className="Button" type="submit">Register</button>
        </form>

       
 return  <div className="container__column">  {!error && showInfoMessage() }
         {   showForm && registerForm()}
     </div>
    
    
}


export default RegisterComponent