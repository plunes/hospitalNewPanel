import  React from 'react'
import AddCenter from "./AddCenter"
import { Link } from 'react-router-dom'
import { get_url_params } from "../../utils/common_utilities"
import { connect } from 'react-redux';
import {  set_centers_data } from "../../actions/userActions"

class Centers extends React.PureComponent{
        constructor(props){
            super(props)
            this.state= {
                valid:true
            }
        }
    render(){
        console.log(this.props,"this.props in Centers")
        if(get_url_params('addCenter')==='true'){
            console.log("Inside it")
            return <AddCenter />
        }
        return (
            <div className= 'col-md-8 col-xl-8  AllComponents AvailableTime'>
                <div className="centers_wrapper">
                    <div className="text-center">
                <h1 className="margin-top-medium_ris center_align_rish " >Centers List</h1>
                </div>
                <div className="margin-top-medium_ris centers-list-wrapper">
                    <div className="row">

                        {this.props.centers_data.centers_list.map(item=>{
                           return  <div className="col-md-3">
                           <div className="centers-wrap">
                                   <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                   <div className="text-center">
                                   <span className="sub_heading_rish">{item.name} <br></br>{item.centerLocation}</span>
                                   </div>
                           </div>
                       </div>
                        })}
                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="centers-wrap">
                                    <img src="/Lab 1.png" alt="hospitals_centers " className="center_align_rish hospital_center_img" />
                                    <div className="text-center">
                                    <span className="sub_heading_rish">Mahajan Imaging Centre <br></br>875, Block A, Gurugram</span>
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="text-center margin-top-medium_ris">
                 <Link to="/dashboard/centers?addCenter=true">
                <button className="common_button_rish">Add Center</button>
                </Link>
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    centers_data:state.user.data.centers_data
  })
  
export default connect(mapStateToProps, { set_centers_data})(Centers);