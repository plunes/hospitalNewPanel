import React from 'react';
import { connect } from 'react-redux';
// import { expertDetails } from '../../actions/userActions';
import './Profile.css';
import Modal from "react-responsive-modal";
import { expertDetails, upload, uploadRetClr, updateImage, updateImageClr,
   getProfileDetails, updateBanner, updateBannerClr, updateAchievement, updateAchievementClr, editBio, editBioClr,
   getUserDetails, edit_location_clr, edit_location, get_user_info, set_user_info, set_open_map, set_center_data, get_center_profile, get_center_profile_clr,
   set_location_toggler } from "../../actions/userActions";
import ProfileImage from '../functional/ProfileImage';
import ProfileBanner from '../functional/ProfileBanner';
import DoctorComponent from "../functional/DoctorComponent"
import EditBio from '../functional/EditBio';
import ModalComponent from "../ModalComponent"
import AddAchievement from '../functional/AddAchievement';
import { Redirect, withRouter, Link } from 'react-router-dom';
import locationImage from "../../images/Location.jpg"
import Notify from '../functional/Notify';
import Map from "../MapComponent/index.js"
import { isEmpty , get_url_params} from "../../utils/common_utilities"
import ScrollTo from "../functional/ScrollTo"
import { compose } from 'redux';
const options = {
  items: 2,
  margin: 0,
  nav: true,
  navText: [ '<', '>' ],
  rewind: true,
  autoplay: true
};
const events = {
  onDragged: function(event) {},
  onChanged: function(event) {}
};
class ProfileContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flag_for_map:true,
      prof_data:{
        achievements:[]
      },
      file: null,
      open: false,
      doctors: [],
      doctorId: '',
      doctor_name : '',
      doctor_education : '',
      doctor_designation : '',
      doctor_department : '',
      doctor_experience : '',
      loadingBanner:false,
      loadingProfileImage:false,
      loading:false,
      user:'',
      editBioFlag:false,
      achievementImage:false,
      get_profile_loading:false,
      show_doctor_count:4,
      scroll_to_active:false,
      notify:{
        success:false,
        error:false
    }
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleAddExpert = this.handleAddExpert.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.achievementSuccess = this.achievementSuccess.bind(this)
  }


  componentWillReceiveProps(nextProps){

    if(!!nextProps.location.state){
      if(!!nextProps.location.state.add_center_success){
          this.setState({
              ret:{
                  success:true,
                  message:'Doctor successfully added.'
              }
          })
          nextProps.history.replace({
              pathname: nextProps.location.state.center_id?`${this.props.location.pathname}?center=${nextProps.location.state.center_id}`:this.props.location.pathname,
              state: {}
          });
      }
  }

    if(nextProps.get_center_profile_ret){
      if(nextProps.get_center_profile_ret.success){
         this.setState({
           prof_data:nextProps.get_center_profile_ret.data
         },()=>nextProps.set_center_data({...nextProps.get_center_profile_ret.data}))
      }else{
          this.setState({
            ret:{
              success:false,
              message:nextProps.get_center_profile_ret.message
            }
          })
      }
      nextProps.get_center_profile_clr()
    }


    console.log(!!get_url_params('center'),"!!get_url_params('center')")
    if(!!get_url_params('center')){
      if(!!!isEmpty(nextProps.center_data)){
        if(nextProps.center_data._id === get_url_params('center')){
          console.log(nextProps.center_data,"nextProps.center_data")
          this.setState({
            prof_data:nextProps.center_data
          })
        }
      }
    }else{
      console.log("else case 1")
      if(!!!isEmpty(nextProps.prof_data)){
        this.setState({
          prof_data:nextProps.prof_data
        })
      }
    }
      if(!!nextProps.updateAchievementRet){
          if(nextProps.updateAchievementRet.type==='delete'){
            if(nextProps.updateAchievementRet.success){
              this.setState({
                prof_data:{
                  ...this.state.prof_data,
                  achievements:this.state.updated_achieve_remove
                },
                notify:{
                  ...this.state.notify,
                  success:{
                    message:nextProps.updateAchievementRet.message
                  }
                }
              })
              this.props.set_user_info({
                ...this.props.prof_data,
                achievements:this.state.updated_achieve_remove
              })
            }else{
              this.setState({
                notify:{
                  ...this.state.notify,
                  success:{
                    error:nextProps.updateAchievementRet.message
                  }
                }
              })
            }
            // nextProps.getUserDetails()
            nextProps.updateAchievementClr()
          }
      }
    
     
    // if(!!nextProps.profileData){
    //    if(!!nextProps.profileData.success){
    //      this.setState({
    //       user:nextProps.profileData.user,
    //       get_profile_loading:false
    //      })
    //    }else{
    //      console.log("/whoami api didn't work")
    //    }
    // }
  }

  achievementSuccess = (data) =>{
      this.addAchievementClose()
      this.setState({
        prof_data:{
          ...this.state.prof_data,
          achievements:this.state.updated_achievement_array
        }
      },()=>this.props.set_user_info({
        ...this.props.prof_data,
        achievements:this.state.updated_achievement_array
      }))
      // this.props.getUserDetails()
  }

  componentDidMount(){
    let center_id = get_url_params('center')
    if(this.state.flag_for_map){
      console.log(this.props.open_map,"this.props.open_map")
      if(!!this.props.open_map){
        this.setState({
          flag_for_map:false,
          mapFlag:true
        })
      }
    }

   
    if(!!center_id){
      if(this.props.centers_list.length ===0){
        console.log("calling for center profile")
        this.props.get_center_profile({center_id})
      }else{
        let center_data  = [...this.props.centers_list].filter(item=>item._id === center_id)[0]
        this.props.set_center_data({...center_data})
      }
    }else{
      if(!!!this.props.mount.prof_mount){
        this.setState({
          get_profile_loading:true
        },()=>{
          this.props.getUserDetails()
        })
      }else{
        if(!!center_id){
          this.setState({
            // need to remove this line after complete refactoring
            user:this.props.center_data,
            prof_data:this.props.center_data
          })
        }else{
          this.setState({
            // need to remove this line after complete refactoring
            user:this.props.prof_data,
            prof_data:this.props.prof_data
          })
        }
      }
    }
    
  }

  updateAchievement=(data)=>{
    this.setState({
      updated_achievement_array:data.achievements
    },()=>this.props.updateAchievement({
      ...data
    }))
  }

  generateAddAchievement = () =>{
    return(
        <React.Fragment>
           <AddAchievement
           loading = {this.state.achievementLoading}
           toggleLoading = {()=>this.setState({achievementLoading:!this.state.achievementLoading})}
           updateAchievement =  {this.updateAchievement}
           updateAchievementRet =  {this.props.updateAchievementRet}
           updateAchievementClr =  {this.props.updateAchievementClr}
           achievements = {this.state.prof_data.achievements}
           upload = {this.props.upload}
           uploadRet = {this.props.uploadRet}
           uploadRetClr = {this.props.uploadRetClr}
           closeModal = {()=>this.setState({addAchievementFlag:false})}
           achieveTitle = {this.state.achieveTitle}
           handleAchievementChange = {(e)=>this.setState({achieveTitle:e.target.value})}

           achievementImage = {this.state.achievementImage}
           toggleAchievementImage = {(data)=>this.setState({achievementImage:data})}
           achievementSuccess = {this.achievementSuccess}
           />
        </React.Fragment>
      
    )
}

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  async handleAddExpert(e) {
    e.preventDefault();
    var doctor = {
      "name": this.state.doctor_name,
      "education": this.state.doctor_education,
      "designation": this.state.doctor_designation,
      "department": this.state.doctor_department,
      "experience": this.state.doctor_experience,
      "imageUrl": "",
      "specialities": []
    };
    await this.props.expertDetails(doctor);
    this.setState({
      doctor_name : '',
      doctor_education : '',
      doctor_designation : '',
      doctor_department : '',
      doctor_experience : ''
    })
  }

  removeAchievement = (e) =>{
    let i = e.target.dataset.iterate
    i = parseInt(i,10)
    let achievements = [...this.state.prof_data.achievements]
    let newAchievements = []
    achievements.forEach((item,j)=>{
      if(((i!==j) && (!!item))){
          newAchievements.push(item)
      }
    })
    this.setState({
      removeAchievementLoading:true,
      updated_achieve_remove:newAchievements,
      selectedAchievement:i
    },()=>this.props.updateAchievement({
      achievements:newAchievements,
      type:'delete'
    }))
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleBioChange = (e) =>{
    this.setState({
      biography:e.target.value
    })
  }

  achievement_slider = ()=>{
    if(!!this.state.prof_data.achievements){
      console.log(this.state.prof_data,"pikabo")
      let arr = [...this.state.prof_data.achievements]
    let i= 0
    let  newarr = []
    console.log(arr, arr.length,"pika nbiii")
    while(i <= (arr.length-1))
    { 
      if(arr.length === 1){
        console.log("First condition true")
        newarr.push( <div className={`carousel-item ${arr.length ===1?"active":''}`}>
        <div className="row">
           <div className="col-md-6">
             <div className="card mb-2">
               <img className="card-img-top card_im img-loading_rish"
                 src={arr[i].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement}   data-iterate= {i}  className="ceoss_icon"><i data-iterate= {i} class="fa fa-times" aria-hidden="true"></i></span>
               <div className="card-body">
   <p className="card-text">{arr[i].title}</p>
               </div>
             </div>
           </div>  
       </div>
         </div>)
       
         i = i+2
      }
    else if(i=== arr.length-1){
      console.log("Second Conditon")
        console.log("Case 1")
       newarr.push( <div className={`carousel-item ${arr.length ===1?"acive":''}`}>
       <div className="row">
          <div className="col-md-6">
            <div className="card mb-2">
              <img className="card-img-top card_im img-loading_rish"
                src={arr[i].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement}   data-iterate= {i}  className="ceoss_icon"><i data-iterate= {i} class="fa fa-times" aria-hidden="true"></i></span>
              <div className="card-body">
  <p className="card-text">{arr[i].title}</p>
              </div>
            </div>
          </div>     
      </div>
        </div>)
       i = i+1
      }else{
        console.log("Case 2")
       newarr.push( <div className={`carousel-item ${i ===0?"active":''}`}>
       <div className="row">
            <div className="col-md-6">
              <div className="card mb-2">
                <img className="card-img-top card_im"
                  src={arr[i].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement} data-iterate= {i} className="ceoss_icon"><i  data-iterate= {i} class="fa fa-times" aria-hidden="true"></i></span>
                <div class="card-body">
    <p class="card-text">{arr[i].title}</p>
                </div>
              </div>
            </div>
      
            <div className="col-md-6">
              <div className="card mb-2">
                <img className="card-img-top card_im img-loading_rish"
                   src={arr[i+1].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}}  onClick={this.removeAchievement}  data-iterate= {i+1}  className="ceoss_icon"><i data-iterate= {i+1} class="fa fa-times" aria-hidden="true"></i></span>
                <div className="card-body">
                  <p className="card-text">{arr[i+1].title}</p>
                </div>
              </div>
            </div>
      </div>
      </div>)
       i = i+2
      }
    }
    console.log(newarr,"loremIpsume")
    return newarr
    }
    return []
  }


  updateBanner = (data) => {
    this.setState({
      loadingBanner:true
    },()=>this.props.updateBanner(data))
  }

  updateImage = (data) =>{
    this.setState({
      loadingProfileImage:true
    },()=>this.props.updateImage(data))
  }

  editBio = (data) =>{
    this.setState({
      editBioLoading:true
    },()=> this.props.editBio(data))
  }
  
  addAchievementClose =() =>{
    this.setState({
      addAchievementFlag:false,
      achievementImage:false,
      achieveTitle:''
    })
  }
  upload = (data) =>{
    this.setState({
      loadingBanner:true
    })
    this.props.upload(data)
  }

  uploadProfleImage = (data) =>{
    this.setState({
      loadingProfileImage:true
    },()=>{
      this.props.upload(data)
    })
  }

  onDoctorClick = (data) =>{
    return <Redirect to={`add-doctor/${data.__id}`} />
  }


  edit_location_clr = (data) =>{
    this.props.edit_location_clr()
    // this.setState({
    //   edit_location_loading:false
    // },()=>this.props.edit_location_clr()) 
  }

 
  edit_location = (data) =>{
    this.props.edit_location(data)
    // this.setState({
    //   edit_location_loading:true
    // },()=>) 
  }


  render() {
    console.log(this.props.location_toggler,"this.props in  location_toggler")
    console.log(this.state,"this.state in ProfileContainer")
    let center_id = get_url_params('center')
    let achievementArray  = this.achievement_slider()
    console.log(achievementArray,"achievementArray")
    const { open } = this.state;
    return (
      <React.Fragment>
     <div className="main_content_rish">
        <Notify 
          success ={this.state.notify.success}
          error ={this.state.notify.error}
          clear = {()=>this.setState({
            notify:{
              success:false,
              notify:false
            }
          })}
        />
       <ProfileBanner
       user = {this.state.prof_data}
       updateBanner = {this.updateBanner}
       updateBannerRet = {this.props.updateBannerRet}
       updateBannerClr = {this.props.updateBannerClr}
       upload = {this.upload}
       uploadRetClr = {this.props.uploadRetClr}
       uploadRet = {this.props.uploadRet}
       getProfileDetails = {this.props.get_user_info}
       set_user_info = {this.props.set_user_info}
       loadingOff = {()=>this.setState({loadingBanner:false})}
       loading  = {this.state.loadingBanner}
       />
        <div onSubmit={this.handleSubmit}>
          <div className="row HospitalProfileRow1">
            <div className="col-sm-2 col-lg-2">
               <ProfileImage
                user = {this.state.prof_data}
                upload = {this.uploadProfleImage}
                uploadRetClr = {this.props.uploadRetClr}
                uploadRet = {this.props.uploadRet}
                set_user_info = {this.props.set_user_info}
                updateImage ={this.updateImage}
                updateImageRet ={this.props.updateImageRet}
                updateImageClr ={this.props.updateImageClr}
                getProfileDetails = {this.props.getUserDetails}
                loading  = {this.state.loadingProfileImage}
                loadingOff = {()=>this.setState({loadingProfileImage:false})}
               />
            </div>
            <div className="col-sm-9 col-lg-9 maxhospitalrow1col2 content_pos">
              <p  style={{textTransform:'capitalize'}} className="maxhospital max_cnt"><b>{this.state.prof_data.name}</b></p>
              <p className="maxhospitaladd">{this.state.prof_data.centerLocation?this.state.prof_data.centerLocation:''}</p>
            </div>
          </div>
          <div className="row achimen_pd">
                <div class="col-md-2"></div>
                <div class="col-md-4 achivementlogo text-center">
                        <a><img  onClick={()=>this.setState({addAchievementFlag:true})} src="/achivement.jpg"></img></a>
                        <p className="ach_mnt">Achievement</p>
                </div>
                <div class="col-md-4 achivementlogo text-center">        
                          <Link to= {`/dashboard/my-catalogue${!!center_id?'?center='+center_id:''}`}
                          role="button"
                          onClick={()=>this.props.toggleMyCatalog()} >
                          <img src="/cata.svg" className='catalogueImg '></img>
                          </Link>
                          <br></br>
                        <p className="ach_mnt">Catalogue</p>
                </div>
                <div class="col-md-2"></div>
          </div>
          <div className="bdyhs_mar">
          <div class="row mainBodyMaxHospitalrow4 ">
                    <div class="col-xs-1 col-sm-1 col-lg-1">
                        <img src={locationImage} className="lction "></img>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-lg-9 mainBodyMaxHospitalrow4col2">
                        <p class="mainBodyMaxHospitalrow4col2para"><span class="loc">Location :</span><span className="vikas_marg">{this.state.prof_data.address }</span> 
                        </p>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1">
                    <span onClick={()=>this.setState({mapFlag:!this.state.mapFlag})} class="editmainbodymaxhospital cursor-pointer underline">{this.state.mapFlag?"Cancel":'Edit'}</span>
                    </div>
                    </div>
                </div>

          {this.state.mapFlag   &&  <div style={{marginBottom:'5rem'}} className="margin-top-medium_ris map-wrapper">
           {!this.state.flag_for_map &&  <ScrollTo
              remove_me = {()=>{
                this.props.set_open_map(false)
              }}
            />}
            <Map
               google={this.props.google}
               center={{lat: 18.5204, lng: 73.8567}}
               location = {this.state.prof_data.location}
               set_user_info = {this.props.set_user_info}
               height='300px'
               zoom={15}
               edit_location_loading = {this.props.edit_location_loading}
               edit_location = {this.edit_location}
               edit_location_clr = {this.edit_location_clr}
               edit_location_ret = {this.props.edit_location_ret}
               set_location_toggler = {this.props.set_location_toggler}
             />
            </div>
            }

          <hr className="Hospitalhr auto_center"></hr>
            <EditBio 
              set_user_info = {this.props.set_user_info}
              user = {this.state.prof_data}
              editBio = {this.editBio}
              editBioRet = {this.props.editBioRet}
              editBioClr = {this.props.editBioClr}
              editBioFlag={this.state.editBioFlag}
              handleBioChange = {this.handleBioChange}
              loadingOff = {()=>this.setState({
                editBioLoading:false
              })}
              biography = {this.state.biography}
              toggleEditBio ={()=>this.setState({editBioFlag:!this.state.editBioFlag, biography:this.state.prof_data.biography})}
              getDetails = {this.props.expertDetails}
              loading = {this.state.editBioLoading}
              getUserDetails = {this.props.getUserDetails}
            />
    <hr className="brdr_tm"></hr>
          <div className="team_sec">
           {
             this.props.user.userType !=="Doctor" && <React.Fragment>
                         <h3 className="team_of">Team of Experts</h3>
             <div className="row">
     {this.state.prof_data?!!this.state.prof_data.doctors?this.state.prof_data.doctors.length !==0?this.state.prof_data.doctors.slice(0, this.state.prof_data.doctors.length>5?this.state.show_doctor_count:this.state.prof_data.doctors.length).map((item,i) =>{
       return (<DoctorComponent
               onClick = {this.onDoctorClick}
             data = {item}
             i = {i}
         />)
     }):<div style={{marginLeft:'auto', marginRight:'auto'}} className='text-cener margin-top-medium_ris'>
       <img  src="/Group 2096.svg" className="img-loading_rish"  />
       <div style={{marginTop:'2rem', fontSize:'1.5rem'}}>No Doctors added</div>
       <Link to={!!get_url_params('center')?`/dashboard/add-doctor?center=${get_url_params('center')}`:"/dashboard/add-doctor"}
             role="button"
             onClick = {()=>this.props.toggleAddDoc()}>
       <button className="common_button_rish" style={{marginTop:'2rem', fontSize:'1.5rem'}}>Add Doctor</button>
       </Link>
     </div>:'':''}
   
   {this.state.prof_data?!!this.state.prof_data.doctors?this.state.prof_data.doctors.length !==0?<div className="col-md-6 col-sm-12 col-lg-3">
           <div className="timelinebox4 timelinebox4_5">
             <Link  to={!!get_url_params('center')?`/dashboard/add-doctor?center=${get_url_params('center')}`:"/dashboard/add-doctor"}
             role="button"
             onClick = {()=>this.props.toggleAddDoc()}>
             <img  src="/plus_2.svg"/>
             </Link>
      </div>
       </div>:'':'':''}
   </div>
   
   {!!this.state.prof_data.doctors?((this.state.prof_data.doctors.length===this.state.show_doctor_count) || (this.state.prof_data.doctors.length==0))?"":<div className="se-dr"><span className="pika cursor-pointer" onClick={()=>this.setState({
   show_doctor_count:this.state.prof_data.doctors.length
   })} >See more Doctors</span></div> :'' }
   </React.Fragment>
     }

<div className="achivmnt_b profil_achevment">
  <h4 className="achiment_bk">Achievement Book</h4>
 
{!!this.state.prof_data.achievements?
  this.state.prof_data.achievements.length!==0?
  <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
  {/* {true && <LoaderComponent />} */}
    <div class="carousel-inner" role="listbox">
      {achievementArray.map((item,i)=>{
        return item
      })}
    </div>
    <div class="controls-top">
      <a class="btn-floating" href="#multi-item-example" data-slide="prev"><i class="fas fa-chevron-left"></i></a>
      <a class="btn-floating" href="#multi-item-example" data-slide="next"><i
          class="fas fa-chevron-right"></i></a>
    </div>
</div>:<div className="row">
<div style={{marginLeft:'auto', marginRight:'auto'}} className='text-cener margin-top-medium_ris'>
    <img style={{marginLeft:'3rem'}} src="/no_achievement.svg"  alt="no_achivement_added" />
    <div style={{marginTop:'2rem', fontSize:'1.5rem'}}>No Achievement added</div>
  </div>
  </div>
:'No achievements'}
       </div>
          </div>
          
          <ModalComponent 
                open = {this.state.addAchievementFlag}
                handleClose = {this.addAchievementClose}
                modalBody = {this.generateAddAchievement}
                />  
        </div>
  </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.userDetail,
  mount:state.user.mount,
  prof_data:state.user.data.prof_data,
  user_info:state.user.data.prof_data,
  uploadRet:state.user.uploadRet,
  updateImageRet:state.user.updateImageRet,
  updateBannerRet:state.user.updateBannerRet,
  updateAchievementRet:state.user.updateAchievementRet,
  editBioRet:state.user.editBioRet,
  profileData:state.user.profileData,
  edit_location_ret:state.user.edit_location_ret,
  open_map:state.user.open_map,
  centers_list:state.user.data.centers_data.centers_list,
  center_data:state.user.data.centers_data.center_data,
  get_center_profile_ret:state.user.get_center_profile_ret,
  location_toggler:state.user.location_toggler
})

 export default compose(
  withRouter,
  connect(mapStateToProps, { 
    expertDetails, 
    upload, 
    uploadRetClr, 
    updateImage, 
    updateImageClr, 
    getProfileDetails,
    updateBannerClr,
    updateBanner,
    updateAchievement, 
    updateAchievementClr,
    editBioClr, 
    editBio, 
    getUserDetails,
    edit_location,
    edit_location_clr,
    get_user_info,
    set_user_info,
    set_open_map,
    set_center_data,
    get_center_profile,
    get_center_profile_clr,
    set_location_toggler
   })
)(ProfileContainer)