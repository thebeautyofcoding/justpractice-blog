import blogTypes from './blog.types'



export const successCreateBlog = (blog) => ({ type: blogTypes.SUCCESS_CREATE_BLOG, payload: blog}
)
// export const failCreateCategory = () => ({
//     type: categoryTypes.FAIL_CREATE_CATEGORY
// })


export const getblogsTotal = (blogsTotal) => ({ type: blogTypes.BLOGS_TOTAL, payload: blogsTotal })

export const incrementBlogsTotal =()=>({type:blogTypes.INCREMENT_BLOGS_TOTAL})


