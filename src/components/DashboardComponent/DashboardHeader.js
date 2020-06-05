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
    // this.props.sendCounterZero(unreadN);
    history.push('/notification')
  }

  componentWillReceiveProps(nextProps){
    if(!!nextProps.notif_count_flag){
      console.log("Nextropsin dashboard header")
      nextProps.remove_notif_count_ret()
    }
  }
  // async componentDidMount(){
  //   await this.props.getNotifications()
  // }
  render() {
    console.log(this.props,'props in HeaderCompoent');

        return <div className="Header">
          <div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href=""><img className="logo" src="/logo.jpg"  alt='Not available'/></a>
              {/* <div>
                <input className="dashbord-input" name="search" type="search" placeholder="Search" aria-label="Search" autoComplete="off" id="mytInput" onChange={this.onSearchQuery} />
              </div> */}

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                 {this.props.prof_data.isAdmin &&  <li className="nav2 nav-item">
                  <div className="nav-link HeaderLink" >
                  <Link to= "/dashboard/payments"
                    
                        role = "button"
                        onClick = {this.props.togglePayment()}>
                      <img className="sol-img" src="/payment.svg" alt='Not available'></img><span className="top-img">Payment</span> 
                   </Link>
                  </div>
                  </li>}
                  <li className="nav2 nav-item">
                    <div>
                      <a className=" nav-link HeaderLink" rel= "noopener" target="_blanck" href={`https://plockr.plunes.com/auth/${localStorage.getItem('token')}`}>
                        <img className="sol-img" src="/plockerlogo.svg" alt='Not available'></img><span className="top-img">Plockr</span>
                      </a>
                    </div>
                  </li>
                  <li className="nav-item nav2" >
                   
                      <div className="nav-link HeaderLink" >
                        <Link to= "/dashboard/notification"
                        role = "button"
                        onClick = {()=>this.props.toggleNotif()}>
                        <img className="sol-img" src="/Notification.jpg" alt='Not available'/><span><span className="badge badge-danger NotifyNum">{this.props.count!==0?this.props.count:''}</span><span style={{marginLeft:"8px"}}>Notification</span></span>
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
                         <img className="sol-img2" src={this.props.prof_data.imageUrl || '/profile.jpg'}  alt='Not available'/>{this.props.user.name}
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
  user : state.user.userDetail,
  prof_data:state.user.data.prof_data
})
//export default connect(mapStateToProps, {})(DashboardHeader)
export default connect(mapStateToProps, {getNotifications, sendCounterZero})(DashboardHeader)


// export default DashboardHeader;