import React, { useState } from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'

const NotifFunc = (props) => {
    const { addToast } = useToasts()
    const [initialRender, setIniitialRender] = useState(true)

    if(!!props.ret){
        if(!!props.ret.success){
          if(!!initialRender){
            addToast(props.ret.message, {appearance: 'success', autoDismiss:true}) 
            setIniitialRender(false)
          }
        }else{
          if(!!initialRender){
            addToast(props.ret.message, {appearance: 'error', autoDismiss:true})
            setIniitialRender(false)
          } 
        }
        props.retClr()
    }

    return (
        <div></div>
          )
}

 export default NotifFunc