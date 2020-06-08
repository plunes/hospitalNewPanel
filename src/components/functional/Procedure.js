import React, { useState } from "react"
import { useToasts } from 'react-toast-notifications'
import "./editProcedure.css"
import VarianceDropdown from "./varianceDropdown"

 const Procedure= (props) => {
  const { addToast } = useToasts()
  const {data} = props
  const [ select , setSelect ] = useState(false)
  if(!!props.ret){
    if(props.data.serviceId === props.selected_procedures[0].serviceId){
      if(!!props.ret.success){
        addToast(props.ret.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.ret.message, {appearance: 'error', autoDismiss:true})
      }
      props.loadingOff()
      props.clr()
    }
}

const isSelected = () =>{
  let flag = false
  props.selected_procedures.every(function(element, index) {
    if(element.serviceId===props.data.serviceId){
      flag = true
      return false
    }
     return true
  })
  return flag;
}

const getValue = () =>{
  let value= ""
  props.selected_procedures.every(function(element, index) {
    if(element.serviceId===props.data.serviceId){
      value = !!element.price?element.price[0]:0
      return false
    }
     return true
  })
  return value;
}

const getVariance = () =>{
  let value= ""
  props.selected_procedures.every(function(element, index) {
    if(element.serviceId===props.data.serviceId){
      value = element.variance
      return false
    }
     return true
  })
  return value;
}
  return (
<React.Fragment>
<div>
    <div className="row listOfService">
    <div className="col-lg-6">
<label className="cont_ter">{data.service}
{
  props.editFlag?<React.Fragment>
    <input type="checkbox" checked={isSelected()} onClick = {()=>props.onEdit(props)} />
  <span className="check2"></span></React.Fragment>:''
}
  
</label>
      </div>
      <div className="col-lg-3 col-md-3 text-center">
        <div className="procedure_price_wrap">
           &#x20B9;
             {((!!props.editFlag) && (isSelected()))?<input
              value={isSelected()?getValue():props.selectedProcedure.price}
              onChange={(e)=>props.handleSelectedProcedureChange(e,props.data.serviceId)}
             name="editPrice"
             style={{marginLeft:'0.3rem'}}
             className="no_brdr_input consultaion_input"
             type="number"
             />:data.price?` ${data.price[0]}`:' 0'}
        </div>
      {/* <input type="text" value="200" className="btm_bdr" /> */}
      </div>
      <div className="col-md-3 text-center">
        <div className="price_se">
          < VarianceDropdown 
            editFlag = {props.editFlag}
            disabled = {props.disabled}
            handleChange={(e)=>props.handleVarianceChange(e,props.data.serviceId)}
            value = {isSelected()?getVariance():props.data.variance}
          />
        </div>   
      </div>
      </div>
    <div>
    
    </div>
    <hr></hr>
</div>
</React.Fragment>
  )
}
 

export default Procedure