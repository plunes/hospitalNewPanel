import { GET_USER_SERVICES, GET_USER_SERVICES_RET, GET_USER_SERVICES_ERROR } from "./types"

export const get_user_services = (data) => dispatch =>{
  console.log("get_real_insight conosleo")
    return  dispatch({
      type: GET_USER_SERVICES,
      payload:data
    })
  }
  
  export const get_user_services_ret = (data) => dispatch =>{
    return  dispatch({
      type: GET_USER_SERVICES_RET,
      payload:data
    })
  }
  export const get_user_services_error = (data) => dispatch =>{
    return  dispatch({
      type: GET_USER_SERVICES_ERROR,
      payload:data
    })
  }