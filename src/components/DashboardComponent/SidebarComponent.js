import React, { Component } from "react";
import "./Dashboard.css";
import { logout, get_user_info } from '../../actions/userActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import { get_url_params } from "../../utils/common_utilities"
// import { Link, Redirect} from 'react-router-dom'
// import history from "../../history";
// import { ListGroup, ListGroupItem, Collapse } from "reactstrap";

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.handlelogoutClick = this.handlelogoutClick.bind(this);
  }

  async handlelogoutClick() {
    await this.props.logout()
  }

  render() {
    console.log(this.props,"this.props in sidebar")
   const  prof_data  = this.props.prof_data
    return (
        <div className="sidebar_wrapper">
            <div  className={`${this.props.pathname==='/dashboard'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard" 
                  className="list-group"
                  role="button" 
                  onClick={()=>this.props.toggleDash()}>
                    <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                      <text  className={`${this.props.pathname==='/dashboard'?'sidebar_list_text_active':''} `}>Dashboard</text>
                      </span>
                    </span>
              </Link>
            </div>
            <div  className={`${this.props.pathname==='/dashboard/profile'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard/profile" 
                  className="list-group"
                  role="button" 
                  onClick={()=>
                          {
                          if(!!get_url_params('center')){
                            console.log(get_url_params('center'),"sky is one and shes a")
                            this.props.get_user_info({from_dash_page:true})
                          }
                          this.props.toggleProfile()
                        }}> 
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text className={`${this.props.pathname==='/dashboard/profile'?'sidebar_list_text_active':''} `}>Profile</text>
                      </span>
                    </span>
              </Link>
            </div>
            <div  className={`${this.props.pathname==='/dashboard/availability'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
               <Link to= "/dashboard/availability"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleAvail()}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text className={`${this.props.pathname==='/dashboard/availability'?'sidebar_list_text_active':''} `}>My Availability</text>
                      </span>
                    </span>
              </Link>
            </div>
            <div  className={`${this.props.pathname==='/dashboard/appointments'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard/appointments"
                  className="list-group"
                  role="button" 
                  onClick={()=>this.props.toggleAppoint()}>
               <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text className={`${this.props.pathname==='/dashboard/appointments'?'sidebar_list_text_active':''} `}>Appointments</text>
                      </span>
                    </span>
              </Link>
            </div>
            {!!prof_data.isAdmin &&    <div  className={`${this.props.pathname==='/dashboard/centers'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>
              <Link to= "/dashboard/centers"
                  className="list-group"
                  role="button" 
                  onClick={()=>this.props.toggleCenters()}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text  className={`${this.props.pathname==='/dashboard/centers'?'sidebar_list_text_active':''} `}>Centres</text>
                      </span>
                    </span>
              </Link>
              </div>}
           
              <div  className={`${this.props.pathname==='/dashboard/settings'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}> 
                <Link to= "/dashboard/settings"
                   className="list-group"
                   role="button" 
                 onClick={()=>this.props.toggleSettings()}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text  className={`${this.props.pathname==='/dashboard/settings'?'sidebar_list_text_active':''} `}>Settings</text>
                      </span>
                    </span>
               </Link> 
            </div>
            {!!prof_data.isAdmin &&
            <div  className={`${this.props.pathname==='/dashboard/manage-payment'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}>  
               <Link to= "/dashboard/manage-payment"
                    className="list-group"
                    role="button" 
                    onClick={()=>this.props.toggleManage()}> 
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text  className={`${this.props.pathname==='/dashboard/manage-payment'?'sidebar_list_text_active':''} `}>Manage Payment</text>
                      </span>
                    </span>
               </Link>
           </div>}
           <div  className={`${this.props.pathname==='/dashboard/help'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}> 
              <Link to= "/dashboard/help"
                  className="list-group"
                  role="button" 
                  onClick={()=>this.props.toggleHelp()}>
                  <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text  className={`${this.props.pathname==='/dashboard/help'?'sidebar_list_text_active':''} `}>Help</text>
                      </span>
                    </span>
              </Link>
            </div> 
            <div  className={`${this.props.pathname==='/dashboard/aboutus'?'sidebar_item_wraper align_center_rish sidebar_list_active':'sidebar_item_wraper align_center_rish '} `}> 
            <Link to= "/dashboard/aboutus"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleAbout()}>
                <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text  className={`${this.props.pathname==='/dashboard/aboutus'?'sidebar_list_text_active':''} `}>About Us</text>
                      </span>
                    </span>
           </Link>
        </div>
         <div  className="sidebar_item_wraper " onClick={this.handlelogoutClick} >
         <Link to= "/"
                className="list-group"
                role="button" 
                onClick={this.handlelogoutClick}>
                   <span className="sidebar_list_item">
                      <span className="sidebar_list_icon">
                        <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                      </span>
                      <span className="sidebar_list_text">
                       <text className="">Logout</text>
                      </span>
                   </span>
          </Link>
         </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  prof_data:state.user.data.prof_data
})

export default connect(mapStateToProps, { logout, get_user_info })(SidebarComponent);

