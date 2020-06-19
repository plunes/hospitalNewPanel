import  React from "react"
import AuthHeader from "../functional/AuthHeader"
import EnterEmail from "../functional/EnterEmail"
import SubmitOtp from "../functional/SubmitOtp"
import { getOtp, getOtpClr, submitOtp, submitOtpClr } from "../../actions/userActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NewNotif from "../functional/NewNotif";

class ChangePasswordComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            valid:true,
            email:'',
            otp:'',
            rePassword:'',
            newPassword:'',
            screen:0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit  = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    

    handleSubmit(){
        let data;
            if (this.state.email.includes('@')) {
                data = {
                    'email': this.state.email
                }
            } else {
                data = {
                    'email': this.state.email
                }
            }
            this.setState({
              loading:true
            })
        this.props.getOtp(data);
    }

    submitOtpDetails = (data) =>{
        this.setState({
            loading:true
        },()=>{
            this.props.submitOtp(data)
        })
    }

    submitOtpClr = (flag) =>{
        if(!!flag){
            this.setState({
                loading:false,
                redirect_sign_in:true
            },()=>{
                this.props.submitOtpClr()
            })
        }else{
            this.setState({
                loading:false
            },()=>{
                this.props.submitOtpClr()
            })
        }
        
    }



    getOtpClr =(flag)=>{
        if(!!flag){
            this.setState({
                screen:1,
                loading:false
            },()=>this.props.getOtpClr())
        }else{
            this.setState({
                loading:false
            },()=>{
                this.props.getOtpClr()
            })
            
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.submitOtpRet){
            if(nextProps.submitOtpRet.success){
                this.setState({
                    ret:{
                        success:true,
                        message:nextProps.submitOtpRet.message
                    }
                })
            }else{
                this.setState({
                    ret:{
                        success:false,
                        message:nextProps.submitOtpRet.message
                    }
                })
            }
            this.submitOtpClr(nextProps.submitOtpRet.success)
        }

        // if(nextProps.getOtpRet){
        //     if(nextProps.getOtpRet.success){
        //         this.setState({
        //             ret:{
        //                 success:true,
        //                 message:nextProps.getOtpRet.message
        //             }
        //         })
        //     }else{
        //         this.setState({
        //             ret:{
        //                 success:false,
        //                 message:nextProps.getOtpRet.message
        //             }
        //         })
        //     }
        //     nextProps.getOtpClr()
        // }
    }

    render(){
        if(this.state.redirect_sign_in){
            return <Redirect to="signin" />
        }
        console.log(this.props,"props in getOtpRet")
        return(
         <div >
          <div className="row">
          <AuthHeader/>
          </div>
          <div className="row">
              <NewNotif 
                ret = {this.state.ret}
                retClr= {()=>this.setState({ret:false})}
              />
          <div className="col-md-4"></div>
          <div className="forgot_pass_wrap col-md-4">
           {this.state.screen===0 && <EnterEmail
              email = {this.state.email}
              handleChange = {this.handleChange}
              handleSubmit = {this.handleSubmit}
              getOtpRet = {this.props.getOtpRet}
              getOtpClr = {this.getOtpClr}
              /> }

{this.state.screen===1 &&   <SubmitOtp
               rePassword = {this.state.rePassword}
               newPassword = {this.state.newPassword}
               submitDetails = {this.submitOtpDetails}
               handleChange = {this.handleChange}
               otp = {this.state.otp}
               email = {this.state.email}
               submitOtpRet = {this.props.submitOtpRet}
               submitOtpClr = {this.submitOtpClr}
/> }
          </div>
          <div className="col-md-4"></div>
          </div>
        </div>
        )
    }   
}

const mapStateToProps = state => ({
    getOtpRet:state.user.getOtpRet,
    submitOtpRet:state.user.submitOtpRet
  })
export default connect( mapStateToProps , { getOtp, getOtpClr, submitOtp, submitOtpClr })(ChangePasswordComponent);