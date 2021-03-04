
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

    return <div className="profileContainer">
        <div className="center">
            <h2 className="m-medium">Public profile of <span style={{ color: 'crimson' }}>{user.name}</span></h2>
        </div>
        <div className="profile">
      <div>
            <p className="success">Joined {moment(user.createdAt).fromNow()}</p>

        <div ><img className="img img__small" src={`${API}/user/photo/${user.username}`} /></div>
        </div>
        <div className="flex flex--col">

        <h5 className="m-medium">Recent blogs by {user.name}</h5>


        <ul className=" flex flex--col"> {showUserBlogs()}</ul>
        
        </div>
        <div className="flex flex--col">
        <h5 className="m-medium">Contact {user.name}</h5>

            <Contact authorEmail={user.email} />
            </div>
        </div>
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


