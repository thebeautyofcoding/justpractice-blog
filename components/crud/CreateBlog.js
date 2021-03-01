import {useState, useEffect, useCallback} from 'react'
import { QuillModules, QuillFormats } from '../../helpers/quill'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { API } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { totalBlogsCounted } from '../../actions/blog'
import{withRouter} from 'next/router'
const ReactQuill = dynamic(() => import('react-quill'), {ssr:false})


import Button from '../Button/Button'
import {getCookie} from '../../actions/auth'
import InputComponent from '../../components/form/Input/InputComponent'

import {successCreateBlog, incrementBlogsTotal, getblogsTotal} from '../../redux/blog/blog.actions'
const CreateBlog = ({router}) => {
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [checkedTags, setCheckedTags] = useState([])
    const [checkedCategories, setCheckedCategories] = useState([])
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
 
console.log(checkedCategories, checkedTags)
    const [values, setValues] = useState({
        formData: '',
        title: '',
        photo: '', 
        error: '',
        success:false


    })
    const { formData, title, photo, error, success } = values
    
 success && setTimeout(()=>setValues({...values, success:''}), 5000)
 const  [blogsTotal, setBlogsTotal]  = useState(0);
 
 
    const dispatch = useDispatch();

    const initTags = async() => {
        const data = await axios.get(`${API}/tags`).catch(err => console.log(err))
         if(data)setTags(data.data)
    }

    const initCategories = async() => {
        const data = await axios.get(`${API}/categories`).catch(err => console.log(err))
        if(data)setCategories(data.data)
        console.log(categories)

    }
    const initBlogTotals = async() => {
        const data = await totalBlogsCounted()
        if (data) {setBlogsTotal(data.data.blogNumber)
        console.log(blogsTotal)}
    }

    const handleToggleTags = (tId) =>()=> {
        
        const clickedTag = checkedTags.indexOf(tId)
        const allTags = [...checkedTags];
        if(clickedTag == -1) {allTags.push(tId) }

        else {allTags.splice(clickedTag, 1) }
        setCheckedTags(allTags)

        console.log(checkedTags)
      
    }

    const showCategories = () => {
       
        return (categories && categories.map((cat, i)=>
        (
            <li key={i} >
            <input onChange={handleToggleCategories(cat._id)}  type="checkbox"/>
            <label >{cat.name}</label>
            </li>
        ))
        )
    
    }
    const handleToggleCategories = (cId) =>()=> {
        const clickedCategoryIndex = checkedCategories.indexOf(cId)
        const allCategories = [...checkedCategories]
        if (clickedCategoryIndex == -1) allCategories.push(cId)
        else {allCategories.splice(clickedCategoryIndex, 1)}
        setCheckedCategories(allCategories)
        console.log(checkedCategories)
}

    const showTags = () => {
        return (tags && tags.map((tag, i) => 
          ( <li key={i}>
                <input onChange={handleToggleTags(tag._id)} type="checkbox"/>
                <label >{tag.name}</label>
            </li>
        )))
    }
const [didMount, setDidMount]=useState(false)
    useEffect(() => {
    //    setBlogsTotal(localStorage.getItem('blogsTotal'))
        setBlogsTotal(localStorage.getItem('blogsTotal'))
        initBlogTotals()
        initTags()
        initCategories()
        setValues({...values, formData: new FormData()})
    }, [router, success])

    const handleBody = (body) => {
        
            formData.set('body', body)
            setBody(body)
        }
    const onClickHandler = () => {
    }
    
    const handleChange = (name) =>(e)=> {
        if (name === "title") {
            
            setValues({...values, title: e.target.value})
            formData.set('title', e.target.value)
            
        
        }
        
        else {
        
            formData.set('photo', e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
        
}
     
    }
     
    const createBlog = async (blog) => {
        const token = getCookie('token')
        const config = {
            headers: {
                
                 Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
            
};
        

        const blogsTotalDBFn = () => totalBlogsCounted().then(data => {
            
           
            setBlogsTotal(data.data.blogNumber)
        }).catch(err => console.log(err))

        blogsTotalDBFn()
 
        try {
            let blogResponse = await axios.post(`${API}/user/blog`, blog, config)
            console.log(blogResponse)

            setValues({ ...values, formData:'', photo:'', title: '', error: '', success: `A new blog titled "${blogResponse.data.title}" has been created!` })
            
            setImage('')
            setBody('')
            setCheckedCategories([])
            setCategories([])
            setTags([])
            setCheckedTags([])
    
            dispatch(successCreateBlog(blogResponse.data))
            
        } catch (err) {
            console.log(err)
            if (err.response.data.error.driver) {
                setValues({ ...values, error: 'Please choose an unique title' })
            }else if(err.response.data.error)
            {setValues({ ...values, error: err.response.data.error })}
            
        }
        

    
        
        
        // dispatch(getblogsTotal(blogsTotal))
        // localStorage.setItem('blogsTotal', blogsTotal+1)

        dispatch(incrementBlogsTotal())
        
    
    }
    // const blogsTotalFn = async () => {
    //     const data = await totalBlogsCounted().catch(err => console.log(err))
    //     console.log('135', data.data.blogNumber)
    //     setBlogsTotal(data.data.blogNumber)
    //     // localStorage.setItem('blogsTotal', blogsTotal)
       
    // }

    const onSubmitHandler = (e) => {
        e.preventDefault()
      formData.set('categories', checkedCategories)
        formData.set('tags', checkedTags)
   
        createBlog(formData)
        // blogsTotalFn()
    }

        const createBlogForm = () => {
           return <form onSubmit={onSubmitHandler}  className="form">
            <div className="title">
                <label className="form__title_label" name="title"><h2>Title:</h2> </label>
                <input className="form__title_input" value={title} name="title" onChange={handleChange("title")} placeholder="Type a cool title..." />
               </div>
            <div className="form__editor">
                   <ReactQuill  modules={QuillModules}  style={{ 'height': '250px', margin: '0', padding:'0'}} value={body} onChange={handleBody}  formats={QuillFormats}  placeholder="Write somthing amazing..."/>
           </div>
           <div className="form__button ">
           <button className="Button m-medium" clicked={onClickHandler}>Create blog post</button>
            </div>
               </form>
    }
   
       
    const createBlogFormContainerWithImageUpload = () => {

        return <>
           
        <div className="createBlogFormContainerWithImageUpload">
            <div className="tagsAndCatsAndImageUploadContainer">
                    <div className="tagsAndCatsContainer">

               <div><label className="label">Choose Categories:</label>
                <div className="unorederedList">
                    <ul>
                    {showCategories()}
                    </ul>
                   </div>
                    </div>
                    <div><label className="label">Choose Tags:</label>
                <div className="unorederedList">
                 <ul>
                        {showTags()}
                </ul>
             </div>
                    </div>
            </div>
            
            <div className="imageUploader">
                <div className="h2-container m-medium"><h2>Your featured Blog-Thumbnail</h2></div>
                <label className="Button Button--white">
                    Upload your image
                <input name="image" onChange={handleChange('image')} type="file" accept="image/png, image/jpeg" hidden />
                </label>
                {image &&
                    <div className="imagePreview m-medium">
                        <img src={image} />
                    </div>}  
                    </div>
                    </div>
                    <div style={{ display: error ? 'flex' : 'none' }} className="error">{error}</div>
            <div style={{ display: success ? 'flex' : 'none' }} className="success">{success}</div>
            {createBlogForm()}
             
    
            
        
            </div>
            </>
               
            
            
         
       }
            
    return <>
        
        
        {createBlogFormContainerWithImageUpload()}
   
     </>
}




export default withRouter(CreateBlog)