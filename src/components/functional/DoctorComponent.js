import React from "react"
import { Link } from "react-router-dom"
import { get_url_params } from  '../../utils/common_utilities'

const DoctorComponent = (props) =>{
    return(
        <div className='doctor_wrapper' >
              <Link to={`add-doctor?id=${props.data._id}${!!get_url_params('center')?'&center='+get_url_params('center'):''}`} >
        <div onClick={()=>props.onClick(props.data)} className="doctor_wrapper_rish">
            <span className='doctor_wrapper_child_!'>
              <img className='doctor_compo_img' src={!!props.data?!!props.data.imageUrl?props.data.imageUrl:'/drshivani.jpg':'/drshivani.jpg'}/>
            </span>
           <span className='doctor_wrapper_child_2'>
             <text className='appointment_text display_block doctor_component_name'>{!!props.data?props.data.name:'Not Available'}</text>
             <text  className='appointment_text display_block doctor_component_speciality'>{!!props.data?props.data.department:'Not Available'}</text>
            <text  className='appointment_text display_block doctor_component_experience'>{`${!!props.data?props.data.experience:''}  years of experience`}</text>
           </span>
        </div>
        </Link>
    </div>

    )
}

export default DoctorComponent