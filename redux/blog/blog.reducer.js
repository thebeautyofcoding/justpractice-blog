import blogTypes from './blog.types'


const INITIAL_STATE = {
    blogs: [],
    blogsCreatedTotal: null

}

const blogReducer = (state = INITIAL_STATE, action) => {
    let { blogs, blogsCreatedTotal } = state;
    switch (action.type) {

        case blogTypes.SUCCESS_CREATE_BLOG:
            console.log(action.payload)
            return {
                ...state, blogs: [...blogs, action.payload]
            }
        case blogTypes.BLOGS_TOTAL:
            return {...state, blogsCreatedTotal: action.payload}

        case blogTypes.INCREMENT_BLOGS_TOTAL:
            return {...state, blogsCreatedTotal: blogsCreatedTotal+1}
        default:
            return state;
    }
}

export default blogReducer