import React from 'react'
import "./index.css"

const SelectComponent = (props) => {


    return (
        <div className="select_ris">
        <select className="select-text_ris" >
            <option value="" disabled selected></option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
        <span className="select-highlight_ris"></span>
        <span className="select-bar_ris"></span>
        <label className="select-label_ris">Select</label>
    </div>
    )
}

export default SelectComponent