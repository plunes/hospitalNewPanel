import React from "react"
import Button  from "./Button"

const AddServiceConfirm = (props) => {

    return <React.Fragment>
         <div className ='modal-wrapper-small_rish'>
             <div style={{fontWeight:'600'}} className="modal-heading_ris margin_top_small_rish">Do you want to add this service to all the centers or just this center?</div>
                 <div style={{height:'5rem'}}>
                    <span className="modal_content_description center_align_rish margin_top_small_rish">
                        {/* { `Are you sure you want remove ${[...props.specialities].filter(item=>!!(item.value === props.selected_speciality))[0].name} from catalogue?`} */}
                     </span>
                     <div className="flex_parent  margin_top_small_rish">
                            <span className="flex_parent_child text-center">
                                <Button id="make_transaction_button" onClick={()=>{
                                    props.close_modal()
                                    if(!!props.data){
                                        props.add_procedure({...props.data},true)
                                    }else {
                                        props.add_procedure(false,true)
                                    }
                                   
                                }}  >Add in all Centers</Button>
                            </span>
                            <span className="flex_parent_child text-center">
                                <Button id="cancel_button" onClick={()=>{
                                    props.close_modal()
                                    if(!!props.data){
                                        props.add_procedure({...props.data},false)
                                    }else {
                                        props.add_procedure(false,false)
                                    }
                                }}>Add to this Center</Button>
                            </span>
                     </div>
                 </div>
            </div>   
    </React.Fragment>
}
export default AddServiceConfirm