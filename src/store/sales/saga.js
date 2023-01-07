/**
 * Arquivo onde estão implementadas as funções através do redux-saga que executam funções assíncronas como as requisições a API
 */
import { put, takeEvery } from 'redux-saga/effects';
import { post, get, put as put2, del, getRequestErrorMessage } from '../../helpers/api_helper';
import { 
  ADD_SALE,
  IMPORT_SALES,
  UPDATE_SALE,
  DELETE_SALE,
  GET_SALES_METRICS, 
  SEARCH_SALES 
} from './actionTypes';
import {
  getSalesMetrics,
  getSalesMetricsSuccess,
  getSalesMetricsFail,
  searchSales,
  searchSalesSuccess,
  searchSalesFail,
  selectSale,
  addSaleSuccess,
  addSaleFail,
  importSalesSuccess,
  importSalesFail,
  updateSaleSuccess,
  updateSaleFail,
  deleteSaleSuccess,
  deleteSaleFail,
  showErrorAlert,
  showSalePanel,
  showSuccessAlert,
  showLoadingModal,
  hideLoadingModal
} from '../actions';

/**
 * Função que busca as vendas de um usuário na base de dados
 * @param {*} payload informações da busca
 */
function* fetchSalesByParameter({ payload: { parameter, page, size, token } }) {
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield get(`/sales`, {
    params: {
      parameter, 
      page, 
      size
    },
    headers: { Authorization: `Bearer ${token}` }
  });
  
  //se recebeu uma resposta válida
  if (response) {

    //invoca a action que grava as vendas buscados no estado da aplicação
    yield put(searchSalesSuccess(response.data));
  }
  //em caso de erro 
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);

    yield put(searchSalesFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que busca as informações do total de vendas de um usuário na base de dados
 * @param {*} payload informações da busca
 */
function* fetchSalesMetrics({ payload: { token } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield get(`/sales/tasks/count`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  //se obteve uma resposta válida
  if (response) {

    //invoca a action que grava as informações do total de vendas buscados no estado da aplicação
    yield put(getSalesMetricsSuccess(response.data));
  }
  //em caso de erro 
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);

    yield put(getSalesMetricsFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que cadastra um nova venda
 * @param {*} payload informações da venda a ser cadastrado
 */
function* onAddNewSale({ payload: { sale, token } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield post(`/sales`, sale, { headers: { Authorization: `Bearer ${token}` }});
  
  //se obteve uma resposta válida
  if (response) {

    //sinaliza que o cadastro foi realizado
    yield put(showSuccessAlert('Venda cadastrada com sucesso', 'Terras App - Vendas'));
    yield put(addSaleSuccess(response.data));
    yield put(selectSale(null));
    //busca novamente as vendas na base de dados
    yield put(searchSales('', 1, 10, token));
    yield put(showSalePanel('SALES_SEARCH'));
    yield put(getSalesMetrics(token));
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(addSaleFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que importa um conjunto de vendas
 * @param {*} payload informações da venda a ser cadastrado
 */
function* onImportSales({ payload: { sales, token } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield post(`/sales/import`, {sales: sales}, { headers: { Authorization: `Bearer ${token}` }});
  
  //se obteve uma resposta válida
  if (response) {

    //sinaliza que o cadastro foi realizado
    yield put(showSuccessAlert('Vendas importadas com sucesso', 'Terras App - Vendas'));
    yield put(importSalesSuccess());
    yield put(selectSale(null));
    //busca novamente as vendas na base de dados
    yield put(searchSales('', 1, 10, token));
    yield put(showSalePanel('SALES_SEARCH'));
    yield put(getSalesMetrics(token));
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(importSalesFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que altera o cadastro da venda
 * @param {*} payload informações da venda a ser alterado
 */
function* onUpdateSale({ payload: { sale, token } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  const { saleId } = sale;
  //realiza a requisição a API
  const { response, error } = yield put2(`/sales/${saleId}`, sale, { headers: { Authorization: `Bearer ${token}` }});
  
  //se obteve uma resposta válida
  if (response) {

    //sinaliza que o cadastro foi alterado
    yield put(showSuccessAlert('Venda alterada com sucesso', 'Terras App - Vendas'));
    yield put(updateSaleSuccess(response.data));
    yield put(selectSale(null));
    //busca novamente as vendas na base de dados
    yield put(searchSales('', 1, 10, token));
    yield put(getSalesMetrics(token));
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(updateSaleFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que remove o cadastro da venda
 * @param {*} payload informações da venda a ser removido
 */
function* onDeleteSale({ payload: { sale, token } }) {
  
  yield put(showLoadingModal('Terras App - Gerenciamento', 'Aguarde...'));

  const { saleId } = sale;
  //realiza a requisição a API
  const { response, error } = yield del(`/sales/${saleId}`, { headers: { Authorization: `Bearer ${token}` } });
  
  //se obteve uma resposta válida
  if (response) {
  
    //sinaliza que o cadastro foi removido com sucesso
    yield put(showSuccessAlert('Vemda deletada com sucesso', 'Terras App - Vendas'));
    yield put(deleteSaleSuccess(response.data));
    //busca novamente as vendas na base de dados
    yield put(searchSales('', 1, 10, token));
    yield put(getSalesMetrics(token));
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(deleteSaleFail());
    yield put(showErrorAlert(errorMessage, 'Terras App - Vendas'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que configura o redux-saga associando para cada action criada a função responsável por executar de forma assíncrona
 */
function* saleSaga() {
  yield takeEvery(SEARCH_SALES, fetchSalesByParameter);
  yield takeEvery(GET_SALES_METRICS, fetchSalesMetrics);
  yield takeEvery(ADD_SALE, onAddNewSale);
  yield takeEvery(IMPORT_SALES, onImportSales);
  yield takeEvery(UPDATE_SALE, onUpdateSale);
  yield takeEvery(DELETE_SALE, onDeleteSale);
}

export default saleSaga;
