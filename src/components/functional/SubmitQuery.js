import React, { useState, useEffect } from "react"
import {  useToasts } from 'react-toast-notifications'
import LoaderComponent from "./LoaderComponent"
import Button from "./Button"


 const SubmitQuery= (props) => {
   const [ query, setQuery ] = useState('')
   const { loading } = props
   const { addToast } = useToasts()


   useEffect(()=>{
    if(!!props.submit_query_ret){
      if(!!props.submit_query_ret.success){
        addToast(props.submit_query_ret.message, {appearance: 'success', autoDismiss:true}) 
        setQuery('')
        props.submit_query_clr()
      }else{
        addToast(props.submit_query_ret.message, {appearance: 'error', autoDismiss:true})
        props.submit_query_clr()
      }
    
  }
   },[props.submit_query_ret])


   const submit_query = () => {
        if(query === ''){
            addToast("Enter your query",{ appearance: 'error', autoDismiss:true })
        }else{
            props.submit_query({query})
        }
    }


  return (    
      <React.Fragment>
<h4 style={{position:'relative'}} className="section_heading_rish">Help</h4>
<div className="form-group">
    {loading && <LoaderComponent />}
    <label></label>
    <textarea
     type="text"
     rows={6}
     className="form-control query_en editbankdetailfield"
     placeholder="Enter your Query"
     value={query}
     onChange = {(e)=>setQuery(e.target.value)}
     />
    <div className="sub_que">
     <Button onClick={()=>submit_query()} style={{cursor:'pointer'}} >Submit</Button>
    </div>
</div>
<div className="cal_nu">
<h6  className="or_frm">OR</h6>
<h5  className="or_frm">Call at : 7701805081</h5>
</div>
</React.Fragment>
  )
}
 

export default SubmitQuery