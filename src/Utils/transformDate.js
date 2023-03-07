export function transformDate(date){
    let day, month, year;
    if(typeof date === 'string') {
        day = date.split('.')[0];
        month = date.split('.')[1];
        year = new Date().getFullYear();
    } else {
        year = date.getFullYear();
        month = (date.getMonth() + 1 < 10) ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        day = (date.getDate() < 10) ? ("0" + (date.getDate())) : date.getDate();
    }

    return `${year}-${month}-${day}`;
}