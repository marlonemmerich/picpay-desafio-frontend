import { SortTableHeader } from './sort-table-header.model';
import { SortOrdem } from '../enums/sort-ordem';
import { noop } from 'rxjs';

describe('SortTableHeader', () => {
  it('should create an instance', () => {
    expect(new SortTableHeader()).toBeTruthy();
  });

  it('Nova instância sem parâmetro - deve ter os valores corretos', () => {
    const sortableHeader = new SortTableHeader();
    expect(sortableHeader['textoCampo']).toBe('');
    expect(sortableHeader['chaveCampo']).toBe('');
    expect(sortableHeader['isSorting']).toBe(false);
    expect(sortableHeader['sortOrdem']).toBe(SortOrdem.asc);
  });

  it('Nova instância com parâmetro vazio - deve ter os valores corretos', () => {
    const sortableHeader = new SortTableHeader({});
    expect(sortableHeader['textoCampo']).toBe('');
    expect(sortableHeader['chaveCampo']).toBe('');
    expect(sortableHeader['isSorting']).toBe(false);
    expect(sortableHeader['sortOrdem']).toBe(SortOrdem.asc);
  });

  it('Nova instância com parâmetro preenchido - deve ter os valores corretos', () => {
    const _parametros = {
      textoCampo: 'aaa',
      chaveCampo: 'bbb',
      isSorting: true,
      sortOrdem: SortOrdem.desc
    }
    const sortableHeader = new SortTableHeader(_parametros);
    expect(sortableHeader['textoCampo']).toBe('aaa');
    expect(sortableHeader['chaveCampo']).toBe('bbb');
    expect(sortableHeader['isSorting']).toBe(true);
    expect(sortableHeader['sortOrdem']).toBe(SortOrdem.desc);
  });

  it('setAsc - deve setar corretamente o valor', () => {
    const sortableHeader = new SortTableHeader();
    sortableHeader['sortOrdem'] = SortOrdem.desc;
    sortableHeader.setAsc()
    expect(sortableHeader.sortOrdem).toBe(SortOrdem.asc);
  });

  it('setDesc - deve setar corretamente o valor', () => {
    const sortableHeader = new SortTableHeader();
    sortableHeader['sortOrdem'] = SortOrdem.asc;
    sortableHeader.setDesc()
    expect(sortableHeader.sortOrdem).toBe(SortOrdem.desc);
  });

  describe('isAsc', () => {
    it('isAsc - está como asc - deve retornar true', () => {
      const sortableHeader = new SortTableHeader();
      sortableHeader['sortOrdem'] = SortOrdem.asc;
      expect(sortableHeader.isAsc()).toBeTrue();
    });

    it('isAsc - está como desc - deve retornar false', () => {
      const sortableHeader = new SortTableHeader();
      sortableHeader['sortOrdem'] = SortOrdem.desc;
      expect(sortableHeader.isAsc()).toBeFalse();
    });
  });

  describe('isDesc', () => {
    it('está como asc - deve retornar false', () => {
      const sortableHeader = new SortTableHeader();
      sortableHeader['sortOrdem'] = SortOrdem.asc;
      expect(sortableHeader.isDesc()).toBeFalse();
    });

    it('está como desc - deve retornar true', () => {
      const sortableHeader = new SortTableHeader();
      sortableHeader['sortOrdem'] = SortOrdem.desc;
      expect(sortableHeader.isDesc()).toBeTrue();
    });
  });

  describe('setSortStatus', () => {
    describe('Não estava com sort anteriormente aplicado (sortAnterior é false)', () => {
      it('situação atual é Sort.asc - deve fazer as chamadas corretamente', () => {
        const sortableHeader = new SortTableHeader();

        spyOn(sortableHeader, 'setAsc').and.callFake(noop);
        spyOn(sortableHeader, 'setDesc').and.callFake(noop);

        sortableHeader.setSortStatus(SortOrdem.desc, false, SortOrdem.asc); // esse primeiro parâmetro é irrelevante para o teste em questão
        expect(sortableHeader.setAsc).toHaveBeenCalled();
        expect(sortableHeader.setDesc).not.toHaveBeenCalled();
      })
      it('situação atual é Sort.desc - deve fazer as chamadas corretamente', () => {
        const sortableHeader = new SortTableHeader();

        spyOn(sortableHeader, 'setAsc').and.callFake(noop);
        spyOn(sortableHeader, 'setDesc').and.callFake(noop);

        sortableHeader.setSortStatus(SortOrdem.desc, false, SortOrdem.desc); // esse primeiro parâmetro é irrelevante para o teste em questão
        expect(sortableHeader.setAsc).not.toHaveBeenCalled();
        expect(sortableHeader.setDesc).toHaveBeenCalled();
      })
    });
    describe('Estava com sort anteriormente aplicado(sortAnterior é true)', () => {
      it('situação anterior era asc (situacaoAtual é SortOrdem.asc) - deve fazer a chamada correta', () => {
        const sortableHeader = new SortTableHeader();

        spyOn(sortableHeader, 'setAsc').and.callFake(noop);
        spyOn(sortableHeader, 'setDesc').and.callFake(noop);

        sortableHeader.setSortStatus(SortOrdem.asc, true, SortOrdem.asc); // esse último parâmetro é irrelevante para o teste em questão
        expect(sortableHeader.setAsc).not.toHaveBeenCalled();
        expect(sortableHeader.setDesc).toHaveBeenCalled();
      });

      it('situação anterior era desc (situacaoAtual é SortOrdem.desc) - deve fazer a chamada correta', () => {
        const sortableHeader = new SortTableHeader();

        spyOn(sortableHeader, 'setAsc').and.callFake(noop);
        spyOn(sortableHeader, 'setDesc').and.callFake(noop);

        sortableHeader.setSortStatus(SortOrdem.desc, true, SortOrdem.asc); // esse último parâmetro é irrelevante para o teste em questão
        expect(sortableHeader.setAsc).toHaveBeenCalled();
        expect(sortableHeader.setDesc).not.toHaveBeenCalled();
      });
    });

  });


});
