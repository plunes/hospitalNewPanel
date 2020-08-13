import {  CHANGE_ADDRESS, CHANGE_ADDRESS_RET, CHANGE_ADDRESS_LOADING  } from "./types"
 
 
 export const change_address = (data) => dispatch =>{
     return  dispatch({
       type: CHANGE_ADDRESS,
       payload:data
     })
}
export const change_address_ret = (data) => dispatch =>{
    return  dispatch({
      type: CHANGE_ADDRESS_RET,
      payload:data
    })
}
export const change_address_loading = (data) => dispatch =>{
    return  dispatch({
      type: CHANGE_ADDRESS_LOADING,
      payload:data
    })
}
  
  