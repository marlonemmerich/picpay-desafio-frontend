import { browser } from 'protractor';
import { ListPagamentos } from './list-pagamentos.po';
import { LoginPage } from './login.po';

describe('login', () => {
    let loginPage;
    let listPagamentos;

    beforeEach(async () => {
        await browser.get(`${browser.baseUrl}`);
        browser.executeScript('localStorage.removeItem("user-token");');
        /* /\ Vamos limpar a storage por garantia, já que guardamos a autenticação lá */

        await browser.get(`${browser.baseUrl}/login`);

        loginPage = new LoginPage();
        listPagamentos = new ListPagamentos();
    });

    afterEach(async () => {
        loginPage = null;
        listPagamentos = null;
    });

    it('Deve conter os elementos corretamente', async () => {
        expect(loginPage.getInputEmail()).toBeDefined(true);
        expect(loginPage.getInputSenha()).toBeDefined(true);
        expect(loginPage.getBotaoLogin()).toBeDefined(true);
        expect(loginPage.getFormLogin()).toBeDefined(true);
    });

    it('usuario e senha em branco - deverá apresentar erro nos selects', async () => {
        await loginPage.getInputEmail().sendKeys('');
        await loginPage.getInputSenha().sendKeys('');

        await loginPage.clickLogin();

        const emailPossuiClasseInvalida = (await loginPage.getInputEmail().getAttribute('class')).includes('invalid');
        const senhaPossuiClasseInvalida = (await loginPage.getInputSenha().getAttribute('class')).includes('invalid');

        expect(emailPossuiClasseInvalida).toBe(true);
        expect(senhaPossuiClasseInvalida).toBe(true);
    });

    it('e-mail informado incorretamente e senha em branco - deve apresentar erro no select', async () => {
        await loginPage.setInputEmail('errado');
        await loginPage.setInputSenha('');

        await loginPage.clickLogin();

        const emailPossuiClasseInvalida = (await loginPage.getInputEmail().getAttribute('class')).includes('invalid');
        const senhaPossuiClasseInvalida = (await loginPage.getInputSenha().getAttribute('class')).includes('invalid');

        expect(emailPossuiClasseInvalida).toBe(true);
        expect(senhaPossuiClasseInvalida).toBe(true);
    });

    it('e-mail válido e senha em branco - deve ter as classes corretas', async () => {
        await loginPage.setInputEmail('usuario@gmail.com');
        await loginPage.setInputSenha('');

        await loginPage.clickLogin();

        const emailPossuiClasseInvalida = (await loginPage.getInputEmail().getAttribute('class')).includes('invalid');
        const senhaPossuiClasseInvalida = (await loginPage.getInputSenha().getAttribute('class')).includes('invalid');

        expect(emailPossuiClasseInvalida).toBe(false);
        expect(senhaPossuiClasseInvalida).toBe(true);
    });

    it('e-mail válido e senha válida - deve redirecionar corretamente', async () => {
        await loginPage.setInputEmail('usuario@gmail.com');
        await loginPage.setInputSenha('usuario');

        await loginPage.clickLogin();

        browser.wait(() => (listPagamentos.getListCard().isPresent()), 10000)
            .then(() => {
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:4200/pagamentos');
            })
            .catch(() => {
                expect(true).toBeFalse(); // Não podemos cair aqui,se cair damos erro!
            });
    });
});
