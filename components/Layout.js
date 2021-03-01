import { totalBlogsCounted } from '../actions/blog'
import Header from './Header/Header'
import { useState, useEffect, useCallback } from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { getblogsTotal } from '../redux/blog/blog.actions';
import Search from './blog/Search';


const Layout = ({ children }) => {
   
    const reduxTotal = useSelector(state => state.blogs.blogsCreatedTotal)
    const updatedUser = useSelector(state => state.currentUser.updatedUser)
    

    console.log(updatedUser)
    if (process.browser) { localStorage.setItem('total', reduxTotal) }
  
    let reduxTotalLocal

        const blogsTotalDBFn = useCallback(() => totalBlogsCounted().then(data => {
          
           
            return setTotal(data.data.blogNumber)
    }).catch(err => console.log(err)), [])
    
    const [total, setTotal]= useState(0)


    // const setUpdatedUserLocal = () => {
    //       if (process.browser) {
    //     localStorage.setItem('user', JSON.stringify(updatedUser))
    // }
    // }

    
    useEffect(() => {

        blogsTotalDBFn()

              
    }, [ reduxTotal, updatedUser])


    console.log(total)
    return <>
        <Header total={total} />
        <Search/>
        {children}
        </>
}


export default Layout