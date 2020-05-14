import React, { useState, useRef, useEffect } from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'

const Notify = (props) => {
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

    if(!!props.error){
        addToast(props.error.message, {appearance: 'error', autoDismiss:true}) 
        props.clear()
    }
    if(!!props.success){
        addToast(props.success.message, {appearance: 'success', autoDismiss:true}) 
        props.clear()
    }

    return (
        <div style={{height:'10px',width:'10px',position:'absolute',top:'-10px'}} ref={myRef}></div>
          )
}

 export default Notify
 