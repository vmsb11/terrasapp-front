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

const INIT_STATE = {
  sales: [],
  metrics: [0, 0, 0],
  selectedSale: null
};

/**
 * Função que configura o estado da aplicação do módulo de gerenciamento de vendas sempre que uma action é executada
 * @param {*} state estado atual da aplicação
 * @param {*} action action que foi executada
 * @returns o novo estado da aplicação
 */
const saleReducer = (state = INIT_STATE, action) => {

  //nas linhas abaixo o estado da aplicação é atualizado dependendo da action que foi executada
  switch (action.type) {
    case GET_SALES_METRICS:
      return {
        ...state,
        metrics: [0, 0, 0]
      };

    case GET_SALES_METRICS_SUCCESS:
      return {
        ...state,
        metrics: action.payload
      };

    case GET_SALES_METRICS_FAIL:
      return {
        ...state,
        metrics: [0, 0, 0]
      };

    case SEARCH_SALES:
      return {
        ...state,
        sales: []
      };

    case SEARCH_SALES_SUCCESS:
      return {
        ...state,
        sales: action.payload
      };

    case SEARCH_SALES_FAIL:
      return {
        ...state,
        sales: []
      };

    case ADD_SALE:
      return {
        ...state,
        selectedSale: null
      };

    case ADD_SALE_SUCCESS:
      return {
        ...state,
        selectedSale: action.payload,
      };

    case ADD_SALE_FAIL:
      return {
        ...state,
        selectedSale: null
      };
    
    case IMPORT_SALES:
      return {
        ...state,
        selectedSale: null
      };

    case IMPORT_SALES_SUCCESS:
      return {
        ...state,
        selectedSale: null,
      };

    case IMPORT_SALES_FAIL:
      return {
        ...state,
        selectedSale: null
      };

    case UPDATE_SALE:
      return {
        ...state
      };

    case UPDATE_SALE_SUCCESS:
      return {
        ...state,
        selectedSale: action.payload,
      };

    case UPDATE_SALE_FAIL:
      return {
        ...state,
      };
    
    case DELETE_SALE:
      return {
        ...state
      };

    case DELETE_SALE_SUCCESS:
      return {
        ...state,
        selectedSale: action.payload,
      };

    case DELETE_SALE_FAIL:
      return {
        ...state,
      };

    case SELECT_SALE:
      return {
        ...state,
        selectedSale: action.payload
      };

    default:
      return state;
  }
};

export default saleReducer;
