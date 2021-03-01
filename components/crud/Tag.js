

import Button from '../Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../../config'
import{useState, useEffect} from 'react'
import { startCreateTag, successCreateTag, failureCreateTag} from '../../redux/tag/tag.actions';


const Tag = () => {
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        isFetching: false,
        reload:false,


    })
    let { name, error, success, tags, isFetching, reload } = values;

    console.log(name)

    const getTags = async () => {
        setValues({ ...values, isFetching: true })
        const data = await axios.get(`${API}/tags`).catch(err => console.log(err))

        setValues({ ...values, tags: data.data,reload:true, isFetching: false })
   
        
        




    }
    useEffect(() => {
        getTags()
dispatch(successCreateTag(tags))
    }, [reload])

    const createTag = (tag) => dispatch => {

        dispatch(startCreateTag)
        axios.post(`${API}/tag`, tag).then((data) => {
            let createdTag = data.data
            tags.push(createdTag)
            setValues({ ...values, tags: tags, isFetching: false })
            
         
            
        }).catch(err => console.log(err))







    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('ich funze')

        dispatch(createTag({ name: name }))

    }

    const onChangeHandler = (e) => {
        setValues({ ...values, name: e.target.value })
    }

    const deleteConfirm = () => {
        /////  
    }

    const showCategories = () => {
        return tags.map((tag, i) => {
            return<button className="btn" onDoubleClick={()=>{deleteConfirm()}} title="Double click to delete" key={i}>{tag.name}</button>
        })
       
    }


    const newCategoryForm = () => {
        return <div className="container">
         
                <form className="container" onSubmit={submitHandler}>
                    <input className="input m-medium" value={name} onChange={onChangeHandler} placeholder="Type an amazing tag" />
                    <button className="Button"type="submit">Create Tag</button>
                </form>
           
            
        </div>
        
    }
    return <>
        <div >
            <div >
                <div >
                    {showCategories()}
                    
           </div>
            
           
            </div>
            
            {newCategoryForm()}
            </div>
            
           
    </>
}


export default Tag