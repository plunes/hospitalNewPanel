import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';
import DashboardHeader from './DashboardHeader';
import CheckboxPill from '../functional/CheckboxPill'
import UpdatePrice from '../functional/UpdatePrice'
import AnimatedMount from "../../HOC/AnimatedMount"
import "./MyCatalogueComponent.css";
import ReactPaginate from 'react-paginate'



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
addServicesClr,
get_remaining_specs,
set_catalogue_data,
get_remaining_specs_clr,
add_specs,
add_specs_clr,
update_procedure_loading,
update_procedure,
add_procedure,
add_procedure_loading,
search_procedures,
search_procedures_loading,
get_center_profile,
get_center_profile_clr,
set_center_data
} from '../../actions/userActions'
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import SearchComponent from "../functional/SearchComponent"
import UploadCatalogue from "../functional/UploadCatalogue"
import ModalComponent from "../ModalComponent"
import DownloadCatalogue from "../functional/DownloadCatalogue"
import Procedure from "../functional/Procedure"
import EditProcedure from "../functional/editProcedure"
import ProcedureView from "../functional/ProcedureView"
import LoaderComponent from "../functional/LoaderComponent"
import NotifFunc from "../functional/NotifFunc"
import NewNotif from "../functional/NewNotif"
import Select from "../Select";
import { is_positive_real_number, get_slider_labels, paginate_data, get_url_params, for_loop } from "../../utils/common_utilities"
import Slider from 'react-rangeslider'
import Barchart from "../functional/Barchart"
import Button from "../functional/Button"
import  DeleteSpeciality from '../functional/DeleteSpeciality'

import { get_procedures, clr_procedures , update_modified_procedures, get_user_specialities,
    get_user_specialities_loading, to_add_services, to_add_services_clr, set_variance, set_variance_loading, 
    remove_speciality, remove_speciality_loading , remove_service, remove_service_loading } from "../../actions/catalogue_actions"


 const isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function MyError(message){
    this.message = message;
}

MyError.prototype = new Error()

class MyCatalogueComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : false,
            rowsToDisplay: 20,
            uploadCatalogFlag:false,
            editFlag:true,
            editCatalogFlag:false,
            current_variance:'',
            variance:0,
            variance_speciality:'',
            global_flag:true,
            global_variance:'',
            limit:50,
            searchQuery:'',
            page:1,
            to_add_service_page:1,
            procedures:[],
            selectedProcedure:{},
            editProcedureLoading:false,
            selected_speciality:'',
            specialities:[],
            addProcedureFlag:false,
            procedures_toAdd:[],
            selected_procedures:[],
            add_remaining_specs:false,
            selected_remain_specs:[],
            procedure_for_detail:false,
            global_variance_flag:true,
            speciality_variance_flag:false,
            all_selected_catalogue:false,
            all_selected_avail:false,
            delete_speciality_flag:false,
            update_price_flag:false,
            get_procedures_params:{
                limit:20,
                total:0,
                next:false,
                total_pages:0,
                page:1,
                search:''
            },
            get_add_procedures_params:{
                limit:20,
                total:0,
                next:false,
                total_pages:0,
                page:1,
                search:''
            }
        
        }
        this.handleClick = this.handleClick.bind(this);
    }

    get_leads_count = () => {
        let variance = this.state.variance
        if(variance >90){
            return 240
        }else if(variance >80){
            return 220
        }else if(variance >70){
            return 200
        }else if(variance >60){
            return 160
        }else if(variance >50){
            return 140
        }else if(variance >40){
            return 100
        }else if(variance >30){
            return 70
        }else if(variance >20){
            return 40
        }else if(variance >10){
            return 20
        }else if(variance >=0){
            return 10
        }
    }

    toggle_update_price_flag = (props) => {
        this.setState({
            update_price_flag:!this.state.update_price_flag
        })
    }

    change_variance = (val) => {
        if(!!this.state.edit_variance_flag){
            this.setState({
                variance:val
            })
        }
    }

    handle_variance_speciality_change = (e) => {
        this.setState({
            variance_speciality:e.target.value
        })
    }

    set_variance = () =>{
        if(!!this.state.global_flag){
            this.props.set_variance({
                variance:this.state.variance
            })
        }else{
            this.props.set_variance({
                specialityId:this.state.variance_speciality,
                variance:this.state.variance
            })
        }
    }

    toggle_delete_speciality = () =>{
      this.setState({
        delete_speciality_flag:!this.state.delete_speciality_flag
      })
    }



    async componentDidMount() {
       
        this.props.get_remaining_specs()
        this.props.get_user_specialities({
            type:"getUserSpecialities"
        })
        let center_id = get_url_params('center')
        if(!!center_id){
            if(this.props.centers_list.length ===0){
               this.props.get_center_profile({center_id})
            }
        }
        // this.props.get_procedures({ limit:10,
        //     total:'',
        //     page:1,
        //     total_pages:1,
        //     next:false,
        //     search:''
        // })
    }




    add_procedure_loading = (data) =>{
        if(!!this.props.add_procedure_loading_flag){
            let arr = [...this.state.selected_procedures]
            let return_flag = false
            arr.every((element, index) => {
                  if(element.serviceId === data.serviceId){
                    return_flag = true
                      return false
                  }
                 return true
              })
              return return_flag
        }else{
            return false
        }
    }

    add_procedure = (data)=> {
        try {
            let arr = !!data?this.state.selected_procedures.filter((item)=>item.serviceId === data.serviceId):this.state.selected_procedures
            let newArr = arr.map((item,i)=>{
                if(!!!item.price){
                    throw new MyError(`${item.service} price cannot be empty`)
                }
                let procedure_price = parseInt(item.price[0],10)
                if(!!!procedure_price){
                   throw new MyError(`${item.service} price cannot be empty`)
                }
                if((!!!item.variance) && item.variance!==0){
                    throw new MyError(`${item.service} variance cannot be empty`)
                }
                return {
                    ...item,
                    price:procedure_price
                }
            })
            let obj = {
                specialityId:this.state.selected_procedures[0].specialityId,
                services:newArr
            }
            this.setState({
                procedure_for_update:!!data?data:false,
                refresh:!this.state.refresh
            },()=> this.props.add_procedure(obj))
        } catch(e){
            this.setState({
                ret:{
                    success:false,
                    message:e.message
                }
            })
        }  
    }


    get_update_procedure_loading = (data) =>{
        if(!!this.props.update_procedure_loading_flag){
            let arr = [...this.state.selected_procedures]
            let return_flag = false
            arr.every((element, index) => {
                  if(element.serviceId === data.serviceId){
                    return_flag = true
                      return false
                  }
                 return true
              })
              return return_flag
        }else{
            return false
        }
    }

    update_procedure = (data)=> {
        try {
            let arr = !!data?this.state.selected_procedures.filter((item)=>item.serviceId === data.serviceId):this.state.selected_procedures
            let newArr = arr.map((item,i)=>{
                let procedure_price = parseInt(item.price[0],10)
                if(!!!procedure_price){
                   throw new MyError(`${item.service} price cannot be empty`)
                }
                if(((!item.variance) && (parseInt(item.variance, 10) !== 0))){
                    throw new MyError(`${item.service} variance cannot be empty`)
                }
                return {
                    ...item,
                    price:procedure_price
                }
            })
            let obj = {
                specialityId:this.state.selected_procedures[0].specialityId,
                services:newArr
            }
            if(!!get_url_params('center')){
                this.props.update_procedure({...data})
            }else if(!this.props.prof_data.isCenter){
                    this.props.update_procedure({...data})
                }else {
                this.setState({
                    procedure_for_update:!!data?data:false,
                    refresh:!this.state.refresh,
                    update_procedure_obj:obj
                },()=> this.toggle_update_price_flag())
            }
        } catch(e){
            this.setState({
                ret:{
                    success:false,
                    message:e.message
                }
            })
        }  
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.remove_service_ret){
            if(!!nextProps.remove_service_ret.success){

                let total_procedures = [...nextProps.procedures_data.total_procedures].filter(item=>!!(item.serviceId !== this.state.service_for_removal.serviceId))
                let paginated_data = paginate_data([...total_procedures],{ limit:20, total:0,  next:false,  total_pages:0,  page:1, search:''})
                  
                    this.setState({
                        service_for_removal:false,
                        ret:{
                            success:true,
                            message:nextProps.remove_service_ret.message
                        }
                    },()=>  {
                        nextProps.update_modified_procedures({
                            total_procedures:[...total_procedures],
                            modified_procedures:paginated_data.data,
                            query_param:{
                                ...paginated_data.parameters
                            }
                        })
                        nextProps.get_procedures({ limit:20,
                            total:'',
                            page:1,
                            total_pages:1,
                            next:false,
                            search:''
                        })
                    })
            }else{
                this.setState({
                    ret:{
                        success:false,
                        message:nextProps.remove_service_ret.message
                    }
                })
            }
            nextProps.remove_service_loading()
        }

        if(nextProps.remove_speciality_ret){
            if(nextProps.remove_speciality_ret.success){
                let speciality_removed = {}
                let arr = [...this.state.specialities].filter((item)=>{
                    if(item.value===this.state.selected_speciality){
                        speciality_removed = {...item}
                    }
                    return !!( item.value !== this.state.selected_speciality)
                })
                    let new_arr = [...nextProps.catalogue_data.remaining_specs]
                    let obj = {
                        name:speciality_removed.name,
                        value:speciality_removed.name,
                        id:speciality_removed.value
                    }
                    new_arr.push(obj)
                 let total_procedures = [...nextProps.procedures_data.total_procedures].filter(item=>!!(item.specialityId !== obj.id))
                let paginated_data = paginate_data([...total_procedures],{ limit:20, total:0,  next:false,  total_pages:0,  page:1, search:''})
                  
                    this.setState({
                        delete_speciality_flag:false,
                        specialities:arr,
                        selected_speciality:arr.length!==0?arr[0].value:'',
                        ret:{
                            success:true,
                            message:nextProps.remove_speciality_ret.message
                        }
                    },()=>  {
                        nextProps.set_catalogue_data({
                            ...nextProps.catalogue_data,
                            remaining_specs:new_arr,
                            user_specialities:arr
                        })
                        nextProps.update_modified_procedures({
                            total_procedures:[...total_procedures],
                            modified_procedures:paginated_data.data,
                            query_param:{
                                ...paginated_data.parameters
                            }
                        })
                        if(this.state.selected_speciality.length!==0){
                            nextProps.search_procedures({
                                searchQuery:'',
                                page:1,
                                limit:20,
                                specialityId:this.state.selected_speciality
                            })
                        }else{
                            nextProps.get_procedures({ limit:20,
                                total:'',
                                page:1,
                                total_pages:1,
                                next:false,
                                search:''
                            })
                        }
                    })
            }else {
                this.setState({
                    ret:{
                        success:true,
                        message:nextProps.remove_speciality_ret.message
                    }
                })
            }
            nextProps.remove_speciality_loading()
        }

        if(nextProps.get_center_profile_ret){
            if(nextProps.get_center_profile_ret.success){
               this.setState({
                 prof_data:nextProps.get_center_profile_ret.data
               },()=>nextProps.set_center_data({...nextProps.get_center_profile_ret.data}))
            }else{
                this.setState({
                  ret:{
                    success:false,
                    message:nextProps.get_center_profile_ret.message
                  }
                })
            }
            nextProps.get_center_profile_clr()
          }

        if(nextProps.catalogue_data.user_specialities.length !== this.state.specialities.length){
            let arr = [...nextProps.catalogue_data.user_specialities]
                    if(arr.length!==0){
                        this.setState({
                            specialities: arr,
                            selected_speciality:arr[0].value,
                            variance_speciality:arr[0].value
                        })
                    }
        }

        if(!!nextProps.set_variance_ret){
            let variance = this.state.variance
            if(!!nextProps.set_variance_ret.success){
                this.setState({
                    ret:{
                        success:true,
                        message:"Variance successfully updated"
                    },
                    procedures:this.state.selected_speciality === this.state.variance_speciality ?this.state.procedures.map(item=>{return{...item, variance}}):this.state.procedures,
                    variance:0,
                    global_variance:!!this.state.global_flag?this.state.variance:this.state.global_variance,
                    specialities:!this.state.global_flag?[...this.state.specialities].map(item=>{
                        if(this.state.variance_speciality === item.value){
                            return { ...item, specialityVariance:variance}
                        }else{
                            return item
                        }
                    }):[...this.state.specialities],
                    edit_variance_flag:false
                })
            }else{
                this.setState({
                    ret:{
                        success:false,
                        message:"Unable to update variance now , try again later"
                    }
                })
            }
          if(!!this.state.global_flag){
                nextProps.update_modified_procedures({
                    total_procedures:[...nextProps.procedures_data.total_procedures.map(item=>{return {...item, variance}})],
                    modified_procedures:[...nextProps.procedures_data.modified_procedures.map(item=>{return item.map(procedure =>{return{...procedure, variance}})})],
                    query_param:{...nextProps.procedures_data.query_param}
                })
          }else{
            nextProps.update_modified_procedures({
                total_procedures:[...nextProps.procedures_data.total_procedures.map(item=>{
                        if((item.specialityId === this.state.variance_speciality)){
                            return {...item, variance}
                        }else{
                            return item
                        }
                })],
                modified_procedures:[...nextProps.procedures_data.modified_procedures.map(item=>{
                    return item.map(procedure => {
                        if((procedure.specialityId === this.state.variance_speciality)){
                            return {...procedure, variance}
                        }else{
                            return procedure
                        }
                    })
                })],
                query_param:{...nextProps.procedures_data.query_param}
            })
          }
            
            nextProps.set_variance_loading()
        }

        if(!!nextProps.ret_procedures){
            this.setState({
                get_procedures_params:nextProps.ret_procedures.params,
                procedures:!!nextProps.ret_procedures.data?nextProps.ret_procedures.data:[],
                selected_procedures:[],
                all_selected_avail:false,
                all_selected_catalogue:false
            },()=>{
                nextProps.clr_procedures()
            })
        }

        // if(!!nextProps.ret_add_procedures){
        //     this.setState({
        //         get_add_procedures_params:nextProps.ret_add_procedures.params,
        //         add_procedures:nextProps.ret_add_procedures.data,
        //         selected_procedures:[]
        //     },()=>{
        //         nextProps.clr_add_procedures()
        //     })
        // }

        if(nextProps.add_procedure_ret){
            if(nextProps.add_procedure_ret.success){
                      let arr = [...this.state.procedures_toAdd]
                      let selected_procedures = [...this.state.selected_procedures]
                      let updated_procedure = false
                      let updated_procedures = false
                 
                      if(!!this.state.procedure_for_update){
                          selected_procedures.every((element, index) => {
                                if(element.serviceId === this.state.procedure_for_update.serviceId){
                                  updated_procedure = element
                                    return false
                                }
                               return true
                            })

                        let paginated_data = paginate_data([selected_procedures[0],...nextProps.procedures_data.total_procedures],{ limit:20, total:0,  next:false,  total_pages:0,  page:1, search:''})
                           updated_procedures = arr.filter((item)=>(  !!(item.serviceId !== updated_procedure.serviceId) ))
                        nextProps.update_modified_procedures({
                                total_procedures:[selected_procedures[0],...nextProps.procedures_data.total_procedures],
                                modified_procedures:paginated_data.data,
                                query_param:{
                                    ...paginated_data.parameters
                                }
                            })

                        nextProps.get_procedures({ limit:20,
                            total:'',
                            page:1,
                            total_pages:1,
                            next:false,
                            search:''
                        })
                      }else{
                          let procedures = [...this.state.procedures_toAdd]
                          let seleceted_procedures = [...this.state.selected_procedures]
                           updated_procedures = procedures.filter((item)=>{
                               let return_item = true
                                seleceted_procedures.every((element)=>{
                                   if(element.serviceId === item.serviceId){
                                          return_item = false
                                          return false
                                      }
                                      return return_item
                               })
                               return return_item
                           }) 
                      }               
                      this.setState({
                          procedures_toAdd:updated_procedures,
                          refresh:!this.state.refresh,
                          ret:{
                              success:true,
                              message:nextProps.add_procedure_ret.message
                          },
                          get_procedures_params:{
                            limit:0,
                            total:0,
                            next:false,
                            total_pages:0,
                            page:1,
                            search:''
                        },
                        // get_add_procedures_params:{
                        //     limit:0,
                        //     total:0,
                        //     next:false,
                        //     total_pages:0,
                        //     page:1,
                        //     search:''
                        // },
                          all_selected_avail:false,
                          all_selected_catalogue:false,
                          procedure_for_update:false,
                          procedure_for_detail:this.state.procedure_for_detail.serviceId===updated_procedure.serviceId?updated_procedure:this.state.procedure_for_detail,
                          selected_procedures:updated_procedure?[...this.state.selected_procedures].filter((item)=>item.serviceId!==updated_procedure.serviceId):[]
                      })

                      let paginated_data = paginate_data([...this.state.selected_procedures,...nextProps.procedures_data.total_procedures],{ limit:20, total:0,  next:false,  total_pages:0,  page:1, search:''})
                      updated_procedures = arr.filter((item)=>(  !!(item.serviceId !== updated_procedure.serviceId) ))
                     nextProps.update_modified_procedures({
                           total_procedures:[...this.state.selected_procedures,...nextProps.procedures_data.total_procedures],
                           modified_procedures:paginated_data.data,
                           query_param:{
                               ...paginated_data.parameters
                           }
                       })

                   nextProps.get_procedures({ limit:20,
                       total:'',
                       page:1,
                       total_pages:1,
                       next:false,
                       search:''
                   })

                  nextProps.to_add_services({
                    limit:20,
                    page:1,
                    specialityId:this.state.selected_speciality,
                    searchQuery:''
                })
            }else {
                this.setState({
                    ret:{
                        success:false,
                        message:nextProps.add_procedure_ret.message
                    }
                })
            }
            nextProps.add_procedure_loading()
        }

      if(nextProps.update_procedure_ret){
          if(nextProps.update_procedure_ret.success){
                    let arr = [...this.state.procedures]
                    let selected_procedures = [...this.state.selected_procedures]
                    let updated_procedure = false
                    let updated_procedures = false

                    if(!!this.state.procedure_for_update){
                        selected_procedures.every((element, index) => {   
                              if(element.serviceId === this.state.procedure_for_update.serviceId){
                                updated_procedure = element
                                  return false
                              }
                             return true
                          })
                      
                         updated_procedures = arr.map((item)=>{
                            if(item.serviceId === updated_procedure.serviceId){
                                 return updated_procedure
                            }else{
                                return item
                            }
                        })
                    }else{
                        let procedures = [...this.state.procedures]
                        let seleceted_procedures = [...this.state.selected_procedures]
                         updated_procedures = procedures.map((item)=>{
                             let return_item = {}
                              seleceted_procedures.every((element)=>{
                                 if(element.serviceId === item.serviceId){
                                        return_item = element
                                        return false
                                    }
                                    return_item = item
                                    return true
                             })
                             return return_item
                         }) 
                    }

                 
               
                    this.setState({
                        procedures:updated_procedures,
                        refresh:!this.state.refresh,
                        ret:{
                            success:true,
                            message:nextProps.update_procedure_ret.message
                        },
                        all_selected_avail:false,
                        all_selected_catalogue:false,
                        procedure_for_update:false,
                        update_price_flag:false,
                        procedure_for_detail:this.state.procedure_for_detail.serviceId===updated_procedure.serviceId?updated_procedure:this.state.procedure_for_detail,
                        selected_procedures:updated_procedure?[...this.state.selected_procedures].filter((item)=>item.serviceId!==updated_procedure.serviceId):[]
                    },()=>{
                        let total_procedures = [...this.props.procedures_data.total_procedures.map((item,i)=>{
                            let return_item = ''
                              this.state.procedures.every((element)=>{
                                 if(element.serviceId === item.serviceId){
                                        return_item = element
                                        return false
                                    }
                                    return_item = item
                                    return true
                             })
                             return return_item
                 })]

                 let data =paginate_data(total_procedures, this.state.get_procedures_params)
                        nextProps.update_modified_procedures({
                            total_procedures:total_procedures,
                            modified_procedures:data.data,
                            query_param:data.parameters
                        })
                    })                 
          }else {
              this.setState({
                  ret:{
                      success:false,
                      message:nextProps.update_procedure_ret.message
                  }
              })
          }
          nextProps.update_procedure_loading()
      }



        if(nextProps.add_specs_ret){
            if(nextProps.add_specs_ret.success){
                let arr = []
                let added_specs = [...this.state.selected_remain_specs]
                let specialities = [...nextProps.catalogue_data.remaining_specs].filter((item,i)=>{
                 return  !added_specs.includes(item.name)
                })
                let new_specs = added_specs.map((item)=>{
                    return {
                        name:item,
                        value:[...nextProps.catalogue_data.remaining_specs].filter(val=>val.name===item)[0].id
                    }
                })
  
                this.setState({
                    add_specs_loading:false,
                    ret:{
                        success:true,
                        message:nextProps.add_specs_ret.message
                    },
                    selected_remain_specs:[],
                    add_remaining_specs:false,
                    specialities:[...this.state.specialities, ...new_specs]
                },()=>  nextProps.set_catalogue_data({
                    ...nextProps.catalogue_data,
                    user_specialities:[...this.state.specialities],
                    remaining_specs:specialities
                }))
            }else{
                this.setState({
                    add_specs_loading:false,
                    ret:{
                        success:false,
                        data:nextProps.add_specs_ret.message
                    }
                })
            }
          nextProps.add_specs_clr()
        }


        if(nextProps.get_remain_specs_ret){
            if(nextProps.get_remain_specs_ret.success){
                let arr = []
                let specialities = [...nextProps.get_remain_specs_ret.data]
                specialities.forEach((item,i)=>{
                  let obj = {
                    name:item.speciality,
                    value:item.speciality,
                    id:item._id
                  }
                  arr.push(obj)
                })
                nextProps.set_catalogue_data({
                    ...nextProps.catalogue_data,
                    remaining_specs:arr
                })
            }else{

            }
          nextProps.get_remaining_specs_clr()
        }


        if(!!nextProps.to_add_services_ret){
            if(nextProps.to_add_services_ret.success){
                this.setState({
                    procedures_toAdd:nextProps.to_add_services_ret.data,
                    loading:false,
                    selected_procedures:[],
                    all_selected_avail:false,
                    all_selected_catalogue:false,
                    get_add_procedures_params:{
                        limit:nextProps.to_add_services_ret.limit,
                        page:nextProps.to_add_services_ret.page,
                        total:nextProps.to_add_services_ret.total,
                        next:nextProps.to_add_services_ret.next,
                        total_pages: Math.ceil(parseInt(nextProps.to_add_services_ret.total,10)/parseInt(nextProps.to_add_services_ret.limit,10)),
                        specialityId:this.state.selected_speciality
                    }
                })
            }else{
                this.setState({
                    loading:false
                })
            }
            nextProps.to_add_services_clr()
        }
            if(!!nextProps.search_procedures_ret){
                if(nextProps.search_procedures_ret.success){
                    if(nextProps.search_procedures_ret.type==="servicestoAdd"){

                    }else{

                        if(nextProps.search_procedures_ret.data.length !==0){
                            nextProps.get_procedures({ limit:20,
                                total:'',
                                page:1,
                                total_pages:1,
                                next:false,
                                search:''})
                        }else {
                            this.setState({
                                procedures:[],
                                seleceted_procedures:[],
                                all_selected_avail:false,
                                all_selected_catalogue:false
                            })
                        }
                    }
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.search_procedures_loading()
            }
            if(!!nextProps.get_user_specialities_ret){
                if(nextProps.get_user_specialities_ret.success){
                    let arr = []
                    let specialities = [...nextProps.get_user_specialities_ret.data]
                    specialities.forEach((item,i)=>{
                      let obj = {
                        name:item.speciality,
                        value:item.specialityId,
                        specialityVariance:!!item.specialityVariance?item.specialityVariance:0
                      }
                      arr.push(obj)
                    })
                    if(arr.length!==0){
                        this.setState({
                            specialities:arr,
                            selected_speciality:arr[0].value,
                            variance_speciality:arr[0].value,
                            loading:true,
                            global_variance:!!nextProps.get_user_specialities_ret.global_variance?nextProps.get_user_specialities_ret.global_variance:0,
                            edit_variance_flag:false
                        },()=>{
                            nextProps.set_catalogue_data({
                                ...nextProps.catalogue_data,
                                user_specialities:arr
                            })
                            this.props.search_procedures({limit:50, searchQuery:'', page:1, specialityId:this.state.selected_speciality})  }
                            )
                    }  
                }else{
                    this.setState({
                        loading:false
                    })
                }
                nextProps.get_user_specialities_loading()
            }
    }
    
    handleClick =()=> {
        this.setState({
            rowsToDisplay: this.state.rowsToDisplay + 5
        })
    }
    handleSelectedProcedureChange = (e, serviceId) =>{
        if(!!is_positive_real_number(e.target.value)){
            let arr =[...this.state.selected_procedures]
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
    }

    handleVarianceChange = (e,serviceId) =>{
        let arr = [...this.state.selected_procedures]
        let obj = {
        }
        let id= ''
     arr.every(function(element, index) {
            if(element.serviceId===serviceId){
              obj = {
                  ...element,
                  variance:parseInt(e.target.value, 10)
              }
              id = index
              return false
            }
             return true
          })
    let newArr = arr.filter((item,i)=>{
        return  item.serviceId!==serviceId
    })
    if(!isEmpty(obj)){
        newArr.push(obj)
        this.setState({
            selected_procedures:[...newArr]
         })
    }
    }

    generate_delete_speciality = () =>{
        return (<React.Fragment>
             <DeleteSpeciality   
                remove_speciality= {this.props.remove_speciality}
                specialities = {this.state.specialities}
                selected_speciality = {this.state.selected_speciality}
                toggle_delete_speciality = {this.toggle_delete_speciality}
             />
        </React.Fragment>)
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


               downloadCatalogueClr = {this.props.downloadCatalogueClr}
               downloadCatalogueRet = {this.props.downloadCatalogueRet}
               downloadCatalogue ={this.props.downloadCatalogue}

               specialities = {this.state.specialities}
               />        
            </React.Fragment>
          
        )
    }

    generate_update_price =() =>{
        return (
            <React.Fragment>
                <UpdatePrice 
                    update_procedure_obj = {this.state.update_procedure_obj}
                    update_procedure = {this.props.update_procedure}
                    update_procedure_loading_flag = {this.state.update_procedure_loading_flag}
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

    open_catalogue_modal = () =>{
        this.setState({
            uploadCatalogFlag: true
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
                this.props.to_add_services({
                    ...this.state.get_add_procedures_params,
                   searchQuery:data.searchQuery,
                   page:1
                })
        }else{
            //   this.props.search_procedures(data)
             this.props.get_procedures({
                 ...this.state.get_procedures_params,
                 page:1,
                 search:data.searchQuery
             })
        }
    }

    viewMore = (obj) =>{
        this.setState({
            ...obj,
            limit:this.state.limit + 50,
            loading:true
        },()=>this.props.search_procedures(
          {
            limit:this.state.limit,
            page:1,
            searchQuery:'',
            specialityId:this.state.selected_speciality
          } 
        ))
    }



     isSelected = (data) =>{
        // console.log(data,"data in isSelected")
        let flag = false
        let arr = [...this.state.selected_procedures]
        arr.every(function(element, index) {
            // console.log(element,"element in isSelected")
          if(element.serviceId===data.serviceId){
            flag = true
            return false
          }
           return true
        })
        return flag;
      }
      
       getValue = (data) =>{
        let value= ""
        let arr = [...this.state.selected_procedures]
        arr.every(function(element, index) {
          if(element.serviceId===data.serviceId){
            value = !!element.price?element.price[0]:0
            return false
          }
           return true
        })
        return value;
      }
      
       getVariance = (data) =>{
        let value= ""
        let arr = [...this.state.selected_procedures]
        arr.every(function(element, index) {
          if(element.serviceId===data.serviceId){
            value = element.variance
            return false
          }
           return true
        })
        return value;
      }


    onEdit = (data) =>{
      
        this.setState({
            edit_Proc_flag:true,
            all_selected_avail:false,
            all_selected_catalogue:false
        })
        let selected_data_removed = [...this.state.selected_procedures].filter((item=>item.serviceId !== data.data.serviceId))
        let selected_procedures = [...this.state.selected_procedures]
        if(selected_data_removed.length === selected_procedures.length){
            selected_procedures.push(data.data)
        }else{
            selected_procedures = [...selected_data_removed]
        }
        this.setState({
            selected_procedures:selected_procedures,
            procedure_for_detail:selected_procedures.length ===0?false:selected_procedures[selected_procedures.length-1]
        },()=>this.setState({
            edit_Proc_flag:false
        }))
    }

    change_variance_speciality = (e) => {
        this.setState({
            variance_speciality:e.target.value
        })
    }

    handleSpecialitySelect = (e) =>{
        if(!!this.state.addProcedureFlag){
            this.setState({
                selected_speciality:e.target.value,
                loading:true,
                all_selected_avail:false,
                all_selected_catalogue:false
            },()=>{
                this.props.to_add_services({
                    searchQuery:'',
                    page:1,
                    limit:this.state.get_add_procedures_params.limit,
                    specialityId:this.state.selected_speciality

                 })
                 this.props.search_procedures({
                    searchQuery:'',
                    page:1,
                    limit:20,
                    specialityId:this.state.selected_speciality
                })
            })
        }else{
            this.setState({
                selected_speciality:e.target.value,
                loading:true
            },()=>{
                this.props.search_procedures({
                    searchQuery:'',
                    page:'1',
                    limit:'50',
                    specialityId:this.state.selected_speciality
                })
                
            })
        }
    }
 handleAddProcedureClick = (e) =>{
    e.preventDefault()
    this.setState({
        loading:true,
        addProcedureFlag:true,
        editFlag:true,
        selected_procedures:[],
        procedure_for_update:[],
        all_selected_avail:false,
        all_selected_catalogue:false
    },()=>{
        this.props.to_add_services({
            limit:20,
            page:1,
            specialityId:this.state.selected_speciality,
            searchQuery:''
        })
    })          
    }

    handle_change_selected_remain_specs = (e) =>{
        try{
            let arr = [...this.state.selected_remain_specs]
            if(arr.includes(e.target.value))
            throw new MyError(`${e.target.value} is already selected`)
            arr.unshift(e.target.value)
            this.setState({
                selected_remain_specs:arr
            })
        } catch (e){
            this.setState({
                ret:{
                    success:true,
                    message:e.message
                }
            })
        }
    }
    add_selected_remain_specs = () =>{
        try{
            if(this.state.selected_remain_specs.length===0)
            throw new MyError("Select Speciality to add")
            let arr = []
            this.state.selected_remain_specs.map((spec)=>{
               let boom = this.props.catalogue_data.remaining_specs.filter((item=>item.name===spec))
               if(boom.length!==0){
                   arr.push(boom[0].id)
               }
            })
            this.setState({
                add_specs_loading:true
            },()=>this.props.add_specs({specialities:arr}))
        }catch(e){
            this.setState({
                ret:{
                    success:false,
                    message:e.message
                }
            })
        }
    }

    handle_your_catalogue_click = () => {
        this.setState({
           editFlag:true,
           selected_procedures:[],
           procedure_for_update:[],
           addProcedureFlag:false,
           all_selected_avail:false,
           all_selected_catalogue:false
       })
    }

    global_click =() => {
       this.setState({
           global_flag:true,
           variance:0,
           edit_variance_flag:false
       })
    }

    speciality_click =() => {
        this.setState({
            global_flag:false,
            variance:0,
            edit_variance_flag:false
        })
     }

     handle_procedure_page_change = (data) => {
        this.props.get_procedures({ ...this.state.get_procedures_params,
            page:parseInt(data.selected +1, 10)
        })
     }

     handle_add_procedure_page_change =(data) => {
         this.props.to_add_services({
             ...this.state.get_add_procedures_params,
             page:parseInt(data.selected +1, 10)
         })
     }

     get_variance_value = () => {
         if(this.state.edit_variance_flag){
               return  this.state.variance
         }else{
             if(this.state.global_flag){
                 return this.state.global_variance
             }else{
                 let val = 0
                 for_loop([...this.state.specialities], (item)=>{
                      if(this.state.variance_speciality===item.value){
                          val = item.specialityVariance
                      }
                 })
                 return  val
             }
         }
     }

     get_variance = () => {
       let arr =  [...this.state.specialities].filter(item => {
            if(item.value === this.state.variance_speciality){
                return true
            }
        else{
            return false
        }
    })
     }

     select_all = (e) =>{
         e.preventDefault()
         if(!!this.state.addProcedureFlag){
             if(this.state.all_selected_avail){
                 this.setState({
                     selected_procedures:[],
                     all_selected_avail:false
                 })
             }else{
                 this.setState({
                     selected_procedures:[...this.state.procedures_toAdd],
                     all_selected_avail:true
                 })
             }
         }else{
            if(this.state.all_selected_catalogue){
                this.setState({
                    selected_procedures:[],
                    all_selected_catalogue:false
                })
            }else{
                this.setState({
                    selected_procedures:[...this.state.procedures],
                    all_selected_catalogue:true
                })
            }
         }
     }

     remove_service = (data) => {
         this.setState({
             service_for_removal:{...data}
         },()=>{
             this.props.remove_service({...data})
         })
     }

    render() {
                return (
                    <React.Fragment>
                        <NotifFunc />
                        <NewNotif 
                            ret = {this.state.ret}
                            retClr= {()=>this.setState({ret:false})}
                        />
                <div className='catalogue_main_content_rish'>
                <div className="profile_name_wrapper catalogue_profile_name_wrapper">
                           <div className="profile_name_name" >    
                            <img src='/icon/profile_name_icon.svg' className='profile_name_icon' />
                               <text style={{textTransform:'capitalize'}}>{!!get_url_params('center')? this.props.center_data.name:this.props.prof_data.name}</text>
                           </div>
                           <div className="profile_name_number">
                              {/* <text > For any query - Call at +91 7011311900</text> */}
                           </div>
                        </div>
                   <div className='catalogue_wrapper_rish'>
                        <div className='catalogue_section_1'>
                           <div className="catalogue_section_1_bottom ">
                            <div className="new_card_class">
                              <div style={{fontWeight:'600'}} className="modal-heading_ris realtimewidth businessrow1col1 margin_bottom_small_rish">Variance</div>
                               <div className='catalogue_flex_parent'>
                                    <div className='catalogue_flex_child_4'>
                                         <div className='text-center margin_bottom_small_rish'><text className='catalogue_heading'>Update Variance</text></div>
                                         <div className='margin_bottom_small_rish radio_button_wrapper'>
                                        <CheckboxPill 
                                            name_1 = "Whole Catalogue"
                                            name_2 = "Speciality"
                                            global_click = {()=>this.global_click()}
                                            speciality_click = {()=>this.speciality_click()}
                                        />    
                                    </div>
                                    <div className='catalogue_slider_wrapper'>
                                    <Slider
                                            min={0}
                                            max={80}
                                            labels={get_slider_labels({lower:0, upper:80})}
                                            value={this.get_variance_value()}
                                            onValueChange={(val)=>console.log(val)}
                                            onChange={val => this.change_variance(val)} 
                                            />
                                    </div>

                                    {!this.state.global_flag  && <div style={{margin:'0rem  Auto .5rem Auto', width:'15rem'}} >
                                         <Select
                                            options = {this.state.specialities}
                                            handleChange = {this.handle_variance_speciality_change}
                                            placeholder= "Speciality"
                                            input_text_class = "catalogue_dropdown"
                                            wrapper_class = "catalogue_dropdown_wrapper"
                                            value = {this.state.variance_speciality}
                                            name = "speciality_chosen"
                                            label = "Speciality" />
                                    </div>}

                                    <div className="text variance_info_parent text-center">
                                       {this.state.edit_variance_flag ?<React.Fragment>
                                        <span className='variance_info_child'>
                                             <text><text className='bold'>Variance: </text>{this.state.variance}%</text>
                                        </span>
                                        <span className='variance_info_child'>
                                           <text><text className='bold'>Expected number of Bids: </text>{this.get_leads_count()}</text>
                                        </span>
                                       </React.Fragment>:<React.Fragment>
                                           {this.state.global_flag ?   <span className='variance_info_child'>
                                                <text><text className='bold'>Global Variance: </text>{this.state.global_variance}%</text>
                                        </span>  :  <span className='variance_info_child'>
                                                <text><text className='bold'>Speciality Variance: </text>{this.get_variance_value()}%</text>
                                        </span>}
                                      
                                           </React.Fragment>}
                                        </div>
                                  
                                    <div style = {{position:'relative', height:'1rem'}} className='text-center'>
                                        {this.props.set_variance_loading_flag?<LoaderComponent second_variant = {true} /> : this.state.edit_variance_flag ?<div className="cancel_submit_wrapper"> <text onClick={()=>this.setState({edit_variance_flag:false})} className="link_text_rish green_text_rish">Cancel</text> <text onClick={()=>this.set_variance()} className="link_text_rish green_text_rish">Submit</text>  </div> :<div> <text onClick={()=>this.setState({edit_variance_flag:true})} className="link_text_rish green_text_rish">Edit</text> </div>}
                                    </div>
                                    <div className='catalogue_note_wrapper margin_top_small_rish'>
                                        <text className='catalogue_note'><text className='bold'>Note :</text> Variance is a range which allows the marketing campaign to reach more people, do not confuse it with discount. Higher the variance higher the footfall.</text>
                                    </div>
                                    </div>
                                    <div className='catalogue_flex_child_6'>
                                       <div className="catalogue_chart_wrapper">
                                         <Barchart />
                                           </div>
                                        </div>
                                       </div>  
                            </div>
                             <UploadCatalogue
                                    uploadProceduresClr ={this.props.uploadProceduresClr}
                                    uploadProceduresRet ={this.props.uploadProceduresRet}
                                    uploadProcedures = {this.props.uploadProcedures}

                                    upload = {this.props.upload}
                                    uploadRet = {this.props.uploadRet}
                                    uploadRetClr = {this.props.uploadRetClr}
                                    closeModal = {()=>this.setState({uploadCatalogFlag:false})}


                                    downloadCatalogueClr = {this.props.downloadCatalogueClr}
                                    downloadCatalogueRet = {this.props.downloadCatalogueRet}
                                    downloadCatalogue ={this.props.downloadCatalogue}

                                    specialities = {this.state.specialities}
                                 />        

                    {/* <div className="new_card_class margin_top_medium_rish">
                    <div style={{fontWeight:'600'}} className="modal-heading_ris  realtimewidth businessrow1col1">Catalogue Manager</div> */}

                 <div className="new_card_class">
                    <div style={{fontWeight:'600'}} className="modal-heading_ris relative_heading">Edit Catalogue</div>
                               <div className="tabs-header margin_top_small_rish">
                                    <div className={`appointment_header_wrapper new_card_class`}>
                                            <span onClick={(e)=>this.handle_your_catalogue_click()}  className={`appointment_header_child-1 ${!this.state.addProcedureFlag?'active_appointment_header':''}`}>
                                                <text className={`appointment_header_text ${!this.state.addProcedureFlag?'green-text-rish':''}`}>My Catalogue</text>
                                            </span>                 
                                            <span onClick={(e)=>this.handleAddProcedureClick(e)}  className={`appointment_header_child-1 ${this.state.addProcedureFlag?'active_appointment_header':''}`}>
                                            <text className={`appointment_header_text ${this.state.addProcedureFlag?'green-text-rish':''}`}>Available Procedures</text>
                                            </span>
                                    </div>
                               </div>
                                <div className="section_1_header">
                                    <span className='section_1_header_child'>
                                       <div className="speciality_wrapper">
                                         <Select
                                            options = {this.state.specialities}
                                            handleChange = {this.handleSpecialitySelect}
                                        
                                            placeholder= "Speciality"
                                            input_text_class = "catalogue_dropdown"
                                            wrapper_class = "catalogue_dropdown_wrapper"
                                            value = {this.state.selected_speciality}
                                            name = "speciality_chosen"
                                            label = "Speciality" />
                                        </div>
                                    </span>
                                    <span className='section_1_header_child'>
                                        <div className="speciality_wrapper">
                                            <SearchComponent 
                                                searchProcedures = {this.searchProceduresFun}
                                                searchProceduresClr = {this.props.searchProceduresClr}
                                                searchProceduresRet = {this.props.search_procedures_ret}
                                                selected_speciality = {this.state.selected_speciality}  />
                                        </div>
                                    </span>
                                </div>



                                {!!this.state.addProcedureFlag &&  <div style={{position:'relative'}} className="text-center">
                          {this.state.add_specs_loading && <LoaderComponent />}

                          {false &&  <div style={{width:'10rem', height:'10rem'}} className="text-center">
                                <img src="/icon/ruuning_dog.gif" />
                              </div>}
                            <div style={{marginTop:'.5rem'}} className="add_specs_wrapper">
                            {   
                                this.state.add_remaining_specs? 
                                <React.Fragment>
                                <Select
                                options = {this.props.catalogue_data.remaining_specs}
                                handleChange = {this.handle_change_selected_remain_specs}
                                placeholder= "Speciality"
                                placeholder= "Speciality"
                                input_text_class = "catalogue_dropdown"
                                wrapper_class = "catalogue_dropdown_wrapper"
                                value = {this.state.selected_remain_specs[0]}
                                name = "remain_specs"
                                label = "Speciality"
                              />
                              <div  style={{marginTop:'.5rem'}}>
                              {this.state.selected_remain_specs.map((item,i)=>(
                               <React.Fragment>
                                    
                            <div className="signup_specialities_wrapper_ris">
                               <div className="signup_speciality">
                                     <p className="signup_speciality_name">{item}</p>
                                     <p onClick={()=>this.setState({selected_remain_specs:[...this.state.selected_remain_specs].filter((val=>val!==item))})} className="signup_speciality_X">X</p>
                               </div>
                            </div>
                               <hr />
                                </React.Fragment>
                                  ))}
                                <div className="text-center">
                                <div className="cancel_submit_wrapper"> 
                                <Button style={{marginTop:'.5rem', fontSize:'1rem'}} onClick = {()=>this.setState({add_remaining_specs: false, selected_remain_specs:[]})}  className="link_text_rish green_text_rish">Cancel</Button> 
                                <Button style={{marginTop:'.5rem', fontSize:'1rem'}} onClick = {()=>this.add_selected_remain_specs()} className="link_text_rish green_text_rish">Submit</Button>  </div>
                                 {/* <button >Submit</button> */}
                                </div>  
                              </div>
                              </React.Fragment>
                              : 
                              <Button  onClick = {()=>this.setState({add_remaining_specs: true})} className=' margin_top_small_rish margin_bottom_small_rish '>Add Speciality</Button>
                             
                            }
                         </div>
                        </div>
}

                                <div className='catalogue_head_tabs margin_top_small_rish'>
                                    <span className=' display_block_rish catalogue_circle_wrap'> <span onClick = {(e)=>this.select_all(e)} className={`catalogue_circle ${this.state.addProcedureFlag?this.state.all_selected_avail?'green_background active_catalogue_circle':'':this.state.all_selected_catalogue?'green_background active_catalogue_circle':''}`}></span> </span>
                                    <span className='head_tabs_name display_block_rish'> <text className='catalogue_test_name '>Test Name</text></span>
                                    <span className='head_tabs_price display_block_rish text-center'> <text className='catalogue_test_name '>Price</text></span>
                                    <span className='head_tabs_variance display_block_rish text-center'><text className='catalogue_test_name '>Variance</text></span>
                                    <span className='head_tabs_actions display_block_rish text-center'><text className='catalogue_test_name '>Actions</text></span>
                                </div>
                                      { !this.state.addProcedureFlag &&
                                      <div className="my_catalogue_div_wrapper" style={{position:'relative'}}>
                                           {this.props.search_procedures_loading_flag &&  <div style={{ height:'10rem', position:'relative'}} className="text-center">
                                              <LoaderComponent />
                                {/* <img className="align_center_rish"  style={{height:'30rem', width:'Auto'}} src="/icon/running_dog.gif" /> */}
                              </div>}
                                      {this.props.search_procedures_loading_loading_flag ?<div>
                                        {/* <LoaderComponent /> */}
                                      </div> : (this.state.procedures.length > 0 ? this.state.procedures.map( (c, i) => (
                                        <Procedure 
                                        id = {i}
                                        data = {c}
                                        editFlag = {this.state.editFlag}
                                        handleEditInclusion = {this.handleEditInclusion}
                                        disabled={!this.state.editFlag}
                                        onEdit = {this.onEdit}
                                        // selectedProcedure = {this.state.selectedProcedure}
                                        // selected_procedures = {this.state.selected_procedures}
                                        handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                                        handleVarianceChange = {this.handleVarianceChange}
                                        ret = {this.props.editProcedureRet}
                                        clr = {this.props.editProcedureClr}
                                        loadingOff = {()=>console.log()}
                                        isSelected = {this.isSelected(c)}
                                        getVariance ={this.getVariance(c)}
                                        getValue = {this.getValue(c)}
                                        refresh = {this.state.refresh}
                                        procedure_for_update = {this.state.procedure_for_update}
                                        update_procedure = {this.update_procedure}
                                        remove_service = {this.remove_service}
                                        remove_service_loading_flag = {this.props.remove_service_loading_flag}
                                        update_procedure_loading = {this.get_update_procedure_loading(c)}
                                        my_catalogue = {true}
                                        />
                                        )) : 
                                        <div style={{ height:'20rem', position:'relative'}} className="text-center">
                                            <div style={{position:'absolute', left:'23%', top:'25%'}}>
                                            <img className="align_center_rish vertical_align_rish"  style={{height:'10rem', width:'Auto'}} src="/icon/no_service_found.svg" />
                                           <div style={{fontWeight:'200', width:'40rem'}} className="text-center">Services not found, Go to Available Procedures and start adding to Receive Insights and get Patient Footfall</div>
                                           
                                            </div>
                                                 
                                                </div>
                                      )}
                                       </div>
                                    }
                                       
                                    {!this.state.addProcedureFlag && <div className="text-center margin_top_small_rish">
                                        {!!this.state.procedures?(this.state.procedures.length !==0)?!!(this.state.get_procedures_params.total_pages>1)?  <ReactPaginate
                                         previousLabel={'previous'}
                                         nextLabel={'next'}
                                         breakLabel={'...'}
                                         breakClassName={'break-me'}
                                         pageCount={this.state.get_procedures_params.total_pages}
                                         marginPagesDisplayed={2}
                                         pageRangeDisplayed={5}
                                         onPageChange={(data)=>this.handle_procedure_page_change(data)}
                                         containerClassName={'pagination'}
                                         subContainerClassName={'pages pagination'}
                                         activeClassName={'active'}
                                           />:'':'':'' }
                                       <div style={{position:'relative'}} className="margin_top_small_rish text-center">
                                                     {this.props.remove_speciality_loading_flag && <LoaderComponent />}
                                                     {((this.state.selected_procedures.length !==0) && (!this.state.addProcedureFlag)) &&  <div className='text-center'>
                                                     <Button  onClick = {()=>this.update_procedure()} className=' margin_top_small_rish margin_bottom_small_rish '>Submit</Button>
                                      </div>
                                      }
                                               {this.state.specialities.length >1 && <text onClick  = {()=>this.toggle_delete_speciality()}  className="remove_speciality_text">Remove Speciality from catalogue</text> } 
                                               {/* onClick={()=>this.props.remove_speciality({speciality_id:this.state.selected_speciality})}  */}
                                        </div>
                                    </div>}
                                  
                                  
                            {/* Add to Your Catalogue */}                        
                            {!!this.state.addProcedureFlag  &&    <div style={{position:'relative'}}>
                                      {/* {this.props.to_add_services_loading && <LoaderComponent />}  */}
                            {(this.state.procedures_toAdd.length > 0 ?this.props.to_add_services_loading?<LoaderComponent /> : this.state.procedures_toAdd.map( (c, i) => (
                            <Procedure 
                            id = {i}
                            data = {c}
                            editFlag = {this.state.editFlag}
                            handleEditInclusion = {this.handleEditInclusion}
                            onEdit = {this.onEdit}
                            disabled={(!!((this.state.editFlag) && (this.state.selected_procedures.length !== 0)))}
                            // selectedProcedure = {this.state.selectedProcedure}
                            handleSelectedProcedureChange = {this.handleSelectedProcedureChange}
                            handleVarianceChange = {this.handleVarianceChange}
                            ret = {this.props.addServicesRet}
                            clr = {this.props.addServicesClr}
                            loadingOff = {()=>this.console.log()}
                            // selected_procedures = {this.state.selected_procedures}
                            disabled={false}
                            isSelected = {this.isSelected(c)}
                            getVariance ={this.getVariance(c)}
                            getValue = {this.getValue(c)}
                            refresh = {this.state.refresh}
                            procedure_for_update = {this.state.procedure_for_update}
                            update_procedure = {this.add_procedure}
                            update_procedure_loading = {this.add_procedure_loading(c)}
                            />
                            )) : 
                           <div className='text-center'>No Procedures</div>)}
                           </div>
                        }

                        {this.state.addProcedureFlag && <div>

                            {this.state.procedures_toAdd?(this.state.procedures_toAdd.length !==0)? !!(this.state.get_add_procedures_params.total_pages>1)? <div className="text-center margin_top_small_rish"> <ReactPaginate
                                         previousLabel={'previous'}
                                         nextLabel={'next'}
                                         breakLabel={'...'}
                                         breakClassName={'break-me'}
                                         pageCount={Math.ceil(parseInt(this.state.get_add_procedures_params.total,10)/parseInt(this.state.get_add_procedures_params.limit, 10))}
                                         marginPagesDisplayed={2}
                                         pageRangeDisplayed={5}
                                         onPageChange={(data)=>this.handle_add_procedure_page_change(data)}
                                         containerClassName={'pagination'}
                                         subContainerClassName={'pages pagination'}
                                         activeClassName={'active-page-class'}
                                /></div>:'':'':''}
                                       
                                    </div>} 

                                {((this.state.selected_procedures.length !==0) && (!!this.state.addProcedureFlag)) &&  <div className='text-center'>
                                <Button  onClick = {()=>this.add_procedure()} className=' margin_top_small_rish margin_bottom_small_rish '>Submit</Button>
                                      {/* <button  className='button_rish color_white_rish margin_top_small_rish margin_bottom_small_rish add_speciality_button'>Submit</button> */}
                                      </div>
                                      }
                           </div>
                        </div>
                   </div>
                   </div>
                </div>
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

            <ModalComponent 
                open = {this.state.delete_speciality_flag}
                handleClose = {this.toggle_delete_speciality}
                modalBody = {this.generate_delete_speciality}
                no_cross= {true}
                />  

            <ModalComponent 
                open = {this.state.update_price_flag}
                handleClose = {this.toggle_update_price_flag}
                modalBody = {this.generate_update_price}
                no_cross= {true}
                />  
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    update_procedure_ret:state.catalogue_store.update_procedure_ret,
    update_procedure_loading_flag:state.catalogue_store.update_procedure_loading,
    get_user_specialities_ret:state.catalogue_store.get_user_specialities_ret,
    get_user_specialities_loading_flag:state.catalogue_store.get_user_specialities_loading,
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
    addServicesRet:state.user.addServicesRet,
    catalogue_data:state.user.data.catalogue_data,
    get_remain_specs_ret:state.user.get_remain_specs_ret,
    add_specs_ret:state.user.add_specs_ret,
    add_procedure_ret:state.catalogue_store.add_procedure_ret,
    add_procedure_loading_flag:state.catalogue_store.add_procedure_loading,
    search_procedures_loading_flag:state.catalogue_store.search_procedures_loading,
    search_procedures_ret:state.catalogue_store.search_procedures_ret,
    procedures_data:state.catalogue_store.procedures_data,
    ret_procedures:state.catalogue_store.ret_procedures,
    get_procedures_error:state.catalogue_store.get_procedures_error,
    get_procedures_loading:state.catalogue_store.get_procedures_loading,
    to_add_services_ret:state.catalogue_store.to_add_services_ret,
    to_add_services_loading:state.catalogue_store.to_add_services_loading,
    set_variance_ret:state.catalogue_store.set_variance_ret,
    remove_speciality_ret:state.catalogue_store.remove_speciality_ret,
    remove_speciality_loading_flag:state.catalogue_store.remove_speciality_loading_flag,
    search_procedures_loading_loading_flag:state.catalogue_store.search_procedures_loading,
    prof_data:state.user.data.prof_data,
    centers_list:state.user.data.centers_data.centers_list,
    center_data:state.user.data.centers_data.center_data,
    get_center_profile_ret:state.user.get_center_profile_ret,
    remove_service_ret:state.catalogue_store.remove_service_ret,
    remove_service_loading_flag:state.catalogue_store.remove_service_loading,
    profile_store:state.profile_store
})



export default AnimatedMount({
    unmountedStyle: {
      opacity: 0,
      transform: 'translate3d(0, -2rem, 0)',
      transition: 'opacity 100ms ease-out, transform 100ms ease-out',
    },
    mountedStyle: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: 'opacity .5s ease-out, transform .5s ease-out',
    },
  })(connect(mapStateToProps, { getUserCatalogue, 
    uploadProcedures, uploadProceduresClr, upload,
    searchProcedures, searchProceduresClr, get_user_specialities,
    get_user_specialities_loading,
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
addServicesClr,
get_remaining_specs,
get_remaining_specs_clr,
set_catalogue_data,
set_catalogue_data,
add_specs_clr,
add_specs,
update_procedure,
update_procedure_loading,
add_procedure,
add_procedure_loading,
search_procedures,
search_procedures_loading,
get_procedures,
clr_procedures,
update_modified_procedures,
to_add_services,
to_add_services_clr,
set_variance,
get_center_profile,
get_center_profile_clr,
set_variance_loading,
set_center_data,
remove_speciality,
remove_speciality_loading,
remove_service,
remove_service_loading
})(MyCatalogueComponent));


