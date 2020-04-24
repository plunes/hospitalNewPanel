import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
//import "./AvailabilityComponent.css";
import "./MyCatalogueComponent.css";
import { getUserCatalogue, uploadProcedures, uploadProceduresClr ,
upload,
uploadRetClr,
downloadCatalogueClr,
downloadCatalogue
} from '../../actions/userActions'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import SearchComponent from "../functional/SearchComponent"
import UploadCatalogue from "../functional/UploadCatalogue"
import ModalComponent from "../ModalComponent"
import DownloadCatalogue from "../functional/DownloadCatalogue"
import Procedure from "../functional/Procedure"
import EditProcedure from "../functional/editProcedure"

// import history from '../../history';

class MyCatalogueComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loader : true,
            rowsToDisplay: 20,
            uploadCatalogFlag:false,
            editFlag:false,
            editCatalogFlag:false
        }
        this.handleClick = this.handleClick.bind(this);
    }


    async componentDidMount() {
        await this.props.getUserCatalogue()
    }
    
    handleClick() {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }

    generateUploadBody = () =>{
        return(
            <React.Fragment>
               <UploadCatalogue
               uploadProceduresClr ={this.props.uploadProceduresClr}
               uploadProceduresRet ={this.props.uploadProceduresRet}
               uploadProcedures = {this.props.uploadProcedures}

               upload = {this.props.upload}
               uploadRet = {this.props.uploadRet}
               uploadRetClr = {this.props.uploadRetClr}
               closeModal = {()=>this.setState({uploadCatalogFlag:false})}
               />        
            </React.Fragment>
          
        )
    }

    generateEditCatalogue = () =>{
        return(
            <EditProcedure

            closeModal = {()=>this.handleCloseEditModal()}
            />
        )
    }

    handleCloseCataModal = () =>{
        this.setState({
            uploadCatalogFlag:false
        })
    }

    handleCloseEditModal = () =>{
        this.setState({
            editCatalogFlag:false
        })
    }

    handleEditInclusion = () =>{
        this.setState({
            editCatalogFlag:true
        })
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
                    <div className='col-md-6 catalogueComponent'>
                        <div className='row justify-content-center'>
                            <p className='catalogue'>Catalogue</p>
                        </div>
                        <div className='row listOfService'>
                              <div className='col-md-4 text-center'>
                                 <a onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({uploadCatalogFlag:true})
                                    }
                                     } href=""><img src="./upload.svg" alt=""></img>
                                 <p className="uploadCata">Upload File</p></a>
                              </div>
                             <DownloadCatalogue
                                downloadCatalogueClr = {this.props.downloadCatalogueClr}
                                downloadCatalogueRet = {this.props.downloadCatalogueRet}
                                downloadCatalogue ={this.props.downloadCatalogue}
                             />
                              <div className='col-md-4 text-center'>
                                 <a href="" onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({editFlag:true})
                                    }}><img src="./edit.svg" alt=""></img>
                                 <p className="uploadCata">Edit Catalogue</p></a>
                              </div>
                        </div>
                        <div className="text-center">
                            <SearchComponent 

                            />
                            
                        </div>
                        <div className='listOfService'>
                            <div className='row listOfServiceHeading'>
                                <div className='col-md-6'>
                                    Test Name
                                    </div>
                                <div className='col-md-3'>
                                    Price
                                </div>
                                <div className='col-md-3'>
                                    Variance
                                </div>
                            </div>
                        </div>
                        {
                            this.props.catalogues.length > 0 ? this.props.catalogues.slice(0, this.state.rowsToDisplay).map( (c, i) => (

                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            />
                            )) : 
                            <div>
                                 {
                                   this.state.loader ? <div className="Loader">
                                                            <Loader
                                                                type="Oval"
                                                                color="#00BFFF"
                                                                height={200}
                                                                width={200}
                                                            // timeout={3000} //3 secs
                                                            />
                                                    </div> : <div>No Catalogue</div>
                                 }
                            </div>
                           
                        }
                        <div className='text-center'>
                            <button onClick={this.handleClick} className="catalogueViewMore">View more</button>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>
                <br />
            <ModalComponent 
                open = {this.state.uploadCatalogFlag}
                handleClose = {this.handleCloseCataModal}
                modalBody = {this.generateUploadBody}
            />

            <ModalComponent 
                open = {this.state.editCatalogFlag}
                handleClose = {this.handleCloseEditModal}
                modalBody = {this.generateEditCatalogue}
                />  
            </div>
        )
    }
}

const mapStateToProps = state => ({
    catalogues: state.user.catalogues,
    uploadProceduresRet:state.user.uploadProceduresRet,
    uploadProceduresLoading:state.user.uploadProceduresLoading,
    uploadRet:state.user.uploadRet,
    uploadLoading:state.user.uploadLoading,
    downloadCatalogueRet:state.user.downloadCatalogueRet
})

export default connect(mapStateToProps, { getUserCatalogue, uploadProcedures, uploadProceduresClr, upload,
uploadRetClr,
downloadCatalogue,
downloadCatalogueClr
})(MyCatalogueComponent);
