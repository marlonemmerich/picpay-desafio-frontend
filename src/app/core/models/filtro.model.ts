export class Filtro {
    chaveBusca: string;
    valorBusca: string;
    constructor(obj: any) {
        this.chaveBusca = (obj && obj.chaveBusca) ? obj.chaveBusca : '';
        this.valorBusca = (obj && obj.valorBusca) ? obj.valorBusca : '';
    }
}
