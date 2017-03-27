import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ApiFactory } from '../_helpers/index';
import { Customer } from '../_models/index';

@Injectable()
export class CustomerService {
    constructor(private api: ApiFactory) { }

    getAll() {
        return this.api.get('/customers');
    }

    getById(id: number) {
        return this.api.get('/customers/' + id);
    }

    create(customer: Customer) {
        return this.api.post('/customers', customer);
    }

    update(customer: Customer) {
        return this.api.patch('/customers/' + customer.id, customer);
    }

    delete(id: number) {
        return this.api.delete('/customers/' + id);
    }

}