import React, { useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import { logout, get_user_info } from '../../actions/userActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import { get_url_params } from "../../utils/common_utilities"
const  SidebarComponent = (props) => {
  const wrapper_ref = useRef(null);
  const [collapse, setCollapse] = useState(false)
  const [hover, setHover] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', window_resize)
    wrapper_ref.current.addEventListener('mouseover', mouse_over)
    wrapper_ref.current.addEventListener('mouseout', mouse_out)

    return function cleanUp(){
      window.addEventListener('resize', window_resize)
      wrapper_ref.current.removeEventListener('mouseover', mouse_over)
      wrapper_ref.current.removeEventListener('mouseout',mouse_out)
    }
  }, [])
   

  const mouse_over = (event) =>{
    // console.log(event.fromElement.className,"event in mouse_over")
    // console.log(event,"event in mouse_over")
    // if(!!event.fromElement){
    //   // console.log(event.fromElement.className,"poiop")
    //   if(event.fromElement.className==='main_body_flex_sidebar' || event.fromElement.className==='main_body_flex_sidebar' ){
    //     console.log("mouse_over event called")
    //   }
    // }
    // if (event.fromElement.className==='main_body_flex_sidebar') {
    //   console.log('mouse_over called')
    //   if(!hover){
    //      setHover(true)
    //   }
    // }else{
      
    // }
  }

  const mouse_out = (event) =>{
    var e = event.toElement || event.relatedTarget;
    if(!!e){
      if (e.parentNode == this || e == this) {
        return;
     }else{
       console.log('mouse_out called')
       if(!!hover){
         setHover(false)
       }
     }
    }
   
   
  }


   const window_resize = () =>{
    console.log("Window Resize called")
  }

  const toggle_collapse = () =>{
    setCollapse(!collapse)
  }

  

  const handlelogoutClick=  async() => {
    await props.logout()
  }
    return (
      <div ref={wrapper_ref} id="sidebar_wrapper_id" className={`main_body_flex_sidebar    ${collapse?"sidebar_collapse":''}`}>
        <div className={`sidebar_wrapper ${collapse?"sidebar_wrapper_collapse":''}`}>
       
            <div  className={`${props.pathname==='/dashboard'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard" 
                
                  onClick={()=>props.toggleDash()}>
                    <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon"src={props.pathname==='/dashboard'?'/icon/dash_icon_active.svg':'/icon/dash_icon.svg'} alt=""></img>
                      </span>
                      {!collapse && <span className="sidebar_list_text">
                      <text  className={`${props.pathname==='/dashboard'?'sidebar_list_text_active':''} `}>Dashboard</text>
                      </span> }
                      
                    </span>
              </Link>
            </div>
            <div  className={`${props.pathname==='/dashboard/profile'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard/profile" 
                
                 
                  onClick={()=>
                          {
                          if(!!get_url_params('center')){
                            props.get_user_info({from_dash_page:true})
                          }
                          props.toggleProfile()
                        }}> 
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src={props.pathname==='/dashboard/profile'?'/icon/profile_icon_active.svg':'/icon/profile_icon.svg'} alt=""></img>
                      </span>
                     {!collapse &&  <span className="sidebar_list_text">
                       <text className={`${props.pathname==='/dashboard/profile'?'sidebar_list_text_active':''} `}>Profile</text>
                      </span>}
                    </span>
              </Link>
            </div>
            <div  className={`${props.pathname==='/dashboard/availability'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
               <Link to= "/dashboard/availability"
              
               
                onClick={()=>props.toggleAvail()}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src={props.pathname==='/dashboard/availability'?'/icon/availability_icon_active.svg':'/icon/availability_icon.svg'} alt=""></img>
                      </span>
                     {!collapse &&  <span className="sidebar_list_text">
                       <text className={`${props.pathname==='/dashboard/availability'?'sidebar_list_text_active':''} `}>My Availability</text>
                      </span>}
                    </span>
              </Link>
            </div>
            <div  className={`${props.pathname==='/dashboard/appointments'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard/appointments"
                
                 
                  onClick={()=>props.toggleAppoint()}>
               <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src={props.pathname==='/dashboard/appointments'?'/icon/appointment_icon_active.svg':'/icon/appointment_icon.svg'} alt=""></img>
                      </span>
                    {!collapse &&   <span className="sidebar_list_text">
                       <text className={`${props.pathname==='/dashboard/appointments'?'sidebar_list_text_active':''} `}>Appointments</text>
                      </span>}
                    </span>
              </Link>
            </div>
            {!!props.prof_data.isAdmin &&    <div  className={`${props.pathname==='/dashboard/centers'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard/centers"
                
                 
                  onClick={()=>props.toggleCenters()}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon"  src={props.pathname==='/dashboard/centers'?'/icon/centers_icon_active.svg':'/icon/centers_icon.svg'} alt=""></img>
                      </span>
                     {!collapse &&  <span className="sidebar_list_text">
                       <text  className={`${props.pathname==='/dashboard/centers'?'sidebar_list_text_active':''} `}>Centres</text>
                      </span>}
                    </span>
              </Link>
              </div>}
           
              <div  className={`${props.pathname==='/dashboard/settings'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}> 
                <Link to= "/dashboard/settings"
                 
                  
                 onClick={()=>props.toggleSettings()}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src={props.pathname==='/dashboard/settings'?'/icon/settings_icon_active.svg':'/icon/settings_icon.svg'} alt=""></img>
                      </span>
                      {!collapse && <span className="sidebar_list_text">
                       <text  className={`${props.pathname==='/dashboard/settings'?'sidebar_list_text_active':''} `}>Settings</text>
                      </span>}
                    </span>
               </Link> 
            </div>
            {!!props.prof_data.isAdmin &&
            <div  className={`${props.pathname==='/dashboard/manage-payment'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>  
               <Link to= "/dashboard/manage-payment"
                  
                   
                    onClick={()=>props.toggleManage()}> 
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src={props.pathname==='/dashboard/manage-payment'?'/icon/payments_icon_active.svg':'/icon/payments_icon.svg'} alt=""></img>
                      </span>
                     {!collapse &&  <span className="sidebar_list_text">
                       <text  className={`${props.pathname==='/dashboard/manage-payment'?'sidebar_list_text_active':''} `}>Manage Payment</text>
                      </span>}
                    </span>
               </Link>
           </div>}
           <div  className={`${props.pathname==='/dashboard/help'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}> 
              <Link to= "/dashboard/help"
                
                 
                  onClick={()=>props.toggleHelp()}>
                  <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon"src={props.pathname==='/dashboard/help'?'/icon/help_icon_active.svg':'/icon/help_icon.svg'} alt=""></img>
                      </span>
                    {!collapse &&   <span className="sidebar_list_text">
                       <text  className={`${props.pathname==='/dashboard/help'?'sidebar_list_text_active':''} `}>Help</text>
                      </span>}
                    </span>
              </Link>
            </div> 
            <div  className={`${props.pathname==='/dashboard/aboutus'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}> 
            <Link to= "/dashboard/aboutus"
              
               
                onClick={()=>props.toggleAbout()}>
                <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src={props.pathname==='/dashboard/aboutus'?'/icon/about_us_icon_active.svg':'/icon/about_us_icon.svg'} alt=""></img>
                      </span>
                     {!collapse &&  <span className="sidebar_list_text">
                       <text  className={`${props.pathname==='/dashboard/aboutus'?'sidebar_list_text_active':''} `}>About Us</text>
                      </span>}
                    </span>
           </Link>
        </div>
         <div  className="sidebar_item_wraper " onClick={handlelogoutClick} >
         <Link to= "/"
              
               
                onClick={handlelogoutClick}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/icon/logout_icon.svg" alt=""></img>
                      </span>
                     {!collapse &&  <span className="sidebar_list_text">
                       <text className="">Logout</text>
                      </span>}
                   </span>
          </Link>
         </div>

         <div className='hamburger-dic' >
        <div className={` hamburger_icon_wrapper ${collapse?'display_block':''}`}>
              <div >
              <a onClick ={()=>setCollapse(!collapse)} className={`${!collapse?'active':''}`}  id="hamburger" href="#"><span></span></a>
              </div>
              </div>
        </div>  

      </div>
   </div>
    );
}

const mapStateToProps = state => ({
  prof_data:state.user.data.prof_data
})

export default connect(mapStateToProps, { logout, get_user_info })(SidebarComponent);

