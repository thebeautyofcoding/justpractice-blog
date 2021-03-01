import Router from 'next/router'
import {GOOGLE_CLIENT_ID} from '../../config'
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth'
import GoogleLogin from 'react-google-login'
import {useState} from 'react'

const LoginGoogle = () => {

    const [values, setValues] = useState({
        values: {
            error: '',
            success: ''
        }
       
    })
      const { error, success } = values
    const responseGoogle = async (response) => {
     
        console.log(response)
        const tokenId = response.tokenId
        const user = { tokenId }
        console.log(user)
        try {
            
            const data = await loginWithGoogle(user)
            authenticate(data, () => {


                Router.push('/')
            })
        } catch (err) {
            
            if (err.response.data.error.code === 11000) {
                setValues({ ...values, error: 'A User cannot log in twice with the same name' })
            }
        }
        

        
            
        
            

       
        
    }

   
        



    


    return <>
        {error && < div className="error" > { error }</div>
}
        <div className="container mt-big">
            <GoogleLogin
                clientId={`${GOOGLE_CLIENT_ID}`}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme="dark"
                cookiePolicy={'single_host_origin'}
            />
        </div>
    </>

}

export default LoginGoogle