import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useLayoutEffect } from "react"
import "./editProcedure.css"

 const Procedure= (props) => {
     
 console.log(props,"props in dowmnload Catalogue")  
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
    <div className="row">
    <div className="col-lg-6">
<label class="cont_ter">Anglogram of heart
  <input type="checkbox"/>
  <span class="check2"></span>
</label>
      </div>
      <div className="col-lg-2">
      <input type="text" value="200" className="btm_bdr" />
      </div>
      <div class="col-md-4 col-12 icon_p_m">
       
        <div class="price_se">
          <select class="form-control slec_p">
            <option>30%</option>
          </select>
         <i class="fa fa-plus" aria-hidden="true"></i>
          <i class="fa fa-minus" aria-hidden="true"></i>
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
        
        </div>
        <div className="slect_box_mdl">
          <ul>
            <li>10%</li>
            <li>20%</li>
            <li>30%</li>
            <li>40%</li>
            <li>50%</li>
            <li>60%</li>
            
           </ul>
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