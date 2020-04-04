import React, { Component } from 'react';
import './App.css';
import history from './history';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import RegistrationContainer from './components/RegistrationComponent/RegistrationContainer';
import LoginComponent from './components/LoginComponent/LoginComponent';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import ForgotPasswordComponent from './components/LoginComponent/ForgotPassword';
import ProfileComponent from './components/DashboardComponent/ProfileComponent';
import AvailabilityComponent from './components/DashboardComponent/AvailabilityComponent';
import AppointmentComponent from './components/DashboardComponent/AppointmentComponent';
import SettingsComponent from './components/DashboardComponent/SettingsComponent';
import ManagePaymentComponent from './components/DashboardComponent/ManagePaymentComponent';
import HelpComponent from './components/DashboardComponent/HelpComponent';
import AboutUsComponent from './components/DashboardComponent/AboutUsComponent';
//import LogoutComponent from './components/DashboardComponent/LogoutComponent';
// import { connect } from 'react-redux';
import { getUserDetails } from "../src/actions/userActions";
// import { countNewNotification } from "../src/actions/userActions";
import { messaging } from "./init-fcm";
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import NotificationComponent from './components/DashboardComponent/NotificationComponent';
import PaymentComponent from './components/DashboardComponent/PaymentComponent';
import EditProfileComponent from './components/DashboardComponent/EditProfileComponent';
import CatalogueComponent from './components/DashboardComponent/CatalogueComponent';
import { getNotifications } from "../src/actions/userActions";
// import { Redirect } from 'react-router-dom';

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
        //console.log(token)
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
        await this.props.getNotifications()
        toast(<Greet message={obj} />)
      }
    
      //this.props.countNewNotification()
    }
    );
  }

  render() {
  
    const App = () => (
      <Router history={history}>
        <div className='container-fluid'>
          <Switch>
            <Route exact path='/' component={LoginComponent} />
            <Route exact path='/signup' component={RegistrationContainer} />
            <Route exact path='/dashboard' component={DashboardComponent} />
            <Route exact path='/forgotPassword' component={ForgotPasswordComponent} />
            <Route exact path='/profile' component={ProfileComponent} />
            <Route exact path='/availability' component={AvailabilityComponent} />
            <Route exact path='/appointments' component={AppointmentComponent} />
            <Route exact path='/settings' component={SettingsComponent} />
            <Route exact path='/manage' component={ManagePaymentComponent} />
            <Route exact path='/help' component={HelpComponent} />
            <Route exact path='/aboutus' component={AboutUsComponent} />
            <Route exact path='/notification' component={NotificationComponent} />
            <Route exact path='/payment' component={PaymentComponent} />
            <Route exact path='/editProfile' component={EditProfileComponent} />
            <Route exact path='/myCatalogue' component={CatalogueComponent} />
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    )
    return (
      <Switch>
        <App />
      </Switch>
    )
  }
}

export default connect(null, { getUserDetails, getNotifications})(App)

