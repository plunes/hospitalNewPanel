import React, { useState, useRef, useEffect } from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'
let flag = true
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
        <div style={{height:'10px',width:'10px',position:'absolute',top:'-10px'}} ref={myRef}></div>
          )
}

 export default NotifFunc