import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useLayoutEffect } from "react"
import "./editProcedure.css"
import SelectComponent from "../SelectComponent"
import VarianceDropdown from "./varianceDropdown"

 const Procedure= (props) => {
  console.log(props,"props in Procedure")
  const { addToast } = useToasts()
  const {data} = props


  if(!!props.editProcedureRet){
    if(props.id === props.selectedProcedure.id){
      if(!!props.editProcedureRet.success){
        addToast(props.editProcedureRet.message, {appearance: 'success', autoDismiss:true}) 
      }else{
        addToast(props.editProcedureRet.message, {appearance: 'error', autoDismiss:true})
      }
      props.editProcedureLoadingOff()
      props.editProcedureClr()
    }
}
  return (
<React.Fragment>
  
<div>
    {/* <div className = 'row listOfService' key = {props.id}>
        <div className='col-md-6'>{data.service}</div>
        <div className='col-md-3'>Rs. {data.price[0]}</div>
        <div className='col-md-3 catalogueVariance'>{data.variance}%</div>
        <p onClick={()=>props.handleEditInclusion()} className={`col-md-3 edit-link ${!!props.editFlag?'':'display-none'}`}>Edit Inclusions</p>
    </div> */}
    {/* <SelectComponent i ={props.id} type='no_float_label' /> */}
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
              value={props.selectedProcedure.price[0]}
              onChange={props.handleSelectedProcedureChange}
             name="editPrice"
             className="no_brdr_input consultaion_input"
             type="number"
             />:data.price[0]}
        </div>
      {/* <input type="text" value="200" className="btm_bdr" /> */}
      </div>
      <div className="col-md-4 col-12">
        <div className="price_se">
          < VarianceDropdown 
            handleChange={(e)=>props.handleVarianceChange(e)}
            value = {(props.id === props.selectedProcedure.id)?props.selectedProcedure.variance:props.data.variance}
          />
          {/* <select className="form-control slec_p">
            <option>30%</option>
          </select>
          <div className="plu_mi">
          <i className="fa fa-plus" aria-hidden="true"></i>
          <i className="fa fa-minus" aria-hidden="true"></i>
          </div> */}
        </div>   
      </div>
      </div>
    <div>
    
    </div>
    <hr></hr>
    {/* <div className = 'row listOfService'>
            <div className='col-md-8'><hr></hr></div>
            <div className='col-md-4'></div>
    </div> */}
</div>
</React.Fragment>
  )
}
 

export default Procedure