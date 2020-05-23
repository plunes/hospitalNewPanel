import React from 'react';
import { connect } from 'react-redux';
// import { expertDetails } from '../../actions/userActions';
import './Profile.css';
import Modal from "react-responsive-modal";
import { expertDetails, upload, uploadRetClr, updateImage, updateImageClr,
   getProfileDetails, updateBanner, updateBannerClr, updateAchievement, updateAchievementClr, editBio, editBioClr,
   getUserDetails, edit_location_clr, edit_location } from "../../actions/userActions";
import ProfileImage from '../functional/ProfileImage';
import ProfileBanner from '../functional/ProfileBanner';
import DoctorComponent from "../functional/DoctorComponent"
import Achievement from "../functional/Achievement"
import EditBio from '../functional/EditBio';
import ModalComponent from "../ModalComponent"
import AddAchievement from '../functional/AddAchievement';
import MapComponent from "../MapComponent"
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom"
import locationImage from "../../images/Location.jpg"
import Notify from '../functional/Notify';
import LoaderComponent from "../functional/LoaderComponent"
// import OwlCarousel from 'react-owl-carousel2';

import Map from "../MapComponent/index.js"

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

      if(!!nextProps.updateAchievementRet){
          if(nextProps.updateAchievementRet.type==='delete'){
            if(nextProps.updateAchievementRet.success){
              this.setState({
                notify:{
                  ...this.state.notify,
                  success:{
                    message:nextProps.updateAchievementRet.message
                  }
                }
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
            nextProps.getUserDetails()
            nextProps.updateAchievementClr()
          }
      }
      

      if(!!nextProps.edit_location_ret){
        if(!!nextProps.edit_location_ret.success){
          this.setState({
            notify:{
              ...this.state.notify,
              success:{
                message:nextProps.edit_location_ret.message
              }
            }
          })
          nextProps.getUserDetails()
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
        nextProps.edit_location_clr()
      }

    if(!!nextProps.profileData){
       if(!!nextProps.profileData.success){
         this.setState({
          user:nextProps.profileData.user,
          get_profile_loading:false
         })
       }else{
         console.log("/whoami api didn't work")
       }
    }
  }

  achievementSuccess = () =>{
      this.addAchievementClose()
      this.props.getUserDetails()
  }

  componentDidMount(){
      if(!!!this.props.mount.prof_mount){
        this.setState({
          get_profile_loading:true
        },()=>{

        })
      }else{
        this.setState({
          user:this.props.prof_data
        })
      }
  }

  generateAddAchievement = () =>{
    return(
        <React.Fragment>
           <AddAchievement
           loading = {this.state.achievementLoading}
           toggleLoading = {()=>this.setState({achievementLoading:!this.state.achievementLoading})}
           updateAchievement =  {this.props.updateAchievement}
           updateAchievementRet =  {this.props.updateAchievementRet}
           updateAchievementClr =  {this.props.updateAchievementClr}
           achievements = {this.props.user.achievements}
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
    let achievements = JSON.parse(JSON.stringify(this.props.user.achievements))
    let newAchievements = []
    achievements.forEach((item,j)=>{
      console.log(i,"i in removeAchievement")
      console.log(j,"j in removeAchievement")
      if(((i!==j) && (!!item))){
          newAchievements.push(item)
      }
    })
    console.log(newAchievements,"newAchievements in removeAchievement")
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
      user:{
        ...this.state.user,
        biography:e.target.value
      }
    })
  }

  achievement_slider = ()=>{
    if(!!this.props.user.achievements){
      let arr = [...this.props.user.achievements]
    let i= 0
    let  newarr = []
    while(i<arr.length-1)
    {
      console.log(i,"i in While of Achievement")
      if(i=== arr.length-1){
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
      addAchievementFlag:false
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
    this.setState({
      edit_location_loading:false
    },()=>this.props.edit_location_clr()) 
  }

 
  edit_location = (data) =>{
    this.setState({
      edit_location_loading:true
    },()=>this.props.edit_location(data)) 
  }


  render() {
    console.log(this.props,"this.props in  ProfileContainer")
    console.log(this.state,"this.state in ProfileContainer")
    let achievementArray  = this.achievement_slider()
    const { open } = this.state;
    return (
      <React.Fragment>
      <div className='col-md-8 col-xl-9'>
      <div className="HospitalProfileBody AllComponents hspital">
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
       user = {this.props.user}
       updateBanner = {this.updateBanner}
       updateBannerRet = {this.props.updateBannerRet}
       updateBannerClr = {this.props.updateBannerClr}
       upload = {this.upload}
       uploadRetClr = {this.props.uploadRetClr}
       uploadRet = {this.props.uploadRet}
       getProfileDetails = {this.props.getUserDetails}
       loadingOff = {()=>this.setState({loadingBanner:false})}
       loading  = {this.state.loadingBanner}
       />
        <div onSubmit={this.handleSubmit}>
          <div className="row HospitalProfileRow1">
            <div className="col-sm-2 col-lg-2">
               <ProfileImage
                user = {this.props.user}
                upload = {this.uploadProfleImage}
                uploadRetClr = {this.props.uploadRetClr}
                uploadRet = {this.props.uploadRet}

                updateImage ={this.updateImage}
                updateImageRet ={this.props.updateImageRet}
                updateImageClr ={this.props.updateImageClr}
                getProfileDetails = {this.props.getUserDetails}
                loading  = {this.state.loadingProfileImage}
                loadingOff = {()=>this.setState({loadingProfileImage:false})}

               />
            </div>
            <div className="col-sm-9 col-lg-9 maxhospitalrow1col2 content_pos">
              <p className="maxhospital max_cnt"><b>{this.props.user.name}</b></p>
              <p className="maxhospitaladd">{this.props.user.address}</p>
            </div>
          </div>
          <div className="row achimen_pd">
                <div class="col-md-2"></div>
                <div class="col-md-4 achivementlogo text-center">
                        <a><img  onClick={()=>this.setState({addAchievementFlag:true})} src="/achivement.jpg"></img></a>
                        <p className="ach_mnt">Achievement</p>
                </div>
                <div class="col-md-4 achivementlogo text-center">        
                          <Link to="/dashboard/my-catalogue"
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
                        <p class="mainBodyMaxHospitalrow4col2para"><span class="loc">Location :</span><span className="vikas_marg">{this.props.user.address }</span> 
         </p>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1">
                    <span onClick={()=>this.setState({mapFlag:!this.state.mapFlag})} class="editmainbodymaxhospital cursor-pointer underline">{this.state.mapFlag?"Cancel":'Edit'}</span>
                    </div>
                    </div>
                </div>
         {/* <div class="row">
                  <div class="col-sm-1 col"></div>
                  <div class="col-sm-10 col maxhospitalviewmap"><a href="" class="editmainbodymaxhospital viewmap">View on map</a></div>
                  <div class="col-sm-1 col"></div>
              </div>  */}
                  
          { this.state.mapFlag   &&  <div style={{marginBottom:'5rem'}} className="margin-top-medium_ris map-wrapper">
            <Map
               google={this.props.google}
               center={{lat: 18.5204, lng: 73.8567}}
               location = {this.props.user.geoLocation}
               height='300px'
               zoom={15}
               edit_location_loading = {this.props.edit_location_loading}
               edit_location = {this.edit_location}
               edit_location_clr = {this.edit_location_clr}
             />
            </div>
            }

          <hr className="Hospitalhr auto_center"></hr>
            <EditBio 
              editBio = {this.editBio}
              editBioRet = {this.props.editBioRet}
              editBioClr = {this.props.editBioClr}
              editBioFlag={this.state.editBioFlag}
              handleBioChange = {this.handleBioChange}
              loadingOff = {()=>this.setState({
                editBioLoading:false
              })}
              biography = {this.state.user.biography}
              toggleEditBio ={()=>this.setState({editBioFlag:!this.state.editBioFlag})}
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
     {this.props.user?!!this.props.user.doctors?this.props.user.doctors.length !==0?this.props.user.doctors.slice(0, this.props.user.doctors.length>5?this.state.show_doctor_count:this.props.user.doctors.length).map((item,i) =>{
       return (<DoctorComponent
               onClick = {this.onDoctorClick}
             data = {item}
             i = {i}
         />)
     }):<div style={{marginLeft:'auto', marginRight:'auto'}} className='text-cener margin-top-medium_ris'>
       <img  src="/Group 2096.svg" className="img-loading_rish"  />
       <div style={{marginTop:'2rem', fontSize:'1.5rem'}}>No Doctors added</div>
       <Link to="/dashboard/add-doctor"
             role="button"
             onClick = {()=>this.props.toggleAddDoc()}>
       <button className="common-button" style={{marginTop:'2rem', fontSize:'1.5rem'}}>Add Doctor</button>
       </Link>
     </div>:'':''}
   
   {this.props.user?!!this.props.user.doctors?this.props.user.doctors.length !==0?<div className="col-md-6 col-sm-12 col-lg-3">
           <div className="timelinebox4 timelinebox4_5">
             <Link to="/dashboard/add-doctor"
             role="button"
             onClick = {()=>this.props.toggleAddDoc()}>
             <img  src="/plus_2.svg"/>
             </Link>
      </div>
       </div>:'':'':''}
   </div>
   
   {!!this.props.user.doctors?((this.props.user.doctors.length===this.state.show_doctor_count) || (this.props.user.doctors.length==0))?"":<div className="se-dr"><span className="pika cursor-pointer" onClick={()=>this.setState({
   show_doctor_count:this.props.user.doctors.length
   })} >See more Doctors</span></div> :'' }
   </React.Fragment>
     }

<div className="achivmnt_b profil_achevment">
  <h4 className="achiment_bk">Achievement Book</h4>
 
{!!this.props.user.achievements?
  this.props.user.achievements.length!==0?
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
    <img style={{marginLeft:'3rem'}} src="/Group 2096.svg"  />
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
      </div>
      <div className='col-md-1'></div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.userDetail,
  mount:state.user.mount,
  prof_data:state.user.data.prof_data,
  uploadRet:state.user.uploadRet,
  updateImageRet:state.user.updateImageRet,
  updateBannerRet:state.user.updateBannerRet,
  updateAchievementRet:state.user.updateAchievementRet,
  editBioRet:state.user.editBioRet,
  profileData:state.user.profileData,
  edit_location_ret:state.user.edit_location_ret
})

export default connect(mapStateToProps, { 
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
  edit_location_clr
 })(ProfileContainer);