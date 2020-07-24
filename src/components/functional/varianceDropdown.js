import React from 'react';
import { useToasts } from 'react-toast-notifications'
import Select from "../Select"
import  { is_positive_whole_number } from "../../utils/common_utilities"

export default function VarianceDropdown(props) {
  console.log(props,"props in VarianceDropdown")
  return (
    <div>
      <input
         value={props.value}
         onChange={
             e =>{if(((is_positive_whole_number(e.target.value)) || (e.target.value==='0'))){
                       if(e.target.value<=100){
                        props.handleChange(e)
                       }         
                      // props.handleSelectedProcedureChange(e,props.data.serviceId)
                   }else{
                      e.preventDefault()
                    }
                    } 
                }
                name="editPrice"
                style={{marginLeft:'0.3rem'}}
                className="no_brdr_input consultaion_input"
                type="number"
      />
        {/* <Select
          value={props.value}
          handleChange={props.handleChange}
          placeholder = "jkjk"
          name ="variance"
          input_text_class = "catalogue_dropdown padding_none"
          wrapper_class = "catalogue_dropdown_wrapper"
          value_className = "padding_none"
          arrow_class ="variance_arrow"
          disabled= {props.disabled}
          placeholder={"Select"}
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
          value:45,
          name:'45'
        },
    ]}
          
        /> */}
         </div>
  );
}
