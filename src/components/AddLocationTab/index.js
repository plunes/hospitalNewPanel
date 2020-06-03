import React,  { useState }  from "react"
import { Link } from "react-router-dom"

const AddLocationTab  = () =>{
     const [toggle, setToggle] = useState(true)
     if(!!toggle){
        return (
            <div className="card_rish add_loaction_wrapper">
                <div className="row margin-top-medium_ris heading_rish">
                    <div className="col-md-8 heading_rish">
                        Help Plunes to get "Real Time Insights" for you
                    </div>
                    <div className="col-md-4">
                    <div className='text-right'><button type='button'  onClick={()=>setToggle(false)}  style={{ border: 'none', background: '#fff'}} ><img src="/cross.jpg" style={{ width: "65%" }} alt=""></img></button></div>
                    </div>
                </div>
                <div className="margin-top-medium_ris">
                <span className="sub_heading_rish">
                    Add a location to your profile, and help us provide with Real Time Insights and Actionable Insights on bookings.
                </span>
                </div>
            <div className="margin-top-medium_ris">
                <button className="common_button_rish">
                Add Location
                </button>
            </div>
                
            </div>
        )
     }else{
         return (
             <div></div>
         )
     }

}
export default AddLocationTab