
import Link from 'next/link'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../../actions/auth'
import { list } from '../../actions/blog'
import Router,{useRouter} from 'next/router'
import { successSignout } from '../../redux/user/user.actions'
import { startLogin, successLogin, failLogin, successSetCurrentUser, setLoginTrue } from '../../redux/user/user.actions'
import { totalBlogsCounted } from '../../actions/blog'
import { getblogsTotal } from '../../redux/blog/blog.actions'
import { useLocation } from 'react-router-dom'
import { isAuth } from '../../actions/auth'
import Search from '../blog/Search';
import UserIndex from './../../pages/user/index';
const Header = (props) => {
    console.log(props.total)
    let user
const router = useRouter()

    const [active, setActive] = useState(false)


    //     const compareLayoutTotalWithHeaderTotals = () => {
    //         if (props.total !== blogTotals) {
    //           setBlogsTotal(totals)
    //       }
    //   }

    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false)

    const [reRender, setRerender] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }


    const [blogsTotal, setBlogsTotal] = useState('')
    console.log(blogsTotal)
    const [loading, setLoading] = useState(false)
    let loadLocalBlogsTotal;
    const loadTotalLocal = () => {
        // if (localStorage.getItem('blogsTotal') != blogsTotal) {

        loadLocalBlogsTotal = localStorage.getItem('blogsTotal')
        if (localStorage.getItem('blogsTotal') !== blogsTotal) {


            setBlogsTotal(loadLocalBlogsTotal)
            setLoading(!loading)

        }






    }


    console.log(props.total, blogsTotal)
    const localBlogsTotal = () => {
        if (process.browser) {
            localStorage.getItem('blogsTotal')



        }
    }

    console.log(typeof window !== 'undefined' ? localStorage.getItem('blogsTotal') : '', blogsTotal)

    useEffect(() => {

        return setBlogsTotal(props.total)

    }, [props.total])


    // const getBlogsTotal = () => {

    //     totalBlogsCounted().then(data => {


    //             setBlogsTotal(data.data.blogNumber)
    //         if (localBlogsTotal() !== blogsTotal){
    //                 localStorage.setItem('blogsTotal', blogsTotal)
    //             }


    //     })



    // }



    //     const blogsTotalLocal = () => {
    //        console.log( blogsTotal)

    //         if (localStorage.getItem('blogsTotal') !== blogsTotal) {

    //             setBlogsTotal(localStorage.getItem('blogsTotal'))

    //             console.log(typeof localStorage.getItem('blogsTotal'))
    //         }
    //    }









    // <nav className="navbarItems">
    //     <div className="navbarLogo"><img src="/images/NavbarBrand.png"/></div>
    //     <div className="menuIcon" onClick={handleClick}>
    //         <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
    //     </div>
    //     <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>

    //                 <li>
    //                     <a className="nav-links" href="/blogs">
    //                     Home
    //                     </a>
    //         </li>

    //         {currentUser && (<li>
    //             <a className="nav-links" href="#">
    //             {currentUser.name }  ' dashboard
    //                     </a>
    //         </li>) 
    //         }
    //         <li>
    //                     <a className="nav-links nav-links __badge" href="/blogs">
    //                 Blogs<span className="badge">{blogsTotal}</span>
    //                     </a>

    //         </li>
    //         {isLoggedIn &&
    //             <li>
    //                 <a className="nav-links" href="/crud/blog">
    //                     Create new blog
    //                     </a>
    //             </li>

    //         }
    //         <li>
    //                     <a className="nav-links" href="">

    //                     </a>
    //         </li>
    //         {!isLoggedIn &&
    //             <li>
    //                 <a className="nav-links" href="">
    //                     Register
    //                     </a>
    //             </li>
    //         }
    //         {!isLoggedIn &&
    //             <li>
    //                 <a className="nav-links" href="/login">
    //                     Login
    //                     </a>
    //             </li>
    //         }

    //         {isLoggedIn &&
    //             <button className="btn btn--red" onClick={() => {
    //             setCurrentUser(null)
    //             setIsLoggedIn(false)
    //             signout(dispatch(successSignout()))
    //             }}>

    //                     Logout

    //             </button>
    //         }

    //     </ul>

    // </nav>
    // )
    // }

    const onClickHandler = (e) => {

        setActive(!active)
        const links = document.getElementsByClassName('link-mobile')

        const linksMobile = document.getElementsByClassName('links-mobile')
        const mobileNav = document.getElementsByClassName('mobile-nav')



      linksMobile[0].classList.toggle("active")
        mobileNav[0].classList.toggle("active")

        for (let i = 0; i < links.length; i++) {
            links[i].classList.toggle("active")
            

        }





    }

    const linkClickHandler = () => {
        const linksMobile = document.getElementsByClassName('links-mobile')
        const mobileNav = document.getElementsByClassName('mobile-nav')[0]
        mobileNav.classList.remove('active')
        linksMobile[0].classList.remove("active")
        
        // const links = document.getElementsByClassName('link-mobile')
        // for (let i = 0; i < links.length; i++) {
        //     links[i].classList.toggle("active")
            

        // }
        
    }

     const[sideBarActive, setSidebarActive]= useState(false)

    const toggleDashboardSidebar = () => {
        let sidebarButton = document.querySelector('.navbar .links .sidebar-button')
        let dashboardSidebar= document.querySelector(".dashboard-sidebar-container .dashboard-sidebar")
        sidebarButton.classList.toggle("active")
        dashboardSidebar.classList.toggle("active")

    }
   
    return (
        

        <>
            <nav className="navbar">
             
                <ul className="links flex">
                 
                    {router.pathname==='/user' &&  <div onClick={toggleDashboardSidebar} className="sidebar-button "><div></div></div>}
                    <div className="logo">
                        {/* <Link href="#"><img src="/images/NavbarBrand.png" /></Link> */}
                        <Link href="/"><div className="logo-parts"><span className="span--red">just</span><div className="logo-div">Practice</div></div></Link>
                    </div>

                    <li className="link">

                        <Link href="/"><a>Home</a></Link>
                    </li>
                    <li className="link link__badge">
                        <Link href="/blogs"><a>Blogs<span className="badge">{blogsTotal}</span></a></Link>
                    </li>
                    <li className="link link__badge">
                        <Link href="/contact"><a>Contact</a></Link>
                    </li>
                    {isAuth() && isAuth().name &&
                        <li className="link">
                            <Link href="/user"><a>{isAuth().name}'s Dashboard</a></Link>
                        </li>}
                    {!isAuth() &&
                        <li className="link">
                            <Link href="/login"><a>Login</a></Link>
                        </li>}
                    {!isAuth() &&
                        <li className="link">
                            <Link href="/register"><a>Register</a></Link>
                        </li>}
                    {isAuth() &&
                        <button className="Button Button--red" onClick={() => {
                            
                            signout(dispatch(successSignout()))
                        }}>

                            Logout

                </button>
                    }
                </ul>
            </nav>


            <nav className="mobile-nav-container">

                


                <div className="mobile-nav">
                  
                    <div className="logo-container">
                        <div className="logo" onClick={onClickHandler} >
                            <div><div className="hamburger"></div></div>
                        </div>
                    </div>

                    <div className="container">
                        <ul className="links-mobile">
                            
                            <li onClick={linkClickHandler} className="link-mobile">
                                <Link  href="/"><a>Home</a></Link>
                            </li>
                            <li onClick={linkClickHandler} className="link-mobile link-mobile__badge">
                                <Link href="/blogs"><a><span className="badge__mobile">Blogs({blogsTotal})</span></a></Link>
                            </li>
                            {isAuth() &&
                                <li  onClick={linkClickHandler}className="link-mobile">
                                    <Link href="/user"><a>{isAuth().name}'s Dashboard</a></Link>
                                </li>
                            }

                            {!isAuth() &&
                                (<li onClick={linkClickHandler}className="link-mobile">
                                    <Link href="/login"><a>Login</a></Link>
                                </li>)}

                            {!isAuth() &&
                                <li onClick={linkClickHandler}className="link-mobile">
                                    <Link href="/register"><a>Register</a></Link>
                                </li>}
                            <li>
                                <button onClick={linkClickHandler} className="Button Button--red" onClick={() => {
                                    linkClickHandler()
                                    signout(dispatch(successSignout()))
                                }}>Logout</button></li>

                        </ul>
                    </div>
                </div>
            </nav>

          

        </>
    )

}
export default Header