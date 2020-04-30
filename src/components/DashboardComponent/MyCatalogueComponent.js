import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
//import "./AvailabilityComponent.css";
import "./MyCatalogueComponent.css";
import { getUserCatalogue, uploadProcedures, uploadProceduresClr ,
upload,
uploadRetClr,
downloadCatalogueClr,
downloadCatalogue,
searchProcedures,
searchProceduresClr,
editProcedure,
editProcedureClr
} from '../../actions/userActions'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import SearchComponent from "../functional/SearchComponent"
import UploadCatalogue from "../functional/UploadCatalogue"
import ModalComponent from "../ModalComponent"
import DownloadCatalogue from "../functional/DownloadCatalogue"
import Procedure from "../functional/Procedure"
import EditProcedure from "../functional/editProcedure"
import LoaderComponent from "../functional/LoaderComponent"

// import history from '../../history';

class MyCatalogueComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            rowsToDisplay: 20,
            uploadCatalogFlag:false,
            editFlag:false,
            editCatalogFlag:false,
            limit:50,
            searchQuery:'',
            page:1,
            procedures:[],
            selectedProcedure:{},
            editProcedureLoading:false
        }
        this.handleClick = this.handleClick.bind(this);
    }


    async componentDidMount() {
        this.setState({
            loading:true
        })
        await this.props.searchProcedures({
            limit:50,
            searchQuery:'',
            page:1
        })
    }
    

    componentWillReceiveProps(nextProps){
            if(!!nextProps.searchProceduresRet){
                if(nextProps.searchProceduresRet.success){
                    this.setState({
                        procedures:nextProps.searchProceduresRet.data,
                        loading:false
                    })
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.searchProceduresClr()
            }
    }
    
    handleClick() {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }
    handleSelectedProcedureChange = (e) =>{
        let arr = []
        arr.push(e.target.value)
        console.log(e.target.value,"e in handleSelectedProcedureChange")
        this.setState({
            selectedProcedure:{
                ...this.state.selectedProcedure,
                price:arr
            }
           
        })
    }

    handleVarianceChange = (e) =>{
        this.setState({
            selectedProcedure:{
                ...this.state.selectedProcedure,
                variance:e.target.value
            }
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

    searchProceduresFun = (data) =>{
        this.setState({
            loading:true
        })
        this.props.searchProcedures(data)
    }

    viewMore = () =>{
        this.setState({
            limit:this.state.limit + 50,
            loading:true
        },()=>this.props.searchProcedures(
          {
            limit:this.state.limit,
            page:1,
            searchQuery:''
          } 
        ))
    }

    handleSubmit = () =>{
        this.setState({
            editProcedureLoading:true
        },()=>this.props.editProcedure(this.state.selectedProcedure)) 
    }

    onEdit = (data) =>{
        console.log(data,"data in onEdit ")
        this.setState({
            selectedProcedure:{
                ...data.data,
                id:data.id
            }
        })
    }

    render() {
        console.log(this.state,"state in Mycatalogue")
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
                                searchProcedures = {this.searchProceduresFun}
                                searchProceduresClr = {this.props.searchProceduresClr}
                                searchProceduresRet = {this.props.searchProceduresRet}

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
                            this.state.loading &&    <div className="loading-wrapper_ris">
                              <React.Fragment>
                                 <LoaderComponent />
                               </React.Fragment>
                               </div>
                        }
                        {this.state.editProcedureLoading && <LoaderComponent />}
                        {
                            this.state.procedures.length > 0 ? this.state.procedures.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            onEdit = {this.onEdit}
                            selectedProcedure = {this.state.selectedProcedure}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            editProcedureRet = {this.props.editProcedureRet}
                            editProcedureClr = {this.props.editProcedureClr}
                            editProcedureLoadingOff = {()=>this.setState({
                                editProcedureLoading:false
                            })}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>
                        }
                        <div className='text-center'>
                            {this.state.procedures.length !==0 && <button onClick={this.viewMore} className="catalogueViewMore">View more</button> }    
                        </div>

                        <div className='text-center'>
                            {(this.state.editFlag && (this.state.selectedProcedure !== {}))  && <button onClick={this.handleSubmit} className="button_common">Submit</button> }    
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
    downloadCatalogueRet:state.user.downloadCatalogueRet,
    searchProceduresRet:state.user.searchProceduresRet,
    editProcedureRet:state.user.editProcedureRet
})

export default connect(mapStateToProps, { getUserCatalogue, 
    uploadProcedures, uploadProceduresClr, upload,
    searchProcedures, searchProceduresClr,
uploadRetClr,
downloadCatalogue,
downloadCatalogueClr,
editProcedure,
editProcedureClr
})(MyCatalogueComponent);
