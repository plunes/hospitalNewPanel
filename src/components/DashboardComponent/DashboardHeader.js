import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import { getNotifications } from "../../actions/userActions";
import { sendCounterZero } from "../../actions/userActions";
import history from "../../history";


class DashboardHeader extends Component {
 
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(){
    let unreadN = this.props.unreadNotification
    //console.log(this.props.notificationCount, '656')
    this.props.sendCounterZero(unreadN);
    history.push('/notification')
  }
  async componentDidMount(){
    await this.props.getNotifications()
  }
  render() {
    // console.log(this.props.user, 'user');

        return <div className="Header">
          <div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href=""><img className="logo" src="/pluneslogo.png"  alt='Not available'/></a>
              {/* <div>
                <input className="dashbord-input" name="search" type="search" placeholder="Search" aria-label="Search" autoComplete="off" id="mytInput" onChange={this.onSearchQuery} />
              </div> */}
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav2 nav-item">
                    <a className="nav-link HeaderLink" href = '/payment'>
                      <img className="sol-img" src="/payment.svg" alt='Not available'></img><span className="top-img">Payment</span> 
                    </a>
                  </li>
                  <li className="nav2 nav-item">
                    <div>
                      <a className=" nav-link HeaderLink" rel= "noopener" href="https://www.plunes.com/plockrapp">
                        <img className="sol-img" src="/plockerlogo.svg" alt='Not available'></img><span className="top-img">PLOCKR</span>
                      </a>
                    </div>
                  </li>
                  <li className="nav-item nav2" onClick = {this.handleClick}>
                    <a>
                      <div className="nav-link HeaderLink" ><img className="sol-img" src="/Notification.png" alt='Not available'/><span><span className="badge badge-danger NotifyNum">{this.props.notificationCount}</span><span style={{marginLeft:"8px"}}>Notification</span></span></div>
                    </a>
                  </li>
                  <li className="nav-item nav2">
                    <div className="dropdown">
                      <button className="btn dropdown-align HeaderProfileimg" type="button" data-toggle="dropdown">
                         <img className="sol-img2" src={this.props.user.imageUrl || '/profile.png'}  alt='Not available'/>{this.props.user.name}
                         {/* <img className="HeaderArrowDown" src="/ArrowDown.svg"/> */}
                         </button>
                        <ul className="dropdown-menu profile-font">
                        <li><span><img className="dash-dropdown" src="/d1.png" alt=""/><a href="">View profile</a> </span></li><hr width="80%"/>
                        <li><span><img className="dash-dropdown" src="/dasAppo.png" alt=""/><a href="">Appointments</a></span></li><hr width="80%"/>
                        <li><span><img className="dash-dropdown" src="/Settings.png" alt=""/><a href="">Settings</a></span></li><hr width="80%"/>
                        <li><span><img className="dash-dropdown" src="/Help.png" alt=""/><a href="">Help</a></span></li><hr width="80%"/>
                        <li><span><img className="dash-dropdown" src="/about-us.png" alt=""/><a href="">About Us</a></span></li><hr width="80%"/>
                        <li><span><img className="dash-dropdown" src="/Logout.png" alt=""/><a href="">Log out</a></span></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          
        </div>
        
        }
  }
      


//fetch userDetails reducer
const mapStateToProps = state => ({
  user : state.user.userDetail,
  notificationCount : state.user.unreadCounter,
  unreadNotification: state.user.unreadNotification
})
//export default connect(mapStateToProps, {})(DashboardHeader)
export default connect(mapStateToProps, {getNotifications, sendCounterZero})(DashboardHeader)


// export default DashboardHeader;