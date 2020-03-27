import React, { Component } from "react";
import "./Dashboard.css";
import { logout } from '../../actions/userActions';
import { connect } from 'react-redux';
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
  
    return (
      <div className="container">
        <div className="sidenav">
          <div className="pointer">
          <a href="/dashboard"
              className="list-group"
              // onClick={this.handledashboardClick}
            >
              <span>
                <img className="sidebaricon" src="/dashboard.svg" alt=""></img>
                Dashboard
              <img className="arrowdesign" src="arrow.svg" alt=""></img></span>
            </a> <hr></hr>
            <a href="/profile"
              className="list-group"
              // onClick={this.handleprofileClick}
            > 
               <span>
                <img className="sidebaricon" src="/profile.png" alt=""></img>
              </span>
              Profile
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </a> <hr></hr>
            {/* <a href="/availability"
              className="list-group"
              // onClick={this.handleavailabilityClick}
            >
              <span>
                <img className="sidebaricon" src="/a1.png"></img>
              </span>
              My Availability
              <img className="arrowdesign" src="arrow.svg"></img>
            </a> <hr></hr> */}
            <a href="/appointments"
              className="list-group"
              // onClick={this.handleappointmentClick}
            >
              <span>
                <img className="sidebaricon" src="/a2.png" alt=""></img>
              </span>
              Appointments
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </a> <hr></hr>
            {/* <a href="/settings"
              className="list-group"
            >
              <span>
                <img className="sidebaricon" src="/Settings.png"></img>
              </span>
              Settings
              <img className="arrowdesign" src="arrow.svg"></img>
            </a> <hr></hr> */}
            <a href="/manage"
              className="list-group"
              // onClick={this.handlemanageClick}
            >
              <span>
                <img className="sidebaricon" src="/m1.png" alt=""></img>
              </span>
              Manage Payment
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </a> <hr></hr>
            {/* <a href="#"
              className="list-group"
              onClick={this.handlehelpClick}
            >
              <span>
                <img className="sidebaricon" src="/Help.png"></img>
              </span>
              Help
              <img className="arrowdesign" src="arrow.svg"></img>
            </a> <hr></hr> */}
            <a href="/aboutus"
              className="list-group"
              // onClick={this.handleaboutClick}
            >
              <span>
                <img className="sidebaricon" src="/about-us.png" alt=""></img>
              </span>
              About Us
              <img className="arrowdesign" src="arrow.svg" alt=""></img>
            </a> <hr></hr>
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