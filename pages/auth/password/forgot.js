

import { useState } from 'react'


import { forgotPassword } from '../../../actions/auth'
const ForgotPassword = () => {
    

    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm:true
    })

    const { email, message, error, showForm } = values;


    

    
    const showError = () => error ? (<div className="error center">{error}</div>) :''
    
    const showMessage = () => message ? (<div className="success">{message}</div>) : ''
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' })
        

        try {
            const data = await forgotPassword({ email })
            console.log(data)
           setValues({...values, message:data.data.message, email:'', showForm:false})
        } catch (err) {
            setValues({ ...values, error: err.response.data.error})
         
        }
        
    }

    const handleChange = (name) => (e) => {
        setValues({...values, error:false, [name]: e.target.value})
    }

    const passwordForgotForm = () => {
       return (<form className="container__row" onSubmit={handleSubmit}>
            <input type="email" className="input" name="email" onChange={handleChange('email')} value={email} placeholder="Type in your email..." required />
            <button className="Button m-medium " type="submit">Reset</button>
        </form>)
    }

    return (<>
        <div className="container">
        <h2 >Forgot your password?</h2>
        <p className="m-medium">Please type your email in!</p>
        { showError() }
            {showMessage()}
            <div>{showForm && <div>
                
                {passwordForgotForm()}</div>}</div>
        
   </div>
            </>
    )

}

export default ForgotPassword