import React from 'react';
import { connect } from 'react-redux';
// import { expertDetails } from '../../actions/userActions';
import './Profile.css';
import Modal from "react-responsive-modal";
import { expertDetails, upload, uploadRetClr, updateImage, updateImageClr,
   getProfileDetails, updateBanner, updateBannerClr, updateAchievement, updateAchievementClr, editBio, editBioClr,
   getUserDetails } from "../../actions/userActions";
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
import locationImage from "../../images/Location.png"
// import GoogleComponent from "../GoogleMapComponent"


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
      achievementImage:false
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleAddExpert = this.handleAddExpert.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.achievementSuccess = this.achievementSuccess.bind(this)
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps,"nextProps in Profile Container")
    if(nextProps.user){
      this.setState({
        user:nextProps.user
      })
    }
  }

  achievementSuccess = () =>{
      this.addAchievementClose()
      this.props.getUserDetails()
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

  removeAchievement = (i) =>{
    let achievements = JSON.parse(JSON.stringify(this.props.user.achievements))
    let newAchievements = []
    achievements.forEach((item,j)=>{
      if(((i!==j) && (!!item))){
          newAchievements.push(item)
      }
    })
    this.setState({
      removeAchievementLoading:true,
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
    console.log(data,"data in addDocotor")
    return <Redirect to={`add-doctor/${data.__id}`} />
  }


  render() {
    console.log(this.props,"this.props in  ProfileContainer")
    console.log(this.state,"this.state in ProfileContainer")
    const { open } = this.state;
    return (
      <React.Fragment>
      <div className='col-md-8 col-xl-9'>
      <div className="HospitalProfileBody AllComponents hspital">
        {/* <div>
          <MapComponent
            location = {this.props.user.geoLocation}
          />
        </div> */} 
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
              <div>
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
                <div className="edit_image2">
           
           <img className="edit_icn2"src={'/pen_editor.svg'}></img></div>
            </div>
            <div className="col-sm-9 col-lg-9 maxhospitalrow1col2 content_pos">
              <p className="maxhospital max_cnt"><b>{this.props.user.name}</b></p>
              <p className="maxhospitaladd">{this.props.user.address}</p>
            </div>
          </div>
          <div className="row achimen_pd">
                <div class="col-md-2"></div>
                <div class="col-md-4 achivementlogo text-center">
                        <a><img onClick={()=>this.setState({addAchievementFlag:true})} src="/achivement.png"></img></a>
                        <p className="ach_mnt">Achievement</p>
                </div>
                <div class="col-md-4 achivementlogo text-center">
                       
                          <Link to="/dashboard/my-catalogue"
                          role="button"
                          onClick={()=>this.props.toggleMyCatalog()} >
                          <img src="/cata.svg" className='catalogueImg'></img>
                          </Link>
                          <br></br>
                        <p className="ach_mnt">Catalogue</p>
                </div>
                <div class="col-md-2"></div>
          </div>
          <div className="bdyhs_mar">
          <div class="row mainBodyMaxHospitalrow4 ">
           
                    <div class="col-xs-1 col-sm-1 col-lg-1">
                        <img src={locationImage} className="lction"></img>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-lg-10 mainBodyMaxHospitalrow4col2">
                        <p class="mainBodyMaxHospitalrow4col2para"><span class="loc">Location :</span><span className="vikas_marg">{this.props.user.address }</span> 
          <a href="#" class="editmainbodymaxhospital"> Edit</a>
         </p>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-lg-1"></div>
                    </div>
                </div>
         <div class="row">
                  <div class="col-sm-1 col"></div>
                  <div class="col-sm-10 col maxhospitalviewmap"><a href="" class="editmainbodymaxhospital viewmap">View on map</a></div>
                  <div class="col-sm-1 col"></div>
              </div> 
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

          {/* <div className="col-md-8 col-12 cardio_le">
        <div className="b-select-wrap">
          <label className="speclion">Specialization</label>
          <select className="form-control b-select">
            <option>Cardiologist</option>
            <option>Cardiologist</option>
            <option>Cardiologist</option>
          </select>
        </div>
      </div>
      <div className="Service_List">
        <h6 className="s_list">Service List</h6>
     
        
           <p>Abiation </p>
           
           <p>Cardiac Rehabilitation </p>
           
           <p>Coronary Artery Bypass Grafting </p>
          
          
           <p>Heart Transplant</p>
           
           <p>Space for text </p>
          
       
       
       <div className="vi_m">
       <a href="#"className="view_more">View More</a></div>
      </div>
   */}
    <hr className="brdr_tm"></hr>
          <div className="team_sec">
          
            <h3 className="team_of">Team of Experts</h3>
          <div className="row">
  {this.props.user?!!this.props.user.doctors?this.props.user.doctors.map((item,i) =>{
    return (<DoctorComponent
            onClick = {this.onDoctorClick}
          data = {item}
          i = {i}
      />)
  }):'':''}
   <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4 timelinebox4_5">
          <Link to="/dashboard/add-doctor"
          role="button"
          onClick = {()=>this.props.toggleAddDoc()}>
          <img  src="/plus_2.svg"/>
          </Link>
   </div>
    </div>
</div>
{/* 2nd-end */}
<div className="se-dr"><a href="#">See more Doctor's</a></div>
<div className="achivmnt_b profil_achevment">
  <h4 className="achiment_bk">Achievement Book</h4>
  <div class="row">
    <div class="owl-carousel owl-theme">
        <div class="item" data-aos="zoom-in">
        <a href="#">
            <div class="trendingBox">
                <img src="/ach1.png" alt=".." class="image effect_new"/><span className="ceoss_icon"><i class="fa fa-times" aria-hidden="true"></i></span>
                <div class="overlay">

                </div>
                <div class="card-body ">
                <p class="card_tooth">Lorem Ipsum, lorem ipsum lorem ipsum, lorem ipsum</p>
    
            </div>
            </div>
            
            </a>
           </div>
           <div class="item">
        <a href="#">
            <div class="trendingBox">
                <img src="/ach2.png" alt="" class="image effect_new"/><span className="ceoss_icon"><i class="fa fa-times" aria-hidden="true"></i></span>
                <div class="overlay">

                </div>
                <div class="card-body ">
                <p class="card_tooth">Lorem Ipsum, lorem ipsum lorem ipsum, lorem ipsum</p>
    
            </div>
            </div>
            
            </a>
        </div>
        <div class="item">
        <a href="#">
            <div class="trendingBox">
                <img src="/ach1.png" alt="" class="image effect_new"/><span className="ceoss_icon"><i class="fa fa-times" aria-hidden="true"></i></span>
                <div class="overlay">

                </div>
                <div class="card-body ">
                <p class="card_tooth">Lorem Ipsum, lorem ipsum lorem ipsum, lorem ipsum</p>
    
            </div>
            </div>
           

            </a>
        </div>
          </div>
        </div>
  {/* <div className="row">
    {!!this.props.user?!!this.props.user.achievements?this.props.user.achievements.map((item,i)=>{
      if(!!item){
        return (
          <Achievement
            data = {item}
            i={i}
            removeAchievement = {this.removeAchievement}
            updateAchievementRet = {this.props.updateAchievementRet}
            loading = {this.props.removeAchievementLoading}
            selectedAchievement = {this.state.selectedAchievement}
            updateAchievementClr = {this.props.updateAchievementClr}
            getUser = {this.props.getUserDetails}
            loadingOff = {()=>this.setState({
              removeAchievementLoading:false
            })}
           />
        )
      }else{
        return ''
      }
     
    }):'':''}
 
</div> */}
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
  uploadRet:state.user.uploadRet,
  updateImageRet:state.user.updateImageRet,
  updateBannerRet:state.user.updateBannerRet,
  updateAchievementRet:state.user.updateAchievementRet,
  editBioRet:state.user.editBioRet
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
  getUserDetails
 })(ProfileContainer);