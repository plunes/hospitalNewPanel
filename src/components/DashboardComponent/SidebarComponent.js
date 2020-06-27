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
   const  prof_data  = this.props.prof_data
    return (
        <div className="sidenav auto-center_ris">
          <div className="pointer">
         <Link to= "/dashboard" 
           className="list-group"
           role="button" 
           onClick={()=>this.props.toggleDash()}
            >
              <span>
                <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                Dashboard
              <img className="arrowdesign" src="arrow.svg" alt=""></img></span>
              </Link>
               <hr></hr>
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
               <span>
                <img className="sidebaricon pro_tw" src="/profile.jpg" alt=""></img>
              </span>
              Profile
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
               <Link to= "/dashboard/availability"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleAvail()}
            > 
              <span>
                <img className="sidebaricon" src="/a1.jpg" alt=""></img>
              </span>
              My Availability
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
            <Link to= "/dashboard/appointments"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleAppoint()}
            > 
              <span>
                <img className="sidebaricon" src="/a2.jpg" alt=""></img>
              </span>
              Appointments
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
           </Link><hr></hr>
           {!!prof_data.isAdmin && <React.Fragment> <Link to= "/dashboard/centers"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleCenters()}
            >
              <span>
                <img className="sidebaricon" src="/a2.jpg" alt=""></img>
              </span>
              Centres
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
           </Link><hr></hr> </React.Fragment>}
           
            {/* <a href="/my-catalogue"
              className="list-group"
            >
              <span>
                <img className="sidebaricon" src="" alt=''></img>
              </span>
              My catalogue
              <img className="arrowdesign" src="arrow.svg"></img>
            </a> <hr></hr> */}
             <Link to= "/dashboard/settings"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleSettings()}
            > 
              <span>
                <img className="sidebaricon" src="/Settings.jpg" alt=""></img>
              </span>
              Settings
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
            {!!!prof_data.isCenter &&
            <React.Fragment>
            <Link to= "/dashboard/manage-payment"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleManage()}
            > 
              <span>
                <img className="sidebaricon" src="/m1.jpg" alt=""></img>
              </span>
              Manage Payment
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
            </React.Fragment>
            }
            <Link to= "/dashboard/help"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleHelp()}
            > 
              <span>
                <img className="sidebaricon" src="/Help.jpg" alt=""></img>
              </span>
              Help
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
            <Link to= "/dashboard/aboutus"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleAbout()}
            > 
              <span>
                <img className="sidebaricon" src="/about-us.jpg" alt=""></img>
              </span>
              About Us
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
            <div 
              className="list-group log"
              onClick={this.handlelogoutClick}
            >
              <span>
                <img className="sidebaricon" src="/Logout.jpg" alt=""></img>
              </span>
              Logout
            </div>
          </div>
        </div>
     
    );
  }
}

const mapStateToProps = state => ({
  prof_data:state.user.data.prof_data
})

export default connect(mapStateToProps, { logout, get_user_info })(SidebarComponent);

