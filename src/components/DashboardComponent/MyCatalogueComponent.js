import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import SelectComponent from "../SelectComponent"
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
editProcedureClr,
getSpecs,
getSpecsClr,
toAddServices,
toAddServicesClr,
addServices,
addServicesClr
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
import NotifFunc from "../functional/NotifFunc"


 const isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

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
            editProcedureLoading:false,
            selected_speciality:'',
            specialities:[],
            addProcedureFlag:false,
            procedures_toAdd:[],
            selected_procedures:[]
        }
        this.handleClick = this.handleClick.bind(this);
    }



    async componentDidMount() {
        this.setState({
            loading:true
        })
        await this.props.getSpecs({
            type:"getUserSpecialities"
        })
    }

    componentWillReceiveProps(nextProps){

        if(!!nextProps.toAddServicesRet){
            if(nextProps.toAddServicesRet.success){
                this.setState({
                    procedures_toAdd:nextProps.toAddServicesRet.data,
                    loading:false,
                    selected_procedures:[]
                })
            }else{
                this.setState({
                    loading:false
                })
            }
            nextProps.toAddServicesClr()
        }
            if(!!nextProps.searchProceduresRet){
                if(nextProps.searchProceduresRet.success){
                    if(nextProps.searchProceduresRet.type==="servicestoAdd"){

                    }else{
                        this.setState({
                            editFlag:false,
                            selected_procedures:[],
                            procedures:nextProps.searchProceduresRet.data,
                            loading:false
                        })
                    }
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.searchProceduresClr()
            }
            if(!!nextProps.getSpecsRet){
                if(nextProps.getSpecsRet.success){
                    let arr = []
                    let specialities = JSON.parse(JSON.stringify(nextProps.getSpecsRet.data))
                    specialities.forEach((item,i)=>{
                      let obj = {
                        name:item.speciality,
                        value:item.specialityId
                      }
                      arr.push(obj)
                    })
                    this.setState({
                        specialities:arr,
                        selected_speciality:arr[0].value,
                        loading:true
                    },()=>{
                          this.props.searchProcedures({
                                      limit:50,
                                      searchQuery:'',
                                      page:1,
                                      specialityId:this.state.selected_speciality                            })
                    })
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.getSpecsClr()
            }
    }
    
    handleClick =()=> {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }
    handleSelectedProcedureChange = (e, serviceId) =>{
        let arr = JSON.parse(JSON.stringify(this.state.selected_procedures))
        console.log(arr,"arr in handleSelectedProcedureChage")
        let obj = {
        }
        let id= ''
     arr.every(function(element, index) {
            if(element.serviceId===serviceId){
              obj = {
                  ...element,
                  price:[parseInt(e.target.value,10)]
              }
              id = index
              return false
            }
             return true
          })
    let newArr = arr.filter((item,i)=>{
        return  item.serviceId!==serviceId
    })
        newArr.push(obj)
        this.setState({
           selected_procedures:newArr
        })
    }

    handleVarianceChange = (e,serviceId) =>{
        let arr = JSON.parse(JSON.stringify(this.state.selected_procedures))
        console.log(arr,"arr in handleSelectedProcedureChage")
        let obj = {
        }
        let id= ''
     arr.every(function(element, index) {
            if(element.serviceId===serviceId){
              obj = {
                  ...element,
                  variance:e.target.value
              }
              id = index
              return false
            }
             return true
          })
    let newArr = arr.filter((item,i)=>{
        return  item.serviceId!==serviceId
    })
    newArr.push(obj)
    this.setState({
       selected_procedures:newArr
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
        if(this.state.addProcedureFlag){
                this.props.toAddServices({
                   searchQuery:data.searchQuery,
                   page:'1',
                   limit:'50',
                   specialityId:this.state.selected_speciality
                })
        }else{
              this.props.searchProcedures(data)
        }
      
    }

    viewMore = () =>{
        this.setState({
            limit:this.state.limit + 50,
            loading:true
        },()=>this.props.searchProcedures(
          {
            limit:this.state.limit,
            page:1,
            searchQuery:'',
            specialityId:this.state.selected_speciality
          } 
        ))
    }

    handleSubmit = () =>{
        if(this.state.addProcedureFlag){
            let procedure = this.state.selectedProcedure

            let arr = JSON.parse(JSON.stringify(this.state.selected_procedures))
            let newArr = arr.map((item,i)=>{
                return {
                    ...item,
                    price:parseInt(item.price[0],10)
                }
            })
            let obj = {
                specialityId:this.state.selected_procedures[0].specialityId,
                services:newArr
            }
            this.setState({
                addProcedureLoading:true
            },()=>this.props.addServices(obj))
            
        }else{
            let arr = JSON.parse(JSON.stringify(this.state.selected_procedures))
            let newArr = arr.map((item,i)=>{
                return {
                    ...item,
                    price:parseInt(item.price[0],10)
                }
            })
            this.setState({
                editProcedureLoading:true
            },()=>{
                let obj = {
                    specialityId:this.state.selected_procedures[0].specialityId,
                    services:newArr
                }
                this.props.editProcedure(obj)
            }) 
        }
    }

    onEdit = (data) =>{
        console.log(data,"onEdit In mYcatalogiecomponent")
        let arr = JSON.parse(JSON.stringify(this.state.selected_procedures))
        arr.push(data.data)
        this.setState({
            // selectedProcedure:{
            //     ...data.data,
            //     id:data.id
            // }
            selected_procedures:arr
        })
    }

    handleSpecialitySelect = (e) =>{
        this.setState({
            selected_speciality:e.target.value,
            loading:true
        },()=>{
            this.props.searchProcedures({
                searchQuery:'',
                page:'1',
                limit:'50',
                specialityId:this.state.selected_speciality
            })
        })
    }
    handleAddProcedureClick = (e) =>{
    e.preventDefault()
    this.setState({
        loading:true,
        addProcedureFlag:true,
        editFlag:true
    },()=>{
        this.props.toAddServices({
            searchQuery:'',
            page:'1',
            limit:'50',
            specialityId:this.state.selected_speciality
 })  
    })
                
    }

    editProcedureLoadingOff =()=>{
        this.setState({
            editProcedureLoading:false,
            // editFlag:false,
            // selected_procedures:this.state.selected_procedures
        },()=>{
            this.props.editProcedureClr()
            this.props.searchProcedures({
                limit:50,
                searchQuery:'',
                page:1,
                specialityId:this.state.selected_speciality 
     })})
    }

    addProcedureLoadingOff =() =>{
        this.setState({
            addProcedureLoading:false,
            // selected_procedures:[]
        },()=>{
            this.props.addServicesClr()
            this.props.toAddServices({
                searchQuery:'',
                page:'1',
                limit:'50',
                specialityId:this.state.selected_speciality
             })})
    }

    render() {
        console.log(this.state,"this.state in myCatalogueComponent")
                return (
                    <React.Fragment>
                        <NotifFunc />
                    <div className='col-md-8 col-xl-8 catalogueComponent'>
                        <div className='row justify-content-center'>
                            {/* <p className='catalogue'>Catalogue</p> */}
                            <div className='catalogue' >
                            <h4>Catalogue</h4>
                            </div>
                        </div>
                        <div className='row listOfService'>
                              <div className='col-md-3 text-center'>
                                 <a onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({uploadCatalogFlag:true})
                                    }
                                     } href=""><img className="catalogue-img" src="/upload.svg" alt=""></img>
                                 <p className="uploadCata">Upload File</p></a>
                              </div>
                             <DownloadCatalogue
                                downloadCatalogueClr = {this.props.downloadCatalogueClr}
                                downloadCatalogueRet = {this.props.downloadCatalogueRet}
                                downloadCatalogue ={this.props.downloadCatalogue}
                             />
                              <div className='col-md-3 text-center'>
                                 <a href="" onClick={(e)=>{
                                     e.preventDefault()
                                     this.setState({
                                        editFlag:true,
                                        addProcedureFlag:false})
                                    }}><img className="catalogue-img" src="/edit.svg" alt=""></img>
                                 <p className="uploadCata">Edit Catalogue</p></a>
                              </div>
                              <div className='col-md-3 text-center'>
                                 <a href="" onClick={(e)=>this.handleAddProcedureClick(e)}><img className="catalogue-img" src="/edit.svg" alt=""></img>
                                 <p className="uploadCata">Add Catalogue</p></a>
                              </div>
                        </div>
                       {
                           !this.state.addProcedureFlag &&  <div className="text-center  ">
                           <SelectComponent
                           options = {this.state.specialities}
                           handleChange = {this.handleSpecialitySelect}
                           placeholder= "Speciality"
                           value = {this.state.selected_speciality}
                           hidelabel = {true}
                           dropdownStyle = {{
                               top:'240px !important'
                           }}
                           labelStyles = {{
                               'padding': '6px 0px 0px 12px'
                           }}
                           wrapperDivStyles = {{
                                   'width': '40%',
                                   'marginTop':'1rem',
                                   'marginLeft': 'auto',
                                  'marginRight': 'auto'
                               }}
                           selectStyles = {{  
                               'border':'1px solid #01D35A !important;',
                               'padding':'3px',
                               'borderRadius':'39px',
                               'padding':'2%',
                               '&:active':{
                                   'backgroundColor':'none !important'
                               }}
                       }
                           name = "speciality_chosen"
                           label = "Speciality"
                  />
                       </div>

                       }   
                      <div className="text-center">
                          <img src="/search.png" className="serc_icn"/>
                            <SearchComponent 
                                searchProcedures = {this.searchProceduresFun}
                                searchProceduresClr = {this.props.searchProceduresClr}
                                searchProceduresRet = {this.props.searchProceduresRet}
                                selected_speciality = {this.state.selected_speciality}
                                
                            />     
                        </div>
                        <div className='listOfService'>
                            <div className='row listOfServiceHeading'>
                                <div className='col-md-6 text-center'>
                                    Test Name
                                    </div>
                                <div className='col-md-3 text-center'>
                                    Price
                                </div>
                                <div className='col-md-3 text-center'>
                                    Variance
                                </div>
                            </div>
                        </div>
                        <div className="procedures_container_rish">
                        {
                            this.state.loading &&    <div className="loading-wrapper_ris">
                              <React.Fragment>
                                 <LoaderComponent />
                               </React.Fragment>
                               </div>
                        }
                        {this.state.editProcedureLoading && <LoaderComponent />}
                        { !this.state.addProcedureFlag &&
                            (this.state.procedures.length > 0 ? this.state.procedures.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            onEdit = {this.onEdit}
                            selectedProcedure = {this.state.selectedProcedure}
                            selected_procedures = {this.state.selected_procedures}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            ret = {this.props.editProcedureRet}
                            clr = {this.props.editProcedureClr}
                            loadingOff = {()=>this.editProcedureLoadingOff()}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>)
                        }
                        {!this.state.addProcedureFlag && <div className='text-center'>
                            {this.state.procedures.length !==0 && <button onClick={this.viewMore} className="catalogueViewMore">View more</button> }    
                        </div>}
                       {!this.state.addProcedureFlag && <div className='text-center'>
                            {(((this.state.editFlag) && (this.state.selected_procedures.length !== 0)))  && <button onClick={this.handleSubmit} className="common-button">Submit</button> }    
                        </div>}
                        {this.state.addProcedureLoading && <LoaderComponent />}
                        {!!this.state.addProcedureFlag  &&    (this.state.procedures_toAdd.length > 0 ? this.state.procedures_toAdd.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            onEdit = {this.onEdit}
                            selectedProcedure = {this.state.selectedProcedure}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            ret = {this.props.addServicesRet}
                            clr = {this.props.addServicesClr}
                            loadingOff = {()=>this.addProcedureLoadingOff()}
                            selected_procedures = {this.state.selected_procedures}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>)
                        }
                       {this.state.addProcedureFlag && <div className='text-center'>
                            {this.state.procedures_toAdd.length !==0 && <button onClick={this.viewMore} className="catalogueViewMore">View more</button> }    
                        </div>}

                        {this.state.addProcedureFlag  && <div className='text-center'>
                            {(((this.state.editFlag) && (this.state.selected_procedures.length !== 0)))  && <button onClick={this.handleSubmit} className="common-button">Submit</button> }    
                        </div>}

                        </div>

                    </div>
                    <div className='col-md-3'></div>
              
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
            </React.Fragment>
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
    editProcedureRet:state.user.editProcedureRet,
    getSpecsRet:state.user.getSpecsRet,
    toAddServicesRet:state.user.toAddServicesRet,
    addServicesRet:state.user.addServicesRet
})

export default connect(mapStateToProps, { getUserCatalogue, 
    uploadProcedures, uploadProceduresClr, upload,
    searchProcedures, searchProceduresClr,
uploadRetClr,
downloadCatalogue,
downloadCatalogueClr,
editProcedure,
editProcedureClr,
getSpecs,
getSpecsClr,
toAddServices,
toAddServicesClr,
addServices,
addServicesClr
})(MyCatalogueComponent);
