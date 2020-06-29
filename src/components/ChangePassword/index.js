import React from 'react';
import { getUserDetails , clearResetRet, submitResetDetails, logout}  from "../../actions/userActions"
import { connect } from 'react-redux';
import ChangePassForm from "../functional/changePassForm"
import NewNotif from "../functional/NewNotif";
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
        if(nextProps.resetPassRet){
             if(nextProps.resetPassRet.success){
                 this.setState({
                     ret:{
                         message:nextProps.resetPassRet.message,
                         success:true
                     }
                 },()=>nextProps.logout())
             }else{
                this.setState({
                    ret:{
                        message:nextProps.resetPassRet.message,
                        success:false
                    }
                })
             }
             nextProps.clearResetRet()
        }
    }

    clearNotif = () =>{
        this.setState({
            errorText:false,
            successText:false
        })
    }
  

    render() {
        console.log(this.state," this.state in Edit Profile Component")
        console.log(this.props,"this.props changePassword")
        return (
                    <React.Fragment>
                    <div className='main_content_rish'>
                        <div >
                           <div className="settingpageBody">
                               <div className='settingtopic'>
                                    <h4 style={{position:'relative'}} className="section_heading_rish">Please enter your new password</h4>
                               </div>
                               <NewNotif 
                                ret = {this.state.ret}
                                retClr = {()=>this.setState({ret:false})}
                                />
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
        )
    }
}

const mapStateToProps = state => ({
     user: state.user.userDetail,
     resetPassRet: state.user.resetPassRet
})

 export default connect(mapStateToProps, { 
    getUserDetails,
    clearResetRet,
    submitResetDetails,
    logout
})(ChangePassword);