import { Injectable } from '@angular/core';
import { ApiFactory } from '../_helpers/index';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private api: ApiFactory) { }

    profile() {
        return this.api.get('/me');
    }

    register(user: User) {
        return this.api.post('/signup', user, false);
    }

}