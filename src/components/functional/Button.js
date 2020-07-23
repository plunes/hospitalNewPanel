import React from 'react'

const Button = (props) => {
    console.log(props,"props in Button")
    return (
        <React.Fragment>
            <span  style={{...props.style}} onClick = {(e)=>props.onClick(e)} className={`link_text_rish button_text_rish ${props.className}`}>{props.children}</span>
        </React.Fragment>
    )
}

export default Button