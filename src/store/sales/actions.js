/**
 * Arquivo responsável por implementar as actions do reducer
 */
import {
  ADD_SALE,
  ADD_SALE_SUCCESS,
  ADD_SALE_FAIL,
  IMPORT_SALES,
  IMPORT_SALES_SUCCESS,
  IMPORT_SALES_FAIL,
  UPDATE_SALE,
  UPDATE_SALE_SUCCESS,
  UPDATE_SALE_FAIL,
  DELETE_SALE,
  DELETE_SALE_SUCCESS,
  DELETE_SALE_FAIL,
  GET_SALES_METRICS,
  GET_SALES_METRICS_SUCCESS,
  GET_SALES_METRICS_FAIL,
  SEARCH_SALES,
  SEARCH_SALES_FAIL,
  SEARCH_SALES_SUCCESS,
  SELECT_SALE
} from './actionTypes';

/**
 * Action responsável por buscar as vendas na base de dados
 * @param {*} parameter parâmetro de pesquisa
 * @param {*} page página atual
 * @param {*} size total de registros por página
 * @param {*} token token de segurança gerado na autenticação
 */
export const searchSales = (parameter, page, size, token) => ({
  type: SEARCH_SALES,
  payload: {
    parameter,
    page,
    size, 
    token
  },
});

/**
 * Action responsável por sinalizar que a busca de vendas foi realizada com sucesso
 * @param {*} sales lista de encontradas
 */
export const searchSalesSuccess = (sales) => ({
  type: SEARCH_SALES_SUCCESS,
  payload: sales,
});

/**
 * Action responsável por sinalizar que a busca de vendas não foi realizada com sucesso
 */
export const searchSalesFail = () => ({
  type: SEARCH_SALES_FAIL
});

/**
 * Action responsável por selecionar uma venda
 * @param {*} sale venda a ser selecionado
 */
export const selectSale = (sale) => ({
  type: SELECT_SALE,
  payload: sale,
});

/**
 * Action responsável por buscar a quantidade de vendas criados de cada tipo
 * @param {*} token token de segurança gerado na autenticação
 */
export const getSalesMetrics = (token) => ({
  type: GET_SALES_METRICS,
  payload: { token },
});

/**
 * Action responsável por sinalizar que a busca da quantidade de vendas criados foi executada com sucesso
 * @param {*} salesIndicators informações das vendas encontrados
 */
export const getSalesMetricsSuccess = (salesIndicators) => ({
  type: GET_SALES_METRICS_SUCCESS,
  payload: salesIndicators,
});

/**
 * Action responsável por sinalizar que a busca da quantidade de vendas criados não foi executada com sucesso
 * @param {*} sale venda a ser  cadastrado
 * @param {*} history objeto que controla o histórico de navegação
 */
export const getSalesMetricsFail = () => ({
  type: GET_SALES_METRICS_FAIL
});

/**
 * Action responsável por criar um nova venda
 * @param {*} sale venda a ser cadastrado
 * @param {*} token token de segurança gerado na autenticação
 */
export const addNewSale = (sale, token) => ({
  type: ADD_SALE,
  payload: { sale, token },
});

/**
 * Action responsável por sinalizar que o cadastro da venda foi realizado
 * @param {*} sale venda cadastrada
 */
export const addSaleSuccess = (sale) => ({
  type: ADD_SALE_SUCCESS,
  payload: sale,
});

/**
 * Action responsável por sinalizar que o cadastro da venda não foi realizado
 */
export const addSaleFail = () => ({
  type: ADD_SALE_FAIL
});

/**
 * Action responsável por importar um conjunto de vendas
 * @param {*} sales vendas a serem importadas
 * @param {*} token token de segurança gerado na autenticação
 */
export const importSales = (sales, token) => ({
  type: IMPORT_SALES,
  payload: { sales, token },
});

/**
 * Action responsável por sinalizar que a importação das vendas foi realizada
 * @param {*} sale venda cadastrada
 */
export const importSalesSuccess = () => ({
  type: IMPORT_SALES_SUCCESS
});

/**
 * Action responsável por sinalizar que a importação das vendas não foi realizada
 */
export const importSalesFail = () => ({
  type: IMPORT_SALES_FAIL
});

/**
 * Action responsável por alterar uma venda
 * @param {*} sale venda a ser alterado
 * @param {*} token token de segurança gerado na autenticação
 */
export const updateSale = (sale, token) => ({
  type: UPDATE_SALE,
  payload: { sale, token },
});

/**
 * Action responsável por sinalizar que o cadastro da venda foi alterado
 * @param {*} sale venda alterado
 */
export const updateSaleSuccess = (sale) => ({
  type: UPDATE_SALE_SUCCESS,
  payload: sale,
});

/**
 * Action responsável por sinalizar que o cadastro da venda não foi alterado
 */
export const updateSaleFail = () => ({
  type: UPDATE_SALE_FAIL
});

/**
 * Action responsável por deletar uma venda
 * @param {*} sale venda a ser deletado
 * @param {*} token token de segurança gerado na autenticação
 */
export const deleteSale = (sale, token) => ({
  type: DELETE_SALE,
  payload: { sale, token },
});

/**
 * Action responsável por sinalizar que o cadastro da venda foi deletado
 * @param {*} sale venda a ser  cadastrado
 */
export const deleteSaleSuccess = (sale) => ({
  type: DELETE_SALE_SUCCESS,
  payload: sale,
});

/**
 * Action responsável por sinalizar que o cadastro da venda não foi deletado
 */
export const deleteSaleFail = () => ({
  type: DELETE_SALE_FAIL
});