import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiFactory } from '../_helpers/index';
import { User } from '../_models/index';

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

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    saveCurrentUser(user: User) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.user = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    forgotPassword(email: string) {
        return this.api.post('/password/email', {email: email});
    }

    resetPassword(data: any) {
        return this.api.post('/password/reset', data);
    }
}