import { combineReducers } from 'redux/'


import userReducer from './user/user.reducer'
import blogReducer from './blog/blog.reducer'

import categoryReducer from './category/category.reducer';
import tagReducer from './tag/tag.reducer'

 const rootReducer= combineReducers({
    currentUser: userReducer,
    categories: categoryReducer,
    tags: tagReducer,
    blogs: blogReducer
 })
export default rootReducer
