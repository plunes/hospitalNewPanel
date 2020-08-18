import { 
  GET_USER_SERVICES, GET_USER_SERVICES_RET, GET_USER_SERVICES_ERROR,
  UPDATE_PARAMS, GET_PROCEDURES, RET_PROCEDURES,
  GET_PROCEDURES_ERROR, CLR_PROCEDURES, UPDATE_MODIFIED_PROCEDURES,
  UPDATE_ADD_PARAMS, GET_ADD_PROCEDURES, RET_ADD_PROCEDURES,
  GET_ADD_PROCEDURES_ERROR, CLR_ADD_PROCEDURES, UPDATE_ADD_MODIFIED_PROCEDURES,
  SEARCH_ADD_PROCEDURE_LOADING, SEARCH_ADD_PROCEDURE_RET, SEARCH_ADD_PROCEDURE,
  TO_ADD_SERVICES, TO_ADD_SERVICES_RET, TO_ADD_SERVICES_CLR,
  SET_VARIANCE_LOADING, SET_VARIANCE_RET, SET_VARIANCE,

  GET_USER_SPECIALITIES, GET_USER_SPECIALITIES_RET, GET_USER_SPECIALITIES_LOADING,

  REMOVE_SPECIALITY, REMOVE_SPECIALITY_RET, REMOVE_SPECIALITY_LOADING,
  REMOVE_SERVICE, REMOVE_SERVICE_RET, REMOVE_SERVICE_LOADING

} from "./types"

export const remove_service = (data) => dispatch =>{
  return  dispatch({
    type: REMOVE_SERVICE,
    payload:data
  })
}

export const remove_service_ret = (data) => dispatch =>{
  return  dispatch({
    type: REMOVE_SERVICE_RET,
    payload:data
  })
}

export const remove_service_loading = (data) => dispatch =>{
  return  dispatch({
    type: REMOVE_SERVICE_LOADING,
    payload:data
  })
}


export const remove_speciality = (data) => dispatch =>{
  return  dispatch({
    type: REMOVE_SPECIALITY,
    payload:data
  })
}

export const remove_speciality_ret = (data) => dispatch =>{
  return  dispatch({
    type: REMOVE_SPECIALITY_RET,
    payload:data
  })
}
export const remove_speciality_loading = (data) => dispatch =>{
  return  dispatch({
    type: REMOVE_SPECIALITY_LOADING,
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


export const set_variance = (data) => dispatch =>{
  return  dispatch({
    type: SET_VARIANCE,
    payload:data
  })
}

export const set_variance_ret = (data) => dispatch =>{
  return  dispatch({
    type: SET_VARIANCE_RET,
    payload:data
  })
}
export const set_variance_loading = (data) => dispatch =>{
  console.log("SET_VARIANCE LOADING ACTION")
  return  dispatch({
    type: SET_VARIANCE_LOADING,
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


  export const update_modified_procedures = (data) => dispatch =>{
    return  dispatch({
      type: UPDATE_MODIFIED_PROCEDURES,
      payload:data
    })
  }



  export const get_add_procedures = (data) => dispatch =>{
    return  dispatch({
      type: GET_ADD_PROCEDURES,
      payload:data
    })
  }

  export const get_add_procedures_error = (data) => dispatch =>{
      return  dispatch({
        type: GET_ADD_PROCEDURES_ERROR,
        payload:data
      })
    }



export const ret_add_procedures = (data) => dispatch =>{
    return  dispatch({
      type: RET_ADD_PROCEDURES,
      payload:data
    })
  }


export const clr_add_procedures = (data) => dispatch =>{
  return  dispatch({
    type: CLR_ADD_PROCEDURES,
    payload:data
  })
}

export const update_add_params = (data) => dispatch =>{
  return  dispatch({
    type: UPDATE_ADD_PARAMS,
    payload:data
  })
}


export const update_add_modified_procedures = (data) => dispatch =>{
  return  dispatch({
    type: UPDATE_ADD_MODIFIED_PROCEDURES,
    payload:data
  })
}

export const search_add_procedures = (data) => dispatch =>{
  return  dispatch({
    type: SEARCH_ADD_PROCEDURE,
    payload:data
  })
}

export const search_add_procedures_ret = (data) => dispatch =>{
  return  dispatch({
    type: SEARCH_ADD_PROCEDURE_RET,
    payload:data
  })
}


export const search_add_procedures_loading = (data) => dispatch =>{
  return  dispatch({
    type: SEARCH_ADD_PROCEDURE_LOADING,
    payload:data
  })
}

export const to_add_services = (data) => dispatch =>{
  return  dispatch({
    type: TO_ADD_SERVICES,
    payload:data
  })
}

export const to_add_services_ret = (data) => dispatch =>{
  return  dispatch({
    type: TO_ADD_SERVICES_RET,
    payload:data
  })
}

export const to_add_services_clr = (data) => dispatch =>{
  return  dispatch({
    type: TO_ADD_SERVICES_CLR,
    payload:data
  })
}