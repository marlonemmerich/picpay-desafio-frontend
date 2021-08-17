export class Paginacao {
    paginaAtual = 1;
    quantidadePorPagina = '5';
    possuiProximaPagina = false;


    avancarPagina(): void {
        this.paginaAtual++;
    }

    possuiPaginaAnterior() {
        if (this.paginaAtual > 1) {
            return true;
        }
        return false;
    }
}
