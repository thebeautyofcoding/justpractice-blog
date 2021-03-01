



import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/CreateBlog'
import Link from 'next/link'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'
import ReadBlog from '../../../components/crud/ReadBlog'
import { isAuth } from '../../../actions/auth'




const Blog = () => {
    const username = isAuth() && isAuth().username;
    console.log('username', username)
    return (<Admin>

        <div className="">
            <div className="container__column">
                <div className="center">
                    <h2>Manage blogs</h2>
                </div>
                <div className="">
                    
                    <ReadBlog username={username} />
                </div>
            </div>
        </div>

    </Admin>)
}


export default Blog