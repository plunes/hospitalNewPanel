import React from 'react';
import { connect } from 'react-redux';
// import { expertDetails } from '../../actions/userActions';
import './Profile.css';
import Modal from "react-responsive-modal";
import { change_address, change_address_loading  } from "../../actions/profile_actions"
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
import AnimatedMount from "../../HOC/AnimatedMount"
import ImageGallery from 'react-image-gallery';
import NewNotif from '../functional/NewNotif';
import LoaderComponent from '../functional/LoaderComponent';
import AliceCarousel from 'react-alice-carousel';
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
const responsive = {
  0: { items: 1 },
  568: { items: 3 },
  1024: { items: 4 },
  1724: { items: 6 }
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
      addAchievementFlag:false,
      achievementImage:false,
      achieveTitle:'',
      manual_address:'',
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


   change_manual_address = (e) => {
     console.log(e.target.name,e.target.value,"inside profile container")
     this.setState({
      manual_address:e.target.value
     })
   }
  componentWillReceiveProps(nextProps){

    if(!!nextProps.change_address_ret){
     
      if(!!nextProps.change_address_ret.success){
            this.setState({
              edit_address:false,
              address:'',
              ret:{
                success:true,
                message:nextProps.change_address_ret.message
              }
            })
              let address = this.state.address
            nextProps.set_user_info({
               address:address
              })
      }else{
        this.setState({
          ret:{
            success:false,
            message:nextProps.change_address_ret.message
          }
        })
      }
      nextProps.change_address_loading()
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
          if(true){
            if(nextProps.updateAchievementRet.success){
              this.setState({
                prof_data:{
                  ...this.state.prof_data,
                  achievements:nextProps.updateAchievementRet.type==='delete'?this.state.updated_achieve_remove:this.state.updated_achievement_array
                },
                ret: {
                  success:true,
                  message:nextProps.updateAchievementRet.message
                }
              })
              this.props.set_user_info({
                ...this.props.prof_data,
                achievements:nextProps.updateAchievementRet.type==='delete'?this.state.updated_achieve_remove:this.state.updated_achievement_array
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
            if(nextProps.updateAchievementRet.type==='delete'){
              window.location.reload()
            }
            nextProps.updateAchievementClr()
          }
      }
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
  console.log("Inside Component DidMunt")
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
        let data = {}
        let new_arr = [...this.props.centers_list].map(item => {
              if(item._id === center_id){
                data = {...item}
              }
            return item
        })
        console.log(data, center_id, "center_data and center_id")
        this.props.set_center_data({...data})
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


  get_images = () => {
    if(!!this.state.prof_data.achievements){
        let arr = [...this.state.prof_data.achievements]

        let images = arr.map(item=>{
          let obj = {}
          obj.original = item.imageUrl
          obj.thumbnail = item.imageUrl
          return obj
        })

        return images
    }
    else return []
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
               <img className="card-img-top card_im "
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
       newarr.push( <div className={`carousel-item ${arr.length ===1?"active":''}`}>
       <div className="row">
          <div className="col-md-4">
            <div className="card mb-2">
              <img className="card-img-top card_im "
                src={arr[i].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement}   data-iterate= {i}  className="ceoss_icon"><i data-iterate= {i} class="fa fa-times" aria-hidden="true"></i></span>
              <div className="card-body">
  <p className="card-text">{arr[i].title}</p>
              </div>
            </div>
          </div>     
      </div>
        </div>)
       i = i+1
      }else if(i=== arr.length-2){
        console.log("Second Conditon")
          console.log("Case 1")
         newarr.push( <div className={`carousel-item ${arr.length ===2?"active":''}`}>
         <div className="row">
            <div className="col-md-4">
              <div className="card mb-2">
                <img className="card-img-top card_im "
                  src={arr[i].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement}   data-iterate= {i}  className="ceoss_icon"><i data-iterate= {i} class="fa fa-times" aria-hidden="true"></i></span>
                <div className="card-body">
    <p className="card-text">{arr[i].title}</p>
                </div>
              </div>
            </div>    

             <div className="col-md-4">
              <div className="card mb-2">
                <img className="card-img-top card_im "
                  src={arr[i+1].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement}   data-iterate= {i+1}  className="ceoss_icon"><i data-iterate= {i+1} class="fa fa-times" aria-hidden="true"></i></span>
                <div className="card-body">
    <p className="card-text">{arr[i+1].title}</p>
                </div>
              </div>
            </div>    


        </div>
          </div>)
         i = i+2
        }else {
        console.log("Case 3")
       newarr.push( <div className={`carousel-item ${i ===0?"active":''}`}>
       <div className="row">
            <div className="col-md-4">
              <div className="card mb-2">
                <img className="card-img-top card_im"
                  src={arr[i].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement} data-iterate= {i} className="ceoss_icon"><i  data-iterate= {i} class="fa fa-times" aria-hidden="true"></i></span>
                <div class="card-body">
    <p class="card-text">{arr[i].title}</p>
                </div>
              </div>
            </div>
      
            <div className="col-md-4">
              <div className="card mb-2">
                <img className="card-img-top card_im "
                   src={arr[i+1].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}}  onClick={this.removeAchievement}  data-iterate= {i+1}  className="ceoss_icon"><i data-iterate= {i+1} class="fa fa-times" aria-hidden="true"></i></span>
                <div className="card-body">
                  <p className="card-text">{arr[i+1].title}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-2">
                <img className="card-img-top card_im "
                   src={arr[i+2].imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}}  onClick={this.removeAchievement}  data-iterate= {i+2}  className="ceoss_icon"><i data-iterate= {i+2} class="fa fa-times" aria-hidden="true"></i></span>
                <div className="card-body">
                  <p className="card-text">{arr[i+2].title}</p>
                </div>
              </div>
            </div>
      </div>
      </div>)
       i = i+3
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
    this.setState({
      address:''
    })
  }

 
  edit_location = (data) =>{
    this.props.edit_location(data)
    // this.setState({
    //   edit_location_loading:true
    // },()=>) 
  }
  
  save_address = () =>{
    console.log(this.state.address,"this.state.address")
    if(this.state.address ===""){
      this.setState({
        ret:{
          success:false,
          message:'Please enter address'
        }
      })
    }else{
      this.props.change_address({
        location:this.state.prof_data.location,
        address:this.state.address
    })
    }
  }


  render() {
    console.log(this.props,"this.props in profile")
    console.log(this.state,"this.state in ProfileContainer")
    let center_id = get_url_params('center')
    let achievementArray  = this.achievement_slider()

    const images = this.get_images()
    let arr = []
    if(!!this.state.prof_data.achievements){
      arr = [...this.state.prof_data.achievements.map((item,i)=>{
        return <React.Fragment>
           <div style={{maxWidth:'35rem'}} key={i} className="col-md-12">
              <div className="card mb-2">
                <img className="card-img-top card_im "
                  src={item.imageUrl} alt="Card image cap"/><span style={{cursor:'pointer'}} onClick={this.removeAchievement}   data-iterate= {i}  className="ceoss_icon"><i data-iterate= {i} class="fa fa-times" aria-hidden="true"></i></span>
                <div className="card-body">
    <p className="card-text">{item.title}</p>
                </div>
              </div>
            </div>    
        </React.Fragment>
      })]
    }
    
    console.log(achievementArray,"achievementArray")
    const { open } = this.state;
    return (
      <React.Fragment>
     <div className="transparent_main_content_rish">
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

        <NewNotif 
          ret = {this.state.ret}
          retClr = {()=>this.setState({ret:false})}
        />
    <div>
      <div className="new_card_class">
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
          <div className="profile_pic_name_parent">
            <div className="profile_pic_child">
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
            <div className="profile_name_child">
              <p  style={{textTransform:'capitalize'}} className="maxhospital max_cnt"><b>{this.state.prof_data.name}</b></p>
              <p className="maxhospitaladd">{this.state.prof_data.centerLocation?this.state.prof_data.centerLocation:''}</p>
            </div>
          </div>
          <div style={{paddingBottom:'2rem'}} className="flex_parent_rish">
                <div class="flex_child_rish">
                   <div className="achievemnet_badge_wrapper">
                     <div onClick={()=>this.setState({addAchievementFlag:true})} className='achievement_badge cursor-pointer'>
                       <div style={{margin:'auto'}}>
                        <img   className="badge_image" src="/icon/achievement_icon.svg"/>
                        <text  className="catalogue_badge_text">Achievement</text>
                       </div>
                     </div>
                   </div>
                </div>
                <div class="flex_child_rish">
                  <div className="catalogue_badge_wrapper">  
                    <div className='catalogue_badge'>   
                          <Link to= {`/dashboard/catalogue${!!center_id?'?center='+center_id:''}`}
                          role="button"
                          style={{display:'block', margin:'auto'}}
                          onClick={()=>this.props.toggleMyCatalog()} >
                          <img src="/icon/catalogue_icon_new.svg" className='badge_image ' />
                          <text className="catalogue_badge_text">Catalogue</text>
                          </Link>
                     </div>
                   </div>
                </div>
          </div>
      </div>
      </div>
      <div id="profile_section_2" className="new_card_class">
          <div class="flex_parent_rish">
                    <div class="flex_child_rish-2">
                       <div className="location_icon_wrapper">
                        <img src='/icon/location_icon_new.svg' className="location_icon_rish"></img>
                       </div>
                    </div>
                    <div class="flex_child_rish-8">
                       <div style={{marginBottom:'1rem'}} className="location_edit_parent">
                         <text className="location_profile_text">Address</text>
                         <div className="edit_location_div">
                          <img src="/icon/edit_icon_rish.svg" onClick={()=>this.setState({edit_address:!this.state.edit_address, address:this.state.prof_data.address})} className="edit_location_icon" />
                         </div>
                        </div>
                       <div style={{marginBottom:'1rem'}}>
                         {this.state.edit_address ?<React.Fragment>
                          <input
                              type="text" 
                              className="flex_child_rish address_field"
                              placeholder="Enter Address" 
                              name="address"
                              onChange={(e)=>this.setState({[e.target.name]:e.target.value})} 
                              value = {this.state.address}/>
                              <div style={{marginTop:'1rem', position:'relative'}}>
                              <span><text style={{color:'#7DD55E'}}  onClick = {()=>this.setState({address:'',edit_address:false})}  className='catalogue_test_name link_text_rish'>Cancel</text></span>
                                                <span><text style={{color:'#7DD55E', marginLeft:'1rem'}}  onClick = {()=>this.save_address()}  className='catalogue_test_name link_text_rish'>Submit</text></span>
                                                {this.props.change_address_loading_flag && <LoaderComponent />}
                              </div>
                           
                         </React.Fragment> :<text className="location_profile_address">{this.state.prof_data.address}</text>}
                        
                         </div>
                       <div style={{marginBottom:'1rem'}}><text onClick={()=>this.setState({mapFlag:!this.state.mapFlag,manual_address:''})} className="green_text_rish link_text_rish">{this.state.mapFlag?"Cancel":'View on Map'}</text></div>
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
               address={this.state.prof_data.address}
               change_manual_address = {this.change_manual_address}
               manual_address = {this.state.manual_address}
               label = "Location"
               edit_location_loading = {this.props.edit_location_loading}
               edit_location = {this.edit_location}
               edit_location_clr = {this.edit_location_clr}
               edit_location_ret = {this.props.edit_location_ret}
               set_location_toggler = {this.props.set_location_toggler}
             />
            </div>
            }

          </div>

          
  <div  id="profile_section_3" className="new_card_class">
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

  </div>


  {this.props.user.userType !=="Doctor"  &&  <div  id="profile_section_4" className="new_card_class">
           {
             this.props.user.userType !=="Doctor" && <React.Fragment>
                <text className="location_profile_text">Team of Experts</text>
             <div className="flex_parent_rish doctors_list_wrapper">
     {this.state.prof_data?!!this.state.prof_data.doctors?this.state.prof_data.doctors.length !==0?this.state.prof_data.doctors.slice(0, this.state.prof_data.doctors.length>5?this.state.show_doctor_count:this.state.prof_data.doctors.length).map((item,i) =>{
       return (<DoctorComponent
               onClick = {this.onDoctorClick}
             data = {item}
             i = {i}
         />)
     }):<div style={{marginLeft:'auto', marginRight:'auto'}} className='text-cener margin-top-medium_ris'>
       <img style={{display:'block', margin:'auto !important'}}  src="/Group 2096.svg" className=" center_align_rish"  />
       <div style={{marginTop:'2rem', fontSize:'1.5rem'}}>No Doctors added</div>
       <div className="text-center">
           <Link  to={!!get_url_params('center')?`/dashboard/add-doctor?center=${get_url_params('center')}`:"/dashboard/add-doctor"}
              role="button"
              onClick = {()=>this.props.toggleAddDoc()}>
              <img className='add_doctor_plus' src="/icon/add_doctor_plus.svg"/>
              <text style={{marginTop:'.3rem', fontSize:'1.3rem'}} className='green_text_rish display_block'>Add More Doctors</text>
            </Link>
            </div>
     </div>:'':''}
   </div>

   {this.state.prof_data?!!this.state.prof_data.doctors?this.state.prof_data.doctors.length !==0?
           <div className="text-center">
           <Link  to={!!get_url_params('center')?`/dashboard/add-doctor?center=${get_url_params('center')}`:"/dashboard/add-doctor"}
              role="button"
              onClick = {()=>this.props.toggleAddDoc()}>
              <img className='add_doctor_plus' src="/icon/add_doctor_plus.svg"/>
              <text style={{marginTop:'.3rem', fontSize:'1.3rem'}} className='green_text_rish display_block'>Add More Doctors</text>
            </Link>
      </div>
       :'':'':''}


       {!!this.state.prof_data.doctors?
          this.state.prof_data.doctors.length>4?
          !!((this.state.prof_data.doctors.length) !== (this.state.show_doctor_count)) ?<div className="se-dr"><span className="pika cursor-pointer" onClick={()=>this.setState({
            show_doctor_count:this.state.prof_data.doctors.length
            })} >See more Doctors</span></div>:''
                    :''
       :""}

   </React.Fragment>
     }

     </div>}




  <div  id="profile_section_5" className="new_card_class">
  <text className="location_profile_text">Achievements</text>
<div className="achivmnt_b profil_achevment">
{!!this.state.prof_data.achievements?
  this.state.prof_data.achievements.length!==0?
  <React.Fragment>
    <AliceCarousel
                             items={arr}
                             responsive={responsive}
                              autoPlayInterval={1500}
                              autoPlayDirection="rtl"
                              autoPlay={true}
                              infinite={true}
                              buttonsDisabled ={true}
                            fadeOutAnimation={true}
                            mouseTrackingEnabled={false}
                            disableAutoPlayOnAction={false}
  />
   {/* <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
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
</div> */}
  </React.Fragment>
 :<div className="row">
<div style={{marginLeft:'auto', marginRight:'auto'}} className='text-cener margin-top-medium_ris'>
    <img style={{marginLeft:'3rem'}} src="/no_achievement.svg"  alt="no_achivement_added" />
    <div style={{marginTop:'2rem', fontSize:'1.5rem'}}>No Achievement added</div>
  </div>
  </div>
:'No achievements'}
       </div>

       {/* <ImageGallery items={images} /> */}
          </div>
  </div>
          
          <ModalComponent 
                open = {this.state.addAchievementFlag}
                handleClose = {this.addAchievementClose}
                modalBody = {this.generateAddAchievement}
                />  
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
  location_toggler:state.user.location_toggler,
  change_address_ret:state.profile_store.change_address_ret,
  change_address_loading_flag:state.profile_store.change_address_loading,
})

export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: 'translate3d(0, -2rem, 0)',
    transition: 'opacity 100ms ease-out, transform 100ms ease-out',
  },
  mountedStyle: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .5s ease-out, transform .5s ease-out',
  },
})(compose(
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
    set_location_toggler,
    change_address,
    change_address_loading
   })
)(ProfileContainer))