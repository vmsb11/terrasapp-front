/**
 * Arquivo com as funções que realizam as requisições a API criada
 */
import axios from 'axios';
import { formatDatetime } from './dates_helpers';

const API_URL = 'http://localhost:5000/api';
/**
 * Função que inicializa o axios
 */
const axiosApi = axios.create({
  baseURL: API_URL,
});

/**
 * Função que configura interceptadores se houver da requisição
 */
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

/**
 * Função que realiza uma requisição do tipo get
 * @param {*} url url da rota
 * @param {*} config configurações adicionais
 * @returns resposta da requisição ou uma mensagem de erro
 */
export function get(url, config = {}) {
  return axiosApi
    .get(url, { ...config })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

/**
 * Função que realiza uma requisição do tipo post
 * @param {*} url url da rota
 * @param {*} data dados a serem enviados
 * @param {*} config configurações adicionais
 * @returns resposta da requisição ou uma mensagem de erro
 */
export function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

/**
 * Função que realiza uma requisição do tipo put
 * @param {*} url url da rota
 * @param {*} data dados a serem enviados
 * @param {*} config configurações adicionais
 * @returns resposta da requisição ou uma mensagem de erro
 */
export function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

/**
 * Função que realiza uma requisição do tipo delete
 * @param {*} url url da rota
 * @param {*} config configurações adicionais
 * @returns resposta da requisição ou uma mensagem de erro
 */
export function del(url, config = {}) {
  return axiosApi
    .delete(url, { ...config })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

/**
 * Função que formata mensagens de erros recebidas durante eventuais falhas de requisição
 * @param {*} error mensagem de erro informada
 * @returns mensagem de erro formatada
 */
export function getRequestErrorMessage(error) {

  let errorMessage = '';

  //se o erro for na resposta da requsição
  if (error.response) {
    
    errorMessage = error.response.data;
  }
  //se o erro for na requisição efetuada
  else if (error.request) {
    
    errorMessage = {
      code: 503,
      type: 'error',
      message: 'Falha ao processar a sua requisição, verifique a sua conexão e tente novamente',
      date: formatDatetime(new Date())
    };
  } 
  //erros desconhecidos
  else {
    
    errorMessage = {
      code: 100,
      type: 'error',
      message: 'Falha desconhecida, aguarde alguns minutos e tente novamente',
      date: formatDatetime(new Date())
    };
  }

  return errorMessage;
}
