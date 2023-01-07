/**
 * Função que converte byte em megabyte
 * @param {*} bytes byte a ser convertido
 * @returns o valor informado em megabyte
 */
export function bytesToMB(bytes) {

    //retorna a conversão feita
    return bytes / 1024 ** 2;
}