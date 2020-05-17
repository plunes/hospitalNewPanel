import React from "react"
import { Link } from "react-router-dom"

const DoctorComponent = (props) =>{
    return(
        <div className="col-md-6 col-sm-12 col-lg-3">
            <Link to={`add-doctor?id=${props.data._id}`} >
        <div onClick={()=>props.onClick(props.data)} className="timelinebox4 cursor-pointer">
            <img src={!!props.data?!!props.data.imageUrl?props.data.imageUrl:'/drshivani.png':'/drshivani.png'}/>
            <div className="left_ali">
             <h2>{!!props.data?props.data.name:'Not Available'}</h2>
             <p>{!!props.data?props.data.department:'Not Available'}</p>
            <p>{`${!!props.data?props.data.experience:''}  years of experience`}</p>
            </div>
        </div>
        </Link>
    </div>

    )
}

export default DoctorComponent