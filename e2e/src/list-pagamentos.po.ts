import { browser, by, element } from 'protractor';

export class ListPagamentos {
  getListCard() {
    return element(by.id('list-pagamentos-card-panel'));
  }
}
