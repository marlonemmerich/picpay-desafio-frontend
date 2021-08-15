export class Paginacao {
    paginaAtual: number = 1
    quantidadePorPagina: string = '5';
    possuiProximaPagina: boolean = false;


    avancarPagina(): void {
        this.paginaAtual++;
    }

    possuiPaginaAnterior() {
        if(this.paginaAtual > 1) {
            return true;
        }
        return false;
    }
}
