/**
 * Arquivo responsável por implementar as actions do reducer
 */
import { 
  LOGIN_USER, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_ERROR,
  LOGOUT_USER, 
  LOGOUT_USER_SUCCESS,
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

/**
 * Action responsável por executar o login do usuário
 * @param {*} user usuário a ser logado
 * @param {*} history objeto que controla o histórico de navegação
 */
export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

/**
 * Action responsável por sinalizar que o login foi realizado com sucesso
 * @param {*} user informações do usuário
 * @param {*} token token de segurança gerado na autenticação
 */
export const loginUserSuccess = (user, token) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: { user, token }
  };
};

/**
 * Action responsável por sinalizar que o login não foi realizado com sucesso
 */
export const loginUserError = () => {
  return {
    type: LOGIN_USER_ERROR
  };
};

/**
 * Action responsável por executar a recuperação de senha do usuário
 * @param {*} user usuário a ser verificado
 */
export const recoveryUserPassword = (user) => {
  return {
    type: RECOVERY_USER_PASSWORD,
    payload: { user },
  };
};

/**
 * Action responsável por sinalizar que a senha do usuário foi recuperada
 * @param {*} user usuário que foi recuperado
 */
export const recoveryUserPasswordSuccess = (user) => {
  return {
    type: RECOVERY_USER_PASSWORD_SUCCESS,
    payload: user,
  };
};

/**
 * Action responsável por sinalizar que a senha do usuário não foi recuperada
 */
export const recoveryUserPasswordError = () => {
  return {
    type: RECOVERY_USER_PASSWORD_ERROR
  };
};

/**
 * Action responsável por sinalizar o logout do usuário foi realizado
 */
export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

/**
 * Action responsável por executar o logout do usuário
 * @param {*} history objeto que controla o histórico de navegação
 */
export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

/**
 * Action responsável por executar o cadastro de um novo usuário
 * @param {*} user usuário a ser cadastrado
 * @param {*} history objeto que controla o histórico de navegação
 */
export const addNewUser = (user, history) => ({
  type: ADD_NEW_USER,
  payload: { user, history },
});

/**
 * Action responsável por sinalizar o cadastro do usuário foi realizado com sucesso
 * @param {*} user usuário cadastrado
 */
export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

/**
 * Action responsável por inalizar o cadastro do usuário não foi realizado com sucesso
 */
export const addUserFail = () => ({
  type: ADD_USER_FAIL
});

/**
 * Action responsável por executar a alteração do cadastro de um usuário
 * @param {*} user usuário a ser alterado
 * @param {*} token token de segurança gerado na autenticação
 */
export const updateUser = (user, token) => ({
  type: UPDATE_USER,
  payload: { user, token },
});

/**
 * Action responsável por sinalizar o cadastro do usuário foi alterado com sucesso
 * @param {*} user usuário que foi alterado
 */
export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

/**
 * Action responsável por sinalizar o cadastro do usuário não foi alterado com sucesso
 */
export const updateUserFail = () => ({
  type: UPDATE_USER_FAIL
});

/**
 * Action responsável por selecionar um usuário
 * @param {*} user usuário a ser selecionado
 */
export const selectUser = (user) => ({
  type: SELECT_USER,
  payload: user
});