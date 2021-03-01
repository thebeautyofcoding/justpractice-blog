import Link from "next/link"
import { listRelated, singleBlog } from '../../actions/blog'
import renderHtml from 'react-render-html'

import moment from 'moment'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'
const SingleBlog = ({ blog, query }) => {
    if (!blog) return null;
    const [relatedPosts, setRelatedPosts]= useState([])
    const loadRelatedPosts = async(blog) => {
        try {
            const response = await listRelated({ blog })
            console.log(response.data)
            setRelatedPosts(response.data)
            console.log(relatedPosts)
        } catch (err) {
            console.log(err)
       }
    }


    const head = () => {
        return <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta name="description" content={blog.mdesc}/>
            
            <link rel="cannonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
            <meta property="og:description"
                content={blog.mdesc}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
      
        </Head>
    }
 
    useEffect(() => {
        loadRelatedPosts(blog)
    },[])
    const showCategories = (blog) => {
        return blog.categories.map((cat, i) => {
            return <Link key={i} href={`/categories/${cat.slug}`}>
                <a className=" btn btn--red">{cat.name}</a>
            </Link>
        })
    }

    const showRelatedBlogPosts = () => {
       return relatedPosts.map((blog, i) => {
           return <div className="thumbail-card" key={i}>
                <div className="img img--small"><img  src={`${API}/blog/photo/${blog.slug}`}/></div>
                <h3 className="mt-small">{blog.title}</h3>
                <div className="success">
                    Posted {moment(blog.updatedAt).fromNow()} by&nbsp;<Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link>
                </div>
            </div>
        })
    }
    
    const showTags = (blog) => {
       return blog.tags.map((tag, i) => {
            return <Link key={i} href={`/tags/${tag.slug}`}>
                <a className="btn btn--green">{tag.name}</a>

               
            </Link>
        })
    }

    return <>
        {head()}
        <main>
            <article className="complete-post">
                <div className="img">
                    <section>
                        <div className="img__big"><img  src={`${API}/blog/photo/${blog.slug}`} alt={blog.title}/></div>
                    </section>
                    <section>
                        <div  className="">
                            <h1 className="h1">
                                {blog.title}
                            </h1>
                            <p className="center marked">
                                Written by <Link href={`${API}/profile/${blog.postedBy.name}`}>
                                    <a>{blog.postedBy.username}</a></Link>
                                    Published {moment(blog.updatedAt).fromNow()}
                                
                            </p>
                            <div className="container__row margin-bottom-md">
                                {showCategories(blog)}
                                {showTags(blog)}
                                <br />
                                <br/>
                            </div>
                        </div>
                    </section>
                    <div className="container">
                        <section >
                            <div className="ninetyvw">
                                {renderHtml(blog.body)}
                            </div>
                        </section>
                    </div>
                    <hr/>

                    <div className="container__row  grid">
                        {showRelatedBlogPosts()}
                    </div>

                </div>
            </article>
        </main>
        </>

}
SingleBlog.getInitialProps = async ({ query }) => {

    let response = await singleBlog(query.slug).catch(err => console.log(err))

  console.log('68!!!', response)
    
    let blog = response.data
    
    return {blog, query}
}
    



export default SingleBlog