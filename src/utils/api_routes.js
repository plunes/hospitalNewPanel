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
            .catch(err => err.response)
    }
}
