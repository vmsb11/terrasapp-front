/**
 * Função que recebe um objeto data e a converte no formato brasileiro
 * @param date data a ser convertida
 * @returns data convertid
 */
export function formatDatetime(date) {

    //cria um novo objeto data
    const newDate = new Date(date);
    //obtém de forma sepada dia, mes, ano, hora, minuto, segundo da data
    let day = '' + newDate.getDate();
    let month = '' + (newDate.getMonth() + 1);
    const year = '' + newDate.getFullYear();
    let hour = '' + newDate.getHours();
    let minute = '' + newDate.getMinutes();
    let second = '' + newDate.getSeconds();

    if (day.length === 1) day = '0' + day;
    if (month.length === 1) month = '0' + month;
    if (hour.length === 1) hour = '0' + hour;
    if (minute.length === 1) minute = '0' + minute;
    if (second.length === 1) second = '0' + second;

    //formata a data no formato brasileiro dd/mm/yyyy hh:mm:ss
    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
}