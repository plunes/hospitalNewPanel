import React from 'react';
import { useToasts } from 'react-toast-notifications'
import Select from "../Select"

export default function VarianceDropdown(props) {
  return (
    <div>
        <Select
          value={props.value}
          handleChange={props.handleChange}
          placeholder = "jkjk"
          name ="variance"
          input_text_class = "catalogue_dropdown padding_none"
          wrapper_class = "catalogue_dropdown_wrapper"
          value_className = "padding_none"
          arrow_class ="variance_arrow"
          disabled= {props.disabled}
          placeholder={0}
          options = {[
        {
              value:0,
              name:'0'
        },    
        {
            value:5,
            name:'5'
        },
        {
          value:10,
          name:'10'
        },
        {
          value:20,
          name:'20'
        },
        {
          value:35,
          name:'35'
        },
        {
          value:'45',
          name:'45'
        },
    ]}
          
        />
         </div>
  );
}
