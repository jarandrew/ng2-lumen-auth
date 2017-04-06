import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../_models/index';
import { AlertService, UserService, AuthenticationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent {
    user: User;
    loading = false;
    roles: any[];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private authService: AuthenticationService,
    ) { }

    ngOnInit() {
        const currentUser = this.authService.getCurrentUser();
        if(currentUser) {
            this.user = currentUser.user;
        }
        else {
            this.alertService.error('You need to login!');
            this.router.navigate(['/login']);
        }

        this.roles = [
            { role: 0, title: 'Member' },
            { role: 1, title: 'Subscriber' },
            { role: 9, title: 'Administrator' },
        ];
    }

    save() {
        this.loading = true;
        
        this.userService.update(this.user).subscribe(
            data => {
                this.authService.saveCurrentUser(this.user);
                this.alertService.success('User updated successfully!', true);
                this.loading = false;
            },
            error => {
                const message = error.json();
                this.alertService.error(message.error);
                this.loading = false;
            });
    }
}
