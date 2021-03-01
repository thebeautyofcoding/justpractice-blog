
import {list} from '../../actions/blog'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import {API} from '../../config'
import moment from  'moment'
import { isAuth } from '../../actions/auth';
import { removeBlog,  } from '../../actions/blog'

import {getCookie} from '../../actions/auth'
const ReadBlog = ({ username }) => {
    console.log('username', username)
    const [blogs, setBlogs] = useState([])
    const[totalNumberOfBlogPosts, setTotalNumberOfBlogPosts]=useState(0)
    const [message, setMessage] = useState('')
    
    const[error, setError]= useState('')
    useEffect(() => {
       return loadPosts()
    },[])

    const loadPosts = (username) => {
        return list(username).then(data => {
        
            if (data.error) {
                console.log(data.error)
                
            } else {
                setBlogs(data.data.blogs)
                setTotalNumberOfBlogPosts(data.data.totalNumberOfBlogPosts)
              
                
               
            }
        }).catch(err=>console.log(err))
    }

    

    const confirmDelete = (slug) => {
            let answer = window.confirm("Are you sure you want to delete this blog post?")
        if (answer) {
                deleteBlog(slug)
            }
    }
    

    const deleteBlog = async (slug) => {
        const token = getCookie('token')
        
        try {
            const response = await removeBlog(slug, token)
            console.log(response)
              loadPosts()
        } catch (err) {
            setError(err.response.data.error)
            console.log(error)
        }
        
           
      
      
    }


    const showUpdateButton = (blog) => {
        if (isAuth && isAuth().role === 0) {
            return (<Link href={`/user/crud/${blog.slug}`}>
            <a className="Button Button--green">Update</a>
            </Link>)
        } else if (isAuth() && isAuth().role === 1) {
            return (<Link  href={`/admin/crud/${blog.slug}`}>
            <a className="Button Button--green">Update</a>
            </Link>)
        }
    }
    
    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
            
         
                <div className="card">
                 
                          
                                
                    <div className="img">
                                
                        <img className="img__small mb-small" src={`${API}/blog/photo/${blog.slug}`} /></div>
                            
                            
                            
                            
                                
                    <div className="card--small">
                        <p className="card--small-p marked">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                        <h3 className="card--small-t">{blog.title}</h3>
                        <div className="card--small-d">{blog.mdesc}</div>
                        {isAuth()._id === blog.postedBy._id &&
                            < div className="center"><button class="Button Button--red" onClick={() => confirmDelete(blog.slug)}>Delete</button>
                                {showUpdateButton(blog)}   </div>}
                </div>
                    
</div>

                          
                                
                           
                          
                    
                    
                    
                         
                            
                            
                    
            )
        })
}


    
    return <div className="grid">{showAllBlogs()}</div>

    
    
}

export default ReadBlog