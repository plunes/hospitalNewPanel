import React from 'react'

const Button = (props) => {
    if(props.type==='button'){
        return ( <button  style={{...props.style}} onClick = {(e)=>props.onClick(e)} className={`btn_rish btn_rish-2 btn_rish-sep icon-cart ${props.className}`}>{props.children}</button>)
    }
    return (
        <React.Fragment>
            <span  style={{...props.style}} onClick = {(e)=>props.onClick(e)} className={`link_text_rish button_text_rish ${props.className}`}>{props.children}</span>
        </React.Fragment>
    )
}

export default Button