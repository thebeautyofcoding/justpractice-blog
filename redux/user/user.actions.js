import userTypes from './user.types'

 export const startLogin = ()=>   ({type: userTypes.START_LOGIN})
    


 export const successLogin =(currentUser) =>  ( {type: userTypes.SUCCESS_LOGIN,payload: currentUser}
)


export const failLogin = () => ({ type: userTypes.FAIL_LOGIN })


export const successSetCurrentUser = (userCredentials) => ({ type: userTypes.SUCCESS_SET_CURRENT_USER, payload: userCredentials })


export const setLoginTrue= ()=>({type: userTypes.SUCESS_LOGIN_TRUE})
export const successSignout = () => ({ type: userTypes.SUCCESS_SIGNOUT })


export const successUserUpdate=(updatedUser)=>({type: userTypes.UPDATE_SUCCESS, payload: updatedUser})
