import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashboardHeader from '../DashboardComponent/DashboardHeader';
import SidebarComponent from '../DashboardComponent/SidebarComponent';
import DashboardComponent from '../DashboardComponent/DashboardComponent';
import ProfileComponent from '../DashboardComponent/ProfileComponent';
import ProfileContainer from '../DashboardComponent/ProfileContainer'
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
import { getEntity, getEntityClr, clearSolInsights,
   getInsights, set_dash_data, clr_act_insght, getSolutionInsights,
   getNotifications, clr_get_notif, setMount, set_notif_data, remove_notif_count,
   remove_notif_count_ret, set_notif_count } from "../../actions/userActions"
import EditProfileComponent from '../DashboardComponent/EditProfileComponent';
import ChangePassword from '../ChangePassword';
import ManagePaymentComponent from '../DashboardComponent/ManagePaymentComponent';
import io from "socket.io-client"
import Notify from '../functional/Notify';

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
  dev: '',
  changePass:''
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
        dev: '',
        changePass:'',
        solInsights:[],
        insight:[],
        notificationsData:{
          count:0,
          notifications:[]
        },
        act_insight_loader:false,
        real_insight_loader:false,
        get_notifs_loading:false,
        Notify:{
          success:false,
          error:false
      }
    }
  }

  componentWillReceiveProps(nextProps){
        if(!!nextProps.solInsights){
          this.setState({
              solInsights:nextProps.solInsights,
              real_insight_loader:false
          },()=>{
              nextProps.set_dash_data({...nextProps.dash_data, solInsights:nextProps.solInsights})
              nextProps.clearSolInsights()
          })
      }
        if(!!nextProps.insight){
          this.setState({
              insight:nextProps.insight,
              act_insight_loader:false
          },()=>{
              nextProps.set_dash_data({...nextProps.dash_data, insight:nextProps.insight})
              nextProps.clr_act_insght()
          })
      }
        if(!!nextProps.notificationData){
          console.log(nextProps.notificationData,"notoficationData in Will ReceiveProps")
          this.setState({
              notificationsData:{
                ...this.state.notificationsData,  ...nextProps.notificationData,
                notifications:[...this.state.notificationsData.notifications,...nextProps.notificationData.notifications ]
              },
              get_notifs_loading:false
          },()=>{
              nextProps.set_notif_data({...nextProps.notif_data, ...this.state.notificationsData})
              nextProps.clr_get_notif()
              nextProps.setMount({...this.props.mount,notif_mount:true})
          })
        }
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
    } else if (this.props.location.pathname == '/dashboard/manage-payments') {
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
    else if (this.props.location.pathname == '/dashboard/change-password') {
      this.setState({
      ...initialState, changePass:'active'
      })
    }
    this.setState({
      act_insight_loader:true,
      real_insight_loader:true,
      get_notifs_loading:true
    })

    if(!!this.props.mount.dash_mount){
      if(this.props.dash_data){
        this.setState({
          solInsights:this.props.dash_data.solInsights,
          insight:this.props.dash_data.insight,
        })
      }
    }

    if(!!this.props.mount.notif_mount){
          if(!!this.props.notif_data){
          this.setState({
              notificationsData:this.props.notif_data
          })
        }
    }
    this.props.getSolutionInsights()
    this.props.getInsights()
    this.props.getNotifications({page:1})
    this.socketEmit()
  }

  toggleChangePass =()=>{
    this.setState({
     ...initialState,
     changePass:'active'
    });
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
    },()=>{
      console.log("Inside Remove ToggleNotif")
     this.props.remove_notif_count()
    })
  }
  togglePayment =  () => {
    this.setState({
     ...initialState,
     payment:'active'
    })
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

  socketEmit = () => {
    let data = {
        userId: localStorage.getItem('userId')
      }
    const socket = io.connect(`https://devapi.plunes.com?userId=${data.userId}`)
    socket.on('connect', (data) => {
        console.log("Connect event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(data)
    });
    socket.on('realtimeInsight',(data)=>{
        console.log("RealTimeInsights event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(data)
        this.add_insight(data)
    })
    socket.on('notification',(data)=>{
        console.log("Notification event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(data)
        this.prompt_success_notify(data)
        this.set_notif_count()
    })
    socket.on('disconnect', (data) => {
        console.log("Disconnect event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        socket.emit('join', data)
    })
    socket.on('error',  (err) => {
        console.log("Error event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        socket.emit('join', data)
        console.log('SOCKET ERR : ', err);
    })
}

add_insight = (data) =>{
    this.setState({
        solInsights:[data[0],...this.state.solInsights]
    },()=>this.props.set_dash_data({...this.props.dash_data, solInsights:this.state.solInsights}))
}

prompt_success_notify =(data) =>{
    this.setState({
        Notify:{
            ...this.state.Notify,
            success:{
                message:data
            }
        }
    })
}

set_notif_count = () =>{
  this.props.set_notif_count(this.state.notificationsData.count+1)
}

getNotifications = (data) =>{
  this.setState({
    get_notifs_loading:true
  },()=>this.props.getNotifications(data))
}

  render() {
    console.log(this.state,"this.state in DasboardPage")
    console.log(this.props,"this.props in DasboardPage")

    if(!!!localStorage.getItem('token')){
      return <Redirect
      to={{
        pathname : '/'
      }}
    />
    }
    return (
             <div>
                 <Notify  
                        success={this.state.Notify.success}
                        error={this.state.Notify.error}
                        clear = {()=>this.setState({Notify:{success:false,error:false}})}
                        />
                    <div className='row'>
                        <DashboardHeader
                          toggleNotif = {this.toggleNotif}
                          togglePayment = {this.togglePayment}
                          toggleProfile = {this.toggleProfile}
                          notificationsData = {this.state.notificationsData}
                          remove_notif_count_ret = {this.props.remove_notif_count_ret}
                          notif_count_flag = {this.props.notif_count_flag}
                        />
                    </div>
                    <div className="container-fluid">
                    <div className='row main-body-wrapper'>
                        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2 side_br'>
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
                  <DashboardComponent
                  solInsights = {this.state.solInsights}
                  insight = {this.state.insight}
                  real_insight_loader = {this.state.real_insight_loader}
                  act_insight_loader = {this.state.act_insight_loader}                
                  /> :(this.props.location.pathname == '/dashboard/profile')?
                  <ProfileContainer
                  toggleProfile = {this.toggleProfile}
                  toggleMyCatalog = {this.toggleMyCatalog}
                  toggleAddDoc = {this.toggleAddDoc}
                  />:(this.props.location.pathname == '/dashboard/appointments')?
                  <AppointmentComponent />:(this.props.location.pathname == '/dashboard/availability')?
                  <AvailabilityComponent />:(this.props.location.pathname == '/dashboard/settings')?
                  <SettingsComponent
                    toggleEditProf = {this.toggleEditProf}
                    toggleChangePass = {this.toggleChangePass}
                  />:(this.props.location.pathname == '/dashboard/manage-payment')?
                  <ManagePaymentComponent />:(this.props.location.pathname == '/dashboard/help')?
                  <HelpComponent />:(this.props.location.pathname == '/dashboard/aboutus')?
                  <AboutUsComponent />:(this.props.location.pathname == '/dashboard/aboutus')?
                  <ProfileContainer />:(this.props.location.pathname == '/dashboard/my-catalogue')?
                  <MyCatalogueComponent />:(this.props.location.pathname == '/dashboard/add-doctor')?
                  <AddDoctorComponent
                    location = {this.props.location}
                  />:(this.props.location.pathname == '/dashboard/notification')?
                  <NotificationComponent
                  notifications = {this.state.notificationsData.notifications}
                  get_notifs_loading = {this.state.get_notifs_loading}
                  total_count = {this.props.notif_data.totalCount}
                  getNotifications = {this.getNotifications}
                  />:(this.props.location.pathname == '/dashboard/editProfile')?
                  <EditProfileComponent />:(this.props.location.pathname == '/dashboard/change-password')?
                  <ChangePassword />:(this.props.location.pathname == '/dashboard/payments')?
                  <PaymentComponent />:''}
        </div>
        </div>
        </div>
    )
  }
}


const mapStateToProps = state => ({
    user: state.user,
    dash_data:state.user.data.dash_data,
    mount:state.user.mount,
    solInsights:state.user.solInsights,
    insight: state.user.insightData,
    notificationData: state.user.notificationData,
    notif_data:state.user.data.notif_data,
    notif_count_flag:state.user.notifCountFlag
})

export default connect(mapStateToProps, { 
getEntity,
getEntityClr,
clearSolInsights,
getInsights,
set_dash_data,
clr_act_insght,
set_notif_data,
getSolutionInsights,
getNotifications,
clr_get_notif,
setMount,
remove_notif_count,
remove_notif_count_ret,
set_notif_count
})(DashboardPage);

