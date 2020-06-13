import React, { useState, useEffect } from 'react'
import {  useToasts } from 'react-toast-notifications'
import { Link } from "react-router-dom"

const CenterComponent = (props) =>{
 const item = props.data
 const { addToast } = useToasts()
 const [ show_cred, set_show_cred] = useState(false)
 const [ selected, set_selected] = useState(false)
 const [ cred, set_cred] = useState(false)

 const  get_center_cred = data => {
     set_selected(data._id)
     let val = [...props.centers_cred].filter(data=> data._id === item._id )
     console.log(val,"val")
     if(val.length!==0){
         set_show_cred(true)
         set_cred({...val})
     }else{
        props.get_center_cred({...item})
     }
 }

 useEffect(()=>{
     if(selected===item._id){
        if(props.get_center_cred_ret){
            if(props.get_center_cred_ret.success){
                addToast("Message from true case", {appearance: 'success', autoDismiss:true}) 
                set_cred({...props.get_center_cred_ret})
                set_show_cred(true)
                props.set_centers_cred({...props.get_center_cred_ret.centerCredInfo, _id:item._id})            
            }else{
                addToast("Message from false case", {appearance: 'success', autoDismiss:true})
            }
            props.get_center_cred_clr()
        }
     }
 },[props.get_center_cred_ret])
    return  <div className="centers-wrap">
    <Link to={`/dashboard/profile?center=${item._id}`}>
        <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
     </Link>
        <div className="text-center">
       <div className="center_location_rish text-center">{item.centerLocation}</div>
        {/* <span className="sub_heading_rish">{item.mobileNumber} <br></br>{item.password}</span> */}
        {show_cred?<p>Cred will Show here</p>:''}
        <div className="text-center">
            <button className ="common_button_rish" onClick={()=>get_center_cred({...item})}>Get Creds</button>
        </div>
        </div>
</div>
}

export default CenterComponent
