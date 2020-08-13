import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_USER_SPECIALITIES, UPDATE_PROCEDURE , ADD_PROCEDURE, SEARCH_PROCEDURE, GET_PROCEDURES, TO_ADD_SERVICES, SET_VARIANCE, REMOVE_SPECIALITY} from '../actions/types'
import { update_procedure_ret, update_procedure_loading, add_procedure_ret, add_procedure_loading, search_procedures_ret, search_procedures_loading } from '../actions/userActions'
import api from '../utils/api_routes'
import  {  ret_procedures, update_params, get_procedures_error, update_modified_procedures, to_add_services_ret, to_add_services_clr, set_variance_ret , get_user_specialities_ret, get_user_specialities_loading, remove_speciality_ret, remove_speciality_loading}  from '../actions/catalogue_actions'
import { get_url_params, paginate_data } from "../utils/common_utilities"
import store from '../store'

function* get_procedures_saga(action) {
  console.log("get_procedures saga called")
 try {
  let center_id = get_url_params('center')
    const  get_procedures = yield store.getState().catalogue_store.get_procedures
    const params = get_procedures
    const store_param = yield store.getState().catalogue_store.procedures_data.query_param
    const modified_procedures = yield store.getState().catalogue_store.procedures_data.modified_procedures
    if(!!(params.search !== store_param.search)){
      // SEARCH CASE
      const total_procedures = yield store.getState().catalogue_store.procedures_data.total_procedures
      let arr = []
      if(params.search !== ''){
         arr = total_procedures.filter(item=>{
          if(item.service.toLowerCase().includes(params.search.toLowerCase())){
            return true
          }
          return false
       })
      }else {
        arr = [...total_procedures]
      }
   let obj = {
      total_procedures:total_procedures,
      modified_procedures:paginate_data([...arr],{...params}).data,
      query_param:{
        ...paginate_data([...arr],{...params}).parameters,
        search:params.search
      }
   }
        yield put(update_modified_procedures({...obj}))
        yield put(ret_procedures({
          params:{
            ...obj.query_param,
            search:params.search
          },
          data:!!obj.modified_procedures[1]?obj.modified_procedures[1]:[]
        }))

    }else if(params.limit !== store_param.limit){
        // Limit Change case
    }else {
      yield put (ret_procedures({
           params: {...store_param, page:params.page},
           data:modified_procedures[params.page]
      }))
      yield put ( update_params({
        ...store_param,
        page:params.page
      }))
    }
 } catch (e) {
  try{
      yield put(get_procedures_error())
    }catch(x){
       console.log(x,"in get_procedure saga")
      }
 }
}


function* remove_speciality_saga(action) {

  try {
 let center_id = get_url_params('center')
   const  data = yield store.getState().catalogue_store.remove_speciality
   const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
   const api_data = yield call(api.catalogue_routes.remove_speciality, data, center_id, headers)
   if(!!api_data){
     if (api_data.status === 200) {
         yield put(remove_speciality_ret({
             success:true,
             message:'Speciallity successfully removed'
            }))
       }else{
         yield put(remove_speciality_ret({
             success:false,
             message:'Something went wrong try again later..',
             data:[]
            }))
       }
   }
} catch (e) {
 try{
     yield put(remove_speciality_ret({
         success:false,
         message:'Something went wrong try again later..',
         data:[]
        }))
   }catch(x){
     yield put(remove_speciality_ret({
         success:false,
         message:'Something went wrong try again later..',
         data:[]
        }))
     }
}
}

function* get_user_specs_saga(action) {

     try {
    let center_id = get_url_params('center')
      const  get_user_specs = yield store.getState().catalogue_store.get_user_specs
      const data = get_user_specs
      const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
      const api_data = yield call(api.catalogue_routes.get_user_specialities, data, center_id, headers)
      if(!!api_data){
        if (api_data.status === 200) {
            yield put(get_user_specialities_ret({
                success:true,
                message:' successfully updated',
                data:api_data.data.data,
                global_variance:api_data.data.globalVariance
               }))
          }else{
            yield put(get_user_specialities_ret({
                success:false,
                message:'Something went wrong try again later..',
                data:[]
               }))
          }
      }
   } catch (e) {
    try{
        yield put(get_user_specialities_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
      }catch(x){
        yield put(get_user_specialities_ret({
            success:false,
            message:'Something went wrong try again later..',
            data:[]
           }))
        }
   }
}

function* update_procedure_saga(action) {
 try {
  let center_id = get_url_params('center')
    const  update_procedure = yield store.getState().catalogue_store.update_procedure
    const data = update_procedure
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    const api_data = yield call(api.catalogue_routes.update_procedures, data, center_id, headers)
    if(!!api_data){
      if (api_data.status === 200) {
          yield put(update_procedure_ret({
              success:true,
              message:'Procedure has been successfully updated in catalogue',
              data:api_data.data
             }))
        }else{
          yield put(update_procedure_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
  try{
      yield put(update_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(update_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}


function* add_procedure_saga(action) {

 try {
  let center_id = get_url_params('center')
    const  add_procedure = yield store.getState().catalogue_store.add_procedure
    const data = add_procedure
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    const api_data = yield call(api.catalogue_routes.add_procedure, data, center_id, headers)
    if(!!api_data){
      if (api_data.status === 200) {
          if(!!api_data.data){
            yield put(add_procedure_ret({
              success:true,
              message:'Procedure has been successfully updated in catalogue',
              data:api_data.data
             }))
          }else {
            yield put(add_procedure_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
          }
        }else{
          yield put(add_procedure_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
  try{
      yield put(add_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(add_procedure_loading({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}

 function* search_procedures_saga(action) {
   console.log("Inside search procedure saga")

 try {
  let center_id = get_url_params('center')
    const  search_procedures = yield store.getState().catalogue_store.search_procedures
    const data = search_procedures
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    let dataObject = {
      page:data.page,
      searchQuery:data.searchQuery,
      limit:data.limit,
      specialityId:data.specialityId
    }
    const api_data = yield call(api.catalogue_routes.search_procedures, dataObject, center_id, headers)
    if(!!api_data){
      console.log(api_data,"api_data in search_procedure_saga")
      if (api_data.status === 201) {
          if(!!api_data.data){
            yield put(search_procedures_ret({
              success:true,
              message:'Procedure has been successfully fetched',
              data:api_data.data.data
             }))
          }else {
            yield put(search_procedures_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
          }
        }else{
          yield put(search_procedures_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
   console.log(e,'e in search_procedure saga')
  try{
      yield put(search_procedures_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(search_procedures_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}


function* to_add_services_saga(action) {
  console.log("Inside to add_service _saga")
  
 try {
  let center_id = get_url_params('center')
    const  search_procedures = yield store.getState().catalogue_store.to_add_services
    const data = search_procedures
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    let dataObject = {
      limit:data.limit,
      page:data.page,
      specialityId:data.specialityId,
      searchQuery:!!data.searchQuery?data.searchQuery:''
    }
    const api_data = yield call(api.catalogue_routes.to_add_services, dataObject, center_id, headers)
    if(!!api_data){
      console.log(api_data,"apidata in to_add_service_saga")
      if (api_data.status === 200) {
          if(!!api_data.data){
            yield put(to_add_services_ret({
              success:true,
              message:'Services have been successfully fetched',
              limit:api_data.data.limit,
              page:api_data.data.page,
              total:api_data.data.total,
              next:api_data.data.next,
              data:api_data.data.data,
              searchQuery:api_data.data.searchQuery
             }))
          }else {
            yield put(to_add_services_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
          }
         
        }else{
          yield put(to_add_services_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
   console.log(e,'e in search_procedure saga')
  try{
      yield put(to_add_services_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(to_add_services_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}


function* set_variance_saga(action) {
 
 try {
  let center_id = get_url_params('center')
    const  data = yield store.getState().catalogue_store.set_variance
    const headers  = { 'headers': { 'Authorization': localStorage.getItem('token') } }
    const api_data = yield call(api.catalogue_routes.set_variance, data, center_id, headers)
    if(!!api_data){
      if (api_data.status === 200) {
          if(!!api_data.data){
            yield put(set_variance_ret({
              success:true,
              message:'Your variance have been successfully updated'
             }))
          }else {
            yield put(set_variance_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
          }
         
        }else{
          yield put(set_variance_ret({
              success:false,
              message:'Something went wrong try again later..',
              data:[]
             }))
        }
    }
 } catch (e) {
   console.log(e,'e in search_procedure saga')
  try{
      yield put(set_variance_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
    }catch(x){
      yield put(set_variance_ret({
          success:false,
          message:'Something went wrong try again later..',
          data:[]
         }))
      }
 }
}





const catalogue_saga  = [
   takeLatest(GET_USER_SPECIALITIES, get_user_specs_saga),
   takeLatest(UPDATE_PROCEDURE, update_procedure_saga),
   takeLatest(ADD_PROCEDURE, add_procedure_saga),
   takeLatest(SEARCH_PROCEDURE, search_procedures_saga),
   takeLatest(GET_PROCEDURES, get_procedures_saga),
   takeLatest(TO_ADD_SERVICES, to_add_services_saga),
   takeLatest(SET_VARIANCE, set_variance_saga),
   takeLatest(REMOVE_SPECIALITY, remove_speciality_saga)
]

export default catalogue_saga