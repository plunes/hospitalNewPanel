import React from 'react';
import { connect } from 'react-redux';
// import { expertDetails } from '../../actions/userActions';
import './Profile.css';
import Modal from "react-responsive-modal";
import { expertDetails, upload, uploadRetClr, updateImage, updateImageClr, getProfileDetails } from "../../actions/userActions";
import ProfileImage from '../functional/ProfileImage';


class ProfileContainer extends React.Component {
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
      doctor_experience : ''
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleAddExpert = this.handleAddExpert.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //       console.log(this.props.user.doctor)
  //         e.preventDefault();
  //         this.setState({
  //             file:  e.target.files,


  //         }, 
  //           // async () => {

  //           //   for(let i = 0; i<this.state.file.length; i++){
  //           //       const data = new FormData();
  //           //       data.append('file', this.state.file[i])
  //           //      await axios.post("https://plunes.co/v4/upload", data, {
  //           //           headers: {
  //           //               'Content-Type': 'multipart/form-data'
  //           //           }
  //           //       }).then(res => {
  //           //           if (res.status === 200) {
  //           //               console.log(res);
  //           //               // let report = {
  //           //               //     reportUrl : "https://plunes.co/v4/" + res.data.path,
  //           //               //     reportName : res.data.originalname
  //           //               // }
  //           //               // this.setState({
  //           //               //     report: [...this.state.report, report],
  //           //               // })
  //           //           }
  //           //       });
  //           //   }


  //         // });

  //     };

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


  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {

    const { open } = this.state;
    // console.log(this.props.user, 'vinay');
    return (
      <div className="HospitalProfileBody AllComponents">
        <div className="row sur">
          <p className="HospitalCover"><img className="HospitalCoverImg mas_hos" src={'/maxhos.png'} alt=""></img></p>
          
        </div>
        <div className="edit_image">
           
            <img className="edit_icn"src={'/pen_editor.svg'}></img></div>
        {/* <div>
                <input type="file" onChange={this.handleChange}/>
           </div> */}
        <div onSubmit={this.handleSubmit}>
          <div className="row HospitalProfileRow1">
            <div className="col-sm-2 col-lg-2">
              <div>
               <ProfileImage
                user = {this.props.user}
                upload = {this.props.upload}
                uploadRetClr = {this.props.uploadRetClr}
                uploadRet = {this.props.uploadRet}

                updateImage ={this.props.updateImage}
                updateImageRet ={this.props.updateImageRet}
                updateImageClr ={this.props.updateImageClr}

                getProfileDetails = {this.props.getProfileDetails}

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
                        <a><img src="/achivement.png"></img></a>
                        <p><b>Achievement</b></p>
                </div>
                <div class="col-md-4 achivementlogo text-center">
                        <a href="/my-catalogue"><img src="/cata.svg" className='catalogueImg'></img></a><br></br>
                        <p><b>Catalogue</b></p>
                </div>
                <div class="col-md-2"></div>
          </div>
          <div className="bdyhs_mar">
          <div class="row mainBodyMaxHospitalrow4 ">
           
                    <div class="col-xs-1 col-sm-1 col-lg-1">
                        <img src="Location.png"></img>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-lg-10 mainBodyMaxHospitalrow4col2">
                        <p class="mainBodyMaxHospitalrow4col2para"><span class="loc"><b>Location :</b></span><span>{this.props.user.address }</span> */}
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
          <hr className="Hospitalhr"></hr>
          <div className="row HospitalBio">
            <p className="intro col-lg-11"><strong>Introduction</strong> </p><span className="edi_intr">Edit</span>
            <div className="col-lg-12 text_cmt">
            <textarea rows="4" cols="90" name="comment" form="usrform">
            This is max hospital</textarea>
            </div>
          </div>

          <div className="col-md-8 col-12 cardio_le">
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
       <div className="row">
         <div className="col-lg-6">
           <p>Abiation </p>
           </div>
           <div className="col-lg-6 abito">
             <p><a href="#">Know More</a></p>
           </div>
           <div className="col-lg-6">
           <p>Cardiac Rehabilitation </p>
           </div>
           <div className="col-lg-6">
             <p><a href="#">Know More</a></p>
           </div>
           <div className="col-lg-6">
           <p>Coronary Artery Bypass Grafting </p>
           </div>
           <div className="col-lg-6">
             <p><a href="#">Know More</a></p>
           </div>
           <div className="col-lg-6">
           <p>Heart Transplant</p>
           </div>
           <div className="col-lg-6">
             <p><a href="#">Know More</a></p>
           </div>
           <div className="col-lg-6">
           <p>Space for text </p>
           </div>
           <div className="col-lg-6">
             <p><a href="#">Know More</a></p>
           </div> 
         
       </div>
       <div className="vi_m">
       <a href="#"className="view_more">View More</a></div>
      </div>
          {/* <div className="row ExpertRow">
            <div className="col-sm-6">
              <h4><strong>Team of Experts</strong></h4>
            </div>
            <div className="col-sm-6 text-right">
              <button
                type="submit"
                onClick={this.onOpenModal}
                onChange={this.handleChange}
                className="AddExpert">
                Add Expert
                      </button>
            </div>
          </div> */}
          {/* <Modal open={open} onClose={this.onCloseModal}>
            <form onSubmit={this.handleAddExpert} className="AddExpertForm">
              <div>
                <h2 style={{ textAlign: "center" }}>Add Doctor</h2>
              </div>
              <hr />
              <div style={{ textAlign: "center" }} className="form-group"></div>

              <div className="form-group">
                <input
                  className="AddExInput"
                  name="doctor_name"
                  value = {this.state.doctor_name}
                  placeholder="Full Name"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="AddExInput"
                  name="doctor_education"
                  value = {this.state.doctor_education}
                  placeholder="Educational Qualification"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="AddExInput"
                  name="doctor_designation"
                  value = {this.state.doctor_designation}
                  placeholder="Designation"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="AddExInput"
                  name="doctor_department"
                  value = {this.state.doctor_department}
                  placeholder="Department"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="AddExInput"
                  name="doctor_experience"
                  value = {this.state.doctor_experience}
                  placeholder="Experience"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group" onSubmit={this.handleSubmit}>
                <button type="submit" className="AddExpertBtn">
                  Submit
                </button>
              </div>
              <p></p>
            </form>
          </Modal> */}
          {/* <div>
            {
              this.props.user.doctors ? this.props.user.doctors.map((d, index) => (
                <div key={index} className="row ExpertsDetails">
                  <div className="col-sm-4 text-right"><img src={d.imageUrl || '/profile.png'} className="ExpertImg" alt=""></img></div>
                  <div className="col-sm-8">
                    <div><b>{d.name}</b></div>
                    <div>{d.education}</div>
                    <div>{d.designation}</div>
                    <div>{d.experience} years of experience</div>
                  </div>
                </div>
              )) : false
            }
          </div> */}
          <div className="team_sec">
          <div className="row">
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4">
            <img src="/drshivani.png"/>
            <div className="left_ali">
            <h2>Dr. Seema Mehta</h2>
            <p>Gynecologist</p>
            <p>10 years of experience</p>
            </div>

        </div>

    </div>
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4 timelinebox4_2">
            <img src="/drrajeev.png"/>
            <div className="left_ali">
            <h2>Dr. Rajeev Nair</h2>
            <p>Gynecologist</p>
            <p>12 years of experience</p>
            </div>
        </div>

    </div>
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4 timelinebox4_3">

            <img src="/drnaman.png"/>
            <div className="left_ali">
                <h2>Dr. Sunil Mehta</h2>
                <p>Gynecologist</p>
                <p>12 years of experience</p>
                </div>
        </div>

    </div>
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4 timelinebox4_4">
            <img src="/drsachin.png"/>
            <div className="left_ali">
                <h2>Dr. Sunil Mehta</h2>
                <p>Gynecologist</p>
                <p>12 years of experience</p>
                </div>

        </div>

    </div>
</div>
{/* 1st row end */}
<div className="row">
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4">
            <img src="/drshivani2.png"/>
            <div className="left_ali">
            <h2>Dr. Neha Gupta</h2>
            <p>Gynecologist</p>
            <p>10 years of experience</p>
            </div>

        </div>

    </div>
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4 timelinebox4_2">
            <img src="/drrohit.png"/>
            <div className="left_ali">
            <h2>Dr. Prakash Rao</h2>
            <p>Gynecologist</p>
            <p>12 years of experience</p>
            </div>
        </div>

    </div>
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4 timelinebox4_3">

            <img src="/drsuraj.png"/>
            <div className="left_ali">
                <h2>Dr. Suresh Tanwar</h2>
                <p>Gynecologist</p>
                <p>12 years of experience</p>
                </div>
        </div>

    </div>
    <div className="col-md-6 col-sm-12 col-lg-3">
        <div className="timelinebox4 timelinebox4_5">
            <img src="/plus_2.svg"/>
            

        </div>

    </div>
</div>
{/* 2nd-end */}
<div className="se-dr"><a href="#">See more Doctor's</a></div>
<div className="achivmnt_b">
  <div className="row">
  <div className="col-lg-6">
    <div className="cir_b"><img src="/cross.png" className="croS" /></div>
  <img src="/ach1.png" className="ach1" />
  <span className="three">+3</span>
  <p>Lorem Ipsum, lorem ipsum lorem ipsum, lorem ipsum</p>
</div>
<div className="col-lg-6">
<div className="cir_b"><img src="/cross.png" className="croS" /></div>
<img src="/ach2.png" className="ach1"/>
<span className="three">+3</span>
<p>Lorem Ipsum, lorem ipsum lorem ipsum, lorem ipsum</p>
</div>
</div>
  </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.userDetail,
  uploadRet:state.user.uploadRet,
  updateImageRet:state.user.updateImageRet
})

export default connect(mapStateToProps, { expertDetails, upload, uploadRetClr, updateImage, updateImageClr, getProfileDetails })(ProfileContainer);