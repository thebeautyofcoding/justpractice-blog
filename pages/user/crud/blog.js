import Private from '../../../components/auth/Private'
import CreateBlog from '../../../components/crud/CreateBlog'
import Layout from '../../../components/Layout'


const Blog = () => {
    return <Private>
        
        <div className="h1-container"><h1>Create new blog</h1></div>
        <CreateBlog /></Private>
   
}


export default Blog