
import { useState, useEffect } from 'react'
import FormInputContainerComponent from '../form/FormInputContainerComponent/FormInputContainerComponent'
import InputComponent from '../form/Input/InputComponent'
import Button from '../Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../../config'
import { startCreateCategory, successCreateCategory, failCreateCategory } from '../../redux/category/category.actions'
import { startLogin } from './../../redux/user/user.actions';


const Category = () => {
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        isFetching: false,
        reload: false


    })
    let { name, error, success, categories, isFetching, reload } = values;

    console.log(name)

   const getCategories = async () => {
        setValues({ ...values, isFetching: true })
        const data = await axios.get(`${API}/categories`).catch(err => console.log(err))

        setValues({ ...values, reload: true,  categories: data.data, isFetching: false })
        
        
   
        
        




    }
    useEffect(() => {
        getCategories()
        dispatch(successCreateCategory(categories))
    }, [reload])

    const createCategory = (category) => dispatch => {

        dispatch(startCreateCategory)
        axios.post(`${API}/category`, category).then((data) => {
            let createdCategory = data.data
            categories.push(createdCategory)
            setValues({ ...values, categories: categories, isFetching: false })
            dispatch(successCreateCategory(categories))
         
            
        }).catch(err => console.log(err))







    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('ich funze')

        dispatch(createCategory({ name: name }))

    }

    const onChangeHandler = (e) => {
        setValues({ ...values, name: e.target.value })
    }

    const deleteConfirm = () => {
        /////  
    }

    const showCategories = () => {
        return categories.map((cat, i) => {
            return<button  className="btn"  onDoubleClick={()=>{deleteConfirm()}} title="Double click to delete" key={i}>{cat.name}</button>
        })
       
    }


    const newCategoryForm = () => {
        return <div className="container" >
          
                <form className="column" onSubmit={submitHandler}>
                    <input className="input m-medium" value={name} onChange={onChangeHandler} placeholder="Type an amazing category" />
                    <button className="center Button" type="submit">Create Category</button>
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


export default Category