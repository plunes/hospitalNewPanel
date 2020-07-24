import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashboardHeader from '../DashboardComponent/DashboardHeader';
import SidebarComponent from '../DashboardComponent/SidebarComponent';
import DashboardComponent from '../DashboardComponent/DashboardComponent';
import ProfileContainer from '../DashboardComponent/ProfileContainer'
import AppointmentComponent from '../DashboardComponent/AppointmentComponent';
import AvailabilityComponent from '../DashboardComponent/AvailabilityComponent';
import SettingsComponent from '../DashboardComponent/SettingsComponent';
import PaymentComponent from '../DashboardComponent/PaymentComponent';
import HelpComponent from '../DashboardComponent/HelpComponent';
import AboutUsComponent from '../DashboardComponent/AboutUsComponent';
import MyCatalogueComponent from '../DashboardComponent/MyCatalogueComponent';
import AddDoctorComponent from '../DashboardComponent/AddDoctorComponent';
import NotificationComponent from '../DashboardComponent/NotificationComponent';
import { getEntity, getEntityClr, clearSolInsights,
   getInsights, set_dash_data, clr_act_insght, getSolutionInsights,
   getNotifications, clr_get_notif, setMount, set_notif_data, remove_notif_count,
   remove_notif_count_ret, set_notif_count, getUserDetails, get_user_info,
   get_user_info_clr, set_user_info,  get_business, get_business_clr, set_business_data, base_url,
   get_centers, get_centers_clr , set_centers_data, set_location_toggler, clearUpdatePriceData} from "../../actions/userActions"

import { get_real_insight, get_act_insight_loading, get_act_insight, get_real_insight_loading } from "../../actions/dash_actions"
import  { get_user_specialities } from "../../actions/catalogue_actions"
import EditProfileComponent from '../DashboardComponent/EditProfileComponent';
import ChangePassword from '../ChangePassword';
import ManagePaymentComponent from '../DashboardComponent/ManagePaymentComponent';
import io from "socket.io-client"
import Notify from '../functional/Notify';
import { isEmpty } from "../../utils/common_utilities"
import Centers from "../Centers"
import ConnectivityListener from '../ConnectivityListener'
import admin_route from "../../HOC/admin_route"
import protected_route from "../../HOC/protected_route"
import NewNotif from '../functional/NewNotif';
import FullPageLoader from '../functional/FullPageLoader';
import { withRouter } from "react-router"
import './index.css'


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
  changePass:'',
  centers:'',
  notif_socket_triggered:false
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
        centers:'',
        addDoc: '',
        dev: '',
        changePass:'',
        solInsights:[],
        insight:[],
        initial_render:true,
        user_info:{},
        business_data:{},
        notificationsData:{
          count:0,
          notifications:[]
        },
        notifications:[],
        act_insight_loader:false,
        notification:[],
        real_insight_loader:false,
        get_notifs_loading:false,
        centers_name_list:[],
        Notify:{
          success:false,
          error:false
      },
      render_header:true
    }
  }

  set_selected_actionable = (data, price) =>{
    console.log(data,price," data, and price in set_selected_actionable")
    this.setState({
      selected_actionable:data,
      updated_price:price,
      actioanable_update_loading:true
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.updatePriceDataRet){
      if(nextProps.updatePriceDataRet.success){
          let arr = [...this.state.insight]

          let new_arr = arr.map(item=>{
            if(item.serviceId === this.state.selected_actionable.serviceId){
              return { ...this.state.selected_actionable, userPrice:this.state.updated_price  }
            }else {
              return {...item}
            }
          })
         
          this.setState({
             insight:new_arr,
              ret:{
                  success:true,
                  message:`${this.state.selected_actionable.serviceName} price successfully updated in catalogue`
              },
              actioanable_update_loading:false
          })
      }else{
          this.setState({
              ret:{
                  success:false,
                  message:`Unable to update price now, try again later`
              },
              actioanable_update_loading:false
          })
      }
      nextProps.clearUpdatePriceData()
  }
        if(!!nextProps.solInsights){
          this.setState({
              solInsights:nextProps.solInsights,
              real_insight_loader:false
          },()=>{
              nextProps.set_dash_data({...nextProps.dash_data, solInsights:nextProps.solInsights})
              nextProps.clearSolInsights()
          })
      }

      if(nextProps.get_act_insight_ret){
        console.log(nextProps.get_act_insight_ret,"nextProps.get_act_insight_ret")
        if(nextProps.get_act_insight_ret.success){
          this.setState({
              insight:nextProps.get_act_insight_ret.data
          },()=>{
            nextProps.set_dash_data({...nextProps.dash_data, insight:nextProps.get_act_insight_ret.data})
          })
        }else{
          this.setState({
            ret:{
              success:false,
              message:nextProps.get_act_insight_ret.message
            }
          })
        }
        nextProps.get_act_insight_loading()
      }

      if(nextProps.get_real_insight_ret){
      
        if(nextProps.get_real_insight_ret.success){
          this.setState({
            solInsights:nextProps.get_real_insight_ret.data
          },()=>{
            nextProps.set_dash_data({...nextProps.dash_data, solInsights:nextProps.get_real_insight_ret.data})
            // nextProps.clr_act_insght()
          })
        }else{
          this.setState({
            ret:{
              success:false,
              message:nextProps.get_real_insight_ret.message
            }
          })
        }
        nextProps.get_real_insight_loading()
      }
      
      
      if(!!nextProps.insight){
        console.log(nextProps.insight,"nexrsadsd")
        if(!!nextProps.insight.success){
          this.setState({
              insight:nextProps.insight.data,
              act_insight_loader:false
          },()=>{
              nextProps.set_dash_data({...nextProps.dash_data, insight:nextProps.insight})
              nextProps.clr_act_insght()
          })
      }else{
          this.setState({
            ret:{
              success:false,
              message:nextProps.insight.message
            }
          })
          nextProps.clr_act_insght()
      }
      }
        
        if(!!nextProps.notificationData){
          // let data = !!this.state.notif_socket_triggered?[...nextProps.notificationData.notifications]:{...nextProps.notif_data, ...this.state.notificationsData}
          this.setState({
              notificationsData:{
                ...this.state.notificationsData,  ...nextProps.notificationData,
                notifications:!!this.state.notif_socket_triggered?[...nextProps.notificationData.notifications]:[...this.state.notificationsData.notifications,...nextProps.notificationData.notifications],
              },
              notifications:!!this.state.notif_socket_triggered?[...nextProps.notificationData.notifications]:[...this.state.notifications,...nextProps.notificationData.notifications],
              get_notifs_loading:false,
              notif_socket_triggered:!this.state.notif_socket_triggered
          },()=>{
              nextProps.set_notif_data({ ...this.state.notificationsData})
              nextProps.clr_get_notif()
              nextProps.setMount({...this.props.mount,notif_mount:true})
          })
        }

        if(!!nextProps.business_ret){
          // console.log(nextProps.business_ret,"nextProps.business_ret")
          if(nextProps.business_ret.success){
            this.setState({
              business_data:nextProps.business_ret.data,
              get_business_loading:false
          },()=>{
              nextProps.set_dash_data({...nextProps.dash_data, business_data:{...nextProps.business_ret.data}})
              nextProps.get_business_clr()
          })
          }else{
            this.setState({
              ret:{
                success:false,
                message:nextProps.business_ret.message
              }
            })
            nextProps.get_business_clr()
          }
          
      }


        if(!!nextProps.get_user_info_ret){
          // console.log(nextProps.get_user_info_ret,"nextProps.get_user_info_ret")
          if(!!nextProps.get_user_info_ret.success){
                this.setState({
                  user_info:{...nextProps.get_user_info_ret.data},
                  get_user_info_loading:false,
                  
                },()=>{
                  if(!!this.state.user_info.isAdmin){
                    this.setState({
                      get_centers_loading:true
                    },()=>nextProps.get_centers())
                  }
                  nextProps.setMount({...this.props.mount,prof_mount:true})
                  nextProps.set_user_info({...this.state.user_info, from_dash_page:true})
                })
          }else{
              console.log("Error in getting the proifle Details")
          }
          nextProps.get_user_info_clr()
        }

        
        if(!!nextProps.get_centers_ret){
          console.log(nextProps.get_centers_ret.data,"nextProps.get_centers_ret.data")
          // console.log(nextProps.get_user_info_ret,"nextProps.get_user_info_ret")
          if(!!nextProps.get_centers_ret.success){
          
                this.setState({
                  centers_info:{...nextProps.get_centers_ret.data},
                  get_centers_loading:false,
                  centers_name_list:nextProps.get_centers_ret.data.map((item=>{
                    return {
                      name:item.centerLocation,
                      value:item._id
                    }
                  }))
                },()=>{
                  nextProps.setMount({...this.props.mount,centers_mount:true})
                  nextProps.set_centers_data({
                    ...this.props.centers_data,
                    centers_list:[...nextProps.get_centers_ret.data]
                  })
                })
          }else{
              console.log("Error in getting the proifle Details")
          }
          nextProps.get_centers_clr()
        }

        // if(!!this.state.initial_render){
        //   if(!!!isEmpty(nextProps.user.userDetail)){
        //     if(!!!nextProps.user.userDetail.geoLocation){
        //       nextProps.set_location_toggler(true)
        //         // this.setState({
        //         //   initial_render:false,
        //         //   Notify:{
        //         //     ...this.state.Notify,
        //         //     success:{
        //         //       message:'Please make sure to update you location in profile section to avail better services'
        //         //     }
        //         //   }
        //         // })
        //     }
        //   }
        // }

        // if(!!this.props.mount.notif_mount){
        //   if(!!this.props.notif_data){
        //     this.setState({
        //         notificationsData:this.props.notif_data
        //     })
        //   }
        // }
}

  componentDidMount() {
    if (window.location.pathname === '/dashboard') {
      this.setState({
      ...initialState,dash: 'active'

      });
    } else if (window.location.pathname == '/dashboard/profile') {
      this.setState({
      ...initialState,prof:'active'
      });
    }else if (window.location.pathname == '/dashboard/availability') {
      this.setState({
      ...initialState,avail:'active'
      });
    } else if (window.location.pathname == '/dashboard/appointments') {
      this.setState({
      ...initialState,appoint:'active'
      });
    } else if (window.location.pathname == '/dashboard/settings') {
      this.setState({
      ...initialState, settings:'active'
      });
    } else if (window.location.pathname == '/dashboard/manage-payments') {
      this.setState({
    ...initialState,manage:'active'
      });
    }else if (window.location.pathname == '/dashboard/help') {
      this.setState({
    ...initialState,help:'active'
      });
    }else if (window.location.pathname == '/dashboard/aboutus') {
      this.setState({
    ...initialState,about:'active'
      });
    }else if (window.location.pathname == '/dashboard/notification') {
      this.setState({
      ...initialState,notif:'active'
      });
    } else if (window.location.pathname == '/dashboard/payments') {
      this.setState({
    ...initialState,payment:'active'
      });
    } else if (window.location.pathname == '/dashboard/editProfile') {
      this.setState({
      ...initialState,editProf:'active'
      });
    } else if (window.location.pathname == '/dashboard/catalogue') {
      this.setState({
      ...initialState,myCataloge:'active'
      });
    } else if (window.location.pathname == '/dashboard/add-doctor') {
      this.setState({
      ...initialState, addDoc:'active'
      });
    } else if (window.location.pathname == '/dashboard/develoment') {
      this.setState({
      ...initialState, dev:'active'
      });
    }
    else if (window.location.pathname == '/dashboard/change-password') {
      this.setState({
      ...initialState, changePass:'active'
      })
    } else if (window.location.pathname == '/dashboard/centers') {
      this.setState({
      ...initialState, centers:'active'
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
    

   if(!!localStorage.getItem('token')){
     console.log(localStorage.getItem('token')," localStorage.getItem")
    this.props.get_act_insight()
    this.props.get_real_insight()
   }
    // this.props.getSolutionInsights()
    // this.props.getInsights({center:''})
    this.props.getNotifications({page:1})
    this.props.get_business({days:7, center:''})
    this.props.get_user_info({from_dash_page:true})

    // To Establish socket connection
    this.socketEmit()
  }

  get_actionable_insight = (data) =>{
      this.setState({
        act_insight_loader:true
      },()=>this.props.getInsights(data))
  }

  toggleChangePass =()=>{
    this.setState({
     ...initialState,
     changePass:'active',
     render_header:!this.state.render_header
    });
  }

  toggleDash =()=>{
    this.setState({
     ...initialState,
     dash:'active',
     render_header:!this.state.render_header
    });
  }

  toggleProfile = () => {
    this.setState({
     ...initialState,
     prof:'active',
     render_header:!this.state.render_header
    })
  }
  toggleAvail =() =>{
    this.setState({
     ...initialState,
     avail:'active',
     render_header:!this.state.render_header
    });
  }
  toggleAppoint =()=> {
    this.setState({
     ...initialState,
     appoint:'active',
     render_header:!this.state.render_header
    });
  }
  toggleSettings =() => {
    this.setState({
     ...initialState,
     settings:'active',
     render_header:!this.state.render_header
    });
  }
  toggleManage =()=> {
    this.setState({
     ...initialState,
     manage:'active',
     render_header:!this.state.render_header
    });
  }
  toggleHelp =  () => {
    this.setState({
     ...initialState,
     help:'active',
     render_header:!this.state.render_header
    });
  }

  toggleAbout =  () => {
    this.setState({
     ...initialState,
     about:'active',
     render_header:!this.state.render_header
    });
  }

  toggleNotif =  () => {
    this.setState({
     ...initialState,
     notif:'active',
     render_header:!this.state.render_header
    },()=>{
     this.props.remove_notif_count()
    })
  }
  togglePayment =  () => {
    this.setState({
     ...initialState,
     payment:'active',
     render_header:!this.state.render_header
    })
  }
  toggleEditProf =  () => {
    this.setState({
     ...initialState,
     editProf:'active',
     render_header:!this.state.render_header
    });
  }

  toggleMyCatalog =  () => {
    this.setState({
     ...initialState,
     myCataloge:'active',
     render_header:!this.state.render_header
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
  toggleCenters =  () => {
    this.setState({
     ...initialState,
     centers:'active',
     render_header:!this.state.render_header
    });
  }


  socketEmit = () => {
    let data = {
        userId: localStorage.getItem('userId')
      }
      let baseUrl = "https://api.plunes.com?userId="

    const pathLocation = window.location.host;
      if(!!pathLocation) {
         if(pathLocation === 'analytics.plunes.com') {
      // Production baseUrl
              baseUrl = 'https://api.plunes.com?userId='
       }else{
          baseUrl = "https://devapi.plunes.com?userId="
            }
       }
    const socket = io.connect(`${baseUrl}${data.userId}`)



    socket.on('connect', (data) => {
        console.log("Connect event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(data)
    });
    socket.on('realtimeInsight',(data)=>{
        console.log("RealTimeInsights event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(data, "data in realTimeInsight Event")
        this.add_insight(data)
    })
    socket.on('notification',(data)=>{
        console.log("Notification event trigerred >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(data,"data in notification Event")
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
  console.log(data,"data in add_insight")
    this.setState({
        solInsights:[...data,...this.state.solInsights]
    },()=>this.props.set_dash_data({...this.props.dash_data, solInsights:this.state.solInsights}))
}

prompt_success_notify =(data) =>{
    this.setState({
       notif_socket_triggered:true,
        Notify:{
            ...this.state.Notify,
            success:{
                message:data
            }
        }
    },()=>this.props.getNotifications({page:1}))
}

set_notif_count = () =>{
  this.props.set_notif_count(this.state.notificationsData.count+1)
}

getNotifications = (data) =>{
  this.setState({
    get_notifs_loading:true
  },()=>this.props.getNotifications(data))
}

authObject =()=> {
   return {
    isAuthenticated: !!localStorage.getItem('token'),
    isAdmin:this.props.prof_data.isAdmin,
    isCenter:this.props.prof_data.isCenter
   }
}

  render() {
  console.log(this.state,"state in dashboard page")
  // console.log(this.props.get_user_specialities_loading_flag,"props in Dashboard page")
 if(!!localStorage.getItem('token')){
  try {
    if(window.location.pathname==='/dashboard'){
      if(this.props.get_act_insight_loading_flag || this.props.get_real_insight_loading_flag){
        // if(false){
          return (
                  <FullPageLoader />
                )
        }else{
          throw new Error("Dummy Error")
        }
    }else if(false){
      if(this.props.get_user_specialities_loading_flag){
        // if(false){
          return (
                  <FullPageLoader />
                )
        }else {
          throw new Error("Dummy Error")
        }
    }
  } catch (error) {
      console.log(error)
  }
 }



    if(!!!localStorage.getItem('token')){
      return <Redirect
      to={{
        pathname : '/signin'
      }}
    />
    }
    return (
           <React.Fragment>
               <NewNotif 
                ret = {this.state.ret}
                retClr = {()=>this.setState({ret:false})}
               />
                 <Notify  
                        success={this.state.Notify.success}
                        autoDismiss = {this.state.initial_render?false:true}
                        error={this.state.Notify.error}
                        clear = {()=>this.setState({Notify:{success:false,error:false}})}
                        />
                <div className="main-body-wrapper">
                        <DashboardHeader
                          toggleNotif = {this.toggleNotif}
                          togglePayment = {this.togglePayment}
                          toggleProfile = {this.toggleProfile}
                          notificationsData = {this.state.notificationsData}
                          remove_notif_count_ret = {this.props.remove_notif_count_ret}
                          notif_count_flag = {this.props.notif_count_flag}
                          count = {this.props.notif_data.count}
                          prof_data = {this.props.prof_data}
                          authObject = {this.authObject}
                        />
                            <SidebarComponent
                              prompt_success_notify = {this.prompt_success_notify}
                              toggleProfile = {this.toggleProfile}
                              toggleDash = {this.toggleDash}
                              toggleMyCatalog = {this.toggleMyCatalog}
                              toggleAvail = {this.toggleAvail}
                              toggleAppoint = {this.toggleAppoint}
                              toggleSettings = {this.toggleSettings}
                              toggleManage = {this.toggleManage}
                              toggleHelp = {this.toggleHelp}
                              toggleAbout = {this.toggleAbout}
                              toggleCenters = {this.toggleCenters}
                              user_info = {this.state.user_info}
                              pathname ={window.location.pathname}
                            />
                  <div id="content" className="main_body_flex_content">
                  {(window.location.pathname === '/dashboard')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=><DashboardComponent
                    get_actionable_insight = {this.get_actionable_insight}
                    centers_name_list = {this.state.centers_name_list}
                    get_centers_loading = {this.state.get_centers_loading}
                    business_data = {this.props.dash_data.business_data}
                    solInsights = {this.state.solInsights}
                    insight = {this.state.insight}
                    get_act_insight_laoding_flag = {this.state.real_insight_loader}
                    act_insight_loader = {this.state.act_insight_loader}
                    get_act_insight_loading_flag = {this.props.get_act_insight_loading_flag}
                    get_real_insight_loading_flag = {this.props.get_real_insight_loading_flag}     
                    set_selected_actionable = {this.set_selected_actionable}       
                    actioanable_update_loading = {this.state.actioanable_update_loading}
                    />)
                   :(window.location.pathname === '/dashboard/profile')?
                   protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=><ProfileContainer
                  toggleProfile = {this.toggleProfile}
                  toggleMyCatalog = {this.toggleMyCatalog}
                  toggleAddDoc = {this.toggleAddDoc}
                  />)
                  :(window.location.pathname === '/dashboard/appointments')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=><AppointmentComponent />)
                  :(window.location.pathname === '/dashboard/availability')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=><AvailabilityComponent />)
                  :(window.location.pathname === '/dashboard/settings')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=> <SettingsComponent
                  toggleEditProf = {this.toggleEditProf}
                  toggleChangePass = {this.toggleChangePass}
                />)
                 :(window.location.pathname === '/dashboard/manage-payment')?
                 admin_route({
                  authObject:this.authObject,
                  passed_func:()=>console.log("From the passed Dunc")
                })(()=> <ManagePaymentComponent />)
                  :(window.location.pathname === '/dashboard/help')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=> <HelpComponent />)
                  :(window.location.pathname === '/dashboard/aboutus')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=>  <AboutUsComponent />)
                 :(window.location.pathname === '/dashboard/aboutus')?
                 protected_route({
                  authObject:this.authObject,
                  logout:this.props.logout
                })(()=> <ProfileContainer />)
                 :(window.location.pathname === '/dashboard/catalogue')?
                 protected_route({
                  authObject:this.authObject,
                  logout:this.props.logout
                })(()=> <MyCatalogueComponent />)
                  :(window.location.pathname === '/dashboard/add-doctor')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=>  <AddDoctorComponent
                  location = {window.location}
                />)
                 :(window.location.pathname === '/dashboard/notification')?
                 protected_route({
                  authObject:this.authObject,
                  logout:this.props.logout
                })(()=><NotificationComponent
                notifications = {this.state.notifications}
                get_notifs_loading = {this.state.get_notifs_loading}
                total_count = {this.props.notif_data.totalCount}
                getNotifications = {this.getNotifications}
                page_count = {this.props.notif_data.page_count}
                />)
                :(window.location.pathname === '/dashboard/editProfile')?
                protected_route({
                  authObject:this.authObject,
                  logout:this.props.logout
                })(()=><EditProfileComponent />)
                  :(window.location.pathname === '/dashboard/change-password')?
                  protected_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=> <ChangePassword />)
                 :(window.location.pathname === '/dashboard/payments')?
                 protected_route({
                  authObject:this.authObject,
                  logout:this.props.logout
                })(()=> <PaymentComponent />)
                  :(window.location.pathname === '/dashboard/centers')?
                  admin_route({
                    authObject:this.authObject,
                    logout:this.props.logout
                  })(()=> <Centers
                   get_centers_loading ={this.state.get_centers_loading}
                   location = {window.location}
                  />):''}
              </div>
        </div>
        </React.Fragment>
      
    )
  }
}


const mapStateToProps = state => ({
    user: state.user,
    dash_data:state.user.data.dash_data,
    mount:state.user.mount,
    solInsights:state.user.solInsights,
    insight: state.user.insightData,
    business_ret:state.user.business_ret,
    notificationData: state.user.notificationData,
    notif_data:state.user.data.notif_data,
    notif_count_flag:state.user.notifCountFlag,
    prof_data:state.user.data.prof_data,
    get_user_info_ret:state.user.get_user_info_ret,
    get_centers_ret:state.user.get_centers_ret,
    centers_data:state.user.data.centers_data,
    get_act_insight_ret:state.dash_store.get_act_insight_ret,
    get_act_insight_loading_flag:state.dash_store.get_act_insight_loading,
    get_real_insight_ret:state.dash_store.get_real_insight_ret,
    get_real_insight_loading_flag:state.dash_store.get_real_insight_loading,
    get_user_specialities_loading_flag:state.catalogue_store.get_user_specialities_loading,
    updatePriceDataRet:state.user.updatePriceDataRet
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
set_notif_count,
getUserDetails,
get_user_info,
get_user_info_clr,
set_user_info,
get_business,
get_business_clr,
set_business_data,
base_url,
get_centers,
get_centers_clr,
set_location_toggler,
set_centers_data,
get_real_insight,
get_real_insight_loading,
get_act_insight,
get_act_insight_loading,
get_user_specialities,
clearUpdatePriceData
})(DashboardPage);

