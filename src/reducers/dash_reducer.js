import { GET_ACT_INSIGHT, GET_ACT_INSIGHT_RET, GET_ACT_INSIGHT_LOADING, 
    GET_REAL_INSIGHT, GET_REAL_INSIGHT_RET, GET_REAL_INSIGHT_LOADING, DELETE_PROFILE,
    DELETE_PROFILE_LOADING, DELETE_PROFILE_RET, DO_NOT_NOTIFY_LOADING, DO_NOT_NOTIFY_RET, DO_NOT_NOTIFY
    
} from '../actions/types';
import { get_url_params } from "../utils/common_utilities"

const cat_init_state  = {

    get_act_insight:false,
    get_act_insight_ret:false,
    get_act_insight_loading:true,

    get_real_insight:false,
    get_real_insight_ret:false,
    get_real_insight_loading:true,

    delete_profile:false,
    delete_profile_ret:false,
    delete_profile_loading:false,

    do_not_notify:false,
    do_not_notify_ret:false,
    do_not_notify_loading:false
}

export default function (state = cat_init_state, action) {
switch (action.type) {

    case DO_NOT_NOTIFY:
        return {
            
            ...state,
            do_not_notify:action.payload,
            do_not_notify_loading:true
        }
    case DO_NOT_NOTIFY_RET:

        return {
            ...state,
            do_not_notify_ret:action.payload,
            do_not_notify_loading:true
        }

    case DO_NOT_NOTIFY_LOADING:

        return {
            ...state,
            do_not_notify_ret:false,
            do_not_notify_loading:false
        }


    case DELETE_PROFILE:
        return {
            ...state,
            delete_profile:action.payload,
            delete_profile_loading:true
        }
    case DELETE_PROFILE_RET:
        return {
            ...state,
            delete_profile_ret:action.payload,
         //    get_act_insight_loading:false
        }
    case DELETE_PROFILE_LOADING:
        return {
            ...state,
            delete_profile_ret:false,
            delete_profile_loading:false
        }
 

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