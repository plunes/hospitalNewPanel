import { GET_ACT_INSIGHT, GET_ACT_INSIGHT_RET, GET_ACT_INSIGHT_LOADING, GET_REAL_INSIGHT, GET_REAL_INSIGHT_RET, GET_REAL_INSIGHT_LOADING   } from '../actions/types';
import { get_url_params } from "../utils/common_utilities"

const cat_init_state  = {

    get_act_insight:false,
    get_act_insight_ret:false,
    get_act_insight_loading:true,

    get_real_insight:false,
    get_real_insight_ret:false,
    get_real_insight_loading:true
}

export default function (state = cat_init_state, action) {
switch (action.type) {

   case GET_ACT_INSIGHT:
       return {
           ...state,
           get_act_insight:action.payload,
           get_act_insight_loading:true
       }
   case GET_ACT_INSIGHT_RET:
       return {
           ...state,
           get_act_insight_ret:action.payload,
        //    get_act_insight_loading:false
       }
   case GET_ACT_INSIGHT_LOADING:
       return {
           ...state,
           get_act_insight_ret:false,
           get_act_insight_loading:false
       }


   case GET_REAL_INSIGHT:
        return {
            ...state,
            get_real_insight:action.payload,
            get_real_insight_loading:true
        }
    case GET_REAL_INSIGHT_RET:
        return {
            ...state,
            get_real_insight_ret:action.payload,
            // get_real_insight_loading:false
        }
    case GET_REAL_INSIGHT_LOADING:
        return {
            ...state,
            get_real_insight_ret:false,
            get_real_insight_loading:false
        }
 
       default:
           return state;
}
}