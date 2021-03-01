import { getCookie, updateUser } from "../../actions/auth"
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { profile, update } from '../../actions/user'
import {successUserUpdate} from '../../redux/user/user.actions'
import { Router } from 'next/router';
import { API } from "../../config";



const ProfileUpdate = () => {


  
    

    const [values, setValues] = useState({
        username: '',
        usernameForPhoto: '',
        name: '',
        email: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: process.browser && new FormData(),
        about: ''
    })
    const dispatch = useDispatch()
    const { username, name, email, error, success, loading, photo, userData, about, usernameForPhoto } = values
    const token = getCookie('token')


    const [photoPreview, setPhotoPreview]= useState('')
    const initProfile = () => {
        profile(token).then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, username: data.data.username, name: data.data.name, email: data.data.email, about: data.data.about, usernameForPhoto: data.data.username })
                userData.set('username', data.data.username)
             
                userData.set('email', data.data.email)
                userData.set('name', data.data.name)
            }
        })
    }

    useEffect(() => {
        initProfile()
        
     
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setValues({ ...values, loading: true })
        

        try {
            const data = await update(token, userData)
            updateUser(data, () => {
                setValues({ ...values, username: data.data.username, name: data.data.name, email: data.data.email, about: data.data.about, usernameForPhoto: data.data.username, success: true, loading: false })

                dispatch(successUserUpdate(data.data))
                Router.replace('/user')
            })
        } catch (err) {
            console.log(err.response)
        }

             
        }

        
    

console.log(username, name, email)
    useEffect(() => {
        initProfile()
    }, [])
    

    const handleChange = name => e => {

  
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        userData.set(name, value)
        setValues({ ...values, [name]: value, userData, error: false, success: false })
        if(e.target.files)setPhotoPreview(URL.createObjectURL(e.target.files[0]))
    }



    const profileUpdateForm = () => {
        
        return <form className="container__column" onSubmit={handleSubmit}>
               <div className="m-medium">
                <label className="Button Button--white"> Update profile photo
                <input className="input m-small" onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                    </label>
            </div>
            <div className="form-group">
                <label className="">Username:</label>
                    <input className="input m-small" onChange={handleChange('username')} type="text" value={username} required/>
               
            </div>
            <div className="form-group">
                <label>Name:</label>
                <input className="input m-small"onChange={handleChange('name')} type="text" value={name} required/>
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input className="input m-small"onChange={handleChange('email')} type="email"value={email} required/>
            </div>
     
    
         
              <div>
                <button className="Button "type="submit" >Update</button>
            </div>
        </form>
    }

    // const showError = () => {
    //     return <div style={{ display:error? '':'none' }}>
    //         {error}
    //     </div>
    // }
    //     const showSuccess = () => {
    //     return <div style={{ display:success? '':'none' }}>
    //         {success}
    //     </div>
    // }

    
    const showLoading = () => {
        return <div className="center mt-medium" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    }

    const removeEmptyImageDiv = (e) => {
        console.log(e.target.value)
        const imgDatabase= document.getElementById('img-database');
        imgDatabase.remove()
//    return <div className="success">Upload your first profile picture</div>
}
    return (
        <>
          
            <h1 className="container mt-big">Update your profile</h1>
            
            <div>
                <div>
                    {photoPreview && <img className="img img__small image-preview center mt-small" src={photoPreview} />}

                    {!photoPreview&&  <div><img id="img-database" className="img img__small image-preview center mt-small" onError={removeEmptyImageDiv} src={`${API}/user/photo/${usernameForPhoto}`} /></div>}
                </div>
            
           

              
            <div className="success " style={{ display: success ? 'flex' : 'none' }}><p>{success && 'Profile successfully updated'}</p></div>    
                <div className="error"style={{display: error ? 'flex' : 'none'}}><p>{error && error} </p></div>
                {showLoading()}
            {profileUpdateForm()}
                </div> 
                
            
           
        
        </>
    )

}

export default ProfileUpdate

