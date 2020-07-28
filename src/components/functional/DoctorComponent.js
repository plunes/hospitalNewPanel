import React from "react"
import { Link } from "react-router-dom"

const DoctorComponent = (props) =>{
    return(
        <div className='doctor_wrapper' >
            <Link to={`add-doctor?id=${props.data._id}`} >
        <div onClick={()=>props.onClick(props.data)} className="doctor_wrapper_rish">
            <span className='doctor_wrapper_child_!'>
              <img className='doctor_compo_img' src={!!props.data?!!props.data.imageUrl?props.data.imageUrl:'/icon/doctor_stock_image.png':'/icon/doctor_stock_image.png'}/>
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