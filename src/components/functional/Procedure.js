import React, { useState, useEffect } from "react"
import { useToasts } from 'react-toast-notifications'
import "./editProcedure.css"
import VarianceDropdown from "./varianceDropdown"
import { is_positive_whole_number } from "../../utils/common_utilities"
import LoaderComponent from "./LoaderComponent"
import AnimatedMount from "../../HOC/AnimatedMount"
import DeletePopup from "./DeletePopup"
const should_render = (prevProps, nextProps) => {
  // console.log(prevProps, nextProps,"preveProps, nextProps in should_render")
  if(prevProps.ret !== nextProps.ret){
    return false
  }
  if(prevProps.disabled !== nextProps.disabled){
    return false
  }
  if(prevProps.editFlag !== nextProps.editFlag){
    return false
  }
  if(prevProps.isSelected !== nextProps.isSelected){
    return false
  }
  if(prevProps.getValue !== nextProps.getValue){
    return false
  }
  if(prevProps.getVariance !== nextProps.getVariance){
    return false
  }
  if(prevProps.update_procedure_loading !== nextProps.update_procedure_loading){
    return false
  }
  if(prevProps.data.serviceId !== nextProps.data.serviceId){
    return false
  }
  if(prevProps.data.variance !== nextProps.data.variance){
    return false
  }
  return true
}
 const Procedure= (props) => {
  const { addToast } = useToasts()
  const {data} = props
  const [ select , setSelect ] = useState(false)

 

  useEffect( () => {
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
 }, [props.ret])
  return (
<React.Fragment>

<div className="catalogue_procedure_wrap">
                                <div style={{background:'#fff'}} className='catalogue_head_tabs'>
                                    <span className=' display_block_rish catalogue_circle_wrap'> <span   onClick = {()=>props.onEdit(props)} className={`catalogue_circle ${props.isSelected?'green_background active_catalogue_circle':''}`}></span> </span>
                                    <span className='head_tabs_name display_block_rish'> <text className='catalogue_test_name '>{data.service}</text></span>
                                    <span className='head_tabs_price display_block_rish text-center'>
                                         {((!!props.editFlag) && (props.isSelected))?<input
                                                value={props.isSelected?props.getValue:props.getValue}
                                                onChange={
                                                    e =>{
                                                        console.log(is_positive_whole_number(e.target.value),"is_positive_whole_number(e.target.value)")
                                                        if(is_positive_whole_number(e.target.value)){
                                                        props.handleSelectedProcedureChange(e,props.data.serviceId)
                                                        }else{
                                                          e.preventDefault()
                                                        }
                                                        } 
                                                         }
                                                name="editPrice"
                                                style={{marginLeft:'0.3rem'}}
                                                className="no_brdr_input consultaion_input"
                                                type="number"/>
                                         :!!data.price?<text className='catalogue_test_name '> &#x20B9;{` ${data.price[0]}`}</text>:data.price===0?<text className='catalogue_test_name '>&#x20B9; 0 </text>:<text className='catalogue_test_name '>N/A</text>}
                                       </span>
                                                        <span className='head_tabs_variance display_block_rish text-center'><text className='catalogue_test_name '>{props.isSelected?< VarianceDropdown 
                                                                                                             editFlag = {props.editFlag}
                                                                                                             disabled = {props.disabled}
                                                                                                             handleChange={(e)=>props.handleVarianceChange(e,props.data.serviceId)}
                                                                                                              value = {props.isSelected?props.getVariance:props.data.variance}
                                                                                                         />:`${!!props.data.variance?props.data.variance+'%':props.data.variance===0?0+'%':'N/A'}`}</text></span>
                                    <span className='head_tabs_actions display_block_rish text-center'>
                                      {((props.update_procedure_loading || props.remove_service_loading_flag) && (props.procedure_for_update.serviceId === props.data.serviceId)) ? <LoaderComponent second_variant = {true} />:props.isSelected?<React.Fragment>  <span><text style={{color:'#7DD55E'}}  onClick = {()=>props.onEdit(props)}  className='catalogue_test_name link_text_rish'>Cancel</text></span>
                                                <span><text style={{color:'#7DD55E', marginLeft:'1rem'}}  onClick = {()=>props.update_procedure(props.data)}  className='catalogue_test_name link_text_rish'>Submit</text></span>
                                                
                                                <DeletePopup 
                                                    yesClick = {(e)=>props.remove_service({
                                                      serviceId:data.serviceId
                                                    })}
                                                    title="Are you sure you want to remove this procedure?"
                                                    id={props.id}
                                                    >
                                                <span><text style={{color:'#c0392b;', marginLeft:'1rem'}}    id={props.id} className='catalogue_test_name red_text link_text_rish'>Remove</text>
                                                </span>
                                                </DeletePopup>
                                                </React.Fragment>:
                                                 <span><text style={{color:'#7DD55E'}}  onClick = {()=>props.onEdit(props)}  className='catalogue_test_name link_text_rish'>Edit</text></span>}
                                    </span>
                                </div>
                                <hr></hr>
</div>
</React.Fragment>
  )
}
 


export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: 'translate3d(0, -2rem, 0)',
    transition: 'opacity 100ms ease-out, transform 100ms ease-out',
  },
  mountedStyle: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .5s ease-out, transform .5s ease-out',
  },
})(React.memo(Procedure, should_render));