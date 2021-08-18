import { by, element } from 'protractor';

export class LoginPage {
  getInputEmail() {
    return element(by.id('input-email'));
  }

  setInputEmail(texto) {
    return element(by.id('input-email')).sendKeys(texto) as Promise<any>;;
  }

  getInputSenha() {
    return element(by.id('input-password'));;
  }

  setInputSenha(texto) {
    return element(by.id('input-password')).sendKeys(texto);
  }

  getBotaoLogin() {
    return element(by.id('button-login'));
  }

  getFormLogin() {
    return element(by.id('form-login'));
  }

  clickLogin() {
    return element(by.id('button-login')).click() as Promise<any>;
  }

}