import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import { getUserDetails , submitProfileDetails, clearSubmitProfileRet} from "../../actions/userActions"
import { connect } from 'react-redux';
import {notify} from "../../utils/notification"
import EditProfileForm from "../functional/EditProfile"
import redux from "redux"

class EditProfileComponent extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            valid:true,
            phone:'',
            email:'',
            fullname:'',
            location:'',
            initRen:true,
            errorText:false,
            successText:false,
            loading:true,
            isCenter:false
        }
    }

   async componentDidMount(){  
        await this.setState({
            loading:true
        },()=>this.props.getUserDetails())
   }
    handleChange = (e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
        console.log("Inside handleChange")
        this.setState({
            [e.target.name]: e.target.value
          });
    }
    componentWillReceiveProps(nextProps){
        if(!!this.state.initRen){
            console.log(nextProps.user,'NextProps.user')
            this.setState({
                fullname:nextProps.user.name,
                email:nextProps.user.isCenter?nextProps.user.centerEmail===''?nextProps.user.adminEmail:nextProps.user.centerEmail:nextProps.user.email,
                phone:nextProps.user.isCenter?nextProps.user.centerMobileNumber===''?nextProps.user.adminMobileNumber:nextProps.user.centerMobileNumber:nextProps.user.mobileNumber,
                location:nextProps.user.address,
                initRen:false,
                loading:false,
                isCenter:nextProps.user.isCenter
            })
        }
    }

    clearNotif = () =>{
        this.setState({
            errorText:false,
            successText:false
        })
    }

    loading = () =>{
        this.setState({
            loading:true
        })
    }
    loadingOff = () =>{
        this.setState({
            loading:false
        })
    }

    submitdetails = () => {
        if(this.state.fullname === '' ||this.state.email==='' || this.state.phone==="" || this.state.location==="" ){
            notify("Enter all the details",'success')
        }else{
            notify("All Details have been entered", 'success')
        }
    }

    render() {
        console.log(this.state," this.state in Edit Profile Component")
        console.log(this.props," this.props in Edit Profile Component")
        return (
                <React.Fragment>
                    <div className="main_content_rish">
                        <div>
                           <div className="settingpageBody">
                               <div className='settingtopic'>
                               <h4 style={{position:'relative'}} className="section_heading_rish">Edit Profile</h4>
                               </div>
                               <EditProfileForm 
                                fullname = {this.state.fullname}
                                email = {this.state.email}
                                phone = {this.state.phone}
                                location = {this.state.location}
                                handleChange = {this.handleChange}
                                errorText = {this.state.errorText}
                                successText = {this.state.successText}
                                clearNotif = {this.clearNotif}
                                submitProfileDetails = {this.props.submitProfileDetails}
                                submitProfileRet = {this.props.submitProfileRet}
                                clearSubmitProfileRet = {this.props.clearSubmitProfileRet}
                                submitProfileLoading = {this.props.submitProfileLoading}
                                getUserLoading = {this.props.getUserLoading}
                                loading = {this.loading}
                                loadingOff = {this.loadingOff}
                                loadingState = {this.state.loading}
                                isCenter={this.state.isCenter}
                               />
                               </div>
                        </div>
                    </div>
                </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
     user: state.user.userDetail,
     submitProfileRet:state.user.submitProfileRet,
     submitProfileLoading:state.user.submitProfileLoading,
     getUserLoading:state.user.getUserLoading
})


  export default connect(mapStateToProps, { 
    getUserDetails,
    submitProfileDetails,
    clearSubmitProfileRet
})(EditProfileComponent);


// export default connect(mapStateToProps, {
//      getUserDetails,
//      submitProfileDetails,
//      ...mapDispatchToProps()
// })(EditProfileComponent);
// Call userdetails from