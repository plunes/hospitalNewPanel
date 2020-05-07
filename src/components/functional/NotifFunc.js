import React, { useState, useRef, useEffect } from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'

const NotifFunc = (props) => {
    const { addToast } = useToasts()
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
    useEffect(() => {
      console.log(myRef,"myref")
      executeScroll(myRef)
      console.log('mount it!');
  }, [])
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
        <div style={{height:'10px',width:'10px',position:'absolute',top:'-10px'}} ref={myRef}></div>
          )
}

 export default NotifFunc