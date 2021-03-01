

import tagTypes from './tag.types'


const INITIAL_STATE = {
    tags: [],

}

const tagReducer = (state = INITIAL_STATE, action) => {
    let { tags } = state;
    switch (action.type) {

        case tagTypes.SUCCESS_CREATE_TAG:
            console.log(action.payload)
            return {
                ...state, tags: {...tags, tags: action.payload}
            }

        default:
            return state;
    }
}

export default tagReducer