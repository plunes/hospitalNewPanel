import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useLayoutEffect } from "react"
import "./editProcedure.css"
import SelectComponent from "../SelectComponent"

 const Procedure= (props) => {
  const { addToast } = useToasts()
  const {data} = props
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
<label className="cont_ter">Anglogram of heart
  <input type="checkbox"/>
  <span className="check2"></span>
</label>
      </div>
      <div className="col-lg-2">
      <input type="text" value="200" className="btm_bdr" />
      </div>
      <div className="col-md-4 col-12">
        <div className="price_se">
          <select className="form-control slec_p">
            <option>30%</option>
          </select>
          <div className="plu_mi">
          <i className="fa fa-plus" aria-hidden="true"></i>
          <i className="fa fa-minus" aria-hidden="true"></i>
          </div>
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