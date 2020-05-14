import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import { getNotifications } from "../../actions/userActions";
import { sendCounterZero } from "../../actions/userActions";
import history from "../../history";
import  { Link } from "react-router-dom"



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
  // async componentDidMount(){
  //   await this.props.getNotifications()
  // }
  render() {
    console.log(this.props, 'user');

        return <div className="Header">
          <div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href=""><img className="logo" src="/logo.png"  alt='Not available'/></a>
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
                  <div className="nav-link HeaderLink" >
                  <Link to= "/dashboard/payments"
                    
                        role = "button"
                        onClick = {this.props.togglePayment()}>
                      <img className="sol-img" src="/payment.svg" alt='Not available'></img><span className="top-img">Payment</span> 
                   </Link>
                  </div>
                  </li>
                  <li className="nav2 nav-item">
                    <div>
                      <a className=" nav-link HeaderLink" rel= "noopener" href={`https://www.plunes.com/plockrapp/${localStorage.getItem('token')}`}>
                        <img className="sol-img" src="/plockerlogo.svg" alt='Not available'></img><span className="top-img">Plockr</span>
                      </a>
                    </div>
                  </li>
                  <li className="nav-item nav2" >
                   
                      <div className="nav-link HeaderLink" >
                        <Link to= "/dashboard/notification"
                        role = "button"
                        onClick = {this.props.toggleNotif()}>
                        <img className="sol-img" src="/Notification.png" alt='Not available'/><span><span className="badge badge-danger NotifyNum">{this.props.notificationsData.count!==0?this.props.notificationsData.count:''}</span><span style={{marginLeft:"8px"}}>Notification</span></span>
                         </Link>
                        </div>
                  </li>
                  <li className="nav-item nav2">
                    <div className="nav-link HeaderLink">
                       <Link
                          className="link_class"
                          role = "button"
                           to="/dashboard/profile"
                           onClick = {this.props.toggleProfile()}
                           >
                         <img className="sol-img2" src={this.props.user.imageUrl || '/profile.png'}  alt='Not available'/>{this.props.user.name}
                         </Link>
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
  user : state.user.userDetail
})
//export default connect(mapStateToProps, {})(DashboardHeader)
export default connect(mapStateToProps, {getNotifications, sendCounterZero})(DashboardHeader)


// export default DashboardHeader;