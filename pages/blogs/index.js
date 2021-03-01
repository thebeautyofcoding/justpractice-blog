import ReadBlog from '../../components/crud/ReadBlog'
import {listAllBlogsAndCategoriesAndTags, singleBlog, list} from '../../actions/blog'
import { withRouter } from 'next/dist/client/router'
import Link from 'next/link'
import {useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import moment from 'moment'
import {API, APP_NAME, DOMAIN} from '../../config'
import Head from 'next/head'
const Blogs = ( {blogs, categories, tags, router, blogsLimit, totalBlogs, blogsSkip,totalBlogsLimit  }) => {
   const [limit, setLimit] = useState(totalBlogsLimit)
   const [loadedBlogs, setLoadedBlogs] = useState([])
   const [skip, setSkip] = useState(0)
   const [size, setSize]= useState(blogsLimit)

   const showAllCategories = (categories) => {
      return categories.map((c, i) => {
         return <li key={i}><Link href={`/categories/${c.slug}`} >
            <a className="btn">{c.name}</a>
         </Link>
         </li>
      })
  
   
   }

   const head = () => {
        return <Head>
            <title>Programming blogs | {APP_NAME}</title>
            <meta name="description" content="Programming blogs and tutorials on react node next vue php laravael and web devleopment" />

            <link rel="cannonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Lastest web development tutorials | ${APP_NAME}`} />
            <meta property="og:description"
                content="Programming blogs and tutorials on react node next vue php laravael and web devleopment"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/Clear_sky.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/Clear_sky.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
        
        </Head>
    }
   const loadMore = async () => {
      let toSkip= skip + limit
      const data = await listAllBlogsAndCategoriesAndTags(toSkip, limit).catch(err => console.log(err))
    
      setLoadedBlogs([...loadedBlogs, ...data.data.blogs])
 
      setSize(data.data.blogSize)
      setSkip(toSkip)
     
      
   }
 
console.log(size, limit)
   const loadMoreButton = () => {
      
      return (
         size > 0 && size >= limit && (<button onClick={loadMore} className="Button m-medium">Load more</button>))
      
   }
   console.log('38!!!', size)

   const showAllTags = (tags) => {
      return tags.map((t, i) => {return  <li key={i}>
          <Link href={`/tags/${t.slug}`} >
            <a className="btn btn--red">{t.name}</a>
         </Link>
        </li>
      })
   
}


   const showAllBlogs = (blogs) => {
      console.log('60', blogs)
      return blogs.map((blog, i) => {
         return (
           
            <article className="article"  key={i}>
          
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
   const showLoadedBlogs = () => {
      return loadedBlogs.map((blog, i) => {
         return (<article key={i}>
          
            <div className="card" >
               <div className="card--small">
                              <p className="marked">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                              <h3 className="card--small-t">{blog.title}</h3>
                  <div className="card--small-d">{blog.mdesc}</div>
                  <div className="">
                       <Link href={`/blogs/${blog.slug}`}><a className="Button">Read more</a></Link>
                        {/* <button className="Button Button--red">Delete</button> */}
                        </div>
                              
               </div>
               
            </div>
            
                
         </article>)
        
      })

      
   }

   return <>
      {head()}
   <div className="container__column">
      <div className="container__row">

     <ul className="unorderedList container__row"> {showAllCategories(categories)}</ul>
     </div>
      <div className="container__row">

      <ul className="unorderedList container__row"> {showAllTags(tags)}</ul>
      </div>
       <div className="gridContainer">
     <div className="grid"> {showAllBlogs(blogs)}</div>
     <div className="grid">{showLoadedBlogs()}</div>
      <div className="center">{loadMoreButton()}</div>
      </div>
      </div>
      </>
}




Blogs.getInitialProps = async() => {
    let skip = 0
    let limit = 3
   let data = await listAllBlogsAndCategoriesAndTags(skip, limit).catch(err => console.log(err))



   if (data.error) return console.log(data.error)
   else {
      return {
       
      

            blogs: data.data.blogs,
            categories: data.data.categories,
            tags: data.data.tags,
            totalBlogsLimit: data.data.blogSize,
            blogsLimit: limit,
         blogsSkip: skip,
           


        }
   }
   
    }


export default withRouter(Blogs)