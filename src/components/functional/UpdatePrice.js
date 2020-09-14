import React from "react"
import Button from "./Button"
import LoaderComponent from "./LoaderComponent"

const UploadPrice = (props) => {
    const [select, set_select] = React.useState(0)
console.log(props,"props in update price")
    return (
        <React.Fragment>
         <div className ='modal-wrapper-medium_ris'>
                {props.update_procedure_loading_flag && <LoaderComponent />}
             <div style={{fontWeight:'600'}} className="modal-heading_ris margin_top_small_rish update_price_heading">  { `Update price`}</div>
                 <div style={{height:'5rem'}}>
                    <span className="modal_content_description center_align_rish margin_top_small_rish">
                        {/* { `Are you sure you want remove ${[...props.specialities].filter(item=>!!(item.value === props.selected_speciality))[0].name} from catalogue?`} */}
                     </span>
                     <div style={{position:'relative'}} className=" update_price_wrapper  margin_top_small_rish">
                            <span onClick={()=>set_select(0)} className={select===0?"flex_update_price_child_selected flex_update_price_child text-center":"flex_update_price_child text-center"}>
                                <div className="update_price_icon_wrapper">
                                        <img src=  {select===0?"https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/user_icon_selected.svg":"https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/update_price_user.svg"}   className ="update_price_icon" />      
                                        <span className="update_price_text">
                                                Update this profile
                                        </span>
                                </div>
                                {/* <Button id="make_transaction_button" className="modal_button" onClick={()=>props.update_procedure({ ...props.update_procedure_obj, updateAllCenter:false})}>Update this Profile</Button> */}
                            </span>
                            <span onClick={()=>set_select(1)} className={select===1?"flex_update_price_child_selected flex_update_price_child text-center":"flex_update_price_child text-center"}>
                                <div className="update_price_icon_wrapper">
                                        <img src=   {select===1?"https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/all_centers.svg":"https://profile-image-plunes.s3.amazonaws.com/Plunes.com+images/all_center_1.svg"}   className ="update_price_icon" />      
                                        <span className="update_price_text">
                                                Update all centres
                                        </span>
                                </div>
                                {/* <Button id="make_transaction_button" className="modal_button" onClick={()=>props.update_procedure({ ...props.update_procedure_obj, updateAllCenter:false})}>Update this Profile</Button> */}
                            </span>
                     </div>
                     <div className="text-center margin_top_small_rish">
                     <Button id="make_transaction_button" className="modal_button " onClick={()=>props.update_procedure({ ...props.update_procedure_obj, updateAllCenter:select===1})}>Update</Button>
                     </div>
                 </div>
            </div>   
        </React.Fragment>
    )
}

export default UploadPrice