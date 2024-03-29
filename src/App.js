import React, { Component } from 'react';
import './App.css';
import history from './history';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import RegistrationContainer from './components/RegistrationComponent/RegistrationContainer';
import LoginComponent from './components/LoginComponent/LoginComponent';
import ForgotPasswordComponent from "./components/ChangePasswordComponent"
import { getUserDetails } from "../src/actions/userActions";
// import { messaging } from "./init-fcm";
import 'react-toastify/dist/ReactToastify.min.css'
// import 'bootstrap/less/bootstrap.less'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { getNotifications } from "../src/actions/userActions";
import { getSolutionInsights } from "../src/actions/userActions";
import Development from './components/Development'
import DashboardPage from './components/DashboardPage'
import './common.css'
import './catalogue.css'
import './appointment.css'
import './full_page_loader.css'
import './checkbox_pill.css'
import './button.css'
import "react-image-gallery/styles/css/image-gallery.css";
import './sass/main.scss'
import HomePage from './components/HomePage';
import Login from './components/functional/Login';
import no_auth_route from "./HOC/no_auth_route"

import "react-alice-carousel/lib/alice-carousel.css";
import 'video-react/dist/video-react.css';

const Greet = ({ message }) => <div>
  <div>{message.title}</div>
  <div>{message.body}</div>
</div>


class App extends Component {

  async componentDidMount() {
    console.log("Injecting jquery")
    let script = document.createElement("script");

    script.src = "https://code.jquery.com/jquery-2.2.4.min.js";
    script.async = true;
    script.crossorigin="anonymous"
  
    document.head.appendChild(script);
    let token = localStorage.getItem('token');
    if (token) {
      await this.props.getUserDetails()
    }
    // messaging.requestPermission()
      // .then(async function () {
        
      //   const token = await messaging.getToken();
      //   console.log(token,"token In Messaging.request permissions")
      //   localStorage.setItem('deviceId', token)
      // })
      // .catch(function (err) {
      //   console.log("Unable to get permission to notify.", err);
      // });
    // navigator.serviceWorker.addEventListener("message", async (message) => {
    //   //console.log('message')
    //   //console.log(message, 'message')
    //   if(message.data.firebaseMessaging.payload.notification){
    //     let obj = {
    //       body: message.data.firebaseMessaging.payload.notification.body,
    //       title: message.data.firebaseMessaging.payload.notification.title
    //     }
    //     // await this.props.getSolutionInsights()
    //     // await this.props.getNotifications()
    //     toast(<Greet message={obj} />)
    //   }
      //this.props.countNewNotification()
    // }
    // );
  }

  authObject =()=> {
    return {
     isAuthenticated: !!localStorage.getItem('token')
    }
 }
 
  render() {
  
    const App = () => (
    
      <Router history={history}>
          <Switch>
            <Route exact path='/' component={()=>no_auth_route({
                    authObject:this.authObject
                  })(()=><HomePage />)} />
            <Route exact path ="/signin" component={()=>no_auth_route({
                    authObject:this.authObject
                  })(()=><div className="container-fluid"><LoginComponent /></div>)} />
            <Route exact path='/signup' component={()=>no_auth_route({
                    authObject:this.authObject
                  })(()=><div className="container-fluid"><RegistrationContainer /></div>)} />
            <Route exact path='/home' component={Development} />
            <Route  path='/dashboard' component={DashboardPage} />
            <Route exact path='/forgotPassword' component={()=>no_auth_route({
                    authObject:this.authObject
                  })(()=><div className="container-fluid"><ForgotPasswordComponent /></div>)} />
            <Route exact path='/devlopment' component={Development} />
          </Switch>
        
        <ToastContainer  position={toast.POSITION.TOP_LEFT} />
      </Router>
    
    )
    return (
      <Switch>
        <App />
      </Switch>
    )
  }
}

export default connect(null, { getUserDetails, getNotifications, getSolutionInsights})(App)

