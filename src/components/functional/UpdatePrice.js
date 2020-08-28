import React from "react"
import Button from "./Button"
import LoaderComponent from "./LoaderComponent"

const UploadPrice = (props) => {
console.log(props,"props in update price")
    return (
        <React.Fragment>
                <div style={{position:'relative'}} className ='modal-wrapper-small_rish'>
                {props.update_procedure_loading_flag && <LoaderComponent />}
             <div style={{fontWeight:'600'}} className="modal-heading_ris margin_top_small_rish update_price_heading">  { `Update price`}</div>
                 <div style={{height:'5rem'}}>
                    <span className="modal_content_description center_align_rish margin_top_small_rish">
                        {/* { `Are you sure you want remove ${[...props.specialities].filter(item=>!!(item.value === props.selected_speciality))[0].name} from catalogue?`} */}
                     </span>
                     <div style={{position:'relative'}} className="flex_parent  margin_top_small_rish">

                     
                            <span className="flex_parent_child text-center">
                                <Button id="make_transaction_button" className="modal_button" onClick={()=>props.update_procedure({ ...props.update_procedure_obj, updateAllCenter:false})}>Update this Profile</Button>
                            </span>
                            <span className="flex_parent_child text-center">
                                <Button id="cancel_button" className="modal_button" onClick={()=>props.update_procedure({ ...props.update_procedure_obj, updateAllCenter:true})} >Update all centres</Button>
                            </span>
                     </div>
                 </div>
            </div>   
        </React.Fragment>
    )
}

export default UploadPrice