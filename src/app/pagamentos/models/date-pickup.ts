export class DatePickup {
    data: string;
    hora: string;
    constructor(datePickup?: any) {
        this.data = (datePickup && datePickup.data) ? datePickup.data : '';
        this.hora = (datePickup && datePickup.hora) ? datePickup.hora : '';
    }
}
