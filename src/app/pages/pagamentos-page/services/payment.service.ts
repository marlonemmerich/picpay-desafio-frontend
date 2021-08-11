import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Payment } from "src/app/shared/interfaces/payment";
import { environment } from "src/environments/environment";

const API_URL = `${environment.apiUrl}/tasks`

@Injectable({ providedIn: 'root' })
export class PaymentService {
    constructor(private http: HttpClient){}

    getPayments(): Observable<Payment[]>{
        return this.http.get<Payment[]>(API_URL)
    }

    deletePayments(idPayment: number): Observable<Payment>{
        return this.http.delete<Payment>(`${API_URL}/${idPayment.toString()}`)
    }

    addPayments(payment: Payment): Observable<Payment>{
        return this.http.post<Payment>(API_URL, payment)
    }

    editPayments(idPayment: number, payment: Payment): Observable<Payment>{
        return this.http.patch<Payment>(`${API_URL}/${idPayment.toString()}`, payment)
    }
}