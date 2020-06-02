import React, { useState } from "react"
import {  useToasts } from 'react-toast-notifications'
let flag = true
const NewNotif = (props) => {
    const { addToast } = useToasts()
    const [initialRender, setIniitialRender] = useState(true)

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

    return (
        <div></div>
          )
}

 export default NewNotif