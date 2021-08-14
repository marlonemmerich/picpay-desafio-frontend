export default class Pagamento {
    id: number | null;
    name: string = '';
    username: string = '';
    title : string = '';
    value: number | undefined = undefined;
    date: Date | string = '';
    image: string = '';
    isPayed: boolean = false;
}