import axios from 'axios';
import { get_url_params } from '../utils/common_utilities';
// import { connect } from 'react-redux';



let base_url = "https://devapi.plunes.com/v5"
let base_url_without_v5 = "https://devapi.plunes.com"

const pathLocation = window.location.host;
if(!!pathLocation) {
  console.log('pathLocation : ', pathLocation);
  if(pathLocation === 'analytics.plunes.com') {
    console.log('PROD');
    // Production baseUrl
    base_url = 'https://api.plunes.com/v5'
    base_url_without_v5 = 'https://api.plunes.com'
  }else{
    base_url = "https://devapi.plunes.com/v5"
    base_url_without_v5 ="https://devapi.plunes.com"
    // BaseUrl = 'http://10.5.48.232:3000/api/v1/'
  }
}
let center_id = get_url_params('center')

export default {
    catalogue_routes:{
        get_user_specialities: (data, headers) =>
        axios
            .get(`${base_url}/user/getUserSpecialities${!!center_id?'?userId='+center_id:''}`, headers)
            .then(res => {
                 console.log(res,'res in get_user_specialities')
                 return res
            })
            .catch(err => err.response),
        update_procedures: (data, headers) =>
        axios
            .patch(`${base_url}/analytics/cataloguePriceUpdate${!!center_id?'?userId='+center_id:''}`, data, headers)
            .then(res => {
                  console.log(res,'res in update_procedure')
                  return res
            })
            .catch(err => err.response),
       add_procedure: (data, headers) =>
       axios
           .put(`${base_url}/user/addServices${!!center_id?'?userId='+center_id:''}`, data, headers)
           .then(res => {
                 console.log(res,'res in add_procedure')
                 return res
           })
           .catch(err => err.response),
      search_procedures: (data, headers) =>
      axios
          .post(`${base_url}/analytics/getServices${!!center_id?'?userId='+center_id:''}`, data, headers)
          .then(res => {
                console.log(res,'res in add_procedure')
                return res
          })
          .catch(err => err.response),
    },


    dash_routes:{
      get_act_insight: (data, headers) =>
      axios
          .get(`${base_url}/analytics/actionableInsight${!!center_id?'?userId='+center_id:''}`, headers)
          .then(res => {
               console.log(res,'res actionableInsight')
               return res
          })
          .catch(err => err.response),
      get_real_insight: (data, headers) =>
       {
         console.log(headers,"headers in get_real_insight")
         return    axios
         .get(`${base_url}/analytics/solutionSearch${!!center_id?'?userId='+center_id:''}`, headers)
         .then(res => {
               console.log(res,'res in update_procedure')
               return res
         })
         .catch(err => err.response)
       }
  }
}