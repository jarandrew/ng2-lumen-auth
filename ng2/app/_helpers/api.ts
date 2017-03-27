import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiFactory {
    baseUrl: string = 'http://localhost:8000';

    constructor(private http: Http) { }

    get(apiUrl: string) {
        return this.http.get(this.baseUrl + apiUrl, this.header())
            .map((response: Response) => {
                return response.json();
            });
    }

    post(apiUrl: string, data: any = {}, useToken: boolean = true) {
        return this.http.post(this.baseUrl + apiUrl, JSON.stringify(data), this.header(useToken))
            .map((response: Response) => {
                return response.json();
            });
    }

    patch(apiUrl: string, data: any = {}) {
        return this.http.patch(this.baseUrl + apiUrl, JSON.stringify(data), this.header())
            .map((response: Response) => {
                return response.json();
            });
    }

    delete(apiUrl: string) {
        return this.http.delete(this.baseUrl + apiUrl, this.header())
            .map((response: Response) => {
                return response.json();
            });
    }

    private header(useToken: boolean = true) {
        let headerOptions: any = { 'Content-Type': 'application/json' };

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (useToken && currentUser && currentUser.token) {
            headerOptions['Authorization'] = 'Bearer ' + currentUser.token;
        }

        let headers = new Headers(headerOptions);
        return new RequestOptions({ headers: headers });
    }
}