import { SortOrdem } from '../enums/sort-ordem';

export class SortTableHeader {

    textoCampo: string;
    chaveCampo: string;
    isSorting: boolean;
    sortOrdem: SortOrdem;

    constructor(parametros: any) {
        this.textoCampo = (parametros && parametros.textoCampo) ? parametros.textoCampo : '';
        this.chaveCampo = (parametros && parametros.chaveCampo) ? parametros.chaveCampo : '';
        this.isSorting = (parametros && parametros.sort) ? parametros.sort : false;
        this.sortOrdem = (parametros && parametros.sortOrdem) ? parametros.sortOrdem : SortOrdem.asc;
    }

    setAsc() {
        this.sortOrdem = SortOrdem.asc;
    }

    setDesc() {
        this.sortOrdem = SortOrdem.desc;
    }

    isAsc(): boolean {
        return this.sortOrdem === SortOrdem.asc;
    }

    isDesc(): boolean {
        return this.sortOrdem === SortOrdem.desc;
    }

    setSortStatus(situacaoAnterior: SortOrdem, sortAnterior: boolean) {
        this.isSorting = true;
        if ((!!sortAnterior) && situacaoAnterior === SortOrdem.asc) {
            this.setDesc();
            return;
        }
        this.setAsc();
    }

    resetSortStatus() {
        this.isSorting = false;
        this.sortOrdem = SortOrdem.asc;
    }

}
