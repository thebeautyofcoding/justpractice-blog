
import { userPublicProfile } from './../../actions/user';
import Link from 'next/link';
import Layout from './../../components/Layout';
import moment from 'moment'
import { API } from '../../config';

import Contact from './../../components/form/Contact';

const UserProfile = ({user, blogs, query}) => {
    if(!user, !blogs)return null

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
           return <li className="center search-results" key={i}><Link href={`/blogs/${blog.slug}`}><a>{blog.title}</a></Link></li>
        })
    }

    return <div className="container__column">
      
            <p className="success">Joined {moment(user.createdAt).fromNow()}</p>

        <div ><img className="img img__small" src={`${API}/user/photo/${user.username}`} /></div>
        

        <h5 className="m-medium">Recent blogs by {user.name}</h5>


        <ul className="container__column"> {showUserBlogs()}</ul>
        

        <h4>Contact {user.name}</h4>

        <Contact authorEmail={user.email}/>
    </div>
}




UserProfile.getInitialProps =  async ({ query }) => {
    

    const data = await userPublicProfile(query.username)

    console.log('40!!!', data)
  
    if (data.error) {
        console.log(data.error)
    } else {
        return {
            user:data.data.userFromDb, blogs:data.data.blogs, query:query
        }
    }
}

export default UserProfile;


