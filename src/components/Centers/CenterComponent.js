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
     if(val.length!==0){
         set_show_cred(true)
         set_cred({...val[0]})
     }else{
        props.get_center_cred({...item})
     }
 }
 
 useEffect(()=>{
     if(selected===item._id){
        if(props.get_center_cred_ret){
            if(props.get_center_cred_ret.success){
                // addToast("Message from true case", {appearance: 'success', autoDismiss:true}) 
                set_cred({...props.get_center_cred_ret.centerCredInfo})
                set_show_cred(true)
                props.set_centers_cred({...props.get_center_cred_ret.centerCredInfo, _id:item._id})            
            }else{
                addToast("Try again later", {appearance: 'errpr', autoDismiss:true})
            }
            props.get_center_cred_clr()
            set_selected(false)
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
        {show_cred?<div className="text-center">
              <div>
              <div>
                    <span  style={{display:'inline'}}>
                        <img   style={{display:'inline'}} src="/user_id_icon.svg" className="icon_rish" />
                    </span>
                    <span>
                        <p   style={{display:'inline',fontSize:'1rem'}}>{cred.centerId}</p>
                    </span>
                </div>
              </div>
                <div > 
                    <span  style={{display:'inline'}}>
                    <img style={{display:'inline'}} src="/password_icon.svg" className="icon_rish" />
                    </span>
                    <span>
                        <p  style={{display:'inline',fontSize:'1rem'}}>{cred.centerPassword}</p>
                    </span>
                </div>

        </div> :''}
        <div className="text-center">
            {!show_cred && <p style={{textDecoration:'underline'}} className="green_text_rish cursor-pointer" onClick={()=>get_center_cred({...item})}> Get Credentials</p> }
           
        </div>
        </div>
</div>
}

export default CenterComponent
