import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react';
import moment from 'moment'
import {listSearch, listSearchSuggs} from '../../actions/blog'
import { renderHTML } from 'react-render-html';
import parse from 'html-react-parser';

import { stripHtml } from "string-strip-html";
import { API } from '../../config';
const Search = () => {
    const [values, setValues] = useState({
        search: '',
        results: [],
        searched: false,
        messsage:''
    })
  
    const { search, results, searched, message } = values

    

    const [searchSuggestions, setSearchSuggestions] = useState([])
           const closeSearchSuggestions = useCallback(() => {
        setSearchSuggestions([])
    }, [searchSuggestions])
useEffect(() => {
          window.addEventListener('click', closeSearchSuggestions )
       
           
     
       return ()=>  window.removeEventListener('click', closeSearchSuggestions )
}, [closeSearchSuggestions])
    
    const closeSearchResults = (e) => {
        const searchResults = document.getElementsByClassName('search')[0];
        searchResults.remove();
    }



    const searchedBlogs = (results = []) => {
        return (
            
            <div>
            <div className="search">
           
            { message && <div><div className="search-title">{message}<div onClick={closeSearchResults} className="search-results-x">x</div></div ></div>}
                 <ol className="search-results">
                { results.map((blog, i) => {
                    return (
                        <li onClick={closeSearchResults}  key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                            <a>{blog.title}</a></Link>
                        </li>)
                })}
            </ol> </div></div>)
    }



    const searchSubmit = (e) => {
        e.preventDefault()


        listSearch({ search }).then(data => {
     
            setValues({ ...values, results: data,search:'', searched: true, message: `${data.length} ${data.length ===1 ? 'blog found': 'blogs found'}` })
  
        })
    }

    const handleChange = (e) => {

        setValues({...values, search:e.target.value, searched:false})
        
        

            
  
    }

  
    const showSearchSuggestions = () => {
        return (<div className="searchSuggestions">{searchSuggestions.map((sugg, i) => {
           
            return <Link  href={`/blogs/${sugg.slug}`}  onClick={closeSearchSuggestions} key={i}><a className="searchSuggestion" ><div className=" searchSuggestion--title">{sugg.title}</div ><div className=" searchSuggestion--body">{sugg.body.substring(0,100)}</div> </a></Link>
        })}</div>)
    }
                

    const showSearchSuggOnKeyUp = (e) => {
        
       
        //   setTimeout(() => {setSearchSuggestions([])}, 3000)
       
        if (e.target.value.length !== 0) {
            
           
                listSearchSuggs({ search: e.target.value }).then(data => {
                 
                    console.log(data)
                    const searchSuggestionsSet = new Set();    
           
                    data.map(sugg => searchSuggestionsSet.add(sugg))
                
              const   searchSuggestionsArr =   [...searchSuggestionsSet]
             setSearchSuggestions(searchSuggestionsArr) 
           
             
            
           console.log(search)
            
        })
        }  if (e.target.value.length.length===0) {
            setSearchSuggestions([])
        } 



        
          
    }
    const searchClear = (e) => {
  
     console.log(e.target.value)
      if (!e.target.value ) setSearchSuggestions([])
        
}

    const searchForm = () => {
        return (
            
            <form className=" container__row mt-small" onSubmit={searchSubmit}>
                <div className="form-component container__column">
                    <input className="input"onInput={searchClear}onChange={handleChange} onKeyUp={showSearchSuggOnKeyUp} type="search" value={search}  placeholder="Search for blog posts by title or blog body..." />
               
                    {!searched && searchSuggestions && showSearchSuggestions()}
                                 <div className="form-component">
              <button className="Button mt-small"type="submit">Search</button>
                    </div>
                          
                </div>
                
                
        



            </form>
       )

  
    }
    

          return (<>
        
              <div >
                 
                      {searchForm()}
                  
             
             {searched && searchedBlogs(results)}
                   </div>
            </>
        )
}

export default Search