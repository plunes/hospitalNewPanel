import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bankDetails, submitBankDetailsClr } from "../actions/userActions";
import "./DEvelopment.css"
import LandingHeader from './LandingHeader'

var rootStyle = {
    backgroundColor : 'green',
    color : 'white',
    height : '100%'
  
  }

class Development extends Component {
    constructor(props){
        super(props);
        this.state = {
            userDetails : {},
            bankname: '',
            accnumber:  '',
            ifsccode: '',
            pannumber: '',
            accountname: '',
            loading:true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
          });
    }
    handleSubmit(e){
        e.preventDefault();
        let data = {
            "name": this.state.accountname,
            "bankName": this.state.bankname,
            "ifscCode": this.state.ifsccode,
            "accountNumber": this.state.accnumber,
            "panNumber": this.state.pannumber
        }
        this.props.bankDetails(data);
        
    }

    bankDetails = (data) =>{
        this.setState({
            loading:true
        })
        this.props.bankDetails(data)
    }
    loadingOff = () =>{
        this.setState({
            loading:false
        })
    }
    
    async componentWillReceiveProps(nextProps){
        // this.setState({
        //     userDetails : nextProps.user
        // }, () => {
        //     if(this.state.userDetails.bankDetails){
        //         this.setState({
        //             bankname : this.state.userDetails.bankDetails.bankName,
        //             accnumber : this.state.userDetails.bankDetails.accountNumber,
        //             ifsccode : this.state.userDetails.bankDetails.ifscCode,
        //             pannumber : this.state.userDetails.bankDetails.panNumber,
        //             accountname : this.state.userDetails.bankDetails.name,
        //             loading:false
        //         }, () => {
        //             console.log(this.state.userDetails.bankDetails.bankName)
        //         })
        //     }
        
        // })
      
    }

    async componentDidMount(){
        // console.log(this.props.user, 'user')
   
    }
    

    render() {
        
        return (
            <div>
            <div className='row'>
                <LandingHeader />
            </div>
             <section className="Plunes_india">
               <div className="text-center">
                 <div className="row">
                   <div className="col-lg-12 text-center">
                    <div className="heading_hos">
                       <h2>PLUNES is India's first AI powered utility network</h2>
                       <p>Create your profile for free to get started</p>
                        <a href="#" className="get_startd_h">Get Started for Free</a>
                       </div>
                      <div  id="video-container" className="video_sec">

                      <iframe 
                      width="560" height="315" 
                      src="https://www.youtube.com/embed/eEQGGzplZ7w" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen></iframe>
                        </div>
                        </div>
                        </div>
                        </div>
                        </section>
                        {/* 1st-section-end */}
                       <div className="row">
                        <section className="offers_int">
                          <div className="text-center">
                           <div className="revenues_heding">
                            <h3>AI offers intelligent and competitive business insights to enhance your patient footfall and revenues.</h3>
                             <img src="/system.png" className="laptop" />
                            </div>
                            <div className="container">
                             <div className="row marg_real" id="main">
                                  <div className="col-lg-6 col-md-6 col-12" id="myRedDIV">
                                    <img src="/realtime.png" className="real_time"/>
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-12 tools_pat" id="myPinkDIV">
                                   <h2>Real Time Insights</h2>
                                   <p>AI and Big data tools to monitor the flow of patients, enabling you to take data driven decision for optimizing the revenue.</p>
                                  </div>
                               </div>
                            </div>
                            </div>
                        </section>
                      </div>
                        {/* 2nd-end */}
                        <section class="why_plunes">
                        <div className="container">
                                <div className="plunes_brd">
                                    <hr className="black_bordr" />
                                    <h2>Why Plunes?</h2>
                                </div>
                               
                                <div className="row text-center">
                                    <div className="col-lg-4 col-4 refund_im">
                                        <div className="bg_colur">
                                            <a href="#"> <img src="extensive.svg" /></a>
                                        </div>
                                        <div className="refund_pay">
                                            <a href="#"><h2>Extensive marketing of your <br/>facility & Free Signup</h2></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-4 refund_im">
                                        <div className="bg_colur">
                                            <a href="#"><img src="prepaid.svg" /></a>
                                        </div>
                                        <div className="refund_pay">
                                            <a href="#"><h2>Prepaid <br />Patients</h2></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-4 refund_im">
                                        <div className="bg_colur">
                                            <a href="#"><img src="automated.svg" /></a>
                                        </div>
                                        <div className="refund_pay">
                                            <a href="#"><h2>Automated <br />Appointments</h2></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="row text-center margin_icn mobile_re">
                                    <div className="col-lg-4 col-4 refund_im">
                                        <div className="bg_colur">
                                            <a href="#"><img src="affluentcustomerbase.svg" /></a>
                                        </div>
                                        <div className="refund_pay">
                                            <a href="#">
                                                <h2>Affluent <br />Customer Base</h2></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-4 refund_im">
                                        <div className="bg_colur">
                                            <a href="#"><img src="reduction.svg" /></a>
                                        </div>
                                        <div className="refund_pay">
                                            <a href="#"><h2>Reduction on Operational <br />Cost upto 40%</h2></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-4 refund_im">
                                        <div className="bg_colur">
                                            <a href="#"><img src="worksper.svg" /></a>
                                        </div>
                                        <div className="refund_pay">
                                            <a href="#"><h2>AI works as a Personal <br />Assistant to you</h2></a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                 
                      {/* 3rd-end */}
                      <div className="row">
                      <section className="inteljent_cloud">
                         <h4 className="solution_emr">An intelligent Cloud Solution for EMR, Integrated with profiles <br />of Users and Hospitals for a seamless experience.</h4>
                         <div className="container">
                             <div className="row">
                           <div className="col-lg-5 offset-lg-1 col-12 col-md-5">
                              <ul className="report_any">
                                <li>Unlimited cloud storage, access the reports from anywhere</li>
                                <li>Share reports with patients in one click</li>
                                 <li>Reduction in overall operational costs up to 40%/annum</li>

                                </ul>
                             </div>
                             <div className="col-lg-4 col-md-4 col-12">
                              <img src="/cloud.svg" className="clod_anum" />
                             </div>
                             </div>
                           </div> 
                         
                        </section>
                        </div>
                     </div>
        
    
        
        )
    }
}
const mapStateToProps = state => ({
    user : state.user.userDetail,
    submitBankDetailsRet:state.user.submitBankDetailsRet
  })
  export default connect(mapStateToProps, {bankDetails, submitBankDetailsClr})(Development)

