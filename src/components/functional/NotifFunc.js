import React from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'

const NotifFunc = (props) => {
    const { addToast } = useToasts()

    if(!!props.ret){
        if(!!props.ret.success){
          addToast(props.ret.message, {appearance: 'success', autoDismiss:true}) 
        }else{
          addToast(props.ret.message, {appearance: 'error', autoDismiss:true})
        }
        props.retClr()
    }

    return (
        <div></div>
          )
}

 export default NotifFunc