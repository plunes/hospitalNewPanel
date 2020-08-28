import React from "react"
import Button from "./Button"
import LoaderComponent from "./LoaderComponent"

const UploadPrice = (props) => {

    return (
        <React.Fragment>
                <div className ='modal-wrapper-small_rish'>
             <div style={{fontWeight:'600'}} className="modal-heading_ris margin_top_small_rish update_price_heading">  { `Update price in Catalogue`}</div>
                 <div style={{height:'5rem'}}>
                    <span className="modal_content_description center_align_rish margin_top_small_rish">
                        {/* { `Are you sure you want remove ${[...props.specialities].filter(item=>!!(item.value === props.selected_speciality))[0].name} from catalogue?`} */}
                     </span>
                     <div style={{position:'relative'}} className="flex_parent  margin_top_small_rish">

                         {props.update_procedure_loading_flag && <LoaderComponent />}
                            <span className="flex_parent_child text-center">
                                <Button id="make_transaction_button" className="modal_button" onClick={()=>props.update_procedure({...props.update_procedure_obj})}  >Update, For this facility </Button>
                            </span>
                            <span className="flex_parent_child text-center">
                                <Button id="cancel_button" className="modal_button" onClick={()=>console.log()}  >Update, For all the facilities </Button>
                            </span>
                     </div>
                 </div>
            </div>   
        </React.Fragment>
    )
}

export default UploadPrice