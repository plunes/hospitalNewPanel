import React , { useState , useEffect} from "react"
import { ToastProvider, useToasts } from 'react-toast-notifications'
import Button  from "./Button"
import Select from "../Select"

const DeleteSpeciality = (props) => {
    const { addToast } = useToasts()
    const [ success, setSuccess ] = useState(false)


    return (
        <div className ='modal-wrapper-small_rish'>
             <div style={{fontWeight:'600'}} className="modal-heading_ris margin_top_small_rish">  { `Are you sure you want remove ${[...props.specialities].filter(item=>!!(item.value === props.selected_speciality))[0].name} from catalogue?`}</div>
                 <div style={{height:'5rem'}}>
                    <span className="modal_content_description center_align_rish margin_top_small_rish">
                        {/* { `Are you sure you want remove ${[...props.specialities].filter(item=>!!(item.value === props.selected_speciality))[0].name} from catalogue?`} */}
                     </span>
                     <div className="flex_parent  margin_top_small_rish">
                            <span className="flex_parent_child text-center">
                                <Button id="make_transaction_button" onClick={()=>props.remove_speciality(props.selected_speciality)}  >Remove </Button>
                            </span>
                            <span className="flex_parent_child text-center">
                                <Button id="cancel_button"  onClick={()=>props.toggle_delete_speciality()} >Cancel</Button>
                            </span>
                     </div>
                 </div>
            </div>   
    )
}

 export default DeleteSpeciality