import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/index';
import { AuthenticationService, UserService, AlertService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'list.component.html'
})

export class UserListComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
        private router: Router, 
        private userService: UserService, 
        private authService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.load();
    }

    delete(id: number) {
        if(confirm('Are you sure to delete this user?')) {
            this.userService.delete(id).subscribe(() => { this.load() });
        }
    }

    private load() {
        this.userService.getAll().subscribe(
            users => { 
                this.users = users.map((user: User) => {
                    user.title = this.getRole(user.role);
                    return user;
                });
            },
            error => {
                const message = error.json();
                this.alertService.error(message.error);
            });
    }

    private getRole(role: number): string {
        switch (role) {
            case 0: return 'Member';
            case 1: return 'Subscriber';
            case 9: return 'Administrator';
            default: return '';
        }
    }
}