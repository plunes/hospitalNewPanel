import { GET_ACT_INSIGHT, GET_ACT_INSIGHT_RET,
   GET_ACT_INSIGHT_LOADING, GET_REAL_INSIGHT, GET_REAL_INSIGHT_RET, GET_REAL_INSIGHT_LOADING, 
   DELETE_PROFILE, DELETE_PROFILE_RET, DELETE_PROFILE_LOADING, DO_NOT_NOTIFY_LOADING,
   DO_NOT_NOTIFY_RET, DO_NOT_NOTIFY, GET_INSIGHT_INFO, GET_INSIGHT_INFO_LOADING, GET_INSIGHT_INFO_RET,
   UPDATE_INSIGHT, UPDATE_INSIGHT_RET, UPDATE_INSIGHT_LOADING } from "./types"

   export const update_insight = (data) => dispatch =>{
    return  dispatch({
      type: UPDATE_INSIGHT,
      payload:data
    })
  }

  export const update_insight_ret = (data) => dispatch =>{
    return  dispatch({
      type: UPDATE_INSIGHT_RET,
      payload:data
    })
  }

  export const update_insight_loading = (data) => dispatch =>{
    return  dispatch({
      type: UPDATE_INSIGHT_LOADING,
      payload:data
    })
  }


   export const get_insight_info = (data) => dispatch =>{
    return  dispatch({
      type: GET_INSIGHT_INFO,
      payload:data
    })
  }

  export const get_insight_info_ret = (data) => dispatch =>{
    return  dispatch({
      type: GET_INSIGHT_INFO_RET,
      payload:data
    })
  }

  export const get_insight_info_loading = (data) => dispatch =>{
    return  dispatch({
      type: GET_INSIGHT_INFO_LOADING,
      payload:data
    })
  }

   export const do_not_notify = (data) => dispatch =>{
    return  dispatch({
      type: DO_NOT_NOTIFY,
      payload:data
    })
  }

  export const do_not_notify_ret = (data) => dispatch =>{
    return  dispatch({
      type: DO_NOT_NOTIFY_RET,
      payload:data
    })
  }

  export const do_not_notify_loading = (data) => dispatch =>{
    return  dispatch({
      type: DO_NOT_NOTIFY_LOADING,
      payload:data
    })
  }


export const delete_profile = (data) => dispatch =>{
    return  dispatch({
      type: DELETE_PROFILE,
      payload:data
    })
  }
  
  export const delete_profile_ret = (data) => dispatch =>{
    return  dispatch({
      type: DELETE_PROFILE_RET,
      payload:data
    })
  }
  export const delete_profile_loading = (data) => dispatch =>{
    return  dispatch({
      type: DELETE_PROFILE_LOADING,
      payload:data
    })
  }

export const get_act_insight = (data) => dispatch =>{
  console.log("get_real_insight conosleo")
    return  dispatch({
      type: GET_ACT_INSIGHT,
      payload:data
    })
  }
  
  export const get_act_insight_ret = (data) => dispatch =>{
    return  dispatch({
      type: GET_ACT_INSIGHT_RET,
      payload:data
    })
  }
  export const get_act_insight_loading = (data) => dispatch =>{
    return  dispatch({
      type: GET_ACT_INSIGHT_LOADING,
      payload:data
    })
  }

  export const get_real_insight = (data) => dispatch =>{
    return  dispatch({
      type: GET_REAL_INSIGHT,
      payload:data
    })
  }

  export const get_real_insight_ret = (data) => dispatch =>{
    return  dispatch({
      type: GET_REAL_INSIGHT_RET,
      payload:data
    })
  }

  export const get_real_insight_loading = (data) => dispatch =>{
    return  dispatch({
      type: GET_REAL_INSIGHT_LOADING,
      payload:data
    })
  }