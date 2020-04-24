import React, { useRef, userEffect } from 'react'
import {throttle} from 'throttle-debounce';

const SearchComponent = (props) =>{
    const searchRef  = useRef()
    
    console.log(searchRef.value,"searchRef  in functional component")

    const  searchCall = () =>{
        if(!!searchRef.current){
            if(searchRef.current.value.length!==0){
                console.log("Search Logic") 
              }else{
                  console.log("Else condition in SearchCall")
              }
              }
        } 
    const throttleSearch =  throttle(1000, searchCall);
    const  clearSearch = (e)=>{
     
      }
    const  onChange =(e) =>{
        // e.persist()
        throttleSearch() 
      }
    return (
          <React.Fragment>
              <input
               type="text" 
               ref= {searchRef} 
               onChange={onChange} 
               placeholder="Name the procedure or test here." 
               name="search" 
               className='catalogueSearchbar no-border'
               
               />
          </React.Fragment>
      )
}

export default SearchComponent