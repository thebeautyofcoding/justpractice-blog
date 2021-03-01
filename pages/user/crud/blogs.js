



import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/CreateBlog'
import Link from 'next/link'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'
import ReadBlog from '../../../components/crud/ReadBlog'
import { isAuth } from '../../../actions/auth'
import Private from '../../../components/auth/Private'




const Blog = () => {
    const username = isAuth() && isAuth().username;
    console.log('username', username)
    return (<Private>
 
        
                <div className="center m-medium">
                    <h2>Manage blogs</h2>
                </div>
                <div className="">
                    <ReadBlog username={username}/>
                </div>
        

    </Private>)
}


export default Blog