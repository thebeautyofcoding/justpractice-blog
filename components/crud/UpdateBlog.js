import { getCategories } from "../../actions/category"
import {  getTags } from "../../actions/tag"
import Link from 'next/link'
import{withRouter} from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import Router from 'next/router'
import {updateBlog} from '../../actions/blog'
import { singleBlog } from './../../actions/blog';
import { QuillModules, QuillFormats } from '../../helpers/quill'
import dynamic from 'next/dynamic'

import {photo} from '../../actions/user'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import { API } from "../../config"
import { getCookie, isAuth } from './../../actions/auth';

const UpdateBlog = ({router}) => {
    
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [checkedCategories, setCheckedCategories] = useState([])
    const [checkedTags, setCheckedTags] = useState([])
    const [image, setImage] = useState('')
       const [slug, setSlug] = useState('')

    const [body, setBody] = useState('')
    const [oldImage, setOldImage]=useState('')
    const token = getCookie('token')
    
    const [manuallyUpdated, setManuallyUpdated]= useState(false)
    const [nothingWasUpdated, setNothingWasUpdated]= useState(true)

    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: process.browser && new FormData(),
        title: '',
        photo: '',
        hidePublishButton: false
    })

    const [submitted, setSubmitted]=useState(false)
    const [wasUpdated, setWasUpdated] = useState({
        wasUpdated: {
            titleUpdated: false,
            bodyUpdated: false,
            categoriesCheckedUpdated: false,
            tagCheckedUpdated: false,
            imageUpdated: false,
            
            
        }
    })
    

   const [initBlogBody, setInitBlogBody]= useState('')

    const{titleUpdated, imageUpdated, bodyUpdated, categoriesCheckedUpdated, tagCheckedUpdated}= wasUpdated
const { error, sizeError, success, formData, title, hidePublishButton,photo } = values
    useEffect(() => {
       if(process.browser) setValues({ ...values, formData: new FormData() })
        
        const init =  async() => {
            await initBlog()
            await initCategories()
            await initTags()
        }
        init()
    }, [router ])


    const isCheckedCategory = (cat) => {
        const result = checkedCategories.indexOf(cat)
        
        if (result !== -1) {
            return true
        }else{ return false}
        
    }

    
    const isCheckedTag = (tag) => {
        const result = checkedTags.indexOf(tag)
        
        if (result !== -1) {
            return true
        }else{ return false}
        
    }
    const showCategories = (categories) => {

       
        return (categories && categories.map((cat, i) => {
            return <li key={i}>
                <input onChange={handleCategoriesToggle(cat._id)} type="checkbox" checked={isCheckedCategory(cat._id)}/>
                <label>{cat.name}</label>
            </li>
        }))
    }


    const showTags = (tags) => {
                return (tags && tags.map((tag, i) => {
            return <li key={i}>
                <input onChange={handleTagsToggle(tag._id)} type="checkbox" checked={isCheckedTag(tag._id)}/>
                <label>{tag.name}</label>
            </li>
        }))
    }

    const handleCategoriesToggle = (catId) =>()=> {
        setValues({ ...values, error: '' })

        const clickedCat = checkedCategories.indexOf(catId)
        const allClickedCats =[...checkedCategories]
        if (clickedCat === -1) {
            allClickedCats.push(catId)
        } else {
            allClickedCats.splice(clickedCat, 1)
        }
        setCheckedCategories(allClickedCats)
        setWasUpdated({...wasUpdated, categoriesCheckedUpdated:true})
         setValues({...values, error:'', success:''})
        formData.set('categories', allClickedCats)
    }

        const handleTagsToggle = (tagId) =>()=> {
        setValues({ ...values, error: '' })

        const clickedTag = checkedTags.indexOf(tagId)
        const allClickedTags =[...checkedTags]
        if (clickedTag === -1) {
            allClickedTags.push(tagId)
        } else {
            allClickedTags.splice(clickedTag, 1)
        }
            setCheckedTags(allClickedTags)
            setWasUpdated({ ...wasUpdated, tagCheckedUpdated: true })
             setValues({...values, error:'', success:''})
        formData.set('tags', allClickedTags)
    }

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setTags(data.data)
            }
        })
    }


    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                console.log(data)
                setCategories(data.data)
            }
        })
    }


    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                console.log(data.error)
                } else {
                    console.log(data.data.categories)
                    setValues({ ...values, title: data.data.title})
                    setBody(data.data.body)
                    setInitBlogBody(data.data.body)
                    setCategoriesArray(data.data.categories)
                    setTagsArray(data.data.tags)
             
                    setSlug(data.data.slug)
                    
                    
              

                    formData.set('title', data.data.title)
                    let formCatsArr=[]
                    data.data.categories.map((cat, i) => {
                        formCatsArr.push(cat._id)
                    })
                    formData.set('categories', formCatsArr)
                    

                        let formTagsArr=[]
                    
                        data.data.tags.map((tag, i)=>{
                         formTagsArr.push(tag._id)
                        })
                    formData.set('tags', formTagsArr)
               
                   
                   
    
                   
                    
                    
                }
            })
        }
    }

    const setTagsArray = (blogTags) => {
        let tagsArray = [];
        blogTags.map(tag => {
        
            tagsArray.push(tag._id)
        })
        setCheckedTags(tagsArray)
    }

    const setCategoriesArray = (blogCategories) => {
        let categoriesArray=[];
      
        blogCategories.map(category => {
            console.log(category._id)
            categoriesArray.push(category._id)
        })
       
        setCheckedCategories(categoriesArray)
    }
    const editBlog = async (e) => {
        e.preventDefault()
          const token = getCookie('token')
        

        try {
            const data = await updateBlog(formData, token, router.query.slug)
            
            console.log(data)
            setValues({ ...values, success: `Blog "${data.data.title}"  has been successfully updated:` })
                setSubmitted(true)
                // if (isAuth() && isAuth().role === 1) {
                //     Router.replace('/admin')
                // } else if (isAuth() && isAuth().role === 0) {
                //     Router.replace('/user')
                // }
            
            
        } catch (err) {
            console.log(err.response)
            setValues({ ...values, error: err.response.data.error })
        }
        
      
            
                
          
          
        
            
      
  
            
        

    }

    const handleChange = (name) =>(e)=> {
        if (name === "title") {
             setWasUpdated({...wasUpdated, titleUpdated:true})
            setValues({ ...values, error: '' })
        
             setValues({ ...values, success: false, title: e.target.value })
             
            formData.set('title', e.target.value)
            
        
        }
        
         else {
             setValues({ ...values, error: '' })
          setWasUpdated({...wasUpdated, imageUpdated:true})
             console.log(e.target.files[0])
             formData.set('photo', e.target.files[0])
             setValues({ ...values, photo: e.target.files[0] })
           
            setImage(URL.createObjectURL(e.target.files[0]))
        
}
    }
    const handleBody = (e) => {
   
      
            setBody(e)
     
        formData.set('body', e)
        if(body !== initBlogBody) {
            setWasUpdated({ ...wasUpdated, bodyUpdated: true })
            setBody(e)
     
        formData.set('body', e)
        }
        
        
    }


    console.log(image, oldImage)
    const updateBlogForm = () => {
        return (
     
            <form onSubmit={editBlog} className="form">
                <div className="title">
                    <label className="form__title_label" name="title"><h2>Title:</h2> </label>
                    <input className="form__title_input" type="text" value={title} name="title" onChange={handleChange("title")} placeholder="Type a cool title..." />
                </div>
                <div className="form__editor center">
                    <ReactQuill modules={QuillModules} value={body} style={{ 'height': '300px', wordWrap: 'break-word', wordBreak:'break-all', width:'90vw'   }} value={body} onChange={handleBody} formats={QuillFormats} placeholder="Write somthing amazing..." />
                </div>
                <div className="form__button">
                    <button className="Button m-medium" type="submit">Update</button>
                </div>
            
                    
            </form>


        )
    }

    const errorMessage = () => {
     return error && <div style={{ display: error ? 'flex' : 'none' }} className="error">{error}</div>
        }
        
       const  successMessage = ()=>{
          return  success && <div style={{ display: success ? 'flex' : 'none' }} className="success">{success}</div>
        }
        
    return<div>
    
    
    <div className="createBlogFormContainerWithImageUpload">
      
        {updateBlogForm()}
           <div className="center">{errorMessage()}</div>
          <div className="center">{successMessage()}</div>


        


     
 <div className="tagsAndCatsAndImageUploadContainer ">
            <div className="tagsAndCatsContainer">
                <div className="ul-one">
            <div className="flex-col">
               <label className="label">Choose Categories:</label>
                 <div className="unorederedList">
            <ul>{showCategories(categories)}</ul>
            </div>
                    </div>
                </div>
                <div className="ul-two">
                <div className="flex-col">
                    <label className="label">Choose Tags:</label>
                    <div className="unorederedList">
                    <ul>{showTags(tags)}</ul>
                    </div>
                    </div>
                  </div>
        </div>
            
           
        <div className="imageUploader">
           
             <div className="h2-container"><h2>Your featured Blog-Thumbnail</h2></div>
                <label className="Button m-medium">
                    Update your image
                <input onChange={handleChange('image')} type="file" accept="image/*" hidden />
                </label>
            <div className="imagePreview">
                {!image ? <img src={`${API}/blog/photo/${slug}`} /> : <img src={image} />}</div>
                </div>
</div>
     
</div>
 </div>  
  
}
export default withRouter(UpdateBlog)