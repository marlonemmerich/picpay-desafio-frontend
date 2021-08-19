export default class Pagamento {
    id: number | null;
    name = '';
    username = '';
    title  = '';
    value: number | undefined = undefined;
    date: Date | string = '';
    image = '';
    isPayed = false;
    constructor(pagamento? : any) {
        this.id = (pagamento && pagamento.id) ? pagamento.id : null;
        this.name = (pagamento && pagamento.name) ? pagamento.name : '';
        this.username = (pagamento && pagamento.username) ? pagamento.username : '';
        this.title  = (pagamento && pagamento.title) ? pagamento.title : '';
        this.value = (pagamento && pagamento.value) ? pagamento.value : undefined;
        this.date = (pagamento && pagamento.date) ? pagamento.date : '';
        this.image = (pagamento && pagamento.image) ? pagamento.image : '';
        this.isPayed = (pagamento && pagamento.isPayed) ? pagamento.isPayed : false;
    }
}
