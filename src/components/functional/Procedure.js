import React from "react"
import { useToasts } from 'react-toast-notifications'
import "./editProcedure.css"
import VarianceDropdown from "./varianceDropdown"

 const Procedure= (props) => {
  const { addToast } = useToasts()
  const {data} = props
console.log(props,"props in Procedures")

  if(!!props.ret){
    if(props.id === props.selectedProcedure.id){
      if(!!props.ret.success){
        addToast(props.ret.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        console.log(props.res,"props.res in procedure")
        addToast(props.ret.message, {appearance: 'error', autoDismiss:true})
      }
      props.loadingOff()
      props.clr()
    }
}
  return (
<React.Fragment>
<div>
    <div className="row listOfService">
    <div className="col-lg-6">
<label className="cont_ter">{data.service}
{
  props.editFlag?<React.Fragment>
    <input type="checkbox" checked={(props.id === props.selectedProcedure.id)} onClick = {()=>props.onEdit(props)} />
  <span className="check2"></span></React.Fragment>:''
}
  
</label>
      </div>
      <div className="col-lg-2">
        <div className="procedure_price_wrap">
           &#x20B9;
             {((!!props.editFlag) && (props.id === props.selectedProcedure.id))?<input
              value={!!props.selectedProcedure.price?props.selectedProcedure.price[0]:props.selectedProcedure.price}
              onChange={props.handleSelectedProcedureChange}
             name="editPrice"
             className="no_brdr_input consultaion_input"
             type="number"
             />:data.price?data.price[0]:'Not Available'}
        </div>
      {/* <input type="text" value="200" className="btm_bdr" /> */}
      </div>
      <div className="col-md-4 col-12">
        <div className="price_se">
          < VarianceDropdown 
            handleChange={(e)=>props.handleVarianceChange(e)}
            value = {(props.id === props.selectedProcedure.id)?props.selectedProcedure.variance:props.data.variance}
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