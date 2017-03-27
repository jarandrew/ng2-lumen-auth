import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiFactory } from '../_helpers/index';

@Injectable()
export class AuthenticationService {
    constructor(private api: ApiFactory) { }

    login(email: string, password: string) {
        return this.api.post('/login', { email: email, password: password }, false)
            .map((response: any) => {
                if (response && response.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}