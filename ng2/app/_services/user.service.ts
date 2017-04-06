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

    getAll() {
        return this.api.get('/users');
    }

    getById(id: number) {
        return this.api.get('/users/' + id);
    }

    create(user: User) {
        return this.api.post('/users', user);
    }

    update(user: User) {
        return this.api.patch('/users/' + user.id, user);
    }

    delete(id: number) {
        return this.api.delete('/users/' + id);
    }

}