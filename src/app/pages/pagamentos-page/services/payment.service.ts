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

    deletePayments(idPayment): Observable<Payment>{
        return this.http.delete<Payment>(`${API_URL}?id=${idPayment}`)
    }

    addPayments(payment): Observable<Payment>{
        return this.http.post<Payment>(API_URL, payment)
    }

    editPayments(payment): Observable<Payment>{
        return this.http.post<Payment>(`${API_URL}?id=${payment.id}`, payment)
    }
}