

import categoryTypes from './category.types'


const INITIAL_STATE = {
    categories: [],

}

const categoryReducer = (state = INITIAL_STATE, action) => {
    let { categories } = state;
    switch (action.type) {

        case categoryTypes.SUCCESS_CREATE_CATEGORY:
            console.log(action.payload)
            return {
                ...state, categories: {...categories,categeries: action.payload}
            }

        default:
            return state;
    }
}

export default categoryReducer