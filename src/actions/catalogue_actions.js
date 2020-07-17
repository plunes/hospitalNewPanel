import { GET_USER_SERVICES, GET_USER_SERVICES_RET, GET_USER_SERVICES_ERROR,
   UPDATE_PARAMS, GET_PROCEDURES, RET_PROCEDURES,
    GET_PROCEDURES_ERROR, CLR_PROCEDURES, UPDATE_MODIFIED_PROCEDURES } from "./types"


export const update_modified_procedures = (data) => dispatch =>{
  return  dispatch({
    type: UPDATE_MODIFIED_PROCEDURES,
    payload:data
  })
}

export const get_user_services = (data) => dispatch =>{
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

  export const get_procedures = (data) => dispatch =>{
      return  dispatch({
        type: GET_PROCEDURES,
        payload:data
      })
    }

    export const get_procedures_error = (data) => dispatch =>{
        return  dispatch({
          type: GET_PROCEDURES_ERROR,
          payload:data
        })
      }
  


  export const ret_procedures = (data) => dispatch =>{
      return  dispatch({
        type: RET_PROCEDURES,
        payload:data
      })
    }


  export const clr_procedures = (data) => dispatch =>{
    return  dispatch({
      type: CLR_PROCEDURES,
      payload:data
    })
  }

  export const update_params = (data) => dispatch =>{
    return  dispatch({
      type: UPDATE_PARAMS,
      payload:data
    })
  }