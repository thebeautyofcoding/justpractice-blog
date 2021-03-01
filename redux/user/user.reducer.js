

import userTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    loggedIn: false,
    updatedUser: {}
}

const userReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SUCCESS_SET_CURRENT_USER:
            return {
                ...state, currentUser: action.payload, loggedIn: true
            }
        // case userTypes.SUCCESS_LOGIN:
        //     return {
        //         ...state,loggedIn: true
        //     }
        case userTypes.SUCCESS_SIGNOUT:
            return { ...state,currentUser:null, loggedIn: false }
        
        // case userTypes.SUCESS_LOGIN_TRUE:
        //     return { ...state, loggedIn: true}


        case userTypes.UPDATE_SUCCESS:
            return {
                ...state, updatedUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer