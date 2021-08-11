import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
 
export class FormatDate {
  /**
   * Formata a data enviada em string para NgbDate (ex: {year, month, day})
   * @param value recebe a data no formato string
   * @returns retorna a data enviada no formato NgbDate
   */
  static formatStringToNgbDate(value) {
    const dateReg = /\d{4}-(0[1-9]|1[0-2]|[1-9])-(0[1-9]|[1-2][0-9]|3[0-1]|[1-9])/;
    const separator = /-/;
    const onlyDate = value.match(dateReg);
    const arrayDate = onlyDate[0].split(separator);
    const dateFormated = new NgbDate(
      parseInt(arrayDate[0], 10),
      parseInt(arrayDate[1], 10),
      parseInt(arrayDate[2], 10)
    );
    return dateFormated;
  }
 
  /**
   * Formata a data enviada em NgbDate para ISO format
   * @param value recebe a data no formato NgbDate
   * @returns retorna a data enviada no formato ISO format
   */
  static formatNgbDateToDate(value: NgbDate) {
    return new Date(value.year, value.month - 1, value.day).toISOString()
  }
}
