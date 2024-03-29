import { 
  NEW_USER,
  GET_BOOKING, 
  GET_INSIGHTS, 
  GET_NOTIFICATIONS, 
  GET_TIMESLOT, 
  UNREAD_LENGTH, 
  UNREAD_NOTIFICATION,
  GET_SOL_INSIGHTS,
  CLEAR_SOL_INSIGHTS,
  BUSINESS_EARN, BUSINESS_LOST,
  SOLUTION_USERS,
  GET_CATALOGUE,
  PROFILE_DATA_RET,

  SUBMIT_PROFILE,
  SUBMIT_PROFILE_RET,
  CLEAR_SUBMIT_PROFILE_RET,

  RESET_PASS_RET,
  CLR_RESET_PASS,

  LOGOUT_DEVICES_RET,
  LOGOUT_DEVICES,
  LOGOUT_DEVICES_CLR,

  UPLOAD,
  UPLOAD_RET,
  UPLOAD_RET_CLR,

  UPDATE_IMAGE,
  UPDATE_IMAGE_RET,
  UPDATE_IMAGE_CLR,

  // PROCEDURE SEARCH
 
  SEARCH_PROCEDURE,
  SEARCH_PROCEDURE_RET,
  SEARCH_PROCEDURE_CLR,

  //UPLOAD PROCEDURE
  UPLOAD_PROCEDURE,
  UPLOAD_PROCEDURE_RET,
  UPLOAD_PROCEDURE_CLR,

 //DOWNLOAD CATALOGUE
 DOWNLOAD_CATALOGUE,
 DOWNLOAD_CATALOGUE_RET,
 DOWNLOAD_CATALOGUE_CLR,
 GET_USER_DETAILS,

 SUBMIT_BANK_DETAILS_RET,
 SUBMIT_BANK_DETAILS_CLR,

 // UPDATE BANNER
 UPDATE_BANNER,
 UPDATE_BANNER_RET,
 UPDATE_BANNER_CLR,

 // UPDATE_ACHIEVEMENT
 UPDATE_ACHIEVEMENT,
 UPDATE_ACHIEVEMENT_RET,
 UPDATE_ACHIEVEMENT_CLR,

 //EDIT_BIO
 EDIT_BIO_RET,
 EDIT_BIO_CLR,

 GET_SERV_RET,
 GET_SERV_CLR,

 GET_SPECS_CLR,
 GET_SPECS_RET,

 ADD_DOCTOR_RET,
 ADD_DOCTOR_CLR,

 EDIT_PROCEDURE_RET,
 EDIT_PROCEDURE_CLR,

 
 REGISTER_USER_RET,
 REGISTER_USER_CLR,
 REGISTER_USER,

 SET_AVAILABILITY_RET,
 SET_AVAILABILITY_CLR,

 TO_ADD_SERVICES_RET,
 TO_ADD_SERVICES_CLR,

 ADD_SERVICES_CLR,
 ADD_SERVICES_RET,

 GET_BOOKING_CLR,
 GET_BOOKING_RET,

 NEW_USER_RET,
 NEW_USER_CLR,

 UPDATE_REAL_PRICE_RET,
 UPDATE_REAL_PRICE_CLR,

 UPDATE_PRICE_DATA_RET,
 CLEAR_UPDATE_PRICE_DATA,

 GET_ENTITY_CLR,
 GET_ENTITY_RET,

 CHANGE_APPOINT_RET_CLR,
 CHANGE_APPOINT_RET,

 GET_OTP_CLR,
 GET_OTP_RET,

 SUBMIT_OTP_CLR,
 SUBMIT_OTP_RET,
 SET_MOUNT,
 SET_DASH_DATA,
 CLEAR_ACT_INSIGHT,

 CLEAR_GET_NOTIFICATION,
 SET_NOTIF_DATA,

 REMOVE_NOTIF_COUNT,
 REMOVE_NOTIF_COUNT_RET,
 SET_NOTIF_COUNT,

 GET_PROFILE_RET,
 GET_PROFILE_CLR,

 SUBMIT_QUERY_RET,
 SUBMIT_QUERY_CLR,

 EDIT_LOCATION_CLR,
 EDIT_LOCATION_RET,

 GET_USER_INFO_RET,
 GET_USER_INFO_CLR,
 SET_USER_INFO,

 SET_BUSINESS_DATA,
 GET_BUSINESS_CLR,
 GET_BUSINESS_RET,

 RESCHEDULE_APPOINTMENT_CLR,
 RESCHEDULE_APPOINTMENT_RET,
 SET_RESCHEDULE_APPOINTMENT,

 ACT_AS_ADMIN_RET,
 ACT_AS_ADMIN_CLR,

 ADMIN_OTP_CLR,
 ADMIN_OTP_RET,

 ADMIN_DETAILS_CLR,
 ADMIN_DETAILS_RET,

 ADD_CENTER_CLR,
 ADD_CENTER_RET,

 GET_CENTERS_CLR,
 GET_CENTERS_RET,
 SET_CENTERS_DATA,
 SET_LOCATION_TOGGLER,
 SET_OPEN_MAP,

 GET_REMAIN_SPECS_CLR,
 GET_REMAIN_SPECS_RET,
 SET_CATALOGUE_DATA,

 ADD_SPECS_CLR,
 ADD_SPECS_RET,

 SET_CENTER_DATA,

 GET_CENTER_PROFILE_CLR,
 GET_CENTER_PROFILE_RET,

 GET_CENTER_CRED_RET,
 GET_CENTER_CRED_CLR,

 SET_CENTER_CRED,

 SET_NOTIF_ID,

 GET_USER_SPECIALITIES,
 GET_USER_SPECIALITIES_RET,
 GET_USER_SPECIALITIES_LOADING,

 UPDATE_PROCEDURE,
 UPDATE_PROCEDURE_LOADING,
 UPDATE_PROCEDURE_RET,

 ADD_PROCEDURE,
 ADD_PROCEDURE_RET,
 ADD_PROCEDURE_LOADING,

 SEARCH_PROCEDURE_LOADING
 
 } from './types';
import history from '../history';
import axios from 'axios';
import { get_url_params, for_loop } from '../utils/common_utilities';
// import { connect } from 'react-redux';



let baseUrl = "https://devapi.plunes.com/v9"
let base_url_without_v8 = "https://devapi.plunes.com"

const pathLocation = window.location.host;
if(!!pathLocation) {
 console.log('pathLocation : ', pathLocation);
 if(pathLocation === 'analytics.plunes.com') {
   console.log('PROD');
   // Production baseUrl
   baseUrl = 'https://api.plunes.com/v9'
   base_url_without_v8 = 'https://api.plunes.com'
 }else{
   baseUrl = "https://devapi.plunes.com/v9"
   base_url_without_v8 ="https://devapi.plunes.com"
   // BaseUrl = 'http://10.5.48.232:3000/api/v1/'
 }
}




export const  base_url = ()=>{
   return baseUrl
}

export const Unauth_Logout = () =>{
 localStorage.removeItem('token')
 localStorage.removeItem('isAuth')
 localStorage.removeItem('userId')
 localStorage.removeItem('deviceId')
 localStorage.removeItem('auth')
 localStorage.removeItem('docDetails')
 localStorage.removeItem('specialities')
 localStorage.removeItem('uploaderUserId')
 // window.location.reload()
}

export const search_procedures = (data) => dispatch =>{
 console.log("I am getting called")
 return  dispatch({
   type: SEARCH_PROCEDURE,
   payload:data
 })
}

export const search_procedures_ret = (data) => dispatch =>{
 return  dispatch({
   type: SEARCH_PROCEDURE_RET,
   payload:data
 })
}
export const search_procedures_loading = (data) => dispatch =>{
 return  dispatch({
   type: SEARCH_PROCEDURE_LOADING,
   payload:data
 })
}



export const add_procedure = (data) => dispatch =>{
 return  dispatch({
   type: ADD_PROCEDURE,
   payload:data
 })
}

export const add_procedure_ret = (data) => dispatch =>{
 return  dispatch({
   type: ADD_PROCEDURE_RET,
   payload:data
 })
}

export const add_procedure_loading = (data) => dispatch =>{
 return  dispatch({
   type: ADD_PROCEDURE_LOADING,
   payload:data
 })
}

export const update_procedure = (data) => dispatch =>{
 return  dispatch({
   type: UPDATE_PROCEDURE,
   payload:data
 })
}

export const update_procedure_ret = (data) => dispatch =>{
 return  dispatch({
   type: UPDATE_PROCEDURE_RET,
   payload:data
 })
}

export const update_procedure_loading = (data) => dispatch =>{
 return  dispatch({
   type: UPDATE_PROCEDURE_LOADING,
   payload:data
 })
}


export const get_user_specialities = (data) => dispatch =>{
 return  dispatch({
   type: GET_USER_SPECIALITIES,
   payload:data
 })
}

export const get_user_specialities_ret = (data) => dispatch =>{
 return  dispatch({
   type: GET_USER_SPECIALITIES_RET,
   payload:data
 })
}

export const get_user_specialities_loading = (data) => dispatch =>{
 return  dispatch({
   type: GET_USER_SPECIALITIES_LOADING,
   payload:data
 })
}


export const set_notif_id = (data) => dispatch =>{
 return  dispatch({
   type: SET_NOTIF_ID,
   payload:data
 })
}

export const set_catalogue_data = (data) => dispatch =>{
 return  dispatch({
   type: SET_CATALOGUE_DATA,
   payload:data
 })
}

export const set_center_data = (data) => dispatch =>{
 return  dispatch({
   type: SET_CENTER_DATA,
   payload:data
 })
}


export const set_centers_cred = (data) => dispatch =>{
 return  dispatch({
   type: SET_CENTER_CRED,
   payload:data
 })
}


export const get_center_cred_clr = (data) => dispatch =>{
 return  dispatch({
   type: GET_CENTER_CRED_CLR,
   payload:{}
 })
}

export const get_center_cred = (data) => async dispatch => {
 let center_id = get_url_params('center')
 console.log(center_id,"center_id")
 let token = localStorage.getItem('token')
 return await axios.put(baseUrl + `/user/getCenterCred?location=${data.centerLocation}`, {},  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in get_remaining_specs");
     if (res.status === 200) {
       dispatch({
         type: GET_CENTER_CRED_RET,
         payload: {
           success:true,
           data:res.data,
           message:"Successfully fetched center's Details"
         }
       })
     }else{
       dispatch({
         type: GET_CENTER_CRED_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: GET_CENTER_CRED_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: GET_CENTER_CRED_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }  
   })
}



export const get_center_profile_clr = (data) => dispatch =>{
 return  dispatch({
   type: GET_CENTER_PROFILE_CLR,
   payload:{}
 })
}

export const get_center_profile = () => async dispatch => {
 let center_id = get_url_params('center')
 console.log(center_id,"center_id")
 let token = localStorage.getItem('token')
 return await axios.get(baseUrl + `/user?userId=${center_id}`,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in get_remaining_specs");
     if (res.status === 200) {
       dispatch({
         type: GET_CENTER_PROFILE_RET,
         payload: {
           success:true,
           data:res.data.data,
           message:"Successfully fetched center's Details"
         }
       })
     }else{
       dispatch({
         type: GET_CENTER_PROFILE_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: GET_CENTER_PROFILE_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: GET_CENTER_PROFILE_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }  
   })
}


export const add_specs_clr = (data) => dispatch =>{
 return  dispatch({
   type: ADD_SPECS_CLR,
   payload:{}
 })
}

export const add_specs = (data) => async dispatch => {
 let center_id = get_url_params('center')
 console.log(center_id,"center_id")
 let token = localStorage.getItem('token')
 return await axios.post(baseUrl + '/catalogue/addSpecialities'+`${!!center_id?'?userId='+center_id:''}`, data,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in get_remaining_specs");
     if (res.status === 200) {
       dispatch({
         type: ADD_SPECS_RET,
         payload: {
           success:true,
           data:res.data,
           message:"Specialities successfully added"
         }
       })
     }else{
       dispatch({
         type: ADD_SPECS_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: ADD_SPECS_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: ADD_SPECS_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }  
   })
}

export const get_remaining_specs_clr = (data) => dispatch =>{
 return  dispatch({
   type: GET_REMAIN_SPECS_CLR,
   payload:{}
 })
}

export const get_remaining_specs = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 let center_id = get_url_params('center')
 return await axios.post(baseUrl + `/catalogue/getSpecialitiesForDoctor`+`${!!center_id?'?userId='+center_id:''}`, {limit:100, page:'1', searchQuery:''},  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in get_remaining_specs");
     if (res.status === 200) {
       dispatch({
         type: GET_REMAIN_SPECS_RET,
         payload: {
           success:true,
           data:res.data.data
         }
       })
     }else{
       dispatch({
         type: GET_REMAIN_SPECS_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: GET_REMAIN_SPECS_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: GET_REMAIN_SPECS_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }  
   })
}


export const set_open_map = (data) => dispatch =>{
 return  dispatch({
   type: SET_OPEN_MAP,
   payload:data
 })
}

export const set_location_toggler = (data) => dispatch =>{
 return  dispatch({
   type: SET_LOCATION_TOGGLER,
   payload:data
 })
}

export const set_centers_data = (data) => dispatch =>{
 return  dispatch({
   type: SET_CENTERS_DATA,
   payload:data
 })
}


export const get_centers_clr = (data) => dispatch =>{
 return  dispatch({
   type: GET_CENTERS_CLR,
   payload:{}
 })
}

export const get_centers = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 return await axios.get(baseUrl + `/professional/getAllCenters?days=7`,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in get_Center");
     if (res.status === 200) {  
       dispatch({
         type: GET_CENTERS_RET,
         payload: {
           success:true,
           data:res.data.data
         }
       })
     }else{
       dispatch({
         type: GET_CENTERS_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: GET_CENTERS_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: GET_CENTERS_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }  
   })
}



export const add_center_clr = (data) => dispatch =>{
 return  dispatch({
   type: ADD_CENTER_CLR,
   payload:{}
 })
}

export const add_center = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 return await axios.post(baseUrl + `/admin/addCenter`, data, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in add_center")
     if (res.status === 200) {
       dispatch({
         type: ADD_CENTER_RET,
         payload: {
           success:true,
           data:res.data.data
         }
       })
     }else{
       dispatch({
         type: ADD_CENTER_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e.response,"e.response in add_center")
     try{
       dispatch({
         type: ADD_CENTER_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: ADD_CENTER_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }  
   })
}


export const admin_details_clr = (data) => dispatch =>{
 return  dispatch({
   type: ADMIN_DETAILS_CLR,
   payload:{}
 })
}

export const admin_details = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 return await axios.put(baseUrl + `/user/RequestForAdmin`, data, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200) {
       console.log(res,"res in act_as_admin");
       dispatch({
         type: ADMIN_DETAILS_RET,
         payload: {
           success:true,
           data:res.data
         }
       })
     }else{
       dispatch({
         type: ADMIN_DETAILS_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: ADMIN_DETAILS_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: ADMIN_DETAILS_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }  
   })
}

export const admin_otp_clr = (data) => dispatch =>{
 return  dispatch({
   type: ADMIN_OTP_CLR,
   payload:{}
 })
}

export const admin_otp = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 return await axios.put(baseUrl + `/user/verifyAndAddAdmin`, data, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200) {
       console.log(res,"res in admin_otp");
       dispatch({
         type: ADMIN_OTP_RET,
         payload: {
           success:true,
           data:res.data
         }
       })
     }else{
       dispatch({
         type: ADMIN_OTP_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e.response)
     try{
       dispatch({
         type: ADMIN_OTP_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: ADMIN_OTP_RET,
           payload: {
             success:false,
             data:{},
             message:"Try again later"
           }
         })
     }   
   })
}


export const act_as_admin_clr = (data) => dispatch =>{
 return  dispatch({
   type: ACT_AS_ADMIN_CLR,
   payload:{}
 })
}

export const act_as_admin = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 return await axios.put(baseUrl + `/user/RequestForAdmin`, {}, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200) {
       console.log(res,"res in act_as_admin");
       dispatch({
         type: ACT_AS_ADMIN_RET,
         payload: {
           success:true,
           data:res.data
         }
       })
     }else{
       dispatch({
         type: ACT_AS_ADMIN_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     try{
       dispatch({
         type: ACT_AS_ADMIN_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: ACT_AS_ADMIN_RET,
           payload: {
             success:false,
             data:{},
             message:"Unable to process request. Try again"
           }
         })
     }
   })
}

export const set_reschedule_appointment = (data) => dispatch =>{
 return  dispatch({
   type: SET_RESCHEDULE_APPOINTMENT,
   payload:data
 })
}

export const reschedule_appointment_clr = (data) => dispatch =>{
 return  dispatch({
   type: RESCHEDULE_APPOINTMENT_CLR,
   payload:{}
 })
}

export const reschedule_appointment = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 let body =  data.body 
 return await axios.put(baseUrl + `/booking/${data.params.bookingId}/${data.params.bookingStatus}`, body, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in reschedule_appointment");
     if (res.status === 200) {
       dispatch({
         type: RESCHEDULE_APPOINTMENT_RET,
         payload: {
           success:true,
           data:res.data,
           message:res.data.msg
         }
       })
     }else{
       dispatch({
         type: RESCHEDULE_APPOINTMENT_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: RESCHEDULE_APPOINTMENT_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: RESCHEDULE_APPOINTMENT_RET,
           payload: {
             success:false,
             data:{},
             message:"Unable to process request. Try again"
           }
         })
     }

   })
}


export const set_business_data = (data) => dispatch =>{
 return  dispatch({
   type: SET_BUSINESS_DATA,
   payload:data
 })
}


export const get_business_clr = (data) => dispatch =>{
 return  dispatch({
   type: GET_BUSINESS_CLR,
   payload:{}
 })
}

export const get_business = (data) => async dispatch => {
 console.log(data,"data in get_business_ action")
 let token = localStorage.getItem('token')
 return await axios.get(baseUrl + `/analytics/totalBusiness?days=${data.days}&userId=${data.center}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in get_business');
     if (res.status === 200) {
       console.log(res,"res in get_business");
       dispatch({
         type: GET_BUSINESS_RET,
         payload: {
           success:true,
           data:res.data.data
         }
       })
     }else{
       dispatch({
         type: GET_BUSINESS_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e.response,"e.response in get_business")
     try{
       dispatch({
         type: GET_BUSINESS_RET,
         payload: {
           success:false,
           data:{},
           message:e.response.data.error
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: GET_BUSINESS_RET,
           payload: {
             success:false,
             data:{},
             message:"Unable to process request. Try again"
           }
         })
     }
   })
}



export const set_user_info = (data) => dispatch =>{
 return  dispatch({
   type: SET_USER_INFO,
   payload:data
 })
}


export const get_user_info_clr = (data) => dispatch =>{
 return  dispatch({
   type: GET_USER_INFO_CLR,
   payload:{}
 })
}

export const get_user_info = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 if(!!data){
   console.log(data, "WHOAMI_DATA")
 }
 let from_dash_page = data.from_dash_page
 return await axios.get(`${baseUrl}/professional?professionalId=${data.userId}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     // console.log(res, 'data');
     console.log(res, "WHOAMI_RES")

     if (res.status === 200) {
       //console.log(res);
       dispatch({
         type: GET_USER_INFO_RET,
         payload: {
           success:true,
           data:res.data.data,
           from_dash_page
         }
       })
     }else{
       dispatch({
         type: GET_USER_INFO_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again",
           from_dash_page
         }
       })
     }
   })
   .catch((e) => {
     console.log(e, "WHOAMI_ERROR")
     try{
       dispatch({
         type: GET_USER_INFO_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again",
           from_dash_page
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: GET_USER_INFO_RET,
           payload: {
             success:false,
             data:{},
             message:"Unable to process request. Try again",
             from_dash_page
           }
         })
     }
   })
}


export const edit_location_clr = (data) => dispatch =>{
 return  dispatch({
   type: EDIT_LOCATION_CLR,
   payload:{}
 })
}


export const edit_location = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 let center_id = get_url_params('center')
 return await axios.put(baseUrl + '/user'+`${!!center_id?'?userId='+center_id:''}`, data, { 'headers': { 'Authorization': `Bearer ${token}` } })
 .then((res) => {
   console.log(res, 'res in submit_enquiry')
   if (res.status === 200) {
       dispatch({
         type : EDIT_LOCATION_RET,
         payload :{
           success:true,
           message:"Your location been successfully submitted"
         }
       })
   }else{
     dispatch({
       type : EDIT_LOCATION_RET,
       payload :{
         success:false,
         message:"Unable to process your request now. try later"
       }
     })
   }
 })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: EDIT_LOCATION_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: EDIT_LOCATION_RET,
           payload: {
             success:false,
             data:{},
             message:"Unable to process request. Try again"
           }
         })
     }  
   })
}


export const submit_query_clr = (data) => dispatch =>{
 return  dispatch({
   type: SUBMIT_QUERY_CLR,
   payload:{}
 })
}


export const submit_query = (data) => async dispatch => {
 let token = localStorage.getItem('token')
 return await axios.post(baseUrl + '/user/enquiry', data, { 'headers': { 'Authorization': `Bearer ${token}` } })
 .then((res) => {
   console.log(res, 'res in submit_enquiry')
   if (res.status === 200) {
       dispatch({
         type : SUBMIT_QUERY_RET,
         payload :{
           success:true,
           message:"Your query has been successfully submitted"
         }
       })
   }else{
     dispatch({
       type : SUBMIT_QUERY_RET,
       payload :{
         success:false,
         message:"Unable to process your request now. try later"
       }
     })
   }
 })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: SUBMIT_QUERY_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: SUBMIT_QUERY_RET,
           payload: {
             success:false,
             data:{},
             message:"Unable to process request. Try again"
           }
         })
     }  
   })
}



export const get_profile_clr = (data) => dispatch =>{
 return  dispatch({
   type: GET_PROFILE_CLR,
   payload:{}
 })
}


export const get_user_profile = () => async dispatch => {
 let token = localStorage.getItem('token')
 let userId = localStorage.getItem('userId')
 return await axios.get(`${baseUrl}/professional?professionalId=${userId}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     // console.log(res, 'data');
     if (res.status === 200) {
       //console.log(res);
       dispatch({
         type: GET_PROFILE_RET,
         payload: {
           success:true,
           data:res.data.data
         }
       })
     }else{
       dispatch({
         type: GET_PROFILE_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
     try{
       dispatch({
         type: GET_PROFILE_RET,
         payload: {
           success:false,
           data:{},
           message:"Unable to process request. Try again"
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type: GET_PROFILE_RET,
           payload: {
             success:false,
             data:{},
             message:"Unable to process request. Try again"
           }
         })
     }
   })
}


export const remove_notif_count_ret = (data) => dispatch =>{
 return  dispatch({
   type: REMOVE_NOTIF_COUNT_RET,
   payload:{}
 })
}

export const set_notif_count = (data) => dispatch =>{
 return  dispatch({
   type: SET_NOTIF_COUNT,
   payload:data
 })
}

export const remove_notif_count = (data) => async dispatch =>{
 let token = localStorage.getItem('token')
 return await axios.put(baseUrl + `/notification/`, {} , { 'headers': { 'Authorization': `Bearer ${token}` } })
    .then((res) => {
      console.log(res, 'res in getOTP')
      if (res.status === 200) {
        //dispatch(getSolutionInsights()
        if(!!res.data.success){
          dispatch({
            type : REMOVE_NOTIF_COUNT,
            payload :{
              success:true,
              data:{},
              message:"Successfully remove notif count"
            }
          })
        }else{
          dispatch({
            type : REMOVE_NOTIF_COUNT,
            payload :{
              success:false,
              data:[],
              message:"Something went wrong. try again later"
            }
          })
        }
      }
    }).catch(error => {
     try{
       dispatch({
         type:REMOVE_NOTIF_COUNT,
          payload:{
           success:false,
           message:"Something went wrong. try agian later",
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:REMOVE_NOTIF_COUNT,
            payload:{
             success:false,
             message:"Something went wrong. try agian later",
             data:{}
            }
         })
       }
  });
}
export const set_dash_data = (data) => dispatch =>{
 return  dispatch({
   type: SET_DASH_DATA,
   payload:data
 })
}

export const set_notif_data = (data) => dispatch =>{
 return  dispatch({
   type: SET_NOTIF_DATA,
   payload:data
 })
}



export const clr_act_insght = (data) => dispatch =>{
 return  dispatch({
   type: CLEAR_ACT_INSIGHT,
   payload:data
 })
}

export const setMount = (data) => dispatch =>{
 return  dispatch({
   type: SET_MOUNT,
   payload:data
 })
}


export const submitOtpClr = () => dispatch =>{
 return  dispatch({
   type: SUBMIT_OTP_CLR,
   payload:{}
 })
}

export const submitOtp = (data) => async dispatch => {
 let token = localStorage.getItem('token');
console.log(data,"data in getEntity")
 return await axios.put(baseUrl + `/user/updatePassword`, data , { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in submitOtp')
     if (res.status === 200) {
       //dispatch(getSolutionInsights()
       if(!!res.data.success){
         dispatch({
           type : SUBMIT_OTP_RET,
           payload :{
             success:true,
             data:res.data,
             message:"Password Successfully updated"
           }
         })
       }else{
         dispatch({
           type : SUBMIT_OTP_RET,
           payload :{
             success:false,
             data:[],
             message:"Invalid OTP"
           }
         })
       }
     }
   }).catch(error => {
     console.log(error,"error in GET")
     try{
       dispatch({
         type:SUBMIT_OTP_RET,
          payload:{
           success:false,
           message:"Something went wrong. try agian later",
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:SUBMIT_OTP_RET,
            payload:{
             success:false,
             message:"Something went wrong. try agian later",
             data:{}
            }
         })
       }
 });
}



export const getOtpClr = () => dispatch =>{
 return  dispatch({
   type: GET_OTP_CLR,
   payload:{}
 })
}

export const getOtp = (data) => async dispatch => {
 let token = localStorage.getItem('token');
console.log(data,"data in getEntity")
 return await axios.get(baseUrl + `/user/forgotPassword?userId=${data.email}`,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in getOTP')
     if (res.status === 200) {
       //dispatch(getSolutionInsights()
       if(!!res.data){
         dispatch({
           type : GET_OTP_RET,
           payload :{
             success:true,
             data:res.data,
             message:"An OTP has been sent to your registered mobile number and email."
           }
         })
       }else{
         dispatch({
           type : GET_OTP_RET,
           payload :{
             success:false,
             data:[],
             message:"Something went wrong. try again later"
           }
         })
       }
     }
   }).catch(error => {
     try{
       dispatch({
         type:GET_OTP_RET,
          payload:{
           success:false,
           message:error.response?error.response.data.error:'Something went wrong. try again later',
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:GET_OTP_RET,
            payload:{
             success:false,
             message:"Something went wrong. try agian later",
             data:{}
            }
         })
       }
 });
}




export const changeAppointClr = () => dispatch =>{
 return  dispatch({
   type: CHANGE_APPOINT_RET_CLR,
   payload:{}
 })
}

export const changeAppoint = (data) => async dispatch => {
 let token = localStorage.getItem('token');
 let type = data.type

 let  requestUrl =``
 if(type==="confirming"){
       requestUrl = `/booking/confirmBooking?bookingId=${data._id}`
 }else{
        requestUrl =`/booking/${data._id}/${type}`
 }
console.log(data,"data in getEntity")
if(type==='confirming'){
 return await axios.get(baseUrl + requestUrl,  { 'headers': { 'Authorization': `Bearer ${token}` } })
 .then((res) => {
   console.log(res, 'res in changeAppoint')
   if (res.status === 200) {
     //dispatch(getSolutionInsights())
     console.log(res.data, 'data in update Image')
     if(!!res.data){
       dispatch({
         type : CHANGE_APPOINT_RET,
         payload :{
           success:true,
           data:res.data,
           message:"Appointment status successfully changed",
           type:type
         }
       })
     }else{
       dispatch({
         type : CHANGE_APPOINT_RET,
         payload :{
           success:false,
           data:[],
           message:"Something went wrong. try again later",
           type:type
         }
       })
     }
   }
 }).catch(error => {
   console.log(error.response)
   try{
     dispatch({
       type:CHANGE_APPOINT_RET,
        payload:{
         success:false,
         message:"Something went wrong. try again later",
         data:{},
         type:type
        }
     })
   }catch(x){
       console.log(x)
       dispatch({
         type:CHANGE_APPOINT_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{},
           type:type
          }
       })
     }
});
}else{
 return await axios.put(baseUrl + requestUrl, {}  ,{ 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in changeAppoint')
     if (res.status === 200) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in update Image')
       if(!!res.data){
         dispatch({
           type : CHANGE_APPOINT_RET,
           payload :{
             success:true,
             data:res.data,
             message:"Appointment status successfully changed",
             type:type
           }
         })
       }else{
         dispatch({
           type : CHANGE_APPOINT_RET,
           payload :{
             success:false,
             data:[],
             message:"Something went wrong. try again later",
             type:type
           }
         })
       }
     }
   }).catch(error => {
     console.log(error)
     try{
       dispatch({
         type:CHANGE_APPOINT_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{},
           type:type
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:CHANGE_APPOINT_RET,
            payload:{
             success:false,
             message:"Something went wrong. try again later",
             data:{},
             type:type
            }
         })
       }
 });
}
 
}



export const getEntityClr = () => dispatch =>{
 return  dispatch({
   type: GET_ENTITY_CLR,
   payload:{}
 })
}

export const getEntity = (data) => async dispatch => {
 let token = localStorage.getItem('token');
console.log(data,"data in getEntity")
 return await axios.get(baseUrl + `/user/hospitalDoctor?doctorId=${data.userId}`,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in getEntity')
     if (res.status === 200) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in update Image')
       if(!!res.data){
         dispatch({
           type : GET_ENTITY_RET,
           payload :{
             success:true,
             data:res.data.data[0],
             message:"Service successfully added"
           }
         })
       }else{
         dispatch({
           type : GET_ENTITY_RET,
           payload :{
             success:false,
             data:[],
             message:"Something went wrong. try again later"
           }
         })
       }
     }
   }).catch(error => {
     console.log(error.response)
     try{
       dispatch({
         type:GET_ENTITY_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:GET_ENTITY_RET,
            payload:{
             success:false,
             message:"Something went wrong. try again later",
             data:{}
            }
         })
       }
 });
}


// ADD_SERVICES

export const addServicesClr = () => dispatch =>{
 return  dispatch({
   type: ADD_SERVICES_CLR,
   payload:{}
 })
}

export const addServices = (data) => async dispatch => {
 let token = localStorage.getItem('token');
 let center_id = get_url_params('center')
 return await axios.put(baseUrl + '/user/addServices'+`${!!center_id?'?userId='+center_id:''}`, data, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in addServices')
   
     if (res.status === 200) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in update Image')
       if(!!res.data){
         dispatch({
           type : ADD_SERVICES_RET,
           payload :{
             success:true,
             data:[],
             message:"Service successfully added"
           }
         })
       }else{
         dispatch({
           type : ADD_SERVICES_RET,
           payload :{
             success:false,
             data:[],
             message:"Something went wrong. try again later"
           }
         })
       }
     }
   }).catch(error => {
     try{
       dispatch({
         type:ADD_SERVICES_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:ADD_SERVICES_RET,
            payload:{
             success:false,
             message:"Something went wrong. try again later",
             data:{}
            }
         })
       }
 });
}




// TO_ADD_SERVICES

export const toAddServicesClr = () => dispatch =>{
 return  dispatch({
   type: TO_ADD_SERVICES_CLR,
   payload:{}
 })
}

export const toAddServices = (data) => async dispatch => {
 const center_id = get_url_params('center')
 let token = localStorage.getItem('token');
 let dataObject = {
   page:data.page,
   searchQuery:data.searchQuery,
   limit:data.limit,
   specialityId:data.specialityId
 }
 

 return await axios.post(baseUrl + '/catalogue/getServicesForDoctor'+`${!!center_id?'?userId='+center_id:''}`, dataObject, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in searchProcedures')
   
     if (res.status === 200) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in update Image')
       if(!!res.data){
         dispatch({
           type : TO_ADD_SERVICES_RET,
           payload :{
             success:true,
             data:res.data.data
           }
         })
       }else{
         dispatch({
           type : TO_ADD_SERVICES_RET,
           payload :{
             success:false,
             data:[]
           }
         })
       }
     }
   }).catch(error => {
     console.log(error.response)
     try{
       dispatch({
         type:TO_ADD_SERVICES_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:TO_ADD_SERVICES_RET,
            payload:{
             success:false,
             message:"Something went wrong. try again later",
             data:{}
            }
         })
       }
 });
}



// SET_AVAILABILITY

export const setAvailabilityClr = () => dispatch =>{
 return  dispatch({
   type: SET_AVAILABILITY_CLR,
   payload:{}
 })
}

export const setAvailability = (obj) => async dispatch => {
 console.log("Inside setAvailability")
let type = obj.userType
 let token = localStorage.getItem('token');
 return await axios.put(baseUrl + '/user', obj,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in setResposnibikity")
     if (res.status === 200) {
       dispatch({
         type:SET_AVAILABILITY_RET,
          payload:{
           success:true,
           message:'Availability successfully updated',
          }
       })
     }else{
       dispatch({
         type:SET_AVAILABILITY_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{}
          }
       })
     }
   }).catch(error => {
     console.log(error.response)
     try{
       dispatch({
         type:SET_AVAILABILITY_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:SET_AVAILABILITY_RET,
            payload:{
             success:false,
             message:"Something went wrong. try again later",
             data:{}
            }
         })
       }
 });
}





// REGISTER_USER

export const registerUserClr = () => dispatch =>{
 return  dispatch({
   type: REGISTER_USER_CLR,
   payload:{}
 })
}

export const registerUser = (obj) => async dispatch => {
 console.log("Inside registerUser")
let type = obj.userType
 let token = localStorage.getItem('token');
 return await axios.post(baseUrl + '/user/register', obj,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
    console.log(res,"res in register User")
     if (res.status === 200) {
       dispatch({
         type:REGISTER_USER_RET,
          payload:{
           success:true,
           message:'Sign up successfull',
          }
       })
     }else{
       dispatch({
         type:REGISTER_USER_RET,
          payload:{
           success:false,
           message:"Something went wrong. try again later",
           data:{}
          }
       })
     }
   }).catch(error => {
     console.log(error.response)
     try{
       dispatch({
         type:REGISTER_USER_RET,
          payload:{
           success:false,
           message:error.response.data.error,
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:REGISTER_USER_RET,
            payload:{
             success:false,
             message:"Please try again later",
             data:{}
            }
         })
       }
 });
}




//EDIT_PROCEDURE
export const editProcedureClr = () => dispatch =>{
 return  dispatch({
   type: EDIT_PROCEDURE_CLR,
   payload:{}
 })
}

export const editProcedure = (obj) => async dispatch => {
 const center_id = get_url_params('center')
 console.log("Inside editProcedure",obj)
 // let newObj = {
 //   specialityId:obj.specialityId,
 //   serviceId:obj.serviceId,
 //   newPrice:obj.price[0],
 //   newVariance:obj.variance
 // }
 let token = localStorage.getItem('token');
 return await axios.patch(baseUrl + '/analytics/cataloguePriceUpdate'+`${!!center_id?'?userId='+center_id:''}`, obj,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in editProcedure")
     if (res.status === 200) {
       dispatch({
         type:EDIT_PROCEDURE_RET,
          payload:{
           success:true,
           message:'Service successfully updated',
          }
       })
     }else{
       dispatch({
         type:EDIT_PROCEDURE_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:res.data
          }
       })
     }
   }).catch(error => {
     console.log(error.response)
     try{
       dispatch({
         type:EDIT_PROCEDURE_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:EDIT_PROCEDURE_RET,
            payload:{
             success:false,
             message:'Something went wrong try again later..',
             data:{}
            }
         })
       }
 });
}



// ADD_DOCTOR

export const addDoctorClr = () => dispatch =>{
 return  dispatch({
   type: ADD_DOCTOR_CLR,
   payload:{}
 })
}

export const addDoctor = (obj) => async dispatch => {
 console.log("Inside addDoctor")
 const center_id = get_url_params('center')
 let token = localStorage.getItem('token');
 return await axios.patch(base_url_without_v8 + '/admin/addHospitalDoctor'+`${!!center_id?'?userId='+center_id:''}`, obj,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in addDoctor")
     if (res.status === 200) {
       dispatch({
         type:ADD_DOCTOR_RET,
          payload:{
           success:true,
           message:get_url_params('id')?"Profile Sucessfully Edited":'Doctor successfully added',
           data:res.data
          }
       })
     }else{
       dispatch({
         type:ADD_DOCTOR_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:res.data
          }
       })
     }
   }).catch(e=>{
     try{
       dispatch({
         type:ADD_DOCTOR_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:ADD_DOCTOR_RET,
            payload:{
             success:false,
             message:'Something went wrong try again later..',
             data:{}
            }
         })
       }
   })
}



//GET_SER
export const getSpecsClr = () => dispatch =>{
 return  dispatch({
   type: GET_SPECS_CLR,
   payload:{}
 })
}

export const getSpecs = (obj) => async dispatch => {
 console.log(obj,"obj in getSpecs")
 console.log("Inside GetSPecs")
 let center_id = get_url_params('center')
 let requestUrl ="/catalogue/getConsultationSpecialities"+`${!!center_id?'?userId='+center_id:''}`
 if(!!obj){
   if(obj.type === "getUserSpecialities"){
     requestUrl = "/catalogue/getConsultationSpecialities"+`${!!center_id?'?userId='+center_id:''}`
   }
 }
 
 let token = localStorage.getItem('token');
 return await axios.get(baseUrl + requestUrl,  { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in GetSpecs")
     
     if (res.status === 200) {
       dispatch({
         type:GET_SPECS_RET,
          payload:{
           success:true,
           message:' successfully updated',
           data:res.data.data
          }
       })
     }else{
       dispatch({
         type:GET_SPECS_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:res.data
          }
       })
     }
   }).catch(e=>{
     try{
       dispatch({
         type:GET_SPECS_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:GET_SPECS_RET,
            payload:{
             success:false,
             message:'Something went wrong try again later..',
             data:{}
            }
         })
       }
   })
}


//GET_SER
export const getServClr = () => dispatch =>{
 return  dispatch({
   type: GET_SERV_CLR,
   payload:{}
 })
}

export const getServ = (obj) => async dispatch => {
 console.log(obj,"Data in getServ Action")
 let token = localStorage.getItem('token');
 return await axios.get(base_url_without_v8 + `/admin/specialityConsultation/${obj.name}`, obj, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in getServ")
     if (res.status === 200) {
       dispatch({
         type:GET_SERV_RET,
          payload:{
           success:true,
           message:' successfully updated',
           data:res.data
          }
       })
     }else{
       dispatch({
         type:GET_SERV_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:res.data
          }
       })
     }
   }).catch(e=>{
     try{
       dispatch({
         type:GET_SERV_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           data:{}
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:GET_SERV_RET,
            payload:{
             success:false,
             message:'Something went wrong try again later..',
             data:{}
            }
         })
       }
   })
}









//EDIT_BIO

export const editBioClr = () => dispatch =>{
 return  dispatch({
   type: EDIT_BIO_CLR,
   payload:{}
 })
}

export const editBio = (obj) => async dispatch => {
 let token = localStorage.getItem('token');
 let center_id = get_url_params('center')
 return await axios.put(baseUrl + '/user'+`${!!center_id?'?userId='+center_id:''}`, obj, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200) {
       dispatch({
         type:EDIT_BIO_RET,
          payload:{
           success:true,
           message:'Bio successfully updated'
          }
       })
     }else{
       dispatch({
         type:EDIT_BIO_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..'
          }
       })
     }
   }).catch(e=>{
     try{
       dispatch({
         type:EDIT_BIO_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..'
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:EDIT_BIO_RET,
            payload:{
             success:false,
             message:'Something went wrong try again later..'
            }
         })
       }
   })
}


//UPDATE_ACHIEVEMENTS

export const updateAchievementClr = () => dispatch =>{
 return  dispatch({
   type: UPDATE_ACHIEVEMENT_CLR,
   payload:{}
 })
}

export const updateAchievement = (obj) => async dispatch => {
 console.log(obj,"Data in updateAchievement Action")
 let center_id = get_url_params('center')
 let type = obj.type
 delete obj.type
 let token = localStorage.getItem('token');
 return await axios.put(baseUrl + '/user'+`${!!center_id?'?userId='+center_id:''}`, obj, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200) {
       dispatch({
         type:UPDATE_ACHIEVEMENT_RET,
          payload:{
           success:true,
           message:'Achievements updated successfully',
           type:type
          }
       })
     }else{
       dispatch({
         type:UPDATE_ACHIEVEMENT_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           type:type
          }
       })
     }
   }).catch(e=>{
     try{
       dispatch({
         type:UPDATE_ACHIEVEMENT_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..',
           type:type
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:UPDATE_ACHIEVEMENT_RET,
            payload:{
             success:false,
             message:'Something went wrong try again later..',
             type:type
            }
         })
       }
   })
}



// UPDATE_BANNER

export const updateBannerClr = () => dispatch =>{
 return  dispatch({
   type: UPDATE_BANNER_CLR,
   payload:{}
 })
}

export const updateBanner = (uData) => async dispatch => {
 console.log(uData,"Data in UpdateBanner Action")
let obj = { 
 coverImageUrl:uData.coverImageUrl
}
  
let center_id = get_url_params('center')
 console.log()
 let token = localStorage.getItem('token');
 return await axios.put(baseUrl + '/user'+`${!!center_id?'?userId='+center_id:''}`, obj, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200) {
       dispatch({
         type:UPDATE_BANNER_RET,
          payload:{
           success:true,
           message:'Banner Successfully Updated!'
          }
       })
       
     }else{
       dispatch({
         type:UPDATE_BANNER_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..'
          }
       })
     }
   }).catch(e=>{
     try{
       dispatch({
         type:UPDATE_BANNER_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..'
          }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type:UPDATE_BANNER_RET,
            payload:{
             success:false,
             message:'Something went wrong try again later..'
            }
         })
       }
   })
}


//DOWNLOAD_CATALOGUE

export const downLoadCatalogueAction = (data) => dispatch => {
 return  dispatch({
     type: DOWNLOAD_CATALOGUE,
     payload:data
   })
}

export const downloadCatalogueClr = (data) => dispatch => {
return  dispatch({
type: DOWNLOAD_CATALOGUE_CLR,
payload:data
})
}

export const downloadCatalogue = (data) => async dispatch => {
 let token = localStorage.getItem('token');
   dispatch({
     type : DOWNLOAD_CATALOGUE,
     payload : "no-data-required"
   })

 return await axios.get(baseUrl + `/user/downloadCatalogue${!!data?'?id='+data.value:''}`, 
  { 'headers': {
     'Authorization': token,
     type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
   } ,
   'responseType': 'blob'
   })
   .then((res) => {
     console.log(res, 'res in downloadCatalog')
     if (res.status === 200) {
       console.log(res.data, 'data in upload downloadCatalog')
       let  file = new Blob([res.data])
       let fileURL = URL.createObjectURL(file)
       var element = document.createElement('a');
       element.setAttribute('href', fileURL);
       element.setAttribute('download',`${data.name}.xlsx`);
       document.body.appendChild(element)
       element.click();
         dispatch({
           type : DOWNLOAD_CATALOGUE_RET,
           payload :{
             success:true,
             message:"Sample file download successfull"
           }
         })
     }else{
       console.log(res,"res in download catalogue")
       
       dispatch({
         type : DOWNLOAD_CATALOGUE_RET,
         payload :{
           success:false,
           message:"Unable to process your request now. try later"
         }
       })
     }
   }).catch(e=>{
     console.log(e.response,e.error,"pila")
     try{
       dispatch({
         type : DOWNLOAD_CATALOGUE_RET,
         payload :{
           success:false,
           message:"Unable to process your request now. try later"
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type : DOWNLOAD_CATALOGUE_RET,
           payload :{
             success:false,
             message:"Unable to process your request now. try later"
           }
         })
       }
   })
}


// UPLOAD PRICEDURE
export const uploadProceduresAction = (data) => dispatch => {
 return  dispatch({
     type: UPLOAD_PROCEDURE,
     payload:data
   })
}

export const uploadProceduresClr = (data) => dispatch => {
return  dispatch({
type: UPLOAD_PROCEDURE_CLR,
payload:data
})
}

export const uploadProcedures = (data) => async dispatch => {
 let token = localStorage.getItem('token');
   dispatch({
     type : UPLOAD_PROCEDURE,
     payload : "no-data-required"
   })
   const body = new FormData();
   body.append(data.field, data.file)

 return await axios.post(baseUrl + `/upload/catalogue${!!data.id?'?id='+data.id:''}`, body, { 'headers': { 'Authorization': `Bearer ${token}` },'content-type':'multipart/form-data' })
   .then((res) => {
     console.log(res, 'res in searchProcedures')
     if (res.status === 201) {
       //dispatch(getSolutionInsights())
         dispatch({
           type : UPLOAD_PROCEDURE_RET,
           payload :{
             success:true,
             message:"Catalogue successfully uploaded"
           }
         })
     }else{
       dispatch({
         type : UPLOAD_PROCEDURE_RET,
         payload :{
           success:false,
           message:"Unable to process your request now. try later"
         }
       })
     }
   }).catch(e=>{
     try{
       dispatch({
         type : UPLOAD_PROCEDURE_RET,
         payload :{
           success:false,
           message:"Unable to process your request now. try later"
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type : UPLOAD_PROCEDURE_RET,
           payload :{
             success:false,
             message:"Unable to process your request now. try later"
           }
         })
       }
   })
}




// Search Procedures

export const searchProceduresAction = (data) => dispatch => {
 return  dispatch({
     type: SEARCH_PROCEDURE,
     payload:data
   })
}

export const searchProceduresClr = (data) => dispatch => {
return  dispatch({
type: SEARCH_PROCEDURE_CLR,
payload:data
})
}

export const searchProcedures = (data) => async dispatch => {
 let token = localStorage.getItem('token');
 let dataObject = {
   page:data.page,
   searchQuery:data.searchQuery,
   limit:data.limit,
   specialityId:data.specialityId
 }

 let center_id = get_url_params('center')

 return await axios.post(baseUrl + '/analytics/getServices'+`${!!center_id?'?userId='+center_id:''}`, dataObject, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in searchProcedures')
     if (res.status === 201) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in update Image')
       if(!!res.data){
         dispatch({
           type : SEARCH_PROCEDURE_RET,
           payload :{
             success:true,
             data:res.data.data
           }
         })
       }else{
         dispatch({
           type : SEARCH_PROCEDURE_RET,
           payload :{
             success:false,
             data:[]
           }
         })
       }
     }
   }).catch(e=>{
     try{
       dispatch({
         type : SEARCH_PROCEDURE_RET,
         payload :{
           success:false,
           data:[]
         }
       })
     }catch(x){
         console.log(x)
         dispatch({
           type : SEARCH_PROCEDURE_RET,
           payload :{
             success:false,
             data:[]
           }
         })
       }
   })
}


// update Image
export const updateImageRet = (data) => dispatch => {
 return  dispatch({
     type: UPDATE_IMAGE,
     payload:data
   })
}

export const updateImageClr = (data) => dispatch => {
return  dispatch({
type: UPDATE_IMAGE_CLR,
payload:data
})
}

export const updateImage = (data) => async dispatch => {
 let token = localStorage.getItem('token');
   dispatch({
     type : UPLOAD,
     payload : "no-data-required"
   })
let center_id = get_url_params('center')
 return await axios.put(baseUrl + '/user'+`${!!center_id?'?userId='+center_id:''}`, data, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in Upload')
   
     if (res.status === 200) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in update Image')
       if(!!res.data){
         dispatch({
           type : UPDATE_IMAGE_RET,
           payload :{
             success:true,
             message:"Profile Image Updated"
           }
         })
       }else{
         dispatch({
           type : UPDATE_IMAGE_RET,
           payload :{
             success:false,
             message:"Unable to process your request now. try later"
           }
         })
       }
     }
   }).catch(e=>{
    console.log(e)
})
}


// upload Image

export const uploadRet = (data) => dispatch => {
 return  dispatch({
     type: UPLOAD_RET,
     payload:data
   })
}

export const uploadRetClr = (data) => dispatch => {
return  dispatch({
type: UPLOAD_RET_CLR,
payload:data
})
}

export const upload = (data) => async dispatch => {
 let token = localStorage.getItem('token');
   dispatch({
     type : UPLOAD,
     payload : "no-data-required"
   })
   console.log(data,"After Upload")
 const body = new FormData();
 body.append(data.field, data.file)
 console.log(body);
 
 
 return await axios.post(baseUrl + '/upload/image', body, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'res in Upload')
     if (res.status === 200) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in Upload')
       if(!!res.data){
         dispatch({
           type : UPLOAD_RET,
           payload :{
             success:true,
             message:"File successfully uploaded",
             data:res.data
           }
         })
       }
     }else{
       dispatch({
         type : UPLOAD_RET,
         payload :{
           success:false,
           message:"Unable to process your request now. try later"
         }
       })
     }
   }).catch(e=>{
     console.log(e)
   })
}


// Logout from all other devices

export const logoutDevicesRet = (data) => dispatch => {
 return  dispatch({
     type: LOGOUT_DEVICES_RET,
     payload:data
   })
}

export const logoutDevicesClr = (data) => dispatch => {
return  dispatch({
type: LOGOUT_DEVICES_CLR,
payload:data
})
}

export const logoutOtherDevices = (data) => async dispatch => {
 let token = localStorage.getItem('token');
 dispatch({
   type : LOGOUT_DEVICES,
   payload : "no-data-required"
 })
 return await axios.post(baseUrl + '/user/logout_all', {
   deviceId:data.deviceId
 }, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 201) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data in logout All')
       if(!!res.data){
         dispatch({
           type : LOGOUT_DEVICES_RET,
           payload :{
             success:res.data.success,
             message:res.data.success?"Successfully logged out from all other devices":"Unable to process your request now. try later"
           }
         })
       }
     }
   }).catch(e=>{
     console.log(e)
   })
}



// Edit Profile

export const clearSubmitProfileRet = (data) => dispatch => {
       return  dispatch({
           type: CLEAR_SUBMIT_PROFILE_RET,
           payload:data
         })
}

export const clearResetRet = (data) => dispatch => {
 return  dispatch({
     type: CLR_RESET_PASS,
     payload:data
   })
}





export const getUserCatalogue = () => async dispatch => {
 let token = localStorage.getItem('token');
 return await axios.post(baseUrl + '/analytics/getServices', {
   page:1,
   searchQuery:'',
   limit:50
 },{ 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 201) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data')
       if(res.data.data && res.data.data.length > 0){
         dispatch({
           type : GET_CATALOGUE,
           payload : res.data.data
         })
       }
     }
   }).catch(e=>{
     console.log(e)
   })
}

export const getProfileDetails = () => async dispatch => {
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId')
  return await axios.get(`${baseUrl}/professional?professionalId=${userId}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
    .then((res) => {
      if (res.status === 200) {
       //dispatch(getSolutionInsights())
       console.log(res.data, 'data')
       if(res.data.data && res.data.data.length > 0){
         dispatch({
           type : PROFILE_DATA_RET,
           payload : res.data.data
         })
       }
     }
   }).catch(e=>{
     console.log(e)
   })
}


export const submitResetDetails = (uData) => async dispatch => {
 console.log(uData,"Data in submitResetDetails Action")
 let obj = {
   "newPassword": uData.newPassword,
   "oldPassword": uData.oldPassword
 }
 let token = localStorage.getItem('token');
 return await axios.patch(baseUrl + '/user/changePassword', obj, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in submitResetDetails")
     if (res.data.success === true) {
       dispatch({
         type:RESET_PASS_RET,
          payload:{
           success:true,
           message:'Password successfully changed'
          }
       })
     }else{
       dispatch({
         type:RESET_PASS_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..'
          }
       })
     }
   }).catch(e=>{
     console.log(e.response,"e in api")
     if(!!e.response.data){
       if(!!e.response.data.error){
         dispatch({
           type:RESET_PASS_RET,
            payload:{
             success:false,
             message:e.response.data.error==="Incorrect password"?"Old Password is incorrect":e.response.data.error
            }
         })
       }
     }
   })
}


export const submitProfileDetails = (uData) => async dispatch => {
 console.log(uData,"Data in SubmitProfile Action")
 let obj = {
   "name": uData.fullname,
   "email": uData.email,
   "address": uData.location,
   "mobileNumber":uData.phone
 }

 dispatch({
   type:SUBMIT_PROFILE,
   payload:{}
 })
  
 console.log()
 
 let token = localStorage.getItem('token');
 return await axios.put(baseUrl + '/user/', obj, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200) {
       dispatch({
         type:SUBMIT_PROFILE_RET,
          payload:{
           success:true,
           message:'Profile Successfully Updated!'
          }
       })
       
     }else{
       dispatch({
         type:SUBMIT_PROFILE_RET,
          payload:{
           success:false,
           message:'Something went wrong try again later..'
          }
       })
     }
   }).catch(e=>{
     console.log(e)
   })
}


export const updateRealPriceClr = () => dispatch =>{
 return  dispatch({
   type: UPDATE_REAL_PRICE_CLR,
   payload:{}
 })
}

export const updateRealPrice = (uData) => async dispatch => {
console.log(uData,"uData in Update Real Price")
 let token = localStorage.getItem('token');
 let flag = uData.saveService 
 if(flag){
    delete uData.saveService
 }
 let url = baseUrl + '/solution'
 if(flag==="YES"){
   url = baseUrl +"/user/addServiceToCatalogue"
 }
 return await axios.put(url, uData, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 200 ) {
       dispatch({
         type : UPDATE_REAL_PRICE_RET,
         payload :{
           success:true,
           data:[],
           message:'Price successfully updated'
         }
       })
       dispatch(getSolutionInsights())
       //console.log(res.data, 'data')
     }else{
       dispatch({
         type : UPDATE_REAL_PRICE_RET,
         payload :{
           success:false,
           data:res,
           message:'Unable to proccess now try again later'
         }
       })
     }
   }).catch(e=>{
     try {
      dispatch({
        type : UPDATE_REAL_PRICE_RET,
        payload :{
          success:false,
          data:[],
          message: e.response.data.error  || 'Unable to proccess now try again later'
        }
      })
     } catch(e){
      dispatch({
        type : UPDATE_REAL_PRICE_RET,
        payload :{
          success:false,
          data:[],
          message: 'Unable to proccess now try again later'
        }
      })
     }
   
   })
}


export const getMonthWiseUsers = (days) => async dispatch => {
   let token = localStorage.getItem('token');
   //console.log(token, 'monthWise')
   return await axios.get(baseUrl + '/analytics/solutionUsers', { 'headers': { 'Authorization': `Bearer ${token}` } })
             .then((res) => {
               console.log(res.data, 'data')
               //[0, 54, 62, null,null, null, null, null, null, null, null, null]
               let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
               try {
                 let monthWiseCount = res.data.data
               
                 let keys = Object.keys(monthWiseCount)
             
                 for_loop(monthWiseCount,(data,i)=>{
                    result[parseInt(data.month -1, 10)] = data.count
                 })
                 dispatch({
                   type: SOLUTION_USERS,
                   payload : result
                 })
               } catch (e) {
                 console.log(e,"e in try catch")
                 dispatch({
                   type: SOLUTION_USERS,
                   payload : [0,0,0,0,0,0,0,0,0,0,0,0]
                 })
               }          
             }).catch(e=>{
               console.log(e)
             })

           }


export const getAllBookings = (days) => async dispatch => {
 //let token = localStorage.getItem('token');
 let userId = localStorage.getItem('userId')
 //console.log(days, 'user id')
 return await axios.get(baseUrl + '/booking/all/' + days)
   .then((res) => {
     console.log(res.data, 'res in business api')
     if (res.status === 201) {
       //console.log(res.data.booking.length)
       let bookings = res.data.booking.filter((b) => b.bookingStatus === 'Confirmed')
       //console.log(bookings)
       let userBookings = bookings.filter((b) => b.professionalId === userId);
       let otherBookings = bookings.filter((b) => b.professionalId !== userId);
       let businessEarn = 0;
       let businessLost = 0;
       userBookings.forEach((ub) => {
         //console.log(typeof ub.service.newPrice[0])
         businessEarn += ub.service.newPrice[0]
       })
       dispatch({
         type: BUSINESS_EARN,
         payload: businessEarn
       })
       otherBookings.forEach((ub) => {
         //console.log(typeof ub.service.newPrice[0])
         businessLost += ub.service.newPrice[0]
       })
       dispatch({
         type: BUSINESS_LOST,
         payload: businessLost
       })
     }
   })
   .catch((e) => {
     console.log(e)
   })
}


export const clearSolInsights = () => dispatch =>{
 return  dispatch({
   type: CLEAR_SOL_INSIGHTS,
   payload:{}
 })
}

export const getSolutionInsights = () => async dispatch => {
 let token = localStorage.getItem('token');
 //let token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY3OGQ5ZGUzNjY4YTI4MWVjZWUyYmQiLCJpYXQiOjE1ODUxMjE3Mzh9.NzWdxrlVF3Q5DMp_4_4yYP7D0HblbMG9M1G_18e0ILE"
 //console.log(token)
 return await axios.get(baseUrl+ '/analytics/solutionSearch', { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,'res in getSolutionInsigts')
     if (res.status === 201) {
       dispatch({
         type: GET_SOL_INSIGHTS,
         payload: res.data.data
       })
     }
   })
   .catch((e) => {
     try{
       console.log(e.response,"e.repsonse in SolutionSearcnh")
       if(e.response.status===401){
         Unauth_Logout()
       }
       // dispatch({
       //   type : SEARCH_PROCEDURE_RET,
       //   payload :{
       //     success:false,
       //     data:[]
       //   }
       // })
     }catch(x){
         console.log(x)
         // dispatch({
         //   type : SEARCH_PROCEDURE_RET,
         //   payload :{
         //     success:false,
         //     data:[]
         //   }
         // })
       }
   })
}

export const clearUpdatePriceData = (data) => dispatch => {
 return  dispatch({
     type: CLEAR_UPDATE_PRICE_DATA,
     payload:data
   })
}

export const sendUpdateData = (uData) => async dispatch => {
 let obj = {
   "specialityId": uData.updateData.specialityId,
   "serviceId": uData.updateData.serviceId,
   "newPrice": Number(uData.updatePrice)
 }
 //console.log(typeof obj.newPrice, obj.newPrice)
 let token = localStorage.getItem('token');
 return await axios.patch(base_url_without_v8 + `/admin/updatePrice${uData.center!==''?'?userId='+uData.center:''}`, obj, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     //console.log(res.data)
     console.log(res,"res in send Update")
     if (res.data.status === 1) {
       //console.log(res.data, 'data')
       dispatch({
         type: UPDATE_PRICE_DATA_RET,
         payload:{
           success:true,
           message:'Price successfully updated'
         }
       })
       // dispatch(getInsights())
     }else{
       dispatch({
         type: UPDATE_PRICE_DATA_RET,
         payload:{
           success:false,
           message:'Something went wrong try again later'
         }
       })
     }
   }).catch(e=>{
     console.log(e)
     dispatch({
       type: UPDATE_PRICE_DATA_RET,
       payload:{
         success:false,
         message:'Something went wrong try again later'
       }
     })
   })
}

export const initiatePayment = (pData) => async dispatch => {
 //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY3OGQ5ZGUzNjY4YTI4MWVjZWUyYmQiLCJpYXQiOjE1ODA4MjM5ODZ9.r01FAXk1mEdnsi0aMsmTfHxRTNtthl9oIv0D9_4_0-o'
 // console.log(pData)
 let body = {
   'bookingStatus': 'Requested',
   'bookingId': pData._id
 }
 let token = localStorage.getItem('token');
 return new Promise(async function (resolve, reject) {
   await axios.patch(baseUrl+'/booking/redeem', body, { headers: { "Authorization": `Bearer ${token}` } })
     .then((res) => {
       //console.log('data', res.status)
       if (res.status === 200) {
         resolve(true)
       } else {
         reject(false)
       }
     })
     .catch((e) => {
       reject(false)
     })
 })
}
export const clr_get_notif = () => async dispatch => {
 return dispatch({
   type:CLEAR_GET_NOTIFICATION,
   payload:{}
 })
}


export const getNotifications = (data) => async dispatch => {
 //  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY3OGQ5ZGUzNjY4YTI4MWVjZWUyYmQiLCJpYXQiOjE1ODA4MjM5ODZ9.r01FAXk1mEdnsi0aMsmTfHxRTNtthl9oIv0D9_4_0-o'
 let token = localStorage.getItem('token');
 return await axios.get(baseUrl + `/notification/professional/0/${data.page}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res,"res in getNotifications")
     if (res.status === 200) {
       let notifications = res.data.data.notifications
       let unreadNotifications = notifications.filter((f) =>
         f.read === false
       )
       dispatch({
         type: GET_NOTIFICATIONS,
         payload: res.data.data
       })
       console.log(unreadNotifications.length, 'unread notifications')
       if (unreadNotifications.length === 0) {
         dispatch({
           type: UNREAD_LENGTH,
           payload: null
         })
       } else {
         dispatch({
           type: UNREAD_LENGTH,
           payload: unreadNotifications.length
         })
       }
       dispatch({
         type: UNREAD_NOTIFICATION,
         payload: unreadNotifications
       })
     }
   })
   .catch((e) => {
     console.log(e)
   })
}


export const sendCounterZero = (unreadData) => async dispatch => {
 //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY3OGQ5ZGUzNjY4YTI4MWVjZWUyYmQiLCJpYXQiOjE1ODA4MjM5ODZ9.r01FAXk1mEdnsi0aMsmTfHxRTNtthl9oIv0D9_4_0-o'
 let token = localStorage.getItem('token');
 return await axios.put(baseUrl + '/notification/', unreadData, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     if (res.status === 201) {
       dispatch({
         type: UNREAD_LENGTH,
         payload: null
       })
     }
   })
   .catch((e) => {
     console.log(e)

   })
}

export const getTimeslot = () => async dispatch => {
 // console.log('asdfasf')
 let token = localStorage.getItem('token');
 let userId = localStorage.getItem('userId')
 return await axios.get(baseUrl + '/user/' + userId + '/timeSlots', { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'data');
     if (res.status === 200) {   
       // console.log(res.data.field, 'data');
       let field = res.data.field;
       let array = []
       field.forEach((f) => {
         let obj = {
           slots: f.slots,
           day: f.day[0].toUpperCase(),
           closed: f.closed.toString()
         }
         array.push(obj)
       })
       dispatch({
         type: GET_TIMESLOT,
         payload: array
       })
     }
   })
   .catch((e) => {
     console.log(e)
   })
}

export const getUserDetails = () => async dispatch => {
 let token = localStorage.getItem('token')
 let userId = localStorage.getItem('userId')
 return await axios.get(`${baseUrl}/professional?professionalId=${userId}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then((res) => {
     console.log(res, 'data');
     if (res.status === 200) {
       //console.log(res);
       dispatch({
         type: NEW_USER,
         payload: res.data.data
       })
     }
   })
   .catch((e) => {
     console.log(e)
   })
}

 export const createUser = userData => dispatch => {
   fetch(baseUrl + '/user/register', {
     method: 'POST',
     headers: {
       'content-type': 'application/json'
     },
     body: JSON.stringify(userData)
     })
     .then(res => res.json())
     .then(res => {
       //console.log(res, 'dsa')
       if (res.success === true) {
         dispatch({
           type: NEW_USER,
           payload: res.user
         })
         localStorage.setItem('token', res.token)
         localStorage.setItem('userId', res.user._id)
         history.push('/dashboard');
       }
       if (!res.success) {
         alert('User is already registered')
         return res.message
       }
     })
     .catch((e) => {
       console.log(e);
     })

 };


 export const newUserClr = () => dispatch =>{
   return  dispatch({
     type: NEW_USER_CLR,
     payload:{}
   })
 }

export const createLogin = loginData => async dispatch => {
 let type = loginData.type
 delete loginData.type
//  let new_url = ""
//   switch (type) {
//     case 'admin':
//        new_url = baseUrl +'/admin/login'
//       break;
//     case 'center':
//      new_url = baseUrl +'/user/login'
//     break;
//     default:
      
//       break;
//   }
 return await axios.post(`${baseUrl}/professional/login`, loginData)
   .then(res => {
     console.log(res , 'res in create Login')
     console.log(res.status === 200)
     if(res.status === 200){
       if(!!(res.data.data.userType === "User")){
         dispatch({
           type : NEW_USER_RET,
           payload :{
             success:false,
             data:[],
             message:"Invalid Credentials"
           }
         })
        }else{
         dispatch({
           type: NEW_USER,
           payload: res.data.data
         })
         localStorage.setItem('token', res.data.token)
         localStorage.setItem('userId', res.data.data._id)
         history.push('/dashboard');
        }
     }
     else{
       dispatch({
         type : NEW_USER_RET,
         payload :{
           success:false,
           data:[],
           message:"Unable to Login"
         }
       })
     }
   }
   ).catch((e) => {
     console.log(e,"e in LOGIN_ERROR")
     dispatch({
       type : NEW_USER_RET,
       payload :{
         success:false,
         data:[],
         message:"Invalid Credentials"
       }
     })
   })

};

export const getBookingClr = () => dispatch =>{
 return  dispatch({
   type: GET_BOOKING_CLR,
   payload:{}
 })
}


export const getBooking = () => async  dispatch => {
 let token = localStorage.getItem('token');
 return await axios.get(baseUrl + '/booking', { 'headers': { 'Authorization': `Bearer ${token}` } })
   .then(res => {
     console.log(res,'res in getBooking')
     if (res.status === 200 ) {
       let bookings = res.data.data.bookings;
       let userId = localStorage.getItem('userId')
       let businessBooking = []
       console.log(bookings,"bookings beforefilter")
       bookings.filter((b) => userId === b.professionalId)
       bookings.forEach((b,i) => {
        let pos  = ""
        try {
          pos= b.solutionServiceId.split("|")[2]
        } catch (error) {
          console.log(error)
          pos = 0
        }
         
         let paidAmount = (Number(b.service.newPrice[pos]) - Number(b.creditsUsed)) * Number(b.paymentPercent) / 100;
         if(i===3){
          console.log(paidAmount,"PaidAmount")
         }
         let totalAmount = Number(b.service.newPrice[pos])
         let restAmount = (Number(b.service.newPrice[pos]) - Number(b.creditsUsed)) - paidAmount

         console.log(paidAmount, totalAmount, restAmount,"============>>>>>>>>>========")
         let bookDet = {
           '_id': b._id,
           'userName': b.userName,
           'userAddress':b.userAddress,
           'bookingStatus': b.bookingStatus,
           'appointmentTime': b.appointmentTime,
           'serviceName': b.serviceName,
           'paidAmount': paidAmount,
           'restAmount': restAmount,
           'creditsUsed': b.creditsUsed,
           'bookingId': b.referenceId,
           'redeemStatus': b.redeemStatus || null,
           'professionalAddress':b.professionalAddress,
           'userImageUrl':b.userImageUrl,
           'professionalImageUrl':b.professionalImageUrl,
           'doctorConfirmation':b.doctorConfirmation,
           'userMobileNumber':b.userMobileNumber,
           'paymentProgress':b.paymentProgress,
           'centerLocation':b.centerLocation,
           totalAmount:b.totalAmount,
           paidBookingAmount:b.paidBookingAmount,
           haveInsurance:b.haveInsurance,
           insuranceDetails:b.insuranceDetails
         }
         businessBooking.push(bookDet)
       })
       console.log(businessBooking,"business booking")
       dispatch({
         type : GET_BOOKING_RET,
         payload :{
           success:true,
           data:businessBooking,
           message:"Bookings successfully retrieved"
         }
       })
     }else{
       dispatch({
         type : GET_BOOKING_RET,
         payload :{
           success:false,
           data:[],
           message:"Something went wrong. try again later"
         }
       })
     }
   }).catch(e=>{
     console.log(e)
     dispatch({
       type : GET_BOOKING_RET,
       payload :{
         success:false,
         data:[],
         message:"Something went wrong. try again later"
       }
     })
   })


};

export const submitBankDetailsClr = () => dispatch =>{
 dispatch({
   type:SUBMIT_BANK_DETAILS_CLR,
   payload:{}
 })
}
export const bankDetails = bankData => dispatch => {
 let token = localStorage.getItem('token');
 var body = {
   "bankDetails": bankData
 };
 fetch(baseUrl + '/user', {
   method: 'PUT',
   headers: {
     'content-type': 'application/json',
     'Authorization': `Bearer ${token}`
   },
   body: JSON.stringify(body)
 })
   .then(res => res.json())
   .then(res => {
     console.log(res,"res in submitbank details")
     if (res.success === true) {
       dispatch({
         type:SUBMIT_BANK_DETAILS_RET,
         payload:{
           success:true,
           message:"Bank details successfully updated"
         }
       })
     }else{
       dispatch({
         type:SUBMIT_BANK_DETAILS_RET,
         payload:{
           success:false,
           message:"Unable to process your request. try again later"
         }
       })
     }
   })
   .catch((e) => {
     console.log(e)
   })
};

export const getInsights = (data) => async dispatch => {
 console.log(data,"data in getInsight")
 let token = localStorage.getItem('token');
 return await axios.get(baseUrl + `/analytics/actionableInsight${!!data?'?userId='+data.center:''}`, { 'headers': { 'Authorization': `Bearer ${token}` } })
 .then(res => {
   console.log(res , 'res in getInsights')
   if (res.status=== 200) {
     dispatch({
       type: GET_INSIGHTS,
       payload: {
         data:res.data.data,
         success:true
       },
     })
   }else{
     dispatch({
       type: GET_INSIGHTS,
       payload: {
         data:[],
         success:false,
         message:"Unable to get actionable insights, try again later"
       },
     })
   }
 }
 ).catch((e) => {
   console.log(e)
   try{
     dispatch({
       type: GET_INSIGHTS,
       payload: {
         data:[],
         success:false,
         message:e.response.data.error
       },
     })
   }catch(x){
       console.log(x)
       dispatch({
         type: GET_INSIGHTS,
         payload: {
           success:false,
           data:{},
           message:"Unable to get actionable insights, try again later"
         }
       })
   }  
 })
}
export const expertDetails = expertData => dispatch => {
 let token = localStorage.getItem('token');
 let array = []
 array.push(expertData)
 let body = {
   "doctors": array
 }
 fetch(baseUrl + '/user', {
   method: 'PUT',
   headers: {
     'content-type': 'application/json',
     'Authorization': `Bearer ${token}`
   },
   body: JSON.stringify(body)
 })
   .then(res => res.json())
   .then(res => {
     //console.log(res.success, 'dog');
     if (res.success === true) {
       dispatch(getUserDetails())
     }
   }
   )
   .catch((e) => {
       console.log(e)
   })

};


export const logout = () => dispatch => {
 let token = localStorage.getItem('token');
 console.log(token, 'token')
 axios.post(baseUrl + '/professional/logout', {
   deviceId:localStorage.getItem('deviceId')
 }, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } })
   .then((response) => {
     localStorage.removeItem('token')
     localStorage.removeItem('userId')
     history.push('/signin')
     window.location.reload()
     window.onpopstate = (url) => {
       console.log(url)
       let token = localStorage.getItem('token');
       if (!token) {
         history.push('/signin')
       }
     }
   })
   .catch(error => {
     localStorage.removeItem('token')
     localStorage.removeItem('userId')
     history.push('/signin')
     window.location.reload()
     window.onpopstate = (url) => {
       console.log(url)
       let token = localStorage.getItem('token');
       if (!token) {
         history.push('/signin')
       }
     }
     console.log(error, 'error')
   })
}