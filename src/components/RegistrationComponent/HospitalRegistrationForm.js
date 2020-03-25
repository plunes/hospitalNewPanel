import React, { Component } from "react";
import { createUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import axios from "axios";
import "./RegistrationComponent.css";

// import { Multiselect } from 'multiselect-react-dropdown';


class HospitalRegistrationForm extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.userType)
    this.state = {
      pictures: [],
      name: "",
      address: "",
      mobileno: "",
      regno: "",
      email: "",
      password: "",
      error: null,
      isLoaded: false,
      specialities: [],
      speciality: "",
      userType: "Hospital",
      open: false,
      doctors: [],
      doctor_name: '',
      doctor_education : '',
      doctor_designation : '',
      doctor_department : '',
      doctor_experience : '',
      // showLogin: false
    };
    // this.baseUrl ='http://13.233.151.26:3000/';
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDoctorSubmit = this.handleDoctorSubmit.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(e.target.name);
  }
  handleDoctorSubmit(e) {
    e.preventDefault();
    let doctor = {
      "name": this.state.doctor_name,
      "education": this.state.doctor_education,
      "designation": this.state.doctor_designation,
      "department": this.state.doctor_department,
      "experience": this.state.doctor_experience,

    }
    // console.log(doctor);
    this.setState({
      doctor_name: '',
      doctor_education : '',
      doctor_designation : '',
      doctor_department : '',
      doctor_experience : '',
      doctors: [...this.state.doctors, doctor],
    }, () => {
      this.setState({
        // open: false,
        show: true
      })
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    let data = {
      mobileNumber: this.state.mobileno,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      address: this.state.address,
      userType: this.state.userType,
      registrationNumber: this.state.regno,
      specialities: [],
      geoLocation: {},
      doctors: this.state.doctors,
      verifiedUser: "true",
      deviceIds: ""
      //doctors: doc_list
    };

    console.log(data);

    // Sign up Actions
    this.props.createUser(data);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };


  onSelect(selectedList, selectedItem) {
    console.log(selectedList, 'selected list')
  }

  componentDidMount() {
    axios.get(`http://www.plunes.co/v4/catalogue_manager/specialities`)
      .then(res => {
        const specialities = res.data.data;
        // console.log(specialities);
        let array = []
        specialities.forEach((s) => {
          let data = {
            name: s.speciality,
            id: s._id
          }
          array.push(data);
        })
        this.setState({ specialities: array });
      });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="text-center HospitalRegProfileInfo">
            <b>Profile Information</b>
          </div>
          <div className="form-group">
            <input
              className="form-control customborder"
              name="name"
              placeholder="Hospital Name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="">Address</label>
            <textarea name="address"
              className="form-control customborder"
              onChange={this.handleChange}
              customborder="true">
            </textarea>
          </div>
          <div className="form-group">
            <input
              className="form-control customborder"
              name="mobileno"
              placeholder="Mobile Number"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control customborder"
              rows="3"
              name="regno"
              placeholder="Registration No"
              onChange={this.handleChange}
              required
            ></textarea>
          </div>
          <button
              type="submit"
              onClick={this.onOpenModal}
              className="btn btn-success text-center signupHosbtn"
            >
              Add
            </button>
          <div className="form-group buttonSignUp AddDrArea">
            
            <Modal open={open} onClose={this.onCloseModal}>
              <div className="AddDr">
                <div>
                  <h2 style={{ textAlign: "center" }}>Add Doctors</h2>
                </div>
                <hr />
                <div style={{ textAlign: "center" }} className="form-group"></div>
                <div className="form-group">
                  <input
                    className="form-control customborder"
                    name="doctor_name"
                    value={this.state.doctor_name}
                    placeholder="Full Name"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control customborder"
                    name="doctor_education"
                    value={this.state.doctor_education}
                    placeholder="Educational Qualification"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control customborder"
                    name="doctor_designation"
                    value={this.state.doctor_designation}
                    placeholder="Designation"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control customborder"
                    name="doctor_department"
                    value={this.state.doctor_department}
                    placeholder="Department"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control customborder"
                    name="doctor_experience"
                    value={this.state.doctor_experience}
                    placeholder="Experience"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" onClick={this.handleDoctorSubmit} className="btn btn-success text-center signupHosbtn">
                    Add
                  </button>
                </div>
                <p></p>
              </div>
            </Modal>
            {
              this.state.show && this.state.doctors.map((d, index) => (
                <div className='' key={index}>
                  <div className='row'>
                    <ul>
                      <li><b>{d.name}</b></li>
                      <li>{d.education}</li>
                      <li>{d.designation}</li>
                      <li>{d.department}</li>
                      <li>{d.experience} years of experience</li>
                    </ul><hr></hr>
                  </div>
                </div>
              ))
            }
          </div>
          <hr />

          <div className="text-center signupHosformfield manageAcc">
            <h5>
              <strong>Manage Account</strong>
            </h5>
            <p>Add Users</p>
          </div>
          <div className="form-group">
            <h5>
              <strong>Admin</strong>
            </h5>
            <p>Add User</p>
          </div>
          <div className="form-group">
            <input
              className="form-control customborder"
              name="email"
              placeholder="User Email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control customborder"
              name="password"
              placeholder="User Password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="text-center">
            <p className="Plzenter">Please enter at least 8 character Password</p>
          </div>
          <div className="form-group" className="buttonSignUp">
            <button type="submit" className="btn btn-success text-center signupHosbtn">
              Submit
            </button>
          </div>
        </form>
        <br />
      </div>
    );
  }
}
// HospitalRegistrationForm.propTypes = {
//   createUser: PropTypes.func.isRequired
// };

export default connect(null, { createUser })(HospitalRegistrationForm);
