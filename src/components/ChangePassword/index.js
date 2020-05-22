import React, { Component } from 'react';
import DashboardHeader from '../DashboardComponent/DashboardHeader';
import { getUserDetails , clearResetRet, submitResetDetails} from "../../actions/userActions"
import { connect } from 'react-redux';
import {notify} from "../../utils/notification"
import ChangePassForm from "../functional/changePassForm"
import redux from "redux"
import './index.css'


class ChangePassword extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            valid:true,
            rePassword:'',
            newPassword:'',
            oldPassword:''
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
          });
    }
  async componentDidMount(){
      await  this.props.getUserDetails()
    }

    componentWillReceiveProps(nextProps){
        // if(!!this.state.initRen){
        //     this.setState({
        //         fullname:nextProps.user.name,
        //         email:nextProps.user.email,
        //         phone:nextProps.user.mobileNumber,
        //         location:nextProps.user.address,
        //         initRen:false
        //     })
        // }
    }

    clearNotif = () =>{
        this.setState({
            errorText:false,
            successText:false
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
        console.log(this.props,"this.props changePassword")
        return (
                    <React.Fragment>
                    <div className='col-md-7'>
                        <div className="body-wrap">
                           <div className="settingpageBody">
                               <div className='settingtopic'>
                                    <p>Please enter your new password</p>
                               </div>
                               <ChangePassForm 
                                handleChange = {this.handleChange}
                                submitResetDetails = {this.props.submitResetDetails}
                                user = {this.props.user}
                                clearResetRet = {this.props.clearResetRet}
                                resetPassRet = {this.props.resetPassRet}
                                errorText = {this.state.errorText}
                                newPassword = {this.state.newPassword}
                                rePassword = {this.state.rePassword}
                                oldPassword = {this.state.oldPassword}
                                successText = {this.state.successText}
                                clearNotif = {this.clearNotif}
                               />
                               </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                    </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
     user: state.user.userDetail,
     resetPassRet: state.user.resetPassRet
})


  export default connect(mapStateToProps, { 
    getUserDetails,
    clearResetRet,
    submitResetDetails
})(ChangePassword);


// export default connect(mapStateToProps, {
//      getUserDetails,
//      submitProfileDetails,
//      ...mapDispatchToProps()
// })(EditProfileComponent);
// Call userdetails from