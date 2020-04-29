import React, { Component } from 'react';
import SidebarComponent from './DashboardComponent/SidebarComponent';
import DashboardHeader from './DashboardComponent/DashboardHeader';
import { connect } from 'react-redux';
import { bankDetails, submitBankDetailsClr } from "../actions/userActions";
import ManagePayment from "./functional/ManagePayment"
import "./DEvelopment.css"

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
                <DashboardHeader />
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <SidebarComponent />
                </div>
                <div className='col-md-7'>
                    <div className="border_dev">
                <div className="add_dr">
                    <div className="add_srch_d">
          <h4>Add Doctors</h4>
          <p>Search for a doctor by name or email</p>
          </div>
          <div className="search_b">
          <form action="#" method="get">
              <label className="sech_b">Search</label>
            <input list="browsers" name="browser" placeholder="Dr. Surbhi" className="cus_inp col-lg-12"/>
            <img src="/search.png" className="pst_srch"/>
             <div className="box_pnl">
              <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_1.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Sudha Sethi</h6>
                    <p>Anaesthesia, Fortis Hospital, Mohali</p>
                  </div>
             </div>
             {/* 1st-row-end */}
             <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_2.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Minal Sharma</h6>
                    <p>Neurology, Fortis Hospital, Jaipur</p>
                  </div>
             </div>
                 {/* 2nd-row-end */}
                 <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_3.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Anita Gupta</h6>
                    <p>Gynecology, Fortis Hospital, Jaipur</p>
                  </div>
             </div>
                 {/* 3rd-row-end */}
                  {/* 2nd-row-end */}
                  <div className="row">
                  <div className="col-lg-2"><img src="/pixel_4.png"className="pixel" /></div>
                  <div className="col-lg-6 sudha_a">
                   <h6>Dr. Anita Joshi</h6>
                    <p>Gynecology, Fortis Hospital, Jaipur</p>
                  </div>
             </div>
                 {/* 4rth-row-end */}
            </div>
            </form>
            </div>
            {/* form-end */}
              <div className="add_mnu">
                  <div className="aero_dn">
               <a href="#" className="A_nu">Add Manually</a>
               <i class="fa fa-angle-up" aria-hidden="true"></i>
               </div>

               <div className="aero_up">
               <a href="#" className="A_up">Add Manually</a>
               <i class="fa fa-chevron-down" aria-hidden="true"></i>
               </div>

               <div className="manualy_pnl">
              <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_1.png"className="pixel" /></div>
                  <div className="col-lg-4 sudha_a">
                   <h6>Dr. Sudha Sethi</h6>
                    <p>MBBS, DGO HOD, Gynecology 10yrs experience Fortis Hospital, Ludhiana</p>
                  </div>
                  <div className="col-lg-2 offset-lg-4">
                      <div className="fa_min">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  </div>
             </div>
             {/* 1st-row-end */}
             <div className="row botm_bud">
                  <div className="col-lg-2"><img src="/pexel_2.png"className="pixel" /></div>
                  <div className="col-lg-4 sudha_a">
                   <h6>Dr. Minal Sharma</h6>
                    <p>BDS, MDS Surgeon, Dentistry 17yrs experience Fortis Hospital, Jaipur</p>
                  </div>
                  <div className="col-lg-2 offset-lg-4">
                      <div className="fa_min">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  </div>
             </div>
                 {/* 2nd-row-end */}
                 <div className="row">
                  <div className="col-lg-2"><img src="/pexel_3.png"className="pixel" /></div>
                  <div className="col-lg-4 sudha_a">
                   <h6>Dr. Anita Gupta</h6>
                    <p>BPTh, BPT Therapist, Physiotherapy 8yrs experience Fortis Hospital,Gurgaon</p>
                  </div>
                  <div className="col-lg-2 offset-lg-4">
                      <div className="fa_min">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  </div>
             </div>
                 {/* 3rd-row-end */}
               
            </div>
          </div>
          {/* manualy-end */}
          {/* <profile-start> */}
             <div className="profile_secti">
                 <h5 className="pfo_im">Profile Image</h5>
                <div className="row">
                  <div className="col-lg-2">
                      <img src="/account.svg" className="accout"/>
                      <img src="/camera.svg" className="came" />
                    </div>
                    <div className="col-lg-3">
                    <h6 className="fil_nm">File Name</h6>
                    <a href="#" className="upld">Upload</a>
                    </div>
                </div>
                <form class="shake" role="form" method="post" id="contactForm" name="contact-form" data-toggle="validator">
                      {/* <!-- Name --> */}
                      <div class="form-group label-floating">
                        <label class="control-label" for="name">Name</label>
                        <input class="form-control btm_in_bdr" id="name" type="text" name="name" required data-error="Please enter your name" />
                        <div class="help-block with-errors"></div>
                      </div>
                      {/* <!-- Education --> */}
                      <div class="form-group label-floating">
                        <label class="control-label" for="education">Education Qualification</label>
                        <input class="form-control btm_in_bdr" id="educationqua" type="education" name="education" required data-error="Please enter your education qulification" />
                        <div class="help-block with-errors"></div>
                      </div>
                      {/* <!-- Designation --> */}
                      <div class="form-group label-floating">
                        <label class="control-label">Designation</label>
                        <input class="form-control btm_in_bdr" id="msg_Designation" type="text" name="Designation" required data-error="Please enter your message Designation" />
                        <div class="help-block with-errors"></div>
                      </div> 
                       {/* <!-- select-box --> */}
                       <div className="row">
                       <div class="col-lg-6 col-12">
                            <div className="Speciality">
                            <select className="form-control spec_dr_ser btm_in_bdr">
                                <option>Speciality</option>
                                <option>Aesthetics</option>
                                <option>Allergist</option>
                                <option>Aesthetics</option>
                                <option>Allergist</option>
                                <option>Aesthetics</option>
                                <option>Allergist</option>
                            </select>
                            </div>
                        </div>
                        <div class="col-lg-6 col-12">
                            <div className="Speciality">
                            <select className="form-control spec_dr_ser btm_in_bdr">
                                <option>Service</option>
                                <option>Aesthetics</option>
                                <option>Allergist</option>
                                <option>Aesthetics</option>
                                <option>Allergist</option>
                                <option>Aesthetics</option>
                                <option>Allergist</option>
                            </select>
                            </div>
                        </div>
                         </div>
                      {/* <!-- Experience --> */}
                      <div class="form-group label-floating">
                          <label for="message" class="control-label">Experience</label>
                          <input class="form-control btm_in_bdr" id="msg_Experience" type="text" name="Experience" required data-error="Please enter your message Experience" />
                          <div class="help-block with-errors"></div>
                      </div>
                    
                  </form>
              </div>
              {/* <profile-end> */}
              {/* time-Availability */}
                <div className="time_she">
                    <h3 className="abaily text-center">Availability</h3>
                    <div className="row text-center">
                      <div className="col-lg-2"><h4>All</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-4"><h4>From - To</h4></div>
                      <div className="col-lg-2"><h4>Closed</h4></div>
                    </div>
                    {/* heding-section-end */}
                   
                    <div className="row text-center">
                      <div className="col-lg-2"><p className="m">M</p></div>
                      <div className="col-lg-4"><p><span className="time_bor" data-toggle="modal" data-target="#myModal2">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox" /> <label for="checkbox"></label></div></div>
                    </div>
                   
                    {/* 1st-end */}


                      
                    {/* 1st-end */}
                    <div className="row text-center">
                      <div className="col-lg-2"><p className="m">T</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox1" /> <label for="checkbox1"></label></div></div>
                    </div>
                      {/* 2nd-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">W</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox2" /> <label for="checkbox2"></label></div></div>
                    </div>
                      {/* 3rd-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">T</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox3" /> <label for="checkbox3"></label></div></div>
                    </div>
                      {/* 4rth-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">F</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox4" /> <label for="checkbox4"></label></div></div>
                    </div>
                      {/* 5th-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">S</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox5" /> <label for="checkbox5"></label></div></div>
                    </div>
                      {/* 6is-end */}
                      <div className="row text-center">
                      <div className="col-lg-2"><p className="m">S</p></div>
                      <div className="col-lg-4"><p><span className="time_bor">6:00 AM </span><span className="time_bor">11:00 AM</span></p></div>
                      <div className="col-lg-4"><p><span className="time_bor">01:00 PM </span><span className="time_bor">10:00 PM</span></p></div>
                      <div className="col-lg-2"> <div class="round"> <input type="checkbox" id="checkbox6" /> <label for="checkbox6"></label></div></div>
                    </div>
                      {/* 7th-end */}
                      <div className="time_clo">
                      <a href="#" className="sub_tm">Submit</a>
                      </div>
                </div>
              {/* time-Availability -end*/}
                <div className="consul_fee">
                    <div className="row">
                      <div className="col-lg-10"><h2 className="fee_cun_ch">Consultation Fee</h2></div>
                      <div className="col-lg-2"><h2 className="fee_ru">30000</h2></div>
                    </div>
                    <div className="time_clo">
                      <a href="#" className="sub_tm">Add</a>
                      </div>
                </div>
            </div>
        </div>
        </div>
        
        
                <div className='col-md-3'></div>
                
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

