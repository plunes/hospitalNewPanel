import React, { useState, useEffect } from "react"
import {  useToasts } from 'react-toast-notifications'
let flag = true
const NewNotif = (props) => {
    const { addToast } = useToasts()
    const [initialRender, setIniitialRender] = useState(true)


    useEffect(()=>{
      if(!!props.ret){
        if(!!props.ret.success){
          if(!!flag){
            addToast(props.ret.message, {appearance: 'success', autoDismiss:true}) 
            flag=false
            // setIniitialRender(false)
          }
        }else{
          if(!!flag){
            addToast(props.ret.message, {appearance: 'error', autoDismiss:true})
            flag=false
            // setIniitialRender(false)
          } 
        }
        props.retClr()
        flag=true
        // setIniitialRender(true)
    }
  },[props.ret])

    return (
        <div></div>
          )
}

 export default NewNotif