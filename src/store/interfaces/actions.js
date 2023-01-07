/**
 * Arquivo responsável por implementar as actions do reducer
 */
import {
  SHOW_SALE_PANEL,
  HIDE_SALE_PANEL,
  SHOW_ERROR_ALERT,
  HIDE_ERROR_ALERT,
  SHOW_SUCCESS_ALERT,
  HIDE_SUCCESS_ALERT,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL
} from './actionTypes';

/**
 * Action responsável por exibir o painel das vendas
 * @param {*} tab tab a ser visualizada
 */
export const showSalePanel = (tab) => ({
  type: SHOW_SALE_PANEL,
  payload: { tab }
});

/**
 * Action oculta o painel de vendas
 */
export const hideSalePanel = () => ({
  type: HIDE_SALE_PANEL,
});

/**
 * Action responsável por exibir uma mensagem de erro
 * @param {*} errorMessage mensagem de erro
 * @param {*} title título da mensagem
 */
export const showErrorAlert = (errorMessage, title) => ({
  type: SHOW_ERROR_ALERT,
  payload: { errorMessage, title }
});

/**
 * Action responsável por ocultar a mensagem de erro
 */
export const hideErrorAlert = () => ({
  type: HIDE_ERROR_ALERT,
});

/**
 * Action responsável por exibir uma mensagem de sucesso
 * @param {*} successMessage mensagem de sucesso
 * @param {*} title título da mensagem
 */
export const showSuccessAlert = (successMessage, title) => ({
  type: SHOW_SUCCESS_ALERT,
  payload: { successMessage, title }
});

/**
 * Action responsável por ocultar a mensagem de sucesso
 * @param {*} user usuário a ser logado
 * @param {*} history objeto que controla o histórico de navegação
 */
export const hideSuccessAlert = () => ({
  type: HIDE_SUCCESS_ALERT,
});

/**
 * Action responsável por exibir o painel de carregamento de uma operação
 * @param {*} message mensagem a ser exibida
 * @param {*} title título da mensagem
 */
export const showLoadingModal = (title, message) => ({
  type: SHOW_LOADING_MODAL,
  payload: { title, message }
});

/**
 * Action responsável por ocultar o painel de carregamento de uma operação
 * @param {*} user usuário a ser logado
 * @param {*} history objeto que controla o histórico de navegação
 */
export const hideLoadingModal = () => ({
  type: HIDE_LOADING_MODAL,
});