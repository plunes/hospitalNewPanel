import React from 'react'

const Tag = (props) => {
    return (
        <span onClick={()=>props.onClick()} className={!!props.active?'tag_wrapper_rish active_tag':'tag_wrapper_rish '}>
                <text>{props.name}</text>
        </span>
    )
}

export default Tag