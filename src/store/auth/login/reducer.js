import { 
  LOGIN_USER, 
  LOGIN_USER_SUCCESS, 
  LOGOUT_USER, 
  LOGOUT_USER_SUCCESS, 
  LOGIN_USER_ERROR,
  RECOVERY_USER_PASSWORD,
  RECOVERY_USER_PASSWORD_SUCCESS,
  RECOVERY_USER_PASSWORD_ERROR,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  SELECT_USER
} from './actionTypes';

const INITIAL_STATE = {
  user: null,
  token: ''
};

/**
 * Função que configura o estado da aplicação do módulo de login sempre que uma action é executada
 * @param {*} state estado atual da aplicação
 * @param {*} action action que foi executada
 * @returns o novo estado da aplicação
 */
const loginReducer = (state = INITIAL_STATE, action) => {
  //nas linhas abaixo o estado da aplicação é atualizado dependendo da action que foi executada
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        user: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        token: '',
        user: null
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: null
      };
    case RECOVERY_USER_PASSWORD:
      return {
        ...state,
        user: null,
      };
    case RECOVERY_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case RECOVERY_USER_PASSWORD_ERROR:
      return {
        ...state,
        user: null,
      };
    
    case ADD_NEW_USER:
      return {
        ...state,
        user: null
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case ADD_USER_FAIL:
      return {
        ...state,
        user: null
      };

    case UPDATE_USER:
      return {
        ...state
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
      };
    
    case SELECT_USER:
      return {
        ...state,
        user: action.payload
      };
      
    default:
      break;
  }
  return state;
};

export default loginReducer;
