import React, { Component } from "react";
import "./Dashboard.css";
import { logout } from '../../actions/userActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
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
    console.log(this.props,"this.props in Sidebar Component")
    return (
      <div className="container">
        <div className="sidenav">
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
           onClick={()=>this.props.toggleProfile()}
            > 
               <span>
                <img className="sidebaricon" src="/profile.png" alt=""></img>
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
                <img className="sidebaricon" src="/a1.png"></img>
              </span>
              My Availability
              <img className="arrowdesign" src="arrow.svg"></img>
            </Link> <hr></hr>
            <Link to= "/dashboard/appointments"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleAppoint()}
            > 
              <span>
                <img className="sidebaricon" src="/a2.png" alt=""></img>
              </span>
              Appointments
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
           </Link><hr></hr>
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
                <img className="sidebaricon" src="/Settings.png"></img>
              </span>
              Settings
              <img className="arrowdesign" src="arrow.svg"></img>
            </Link> <hr></hr>
            <Link to= "/dashboard/payments"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleManage()}
            > 
              <span>
                <img className="sidebaricon" src="/m1.png" alt=""></img>
              </span>
              Manage Payment
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
            <Link to= "/dashboard/help"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleHelp()}
            > 
              <span>
                <img className="sidebaricon" src="/Help.png"></img>
              </span>
              Help
              <img className="arrowdesign" src="arrow.svg"></img>
            </Link> <hr></hr>
            <Link to= "/dashboard/aboutus"
                className="list-group"
                role="button" 
                onClick={()=>this.props.toggleAbout()}
            > 
              <span>
                <img className="sidebaricon" src="/about-us.png" alt=""></img>
              </span>
              About Us
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </Link> <hr></hr>
            <div 
              className="list-group log"
              onClick={this.handlelogoutClick}
            >
              <span>
                <img className="sidebaricon" src="/Logout.png" alt=""></img>
              </span>
              LogOut
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null, {logout})(SidebarComponent);