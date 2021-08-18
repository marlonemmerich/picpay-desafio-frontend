import { Paginacao } from './paginacao.model';

fdescribe('Paginacao', () => {
  it('should create an instance', () => {
    expect(new Paginacao()).toBeTruthy();
  });

  it('Nova instância - deve ter os valores corretos', () => {
    const paginacao = new Paginacao();
    expect(paginacao['paginaAtual']).toBe(1);
    expect(paginacao['quantidadePorPagina']).toBe('5');
    expect(paginacao['possuiProximaPagina']).toBe(false);
  });

  it('avancarPagina - deve incrementar pagina atual', () => {
    const paginacao = new Paginacao();
    expect(paginacao['paginaAtual']).toBe(1);
    paginacao.avancarPagina();
    expect(paginacao['paginaAtual']).toBe(2);
  });

  it('possuiPaginaAnterior - primeira pagina - deve retornar false', () => {
    const paginacao = new Paginacao();
    paginacao['paginaAtual'] = 1;
    expect(paginacao.possuiPaginaAnterior()).toBe(false);
  });

  it('possuiPaginaAnterior - não está na primeira pagina - deve retornar true', () => {
    const paginacao = new Paginacao();
    paginacao['paginaAtual'] = 2;
    expect(paginacao.possuiPaginaAnterior()).toBe(true);
  });

});
