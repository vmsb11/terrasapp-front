/**
 * Arquivo onde estão implementadas as funções através do redux-saga que executam funções assíncronas como as requisições a API
 */
import { takeEvery, put } from 'redux-saga/effects';
import { post, put as put2, getRequestErrorMessage } from '../../../helpers/api_helper';
import { 
  LOGIN_USER, 
  LOGOUT_USER, 
  RECOVERY_USER_PASSWORD, 
  ADD_NEW_USER, 
  UPDATE_USER
} from './actionTypes';
import { 
  loginUserSuccess, 
  loginUserError,
  logoutUserSuccess,
  recoveryUserPasswordSuccess,
  recoveryUserPasswordError, 
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  showLoadingModal, 
  hideLoadingModal, 
  showErrorAlert,
  showSuccessAlert 
} from '../../actions';

/**
 * Função que realiza o login do usuário
 * @param {*} payload informações do usuário
 */
function* loginUser({ payload: { user, history } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield post(`/users/login`, {
    login: user.login,
    password: user.password,
  });
  
  //se obteve uma resposta válida
  if(response) {

    //obtém o usuário logado e o token utilizado para acessar API nas demais requisições
    const { user, token } = response.data;
    
    //salva na memória os dados do usuário logado
    localStorage.setItem('authUser', user);

    //invoca a action sinalizando que o login foi bem sucedido
    yield put(loginUserSuccess(user, token));
  
    //redireciona a página
    history.push('/');
  }
  //em caso de erro
  else {
    
    //exibe a mensagem de erro ao usuário
    let errorMessage = getRequestErrorMessage(error);
    
    yield put(loginUserError());
    yield put(showErrorAlert(errorMessage, 'Login'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que realiza o logout do usuário
 */
function* logoutUser({ payload: { history } }) {
  
  try {
 
    //remove da memória as informações do usuário
    localStorage.removeItem('authUser');
    yield put(logoutUserSuccess());
    //redireciona para a página de login
    history.push('/login');
  } 
  catch (error) {
    
    yield put(loginUserError(error));
  }
}

/**
 * Função que recupera a senha do usuário
 * @param {*} payload informações do usuário
 */
function* recoveryUserPassword({ payload: { user } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  const { mail } = user;
  //realiza a requisição a API
  const { response, error } = yield post(`/users/recovery`, {
    mail: mail,
  });
  
  //se obteve uma resposta válida
  if(response) {

    //sinaliza que a recuperação de senha foi realizada
    yield put(recoveryUserPasswordSuccess(response.data));
    yield put(showSuccessAlert(`A sua senha foi enviada para o email ${mail}`, 'Recuperação de senha'));
  }
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    let errorMessage = getRequestErrorMessage(error);
    
    yield put(recoveryUserPasswordError());
    yield put(showErrorAlert(errorMessage, 'Recuperação de senha'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que cadastra um novo usuário
 * @param {*} payload informações do usuário a ser cadastrado
 */
function* onAddNewUser({ payload: { user, history } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield post(`/users`, user);

  //se obteve uma resposta válida
  if (response) {

    //sinaliza que o cadastro foi realizado
    yield put(showSuccessAlert('O seu cadastro foi realizado com sucesso, faça seu login', 'Terras App - Vendas'));
    yield put(addUserSuccess(response.data));
    history.push('/login');

  }
  //em caso de erro 
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    
    yield put(addUserFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que altera o cadastro do usuário
 * @param {*} payload informações do usuário a ser alterado
 */
function* onUpdateUser({ payload: { user, token } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  const { userId } = user;
  //realiza a requisição a API
  const { response, error } = yield put2(`/users/${userId}`, user, { headers: { Authorization: `Bearer ${token}` }});

  //se obteve uma resposta válida
  if (response) {

    //sinaliza que o cadastro foi alterado
    yield put(showSuccessAlert('O seu cadastro foi atualizado com sucesso', 'Terras App - Vendas'));
    yield put(updateUserSuccess(response.data));
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(updateUserFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que configura o redux-saga associando para cada action criada a função responsável por executar de forma assíncrona
 */
function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(RECOVERY_USER_PASSWORD, recoveryUserPassword);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
}

export default authSaga;
