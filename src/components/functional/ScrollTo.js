import React, { useState, useRef, useEffect } from "react"

const ScrollTo = (props) => {
    const scroll_to_ref = useRef(null)
    const executeScroll = () => scrollToRef(scroll_to_ref)
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
    useEffect(() => {
      executeScroll(scroll_to_ref)
      console.log("execute_scroll_called")
      props.remove_me()
  }, [])
    return (
        <div style={{height:'1px', width:'1px'}} className="scroll_class" ref={scroll_to_ref}></div>
          )
}

 export default ScrollTo
 