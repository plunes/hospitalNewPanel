
import { NEW_USER, GET_BOOKING, GET_INSIGHTS, GET_NOTIFICATIONS, GET_TIMESLOT,
   UNREAD_LENGTH, UNREAD_NOTIFICATION, GET_SOL_INSIGHTS, BUSINESS_EARN, 
   BUSINESS_LOST, SOLUTION_USERS, GET_CATALOGUE, CLEAR_SUBMIT_PROFILE_RET,
   SUBMIT_PROFILE_RET} from '../actions/types';

const initialState = {
  userDetail: {},
  insightData: [],
  bookingData: [],
  notificationData: [],
  timeSlot: [],
  unreadCounter: null,
  unreadNotification: [],
  solInsights: [],
  businessEarn: null,
  businessLost: null,
  solutionUsers: [],
  catalogues:[],
  submitProfileRet:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PROFILE_RET:
      return {
        ...state,
        submitProfileRet: action.payload
      };

    case CLEAR_SUBMIT_PROFILE_RET:
      return {
        ...state,
        submitProfileRet: false
      };

    case NEW_USER:
      return {
        ...state,
        userDetail: action.payload
      };
    case GET_BOOKING:
      return {
        ...state,
        bookingData: action.payload
      };
    case GET_INSIGHTS:
      return {
        ...state,
        insightData: action.payload
      }
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notificationData: action.payload
      }
    case GET_TIMESLOT:
      return {
        ...state,
        timeSlot: action.payload
      }
    case UNREAD_LENGTH:
      return {
        ...state,
        unreadCounter: action.payload
      }
    case UNREAD_NOTIFICATION:
      return {
        ...state,
        unreadNotification: action.payload
      }
    case GET_SOL_INSIGHTS:
      return {
        ...state,
        solInsights: action.payload
      }
    case BUSINESS_EARN:
      return {
        ...state,
        businessEarn: action.payload
      }
    case BUSINESS_LOST:
      return {
        ...state,
        businessLost: action.payload
      }
      case SOLUTION_USERS:
        return {
          ...state,
          solutionUsers: action.payload
        }
        case GET_CATALOGUE:
        return {
          ...state,
          catalogues: action.payload
        }   
    default:
      return state;
  }
}