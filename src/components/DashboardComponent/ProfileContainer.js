import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { connect } from 'react-redux';
import axios from 'axios';
// import { expertDetails } from '../../actions/userActions';
import './Profile.css';
import Modal from "react-responsive-modal";
import { expertDetails } from "../../actions/userActions";


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
          <p className="HospitalCover"><img className="HospitalCoverImg" src={this.props.user.coverImageUrl || '/democoverimg.svg'}></img></p>
        </div>
        {/* <div>
                <input type="file" onChange={this.handleChange}/>
           </div> */}
        <div onSubmit={this.handleSubmit}>
          <div className="row HospitalProfileRow1">
            <div className="col-sm-3 col">
              <div><img className="blackdot" src={this.props.user.imageUrl || '/profile.png'}></img></div>
            </div>
            <div className="col-sm-9 col maxhospitalrow1col2">
              <p className="maxhospital"><b>{this.props.user.name}</b></p>
              <p className="maxhospitaladd">{this.props.user.address}</p>
            </div>
          </div>
          {/* <div class="achivementlogo text-center">
                  <img src="/achivement.png"></img>
              </div>
              <div class="achivement text-center">
                  <p>Achievement</p>
              </div> */}
          {/* <div class="row mainBodyMaxHospitalrow4">
                    <div class="col-xs-1 col-sm-1 col">
                        <img src="Location.png"></img>
                    </div>
                    <div class="col-xs-10 col-sm-10 col mainBodyMaxHospitalrow4col2">
                        <p class="mainBodyMaxHospitalrow4col2para"><span class="loc"><b>Location :</b></span><span>{this.props.user.address }</span> */}
          {/* <a href="#" class="editmainbodymaxhospital"> Edit</a> */}
          {/* </p>
                    </div>
                    <div class="col-xs-1 col-sm-1 col"></div>
                </div> */}
          {/* <div class="row">
                  <div class="col-sm-1 col"></div>
                  <div class="col-sm-10 col maxhospitalviewmap"><a href="" class="editmainbodymaxhospital viewmap">View on map</a></div>
                  <div class="col-sm-1 col"></div>
              </div> */}
          <hr className="Hospitalhr"></hr>
          <div className="row HospitalBio">
            <p className="intro"><strong>Introduction</strong></p>
            <p className="loc">{this.props.user.biography}</p>
          </div>
          <div className="row ExpertRow">
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
          </div>
          <Modal open={open} onClose={this.onCloseModal}>
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
          </Modal>
          <div>
            {
              this.props.user.doctors ? this.props.user.doctors.map((d, index) => (
                <div key={index} className="row ExpertsDetails">
                  <div className="col-sm-4 text-right"><img src={d.imageUrl || '/profile.png'} className="ExpertImg"></img></div>
                  <div className="col-sm-8">
                    <div><b>{d.name}</b></div>
                    <div>{d.education}</div>
                    <div>{d.designation}</div>
                    <div>{d.experience} years of experience</div>
                  </div>
                </div>
              )) : false
            }
          </div>
          <div>
            
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.userDetail
})

export default connect(mapStateToProps, { expertDetails })(ProfileContainer);