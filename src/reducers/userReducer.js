
import { NEW_USER, GET_BOOKING, GET_INSIGHTS, GET_NOTIFICATIONS, GET_TIMESLOT,
   UNREAD_LENGTH, UNREAD_NOTIFICATION, GET_SOL_INSIGHTS, BUSINESS_EARN, 
   BUSINESS_LOST, SOLUTION_USERS, GET_CATALOGUE, CLEAR_SUBMIT_PROFILE_RET,
   SUBMIT_PROFILE_RET, RESET_PASS_RET, CLR_RESET_PASS,
   LOGOUT_DEVICES_RET,
   LOGOUT_DEVICES,
   LOGOUT_DEVICES_CLR,
   UPLOAD,
   UPLOAD_RET,
   UPLOAD_RET_CLR,
   UPDATE_IMAGE,
   UPDATE_IMAGE_RET,
   UPDATE_IMAGE_CLR,

   //UPLOAD PROCEDURE
   UPLOAD_PROCEDURE,
   UPLOAD_PROCEDURE_RET,
   UPLOAD_PROCEDURE_CLR,

   //DOWNLOAD CATALOGUE
   DOWNLOAD_CATALOGUE,
   DOWNLOAD_CATALOGUE_RET,
   DOWNLOAD_CATALOGUE_CLR
  
  } from '../actions/types';
import { uploadProcedure } from '../actions/userActions';

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
  submitProfileRet:false,
  resetPassRet:false,
  
  logoutDevicesRet:false,
  logoutDevices:false,
  logoutDevicesLoading:false,

  upload:false,
  uploadRet:false,
  uploadLoading:false,

  updateImage:false,
  updateImageRet:false,
  updateImageLoading:false,

  uploadProcedures:false,
  uploadProceduresRet:false,
  uploadProceduresLoading:false,

  downloadCatalogue:false,
  downloadCatalogueRet:false,
  downloadCatalogueClr:false
};

export default function (state = initialState, action) {
  switch (action.type) {

  case DOWNLOAD_CATALOGUE:
    return {
      ...state,
      downloadCatalogue: action.payload,
      downloadCatalogueLoading:true
    };

    case DOWNLOAD_CATALOGUE_RET:
    return {
      ...state,
      downloadCatalogueRet: action.payload,
      downloadCatalogueLoading:false
    };

    case DOWNLOAD_CATALOGUE_CLR:
      return {
        ...state,
        downloadCatalogueRet: false,
        downloadCatalogueLoading:false
      };

    case UPLOAD_PROCEDURE:
      return {
        ...state,
        uploadProcedures: action.payload,
        uploadProceduresLoading:true
      };

      case UPLOAD_PROCEDURE_RET:
      return {
        ...state,
        uploadProceduresRet: action.payload,
        uploadProceduresLoading:false
      };

      case UPLOAD_PROCEDURE_CLR:
        return {
          ...state,
          uploadProceduresRet: false,
          uploadProceduresLoading:false
        };

    case UPDATE_IMAGE:
      return {
        ...state,
        updateImage: action.payload,
        updateImageLoading:true
      };

      case UPDATE_IMAGE_RET:
      return {
        ...state,
        updateImageRet: action.payload,
        updateImageLoading:false
      };

      case UPDATE_IMAGE_CLR:
        return {
          ...state,
          updateImageRet: false,
          updateImageLoading:false
        };

    case UPLOAD:
      return {
        ...state,
        upload: action.payload,
        uploadLoading:true
      };

      case UPLOAD_RET:
      return {
        ...state,
        uploadRet: action.payload,
        uploadLoading:false
      };

      case UPLOAD_RET_CLR:
        return {
          ...state,
          uploadRet: false,
          uploadLoading:false
        };


    case LOGOUT_DEVICES:
      return {
        ...state,
        logoutDevices: action.payload,
        logoutDevicesLoading:true
      };

      case LOGOUT_DEVICES_RET:
      return {
        ...state,
        logoutDevicesRet: action.payload,
        logoutDevicesLoading:false
      };

      case LOGOUT_DEVICES_CLR:
        return {
          ...state,
          logoutDevicesRet: false,
          logoutDevicesLoading:false
        };


    case RESET_PASS_RET:
      return {
        ...state,
        resetPassRet: action.payload
      };

      case CLR_RESET_PASS:
      return {
        ...state,
        resetPassRet: false
      };

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