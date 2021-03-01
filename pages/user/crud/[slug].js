import Admin from "../../../components/auth/Admin"
import Private from "../../../components/auth/Private"
import UpdateBlog from "../../../components/crud/UpdateBlog"



const Blog = () => {
    return(
        <Private>
            <div className="h1-container"> <h2>Update Blog</h2></div>

            <UpdateBlog/>
        </Private>)
}


export default Blog