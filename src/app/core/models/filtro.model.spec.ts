import { Filtro } from './filtro.model';

describe('Filtro', () => {
  it('should create an instance', () => {
    expect(new Filtro()).toBeTruthy();
  });

  it('Nova instância sem parâmetro - deve ter os valores corretos', () => {
    const filtro = new Filtro();
    expect(filtro['chaveBusca']).toBe('');
    expect(filtro['valorBusca']).toBe('');
  });

  it('Nova instância com parâmetro vazio - deve ter os valores corretos', () => {
    const filtro = new Filtro({});
    expect(filtro['chaveBusca']).toBe('');
    expect(filtro['valorBusca']).toBe('');
  });

  it('Nova instância com parâmetro preenchido - deve ter os valores corretos', () => {
    const filtro = new Filtro({chaveBusca: '123', valorBusca: '456'});
    expect(filtro['chaveBusca']).toBe('123');
    expect(filtro['valorBusca']).toBe('456');
  });

});
