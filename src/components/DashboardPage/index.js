import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashboardHeader from '../DashboardComponent/DashboardHeader';
import SidebarComponent from '../DashboardComponent/SidebarComponent';
import DashboardComponent from '../DashboardComponent/DashboardComponent';
import ProfileComponent from '../DashboardComponent/ProfileComponent';
import ProfileContainer from '../DashboardComponent/ProfileContainer'
import { addServicesClr } from "../../actions/userActions"
import AppointmentComponent from '../DashboardComponent/AppointmentComponent';
import AvailabilityComponent from '../DashboardComponent/AvailabilityComponent';
import SettingsComponent from '../DashboardComponent/SettingsComponent';
import PaymentComponent from '../DashboardComponent/PaymentComponent';
import HelpComponent from '../DashboardComponent/HelpComponent';
import AboutUsComponent from '../DashboardComponent/AboutUsComponent';
import MyCatalogueComponent from '../DashboardComponent/MyCatalogueComponent';
import DoctorComponent from '../functional/DoctorComponent';
import AddDoctorComponent from '../DashboardComponent/AddDoctorComponent';
import NotificationComponent from '../DashboardComponent/NotificationComponent';
const initialState = {
  dash: '',
  prof: '',
  avail: '',
  appoint: '',
  settings: '',
  manage: '',
  help: '',
  about: '',
  notif: '',
  payment: '',
  editProf: '',
  myCataloge: '',
  addDoc: '',
  dev: ''
}
export class DashboardPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
        dash: 'active',
        prof: '',
        avail: '',
        appoint: '',
        settings: '',
        manage: '',
        help: '',
        about: '',
        notif: '',
        payment: '',
        editProf: '',
        myCataloge: '',
        addDoc: '',
        dev: ''
    };
   
  }
  componentWillMount() {
  }
  componentDidMount() {
    if (this.props.location.pathname == '/dashboard') {
      this.setState({
      ...initialState,dash: 'active'

      });
    } else if (this.props.location.pathname == '/dashboard/profile') {
      this.setState({
      ...initialState,prof:'active'
      });
    }else if (this.props.location.pathname == '/dashboard/availability') {
      this.setState({
      ...initialState,avail:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/appointments') {
      this.setState({
      ...initialState,appoint:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/settings') {
      this.setState({
      ...initialState, settings:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/manage') {
      this.setState({
    ...initialState,manage:'active'
      });
    }else if (this.props.location.pathname == '/dashboard/help') {
      this.setState({
    ...initialState,help:'active'
      });
    }else if (this.props.location.pathname == '/dashboard/aboutus') {
      this.setState({
    ...initialState,about:'active'
      });
    }else if (this.props.location.pathname == '/dashboard/notification') {
      this.setState({
      ...initialState,notif:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/payments') {
      this.setState({
    ...initialState,payment:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/editProfile') {
      this.setState({
      ...initialState,editProf:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/my-catalogue') {
      this.setState({
      ...initialState,myCataloge:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/add-doctor') {
      this.setState({
      ...initialState, addDoc:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/develoment') {
      this.setState({
      ...initialState, dev:'active'
      });
    }
  }


  toggleDash =()=>{
    this.setState({
     ...initialState,
     dash:'active'
    });
  }

  toggleProfile = () => {
    this.setState({
     ...initialState,
     prof:'active'
    });
  }
  toggleAvail =() =>{
    this.setState({
     ...initialState,
     avail:'active'
    });
  }
  toggleAppoint =()=> {
    this.setState({
     ...initialState,
     appoint:'active'
    });
  }
  toggleSettings =() => {
    this.setState({
     ...initialState,
     settings:'active'
    });
  }
  toggleManage =()=> {
    this.setState({
     ...initialState,
     manage:'active'
    });
  }
  toggleHelp =  () => {
    this.setState({
     ...initialState,
     help:'active'
    });
  }

  toggleAbout =  () => {
    this.setState({
     ...initialState,
     about:'active'
    });
  }

  toggleNotif =  () => {
    this.setState({
     ...initialState,
     notif:'active'
    });
  }
  togglePayment =  () => {
    this.setState({
     ...initialState,
     payment:'active'
    });
  }
  toggleEditProf =  () => {
    this.setState({
     ...initialState,
     editProf:'active'
    });
  }

  toggleMyCatalog =  () => {
    this.setState({
     ...initialState,
     myCataloge:'active'
    });
  }
  toggleAddDoc =  () => {
    this.setState({
     ...initialState,
     addDoc:'active'
    });
  }
  toggleDevelopment =  () => {
    this.setState({
     ...initialState,
     dev:'active'
    });
  }

  render() {
    console.log(this.props,"props in DasboardPage")
    return (
             <div>
                    <div className='row'>
                        <DashboardHeader
                          toggleNotif = {this.toggleNotif}
                        />
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <SidebarComponent
                              toggleProfile = {this.toggleProfile}
                              toggleDash = {this.toggleDash}
                              toggleAvail = {this.toggleAvail}
                              toggleAppoint = {this.toggleAppoint}
                              toggleSettings = {this.toggleSettings}
                              toggleManage = {this.toggleManage}
                              toggleHelp = {this.toggleHelp}
                              toggleAbout = {this.toggleAbout}
                            />
                        </div>
                  {(this.props.location.pathname == '/dashboard')?
                  <DashboardComponent /> :(this.props.location.pathname == '/dashboard/profile')?
                  <ProfileContainer
                  toggleProfile = {this.toggleProfile}
                  toggleMyCatalog = {this.toggleMyCatalog}
                  toggleAddDoc = {this.toggleAddDoc}
                  />:(this.props.location.pathname == '/dashboard/appointments')?
                  <AppointmentComponent />:(this.props.location.pathname == '/dashboard/availability')?
                  <AvailabilityComponent />:(this.props.location.pathname == '/dashboard/settings')?
                  <SettingsComponent />:(this.props.location.pathname == '/dashboard/payments')?
                  <PaymentComponent />:(this.props.location.pathname == '/dashboard/help')?
                  <HelpComponent />:(this.props.location.pathname == '/dashboard/aboutus')?
                  <AboutUsComponent />:(this.props.location.pathname == '/dashboard/aboutus')?
                  <ProfileContainer />:(this.props.location.pathname == '/dashboard/my-catalogue')?
                  <MyCatalogueComponent />:(this.props.location.pathname == '/dashboard/add-doctor')?
                  <AddDoctorComponent />:(this.props.location.pathname == '/dashboard/notification')?
                  <NotificationComponent/>:''}
        </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { 
addServicesClr
})(DashboardPage);

