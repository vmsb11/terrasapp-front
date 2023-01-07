
/**
 * Função que valida um endereço de email
 * @param {*} mail email a ser validado
 * @returns true se o email for válido ou falso caso contrário
 */
export function validateMail(mail) {

    //valida o email utilizando expressões regulares
    let response = /\S+@\S+\.\S+/;
    
    return response.test(mail);
}

/**
 * Função que retorna a extensão de um arquivo
 * @param {*} file nome do arquivo
 * @returns extensão do arquivo
 */
export function getFileExtension(file) {

    //obtém a extensão do arquivo fazendo o substring do nome
    const name = file.toLowerCase();
    const lastDot = name.lastIndexOf('.');

    const ext = name.substring(lastDot + 1);

    return ext;
}

/**
 * Função que faz o parse do arquivo com os dados das vendas
 * @param {*} fileContent conteúdo das vendas
 * @returns retorna um vetor no formato JSON com as informações da venda
 */
export function parseFileToSales(fileContent) {

    //quebra o conteúdo do arquivo em linhas
    const lines = atob(fileContent).split(/\r?\n/);
    const sales = [];

    //percorre o arquivo a partir da segunda linha
    for(let i = 1; i < lines.length; i++) {

        //obtém a linha atual e quebra o conteúdo dela separado por tabs
        const line = lines[i].split(/\r?\t/);
        //cria um objeto JSON com o conteúdo obtido da leitura da venda
        const sale = { 
            purchaserName: line[0], 
            itemDescription: line[1],
            itemPrice: parseFloat(line[2]),
            purchaseCount: parseInt(line[3]),
            merchantAddress: line[4],
            merchantName: line[5],
        };

        //adiciona o item no vetor de vendas
        sales.push(sale);
    }

    //retorna o vetor criado
    return sales;
}