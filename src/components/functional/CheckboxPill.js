import React, { useState } from  'react'
const should_render = (prevProps, nextProps) => {
    return true
}
const CheckboxPill = (props) => {
    console.log("Render of CheckboxPill")
    const [global_variance_flag, set_global_variance_flag] = useState(true)
    const [speciality_variance_flag, set_speciality_variance_flag] = useState(false)

    const global_click = ()=>{
        set_global_variance_flag(true)
        set_speciality_variance_flag(false)
        props.global_click()
    }

    const speciality_click = ()=>{
        set_global_variance_flag(false)
        set_speciality_variance_flag(true)
        props.speciality_click()
    }
    return (
        <React.Fragment>
        <label>
			<input type="radio" name="radio" onClick={()=>global_click()} checked={global_variance_flag}/>
            <span style={{fontSize:'.9rem'}}>{props.name_1}</span>
		</label>

        <label>
			 <input type="radio" name="radio" onClick={()=>speciality_click()} checked={speciality_variance_flag} />
		     <span style={{fontSize:'.9rem'}} >{props.name_2}</span>
		</label>
        </React.Fragment>
    )
}

export default React.memo(CheckboxPill, should_render)