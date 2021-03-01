import Private from "../../components/auth/Private"
import Link from 'next/link';
import { useState } from 'react';


const UserIndex = () => {



    return (<Private>
        {/* <div className="container m-medium">
                <h2>Welcome to the User Dashboard</h2>
            </div> */}
        <>

            <div className="dashboard-sidebar-container">


                <div className="dashboard-sidebar" >

                    <ul className="container__column left-align">
                        <li className="m-medium">

                            <Link href="user/crud/blog">
                                <a>Create a Blog</a>
                            </Link>
                        </li>
                        <li className="m-medium">

                            <Link href="user/crud/blogs">
                                <a>Update / Delete Blogs</a>
                            </Link>
                        </li>
                        <li className="m-medium">

                            <Link href="user/crud/update">
                                <a>Update your User Profile</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="dashboard-sidebar-container-mobile">
                <div className="dashboard-sidebar-mobile" >

                    <ul className="container__column">
                        <li className="m-medium">

                            <Link href="user/crud/blog">
                                <a>Create a Blog</a>
                            </Link>
                        </li>
                        <li className="m-medium">

                            <Link href="user/crud/blogs">
                                <a>Update / Delete Blogs</a>
                            </Link>
                        </li>
                        <li className="m-medium">

                            <Link href="user/crud/update">
                                <a>Update your User Profile</a>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

        </>
    </Private>)
}




export default UserIndex