import { Pipe, PipeTransform } from '@angular/core';

import { Payment } from '../interfaces/payment';

@Pipe({ name: 'filterByUser'})
export class FilterByUser implements PipeTransform {

    transform(payments: Payment[], userQuery: string) {
        userQuery = userQuery
            .trim()
            .toLowerCase();

        if(userQuery) {
            return payments.filter(photo => 
                photo.name.toLowerCase().includes(userQuery)
            );
        } else {
            return payments;
        }
    }

}