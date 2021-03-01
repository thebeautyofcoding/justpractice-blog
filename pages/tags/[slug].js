import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {singleCategory} from '../../actions/category'
import { API, DOMAIN, APP_NAME } from '../../config'
import axios from 'axios'
import moment from 'moment'
import { singleTag } from '../../actions/tag'
const Category = ({ tag, blogs, query }) => {
    

    const head = () => {
      return  <Head>
            <title>{tag.name} | {APP_NAME}</title>
            <meta name="description" content={`Only The best... ${tag.name}`} />
        
            <link rel="cannonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
            <meta property="og:description"
                content={`Only The best... ${tag.name}`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/japan-1792369_1920`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/japan-1792369_1920`} />
            <meta property="og:image:type" content="image/jpg" />

        </Head>
    }
    const showAllBlogs = () => {
   
        return blogs.map((blog, i) => {
            return (
           
                <article className="article" key={i}>
          
                    <div className="card">
                        <div className="card--small">
                            <p className="card--small-p marked">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                            <h3 className="card--small-t">{blog.title}</h3>
                            <div className="card--small-d">{blog.mdesc}</div>
                            <div className="center">
                                <Link href={`/blogs/${blog.slug}`}><a className="Button">Read more</a></Link>
                                {/* <button className="btn btn--red">Delete</button> */}
                            </div>
                        </div>
               
                    </div>
            
                </article>
              
           
            )

        })

      
    }


    return <>
        {head()}
        <main>
        
           <div className="center m-big"> <h1 className>
                {tag.name}
            </h1>
</div>
           <div className="grid "> {showAllBlogs(blogs)}</div>
            
        </main>

    </>

}
    Category.getInitialProps = ({ query }) => {
         return singleTag(query.slug)
             .then(data => {
            console.log(data)
            if (data.error) {
            console.log(data.error)
            } else {
                return {tag: data.data.tag, blogs: data.data.blogs, query}
        }
    })
    }
    



export default Category;
