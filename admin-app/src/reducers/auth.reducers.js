import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstname: "",
    lastname: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  message: "",
  error: null,
};

const authReducers = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        loading:false,
        error:action.payload.error
      };
      break;
    default:
      break;
  }

  return state;
};

export default authReducers;
