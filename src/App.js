import React, { Component } from 'react';
import './App.css';
import history from './history';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import RegistrationContainer from './components/RegistrationComponent/RegistrationContainer';
import LoginComponent from './components/LoginComponent/LoginComponent';
import ForgotPasswordComponent from "./components/ChangePasswordComponent"
import { getUserDetails } from "../src/actions/userActions";
import { messaging } from "./init-fcm";
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { getNotifications } from "../src/actions/userActions";
import { getSolutionInsights } from "../src/actions/userActions";
import Development from './components/Development'
import DashboardPage from './components/DashboardPage'

const Greet = ({ message }) => <div>
  <div>{message.title}</div>
  <div>{message.body}</div>
</div>


class App extends Component {

  async componentDidMount() {
    let token = localStorage.getItem('token');
    if (token) {
      await this.props.getUserDetails()
    }
    messaging.requestPermission()
      .then(async function () {
        
        const token = await messaging.getToken();
        console.log(token,"token In Messaging.request permissions")
        localStorage.setItem('deviceId', token)
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", async (message) => {
      //console.log('message')
      //console.log(message, 'message')
      if(message.data.firebaseMessaging.payload.notification){
        let obj = {
          body: message.data.firebaseMessaging.payload.notification.body,
          title: message.data.firebaseMessaging.payload.notification.title
        }
        // await this.props.getSolutionInsights()
        // await this.props.getNotifications()
        toast(<Greet message={obj} />)
      }
      //this.props.countNewNotification()
    }
    );
  }

  render() {
  
    const App = () => (
    
      <Router history={history}>
          <Switch>
          <div className="container-fluid">
            <Route exact path='/' component={Development} />
            <Route exact path ="/signin" component={LoginComponent} />
            <Route exact path='/signup' component={RegistrationContainer} />
            <Route exact path='/home' component={Development} />
            <Route  path='/dashboard' component={DashboardPage} />
            <Route exact path='/forgotPassword' component={ForgotPasswordComponent} />
            <Route exact path='/devlopment' component={Development} />
            </div>
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

